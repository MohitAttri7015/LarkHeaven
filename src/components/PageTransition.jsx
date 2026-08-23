import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
    const panelsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Only true when WE started a navigation
    const isTransitioning = useRef(false);

    const addPanel = (el) => {
        if (el && !panelsRef.current.includes(el)) {
            panelsRef.current.push(el);
        }
    };

    const startTransition = (path) => {
        if (path === location.pathname) return;

        const panels = panelsRef.current;

        // Tell the reveal animation that this navigation
        // was triggered by our transition
        isTransitioning.current = true;

        gsap.killTweensOf(panels);

        gsap.timeline()
            .set(panels, {
                scaleX: 0,
                transformOrigin: "left center",
            })
            .to(panels, {
                scaleX: 1,
                duration: 1,
                ease: "power4.inOut",
                stagger: 0.05,
                onComplete: () => {
                    navigate(path);
                },
            });
    };

    // Intercept internal links
    useEffect(() => {
        const handleClick = (event) => {
            const link = event.target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                link.target === "_blank" ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            event.preventDefault();

            startTransition(href);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [location.pathname]);

    // Reveal new page
    useLayoutEffect(() => {
        // If this pathname change was NOT caused by our
        // transition, do absolutely nothing.
        if (!isTransitioning.current) {
            return;
        }

        isTransitioning.current = false;

        const panels = panelsRef.current;

        gsap.killTweensOf(panels);

        gsap.timeline()
            .set(panels, {
                scaleX: 1,
                transformOrigin: "right center",
            })
            .to(panels, {
                scaleX: 0,
                duration: 1,
                ease: "power4.inOut",
                stagger: 0.05,
            });
    }, [location.pathname]);

    return (
        <>
            <div className="fixed inset-0 z-[9999] pointer-events-none flex">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((panel) => (
                    <div
                        key={panel}
                        ref={addPanel}
                        className="h-full flex-1 bg-black scale-x-0"
                    />
                ))}
            </div>

            {children}
        </>
    );
};

export default PageTransition;