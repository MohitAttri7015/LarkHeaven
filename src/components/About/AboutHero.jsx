import ImageParticleGrid from "../ImageParticleGrid";
import TextType from './TextType';
import { Link } from "react-router-dom";

const AboutHero = () => {
    return (
        <div className="w-full min-h-screen md:px-8! px-4!">
            <div className="min-h-screen w-full flex lg:justify-between items-center relative lg:flex-row flex-col pt-40! lg:pt-0!">

                {/* Left Content Area */}
                <div className="w-full lg:h-screen lg:w-[55%] flex flex-col  lg:justify-end pb-6! lg:pb-10!">
                    <h5
                        className="
                            relative mb-2! w-fit inline-block px-3! py-2! text-[10px] sm:text-[11px] tracking-widest uppercase select-none 
                            before:absolute before:top-0 before:left-0 before:right-0 before:h-2 
                            before:border-t-2 before:border-l-2 before:border-r-2 before:border-black
                            after:absolute after:bottom-0 after:left-0 after:right-0 after:h-2 
                            after:border-b-2 after:border-l-2 after:border-r-2 after:border-black
                        "
                    >
                        FULL-STACK ARCHITECT
                    </h5>

                    <div className="flex flex-col">
                        <h1 className="uppercase text-4xl sm:text-6xl md:text-7xl font-bold">Code</h1>
                        <h1 className="uppercase text-4xl sm:text-6xl md:text-7xl font-bold">that drives</h1>

                        <div className="relative mb-4!">
                            {/* Invisible sizer: reserves exact space for the longest word so nothing shifts */}
                            <span
                                aria-hidden="true"
                                className="invisible uppercase text-4xl tracking-tighter sm:text-6xl md:text-7xl font-bold inline-block"
                            >
                                PERFORMANCE_
                            </span>

                            <TextType
                                text={["EXPERIENCE", "PERFORMANCE"]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                deletingSpeed={50}
                                showCursor
                                cursorCharacter="_"
                                cursorBlinkDuration={0.5}
                                className="absolute inset-0 uppercase text-4xl tracking-tighter sm:text-6xl md:text-7xl font-bold bg-linear-to-b from-[#0055ff] from-30% to-[#f3f3f3] bg-clip-text text-transparent inline-block"
                                cursorClassName="text-black inline-block ml-1"
                            />
                        </div>

                        <p className="w-full md:w-[90%] text-sm sm:text-base md:text-lg leading-relaxed mb-8! md:mb-10!">
                            From interactive front-end layouts to robust back-end systems, I design and construct pixel-perfect web and mobile applications. Every line of code is optimized for performance, responsiveness, and unforgettable user engagement.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <Link to='' className="bg-black text-white px-4! py-3! text-[14px] rounded-xl border-2 border-[#444444ac] transition-all duration-300 hover:bg-[#f3f3f3] hover:text-black text-center">
                                VIEW WORK
                            </Link>
                            <Link to='' className="bg-[#f3f3f3] text-black px-4! py-3! text-[14px] rounded-xl border-2 border-[#444444ac] transition-all duration-300 hover:bg-black hover:text-white text-center">
                                EXPLORE PROCESS
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Particle Grid Section */}
                <div className="w-full lg:w-[40%] h-[450px] lg:h-full relative overflow-hidden">
                    <ImageParticleGrid
                        imageSrc="/asci.png"
                        gridDensity={4}
                        cursorRadius={150}
                        cursorStrength={20}
                    />

                    {/* Bottom Fade Overlay */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 lg:h-40 bg-linear-to-t from-[#f3f3f3] via-[#f3f3f3]/80 to-transparent" />
                </div>

            </div>
        </div>
    )
}

export default AboutHero;