import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const TextReveal = ({ children, className = "" }) => {
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const split = SplitText.create(textRef.current, {
            type: "words",
        });

        gsap.from(split.words, {
            yPercent: 100,
            delay: 1,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
        });

        return () => {
            split.revert();
        };
    }, []);

    return (
        <div ref={textRef} className={className}>
            {children}
        </div>
    );
};

export default TextReveal;