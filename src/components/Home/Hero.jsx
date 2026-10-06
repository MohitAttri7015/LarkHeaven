import { useState, useRef, useEffect } from 'react';
import TextReveal from '../TextReveal.jsx'
import InteractiveCursorCard from './InteractiveCursorCard.jsx'
import HomeSlide from './HomeSlide.jsx'

const DUMMY_DATA = [
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image3.jpg',
        title: 'CREATIVE DEVELOPER',
        tagline: '[RESPONSIVE]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image2.jpg',
        title: 'UI/UX DESIGNER',
        tagline: '[INTERACTIVE]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image4.jpg',
        title: 'FULLSTACK ARCHITECT',
        tagline: '[DYNAMIC]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image1.jpg',
        title: 'MOTION EXPERT',
        tagline: '[FLUID]',
    },
];


const Hero = () => {
    const sectionRef = useRef(null);
    const lastUpdateRef = useRef(0);
    const followerRef = useRef(null);
    const horizLineRef = useRef(null);
    const vertLineRef = useRef(null);

    const [time, setTime] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if screen width is under 1000px
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        // Set initial value on load
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;

        // Calculate mouse position relative to section container
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (followerRef.current) {
            followerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) `;
        }
        if (horizLineRef.current) {
            horizLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        if (vertLineRef.current) {
            vertLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
        }

        // Cycle content at most once every 1000ms (1 second) while moving mouse
        const now = Date.now();
        if (now - lastUpdateRef.current >= 300) {
            setCurrentIndex((prev) => (prev + 1) % DUMMY_DATA.length);
            lastUpdateRef.current = now;
        }
    };

    useEffect(() => {
        const updateTime = () => {
            setTime(
                new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Kolkata",
                })
            );
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={sectionRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className={`w-full h-screen md:px-8! px-4! relative ${isMobile ? 'flex flex-col-reverse justify-center':''}`}>
            

            <div className="h-screen flex items-end justify-center relative pb-20!">
                <div className="w-full flex flex-col relative z-2">
                    <div className="overflow-hidden">

                        <TextReveal className="lg:text-[7vw] md:text-7xl text-5xl font-light tracking-tighter md:leading-30">
                            WE BUILD DIGITAL
                        </TextReveal>
                    </div>

                    <div className="flex lg:flex-row lg:justify-between flex-col-reverse lg:gap-0 gap-4">
                        <div className="flex lg:items-end lg:pb-5! justify-between lg:w-[25%] w-full flex-col gap-1 lg:flex-row">
                            <h6 className="md:text-sm text-[12px] font-normal">LARK HEAVEN</h6>

                            <h6 className="md:text-sm text-[12px] font-normal">CURRENT TIME: {time} IST</h6>
                        </div>

                        <div className="overflow-hidden">

                            <TextReveal className="xl:text-[6.5vw] lg:text-[6vw] md:text-7xl text-5xl font-light tracking-tighter">
                                EXPERIENCES THAT MATTER
                            </TextReveal>
                        </div>
                    </div>
                </div>
            </div>



            {!isMobile ? (
                <InteractiveCursorCard
                    isHovered={isHovered}
                    followerRef={followerRef}
                    horizLineRef={horizLineRef}
                    vertLineRef={vertLineRef}
                    data={DUMMY_DATA[currentIndex]}

                />
            ) : (
                <HomeSlide />
            )}

            {isMobile && <div className="w-full h-70"></div>}

        </div>
    );
};

export default Hero;