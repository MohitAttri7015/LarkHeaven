import { useEffect, useRef } from "react"

const ImageParticleGrid = ({
    imageSrc,
    gridDensity = 4,
    particleScale = 1.8,
    cursorRadius = 100,
    cursorStrength = 10,
    clickRadius = 220,
    clickStrength = 40,
    darknessThreshold = 0.15,
    friction = 0.90,
    springStiffness = 0.05,
    particleColor = "#000",
    backgroundColor = "#f3f3f3",
    style,
}) => {
    const containerRef = useRef(null)
    const mouseRef = useRef(null)
    let startDelay = null

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current

        let animationFrameId
        let renderer
        let instancedMesh
        let cancelled = false
        let cleanupFn = null

        import("three").then((THREE) => {
            if (cancelled) return
            const {
                Scene,
                OrthographicCamera,
                WebGLRenderer,
                InstancedMesh,
                SphereGeometry,
                MeshBasicMaterial,
                NormalBlending,
                Matrix4,
                Vector3,
                Color,
            } = THREE

            const img = new Image()
            img.crossOrigin = "Anonymous"
            startDelay = setTimeout(() => {
                if (cancelled) return
                img.src = imageSrc
            }, 350)

            img.src = imageSrc

            img.onload = () => {
                if (cancelled) return

                const width = container.clientWidth || 600
                const height = container.clientHeight || 600

                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
                canvas.width = width
                canvas.height = height

                if (!ctx) return

                const imgAspect = img.width / img.height
                const canvasAspect = width / height
                let renderW = width
                let renderH = height
                let offsetX = 0
                let offsetY = 0

                if (imgAspect > canvasAspect) {
                    renderH = width / imgAspect
                    offsetY = (height - renderH) / 2
                } else {
                    renderW = height * imgAspect
                    offsetX = (width - renderW) / 2
                }

                ctx.fillStyle = backgroundColor
                ctx.fillRect(0, 0, width, height)
                ctx.drawImage(img, offsetX, offsetY, renderW, renderH)

                const imgData = ctx.getImageData(0, 0, width, height).data

                const basePositions = []
                const displacements = []
                const velocities = []
                const particleSizes = []

                for (let y = 0; y < height; y += gridDensity) {
                    for (let x = 0; x < width; x += gridDensity) {
                        const index = (y * width + x) * 4
                        const r = imgData[index]
                        const g = imgData[index + 1]
                        const b = imgData[index + 2]

                        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
                        const darkness = 1 - brightness

                        if (darkness > darknessThreshold) {
                            const posX = x - width / 2
                            const posY = -(y - height / 2)

                            basePositions.push(new Vector3(posX, posY, 0))
                            displacements.push(new Vector3(0, 0, 0))
                            velocities.push(new Vector3(0, 0, 0))
                            particleSizes.push(darkness * particleScale)
                        }
                    }
                }

                const totalParticles = basePositions.length
                if (totalParticles === 0) return

                const scene = new Scene()
                const camera = new OrthographicCamera(
                    -width / 2,
                    width / 2,
                    height / 2,
                    -height / 2,
                    0.1,
                    1000
                )
                camera.position.z = 10

                renderer = new WebGLRenderer({ antialias: true, alpha: true })
                renderer.setSize(width, height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

                container.innerHTML = ""
                container.appendChild(renderer.domElement)

                const geometry = new SphereGeometry(1, 8, 8)
                const material = new MeshBasicMaterial({
                    color: new Color(particleColor),
                    blending: NormalBlending,
                })

                instancedMesh = new InstancedMesh(geometry, material, totalParticles)
                scene.add(instancedMesh)

                const getPointerPos = (clientX, clientY) => {
                    const rect = container.getBoundingClientRect()
                    return {
                        x: clientX - rect.left - width / 2,
                        y: -(clientY - rect.top - height / 2),
                    }
                }

                // Desktop Hover
                const handleMouseMove = (e) => {
                    mouseRef.current = getPointerPos(e.clientX, e.clientY)
                }

                const handleMouseLeave = () => {
                    mouseRef.current = null
                }

                // Apply explosive impulse on Tap/Click
                const applyImpulse = (pointerX, pointerY) => {
                    const radiusSq = clickRadius * clickRadius

                    for (let i = 0; i < totalParticles; i++) {
                        const basePos = basePositions[i]
                        const disp = displacements[i]
                        const vel = velocities[i]

                        const dx = basePos.x + disp.x - pointerX
                        const dy = basePos.y + disp.y - pointerY
                        const distSq = dx * dx + dy * dy

                        if (distSq < radiusSq) {
                            const dist = Math.sqrt(distSq) || 1
                            const force = (clickRadius - dist) / clickRadius
                            const angle = Math.atan2(dy, dx)

                            vel.x += Math.cos(angle) * force * clickStrength
                            vel.y += Math.sin(angle) * force * clickStrength
                        }
                    }
                }

                const handleClick = (e) => {
                    const pos = getPointerPos(e.clientX, e.clientY)
                    applyImpulse(pos.x, pos.y)
                }

                // Mobile Tap Handler (allows native page scrolling)
                const handleTouchStart = (e) => {
                    if (e.touches.length > 0) {
                        const touch = e.touches[0]
                        const pos = getPointerPos(touch.clientX, touch.clientY)
                        applyImpulse(pos.x, pos.y)
                    }
                }

                container.addEventListener("mousemove", handleMouseMove)
                container.addEventListener("mouseleave", handleMouseLeave)
                container.addEventListener("click", handleClick)
                container.addEventListener("touchstart", handleTouchStart, { passive: true })

                const matrix = new Matrix4()
                const dummy = new Vector3()

                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate)

                    for (let i = 0; i < totalParticles; i++) {
                        const basePos = basePositions[i]
                        const disp = displacements[i]
                        const vel = velocities[i]
                        const pSize = particleSizes[i]

                        // Desktop Hover Repulsion
                        if (mouseRef.current) {
                            const dx = basePos.x + disp.x - mouseRef.current.x
                            const dy = basePos.y + disp.y - mouseRef.current.y
                            const distSq = dx * dx + dy * dy
                            const radiusSq = cursorRadius * cursorRadius

                            if (distSq < radiusSq && distSq > 0) {
                                const dist = Math.sqrt(distSq)
                                const force = (cursorRadius - dist) / cursorRadius
                                const angle = Math.atan2(dy, dx)

                                vel.x += Math.cos(angle) * force * cursorStrength * 0.1
                                vel.y += Math.sin(angle) * force * cursorStrength * 0.1
                            }
                        }

                        // Spring Return Physics
                        vel.x += -disp.x * springStiffness
                        vel.y += -disp.y * springStiffness

                        // Friction Damping
                        vel.x *= friction
                        vel.y *= friction

                        disp.x += vel.x
                        disp.y += vel.y

                        dummy.set(basePos.x + disp.x, basePos.y + disp.y, 0)
                        matrix.makeScale(pSize, pSize, pSize)
                        matrix.setPosition(dummy)

                        instancedMesh.setMatrixAt(i, matrix)
                    }

                    instancedMesh.instanceMatrix.needsUpdate = true
                    renderer.render(scene, camera)
                }

                animate()

                // Store the real cleanup so the outer useEffect can call it
                cleanupFn = () => {
                    cancelAnimationFrame(animationFrameId)
                    container.removeEventListener("mousemove", handleMouseMove)
                    container.removeEventListener("mouseleave", handleMouseLeave)
                    container.removeEventListener("click", handleClick)
                    container.removeEventListener("touchstart", handleTouchStart)
                    if (renderer.domElement && renderer.domElement.parentNode === container) {
                        container.removeChild(renderer.domElement)
                    }
                    renderer.dispose()
                }
            }
        })

        // This is the ONLY cleanup useEffect actually registers.
        // It runs on unmount, whether or not three.js/the image had
        // finished loading by then.
        return () => {
            cancelled = true
            clearTimeout(startDelay)
            if (cleanupFn) cleanupFn()
        }
    }, [
        imageSrc,
        gridDensity,
        particleScale,
        cursorRadius,
        cursorStrength,
        clickRadius,
        clickStrength,
        darknessThreshold,
        friction,
        springStiffness,
        particleColor,
        backgroundColor,
        startDelay
    ])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                ...style,
            }}
        />
    )
}

export default ImageParticleGrid
