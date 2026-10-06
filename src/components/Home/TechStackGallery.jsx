import { useEffect, useState } from "react";


const TechStackGallery = ({ images, interval = 2000, delay = 0, }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
 

    useEffect(() => {
        if (!images?.length) return;

        let intervalTimer;

        const delayTimer = setTimeout(() => {
            intervalTimer = setInterval(() => {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % images.length
                );
            }, interval);
        }, delay);

        return () => {
            clearTimeout(delayTimer);
            clearInterval(intervalTimer);
        };
    }, [images, interval, delay]);
    

    if (!images?.length) return null;

    return (
        <div className=" relative inline-flex align-middle md:h-15 h-8 sm:rounded-4xl rounded-2xl md:w-25 w-14 mx-2! overflow-hidden">
            {images.map((image, index) => (
                <img
                    key={image}
                    src={`${image}?tr=w-240,q-70`}
                    alt=""
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover ${index === currentIndex
                            ? "block"
                            : "hidden"
                        }`}
                />
            ))}
        </div>
    );
};

export default TechStackGallery;