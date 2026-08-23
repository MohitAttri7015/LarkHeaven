"use client";

import  { useRef, useEffect } from "react";

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.reveal = 0;
        this.treveal = 0;
        this.lastHit = 0;
    }

    update(mx, my, hit, radius, falloff, now) {
        if (hit) {
            this.lastHit = now;
            const dist = Math.hypot(mx - this.x, my - this.y);
            const n = Math.max(0, Math.min(1, 1 - dist / radius));
            const shaped = Math.pow(n, falloff);
            this.treveal = shaped * shaped * (3 - 2 * shaped);
        } else if (now - this.lastHit > 50) {
            this.treveal = 0;
        }

        const diff = Math.abs(this.treveal - this.reveal);
        this.reveal += (this.treveal - this.reveal) * 0.15;
        return diff > 0.001 || this.reveal > 0.001;
    }

    draw(ctx, img, dotSize, fullSize, f, color) {
        const d = dotSize + (fullSize - dotSize) * this.reveal;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, d / 2, 0, 2 * Math.PI);

        if (img && img.complete && img.naturalWidth > 0 && f) {
            ctx.clip();
            const sw = d / f.fit;
            const sx = (this.x - d / 2 - f.dx) / f.fit;
            const sy = (this.y - d / 2 - f.dy) / f.fit;
            ctx.drawImage(img, sx, sy, sw, sw, -d / 2, -d / 2, d, d);
        } else {
            ctx.fillStyle = color;
            ctx.fill();
        }
        ctx.restore();
    }
}

function imgSrc(image) {
    if (!image) return "";
    return typeof image === "string" ? image : image.src || "";
}

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";

const MyImage = ({
    background = "transparent",
    dotColor = "#000000",
    image = { src: DEFAULT_IMAGE },
    dots = 24,
    gap = 4,
    intensity = 10,
    radius = 160,
    style,
}) => {
    const hostRef = useRef(null);
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -99999, y: -99999, active: false });

    const src = imgSrc(image);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        if (!host || !canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const cols = Math.max(1, Math.floor(dots));
        const R = Math.max(1, radius);
        const I = Math.max(1, Math.min(10, intensity));
        const falloff = Math.pow(2, (0.5 - ((I - 1) * 5) / 9) / 1.5);

        let img = null;
        if (src) {
            img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
        }

        let W = 1;
        let H = 1;
        let pitch = 20;
        let dotSize = 20;
        let fullSize = 20;
        let fitInfo = null;
        let bleed = 0;
        let cells = [];
        let isAnimating = false;
        let raf = 0;

        const computeFit = () => {
            if (!img || !img.complete || !img.naturalWidth) {
                fitInfo = null;
                return;
            }
            const nW = img.naturalWidth;
            const nH = img.naturalHeight;
            const fit = Math.max(W / nW, H / nH);
            fitInfo = {
                fit,
                dx: (W - nW * fit) / 2,
                dy: (H - nH * fit) / 2,
            };
        };

        const build = (mw, mh) => {
            const r = host.getBoundingClientRect();
            W = Math.max(1, Math.floor(mw ?? r.width));
            H = Math.max(1, Math.floor(mh ?? r.height));

            pitch = W / cols;
            dotSize = Math.max(1, pitch - Math.max(0, gap));
            fullSize = pitch * Math.SQRT2;
            const rowN = Math.max(1, Math.ceil(H / pitch));

            bleed = Math.ceil(fullSize / 2 + 4);

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const cw = W + bleed * 2;
            const ch = H + bleed * 2;
            canvas.width = Math.floor(cw * dpr);
            canvas.height = Math.floor(ch * dpr);
            canvas.style.width = cw + "px";
            canvas.style.height = ch + "px";
            canvas.style.left = -bleed + "px";
            canvas.style.top = -bleed + "px";
            ctx.setTransform(dpr, 0, 0, dpr, bleed * dpr, bleed * dpr);

            const gridH = rowN * pitch;
            const oy = (H - gridH) / 2 + pitch / 2;

            cells = [];
            for (let c = 0; c < cols; c++) {
                for (let rIdx = 0; rIdx < rowN; rIdx++) {
                    cells.push(new Cell(c * pitch + pitch / 2, oy + rIdx * pitch));
                }
            }
            computeFit();
            startLoop();
        };

        const drawFrame = (now) => {
            const m = mouseRef.current;
            ctx.clearRect(-bleed, -bleed, W + bleed * 2, H + bleed * 2);
            let needsNextFrame = false;

            for (let i = 0; i < cells.length; i++) {
                const active = cells[i].update(m.x, m.y, m.active, R, falloff, now);
                if (active) needsNextFrame = true;
                cells[i].draw(ctx, img, dotSize, fullSize, fitInfo, dotColor);
            }

            return needsNextFrame;
        };

        const loop = (now) => {
            const active = drawFrame(now);
            if (active || mouseRef.current.active) {
                raf = requestAnimationFrame(loop);
            } else {
                isAnimating = false;
            }
        };

        const startLoop = () => {
            if (!isAnimating) {
                isAnimating = true;
                raf = requestAnimationFrame(loop);
            }
        };

        build();

        const ro =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver((entries) => {
                    const cr = entries[0]?.contentRect;
                    build(cr?.width, cr?.height);
                })
                : null;
        ro?.observe(host);

        if (img && !img.complete) {
            img.onload = () => {
                computeFit();
                startLoop();
            };
        }

        const setMouse = (clientX, clientY) => {
            const r = host.getBoundingClientRect();
            mouseRef.current.x = clientX - r.left;
            mouseRef.current.y = clientY - r.top;
            mouseRef.current.active = true;
            startLoop();
        };

        const onMove = (e) => setMouse(e.clientX, e.clientY);
        const onLeave = () => {
            mouseRef.current.active = false;
            mouseRef.current.x = -99999;
            mouseRef.current.y = -99999;
            startLoop();
        };

        host.addEventListener("mousemove", onMove);
        host.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(raf);
            ro?.disconnect();
            host.removeEventListener("mousemove", onMove);
            host.removeEventListener("mouseleave", onLeave);
        };
    }, [src, dots, gap, intensity, radius, dotColor]);

    return (
        <div
            ref={hostRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "visible",
                background,
                ...(style || {}),
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}

export default MyImage