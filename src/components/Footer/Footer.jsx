import LiquidGrid from "./LiquidGrid";
const Footer = () => {
    return (
        <div className="w-full relative bg-black flex flex-col justify-between gap-40 overflow-hidden text-white md:px-8! px-4! md:pt-25! pt-15! pb-5!">

            <div className="absolute inset-0 z-0">
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
            </div>

            <div className="w-full h-full flex flex-col md:gap-20 gap-10 relative z-1">
                <div className="flex flex-col gap-2">
                    <h5 className="text-[#999] uppercase md:tracking-wide md:text-sm text-[11px] ">For enquiries, collaboration requests or job opportunities, don’t hesitate to reach out!</h5>
                    <h1 className="lg:text-9xl md:text-7xl text-5xl font-light tracking-tighter">GET IN TOUCH</h1>
                </div>

                <div className="flex flex-col md:gap-10 gap-5">
                    <span className="w-full h-px bg-[#999999a0]"></span>
                    <div className="w-full flex lg:flex-row flex-col lg:gap-0 gap-3 lg:items-center lg:justify-between">
                        <h2 className="cursor-pointer md:text-4xl text-2xl font-light">attrimohit6846@gmail.com</h2>
                        <h2 className="cursor-pointer md:text-4xl text-2xl font-light text-[#999]">+91 7015846134</h2>
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-4 relative z-1">
                <span className="w-full h-px bg-[#99999961]"></span>
                <div className="w-full flex lg:flex-row flex-col lg:items-center lg:justify-between lg:Lgap-0 gap-3">
                    <h5 className="font-light text-sm text-[#999] uppercase">©2026 Forge</h5>
                    <div className="flex flex-row gap-4">
                        <h5 className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">Github</h5>
                        <h5 className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">LinkedIn</h5>
                        <h5 className="uppercase cursor-pointer text-sm text-[#aaa] hover:text-white">Instagram</h5>
                    </div>
                    <h5 className="lg:block hidden font-light text-sm text-[#999] uppercase">Designed & Developed by Forge</h5>
                </div>
            </div>

        </div>
    )
}

export default Footer