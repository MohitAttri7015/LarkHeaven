import { useEffect, useState } from "react";

const DUMMY_DATA = [
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image3.jpg',
        tagline: '[RESPONSIVE]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image2.jpg',
        tagline: '[INTERACTIVE]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image4.jpg',
        tagline: '[DYNAMIC]',
    },
    {
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/image1.jpg',
        tagline: '[FLUID]',
    },
];

const HomeSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % DUMMY_DATA.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center">
            {/* Image Container */}
            <div className="relative sm:h-40 h-30 w-full overflow-hidden ">
                {DUMMY_DATA.map((item, index) => (
                    <img
                        key={item.image}
                        src={`${item.image}?tr=w-800,q-70`}
                        alt={item.tagline}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            <div className="relative mt-4 h-6 w-full">
                {DUMMY_DATA.map((item, index) => (
                    <span
                        key={item.tagline}
                        className={`absolute inset-x-0 text-[14px] tracking-wider transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {item.tagline}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default HomeSlide;