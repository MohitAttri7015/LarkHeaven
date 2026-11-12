import { useEffect, useState } from "react";
import navImage1 from "../../assets/images/navbarImage/navImage-1.avif"
import navImage2 from "../../assets/images/navbarImage/navImage-2.avif"
import navImage3 from "../../assets/images/navbarImage/navImage-3.webp"
import navImage4 from "../../assets/images/navbarImage/navImage-4.avif"
import navImage5 from "../../assets/images/navbarImage/navImage-5.avif"

const images = [
    navImage1,
    navImage2,
    navImage3,
    navImage4,
    navImage5
];

const NavSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
            {images.map((image, index) => (
                <img
                    key={image}
                    src={image}
                    loading="lazy"
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}
        </div>
    );
};

export default NavSlider;