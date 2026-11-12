import { useEffect, useRef } from "react";
import gsap from "gsap";

function LoadingScreen({ onComplete }) {
    const loaderRef = useRef(null);
    const circleRef = useRef(null);
    const progressRef = useRef(null);
    const percentageRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const circle = circleRef.current;
        const percentage = percentageRef.current;
        const glow = glowRef.current;
        const progress = progressRef.current;

        // Main loading timeline
        const tl = gsap.timeline();

        // Initial state of circle
        gsap.set(circle, {
            scale: 0.2,
            opacity: 0,
            transformOrigin: "center center",
        });

        // Initial state of percentage
        gsap.set(percentage, {
            textContent: 0,
        });

        // Initial position of rotating arcs
        gsap.set([glow, progress], {
            transformOrigin: "50% 50%",
            rotation: -90,
        });

        // ------------------------------------------------
        // 1. Circle appears
        // ------------------------------------------------

        tl.to(circle, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
        });

        // ------------------------------------------------
        // 2. Percentage 0 → 100
        // ------------------------------------------------

        tl.to(
            percentage,
            {
                duration: 1.2,
                textContent: 100,
                snap: {
                    textContent: 1,
                },
                ease: "none",

                onUpdate: () => {
                    percentage.textContent = `${Math.round(
                        Number(percentage.textContent)
                    )}%`;
                },
            },
            "<"
        );

        // ------------------------------------------------
        // 3. Small pause after 100%
        // ------------------------------------------------

        tl.to({}, {
            duration: 0.2,
        });

        // ------------------------------------------------
        // 4. Fade loader out
        // ------------------------------------------------

        tl.to(loaderRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",

            onComplete: () => {
                onComplete();
            },
        });

        // ------------------------------------------------
        // Rotating glowing arc
        // This runs independently from the main timeline
        // ------------------------------------------------

        const arcAnimation = gsap.to(
            [glow, progress],
            {
                rotation: 270,
                duration: 2.5,
                repeat: -1,
                ease: "none",
            }
        );

        // Cleanup
        return () => {
            tl.kill();
            arcAnimation.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
            <div
                ref={circleRef}
                className="relative flex h-[300px] w-[300px] items-center justify-center pointer-events-none "
            >
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 320 320"
                >
                    {/* Faint base circle */}
                    <circle
                        cx="160"
                        cy="160"
                        r="150"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                    />

                    {/* Rotating glow group */}
                    <g
                        ref={glowRef}
                        style={{
                            transformOrigin: "160px 160px",
                        }}
                    >
                        {/* Large soft glow */}
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            fill="none"
                            stroke="white"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="35 907"
                            opacity="0.12"
                            filter="blur(8px)"
                        />

                        {/* Medium glow */}
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="55 887"
                            opacity="0.25"
                            filter="blur(4px)"
                        />
                    </g>

                    {/* Sharp rotating arc */}
                    <g
                        ref={progressRef}
                        style={{
                            transformOrigin: "160px 160px",
                        }}
                    >
                        {/* Fading tail */}
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="25 917"
                            opacity="0.2"
                        />

                        {/* Main bright arc */}
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="88 887"
                            opacity="0.9"
                        />

                        {/* Brightest point */}
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="18 924"
                            opacity="1"
                        />
                    </g>
                </svg>

                <img
                    src="/MainLogo.png"
                    alt="LarkHeaven"
                    className="relative z-10 w-40 object-contain"
                />

                <div className="absolute bottom-[45px] left-1/2 flex -translate-x-1/2 flex-col items-center">
                    <div
                        ref={percentageRef}
                        className="text-[12px] tracking-wide text-white/50"
                    >
                        0%
                    </div>

                    <div className="mt-1 text-[10px] tracking-[0.2em] text-white/50">
                        LOADING
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;