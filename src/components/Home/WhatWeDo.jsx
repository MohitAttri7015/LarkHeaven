import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

const services = [
    {
        id: 1,
        title: 'Web Development',
        description: 'We build modern, responsive websites and powerful web applications that help businesses establish a strong digital presence, simplify operations, and turn ideas into scalable digital products.',
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/service-img-1.jpg',
    },
    {
        id: 2,
        title: 'Mobile Applications',
        description: 'We design and develop mobile experiences that are fast, intuitive, and built around the needs of your users., gives on a day-to-day basis.',
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/service-img-2.jpg',
    },
    {
        id: 3,
        title: 'Custom Software',
        description: 'Description: We build software tailored to your business, from internal tools and automation systems to complete digital platforms.',
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/service-img-3.jpg',
    },
    {
        id: 4,
        title: 'UI/UX & Product Design',
        description: 'Description: We design intuitive interfaces and user experiences that make digital products clear,engaging, and easy to use.',
        image: 'https://ik.imagekit.io/hvgxiwqfcy/Byte%20Forge/service-img-4.jpg',
    }
];

const WhatWeDo = () => {

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showDrag, setShowDrag] = useState(false);
    const sliderRef = useRef(null);

    const handleMouseMove = (e) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();

            setTimeout(() => {
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }, 30);
        }
    };


    return (
        <>
            <div className="w-full md:py-25! py-15! bg-black text-white md:px-8! px-4! overflow-x-hidden flex flex-col gap-18">
                <div className="w-full flex justify-between md:flex-row flex-col md:gap-0 gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white font-light sm:text-6xl text-5xl">Quality Service</h1>
                        <h1 className="text-[#999] font-light sm:text-5xl text-4xl tracking-tighter">You Can Get</h1>
                    </div>

                    <p className="text-[#999] md:w-[40%] w-full sm:text-lg text-sm">
                        We provide a wide range of digital solutions. From websites and apps to custom software, we build experiences tailored to your needs.
                    </p>
                </div>

                <div
                    ref={sliderRef}
                    className="relative max-w-7xl mx-auto custom-slider"
                    onMouseEnter={() => setShowDrag(true)}
                    onMouseLeave={() => setShowDrag(false)}
                    onMouseMove={handleMouseMove}
                >
                    {/* Custom Drag Cursor Follower */}
                    <div
                        className={`pointer-events-none absolute z-30 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/50 md:flex hidden items-center justify-center transition-opacity duration-800 ease-out transform -translate-x-1/2 -translate-y-1/2 ${showDrag ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}
                        style={{
                            left: `${cursorPos.x}px`,
                            top: `${cursorPos.y}px`,
                            transitionProperty: 'opacity, transform',
                        }}
                    >
                        <span className=" flex text-[10px] font-semibold tracking-wider text-slate-700  items-center gap-1">
                            ‹ DRAG ›
                        </span>
                    </div>

                    {/* Swiper Component */}
                    <Swiper
                        modules={[FreeMode]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        freeMode={{
                            enabled: true,
                            sticky: false,
                            momentumBoost: 1.2,
                        }}
                        grabCursor={false}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            1024: { slidesPerView: 3.4 },
                            1280: { slidesPerView: 3.8 },
                        }}
                        className="overflow-visible!"
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div className="glow group relative h-112.5 rounded-3xl bg-[#191919] px-4! py-6! overflow-hidden transition-all duration-500 ease-out flex flex-col justify-between shadow-sm hover:shadow-xl">

                                    
                                    <svg className="glow-container md:block hidden">
                                        <rect pathLength="100" strokeLinecap="round" className="glow-blur"></rect>
                                        <rect pathLength="100" strokeLinecap="round" className="glow-line"></rect>
                                    </svg>
                                    
                                    {/* Background Image (Reveals smoothly on hover) */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-100 scale-100 md:opacity-0 md:scale-105 md:group-hover:opacity-100 md:group-hover:scale-100 transition-all duration-700 ease-out"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />

                                

                                    {/* Card Top: Title Badge */}
                                    <div className="relative z-10 self-start">
                                        <span className="inline-block bg-white/90 backdrop-blur-sm px-5! py-2.5! rounded-2xl text-[14px] font-medium text-black shadow-sm border border-slate-100">
                                            {service.title}
                                        </span>
                                    </div>

                                    {/* Card Bottom: Description & Arrow Button */}
                                    <div className="relative z-10 flex flex-col gap-4">
                                        {/* Description (Shifts downwards slightly on hover) */}
                                        <p className="text-sm font-light leading-relaxed text-white">
                                            {service.description}
                                        </p>

                                        {/* Circle Arrow Button */}
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:bg-black group-hover:text-white">
                                            <svg
                                                className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300 transform group-hover:rotate-45"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M7 17L17 7M17 7H7M17 7V17"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default WhatWeDo;