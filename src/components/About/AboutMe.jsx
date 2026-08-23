import MyImage from './MyImage';

const AboutMe = () => {
    const profileImage =
        "/MyImage.jpeg";

    return (
        <section className="md:px-8! px-4! py-16! md:py-24! flex items-center justify-center min-h-[400px]">
            <div className="w-full max-w-6xl mx-auto! flex flex-col md:flex-row items-center  justify-between md:items-start gap-10 md:gap-16">

                {/* Profile Image Container with ASCII Reveal */}
                <div className="flex-shrink-0 w-full h-80 p-4! md:p-0!  md:w-100 md:h-100 md:rounded-full  overflow-hidden relative">
                    <MyImage
                        image={{ src: profileImage }}
                        dots={11}
                        gap={4}
                        radius={80}
                        intensity={10}
                        dotColor="#000000"
                        background="transparent"
                    />
                </div>

                {/* Content Container */}
                <div className="flex flex-col justify-center text-left max-w-xl">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium tracking-tight leading-[0.95] mb-8!">
                        Building Digital <br />
                        Craft
                    </h1>

                    <div className="space-y-4! text-base sm:text-lg text-[#111111] font-normal leading-snug">
                        <p>
                            I design and develop digital experiences with a focus on
                            technology, creativity, and meaningful user experiences
                            — turning ideas into modern websites, applications, and
                            digital products.
                        </p>
                        <p>
                            I work at the intersection of design and technology, bringing ideas from concept to code. From
                            websites and web applications to mobile apps and custom software, I focus on building digital
                            solutions that are purposeful, reliable, and built to make an impact.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default AboutMe;