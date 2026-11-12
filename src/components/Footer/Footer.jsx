import { lazy, Suspense } from "react";
const LiquidGrid = lazy(() => import("./LiquidGrid"));

const Footer = () => {
    return (
        <div className="w-full relative bg-black flex flex-col justify-between gap-40 overflow-hidden text-white md:px-8! px-4! md:pt-25! pt-15! pb-5!">

            <div className="absolute inset-0 z-0">
                <Suspense fallback={null}>
                    <LiquidGrid
                        mode="dots"
                        background="#000000"
                        lineColor="#FFFFFF4D"
                        glowColor="#FFFFFF"
                        cellSize={16}
                        lineWidth={1}
                        radius={58}
                        intensity={45}
                        collide={true}
                        clickRipple={true}
                    />
                </Suspense>
            </div>

            <div className="w-full h-full flex flex-col md:gap-20 gap-10 relative z-1">
                <div className="flex flex-col gap-2">
                    <h5 className="text-[#999] uppercase md:tracking-wide md:text-sm text-[11px] ">For enquiries, collaboration requests or job opportunities, don’t hesitate to reach out!</h5>
                    <h2 className="lg:text-9xl md:text-7xl text-5xl font-light tracking-tighter">GET IN TOUCH</h2>
                </div>

                <div className="flex flex-col md:gap-10 gap-5">
                    <span className="w-full h-px bg-[#999999a0]"></span>
                    <div className="w-full flex lg:flex-row flex-col lg:gap-0 gap-3 lg:items-center lg:justify-between">
                        <a href="mailto:attrimohit6846@gmail.com" className="cursor-pointer md:text-4xl text-2xl font-light">attrimohit6846@gmail.com</a>
                        <a href="tel:+917015846134" className="cursor-pointer md:text-4xl text-2xl font-light text-[#999]">+91 7015846134</a>
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-4 relative z-1">
                <span className="w-full h-px bg-[#99999961]"></span>
                <div className="w-full flex lg:flex-row flex-col lg:items-center lg:justify-between lg:Lgap-0 gap-3">
                    <h5 className="font-light text-sm text-[#999] uppercase">©2026 Heaven</h5>
                    <div className="flex flex-row gap-4">
                        <a href="https://github.com/MohitAttri7015" className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">Github</a>
                        <a href="https://www.linkedin.com/in/mohit-attri-a33731441/?isSelfProfile=true" className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">LinkedIn</a>
                        <a href="https://www.instagram.com/larkheavenx/" className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">Instagram</a>
                    </div>
                    <h5 className="lg:block hidden font-light text-sm text-[#999] uppercase">Designed & Developed by Heaven</h5>
                </div>
            </div>

        </div>
    )
}

export default Footer