import { ReactLenis } from "lenis/react"; 

export default function SmoothScroll({ children }) {
    // Lenis configuration options
    const lenisOptions = {
        lerp: 0.1,              // Smoothness intensity (0.1 is standard)
        duration: 1.2,          // Scroll duration
        smoothWheel: true,      // Enable mouse wheel smoothing
        wheelMultiplier: 1.0,   // Wheel speed sensitivity
        touchMultiplier: 2.0,   // Touch device sensitivity
        infinite: false,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}