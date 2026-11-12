import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import FlipImage from "./FlipImage";

const ServiceHero = () => {
    return (
        <>
            <div className="w-full sm:h-[100vh] h-[90vh] flex flex-col justify-between mb-5! pt-35! pb-5! px-4! md:px-8!">
                <div className="flex flex-col">
                    <div className="flex items-end gap-2">
                        <FlipImage
                            cardWidth={100}
                            cardHeight={150}
                            mode="multi"
                        />

                        <p className="md:text-6xl mobile:text-3xl text-2xl tracking-tighter lowercase">We build digital</p>
                    </div>
                    <h1 className="md:text-6xl mobile:text-3xl text-2xl lowercase">experiences that shape</h1>
                    <h1 className="md:text-6xl mobile:text-3xl text-2xl md:text-[#ccc] text-[#bbb] lowercase">what comes next.</h1>
                </div>

                <div className="w-full flex justify-between items-end">
                    <p className="sm:text-lg text-[14px] md:w-[40%] sm:leading-5 leading-3.5">LarkHeaven is for those who believe digital experiences should do more than simply exist — they should make an impact. We combine design, technology, and creativity to build bold websites, powerful applications, and digital products that turn ideas into experiences people remember.</p>

                    <span className="hidden sm:block">(Scroll)</span>
                </div>
            </div>
            <div className="w-full bg-black px-4! md:px-8! py-15! text-white flex flex-col gap-30">
                <div className="w-full flex md:justify-between md:items-end md:flex-row md:gap-0 gap-8 flex-col">
                    <div className="flex flex-col gap-4 md:w-[50%]">
                        <p className="sm:text-sm text-[11px] text-[#ccc]"><span className="w-2 h-2 mr-2! bg-[#ccc] rounded-full inline-block"></span>Build the future, bypass the routine.</p>
                        <p className="md:text-5xl sm:text-4xl text-2xl font-light">
                            From raw idea to production-ready platform, we craft digital products built to lead.
                        </p>
                    </div>
                    <Link to='/contact' className="sm:text-sm text-[12px] pb-1! relative flex gap-2 items-center w-fit">Start your project with us today <ArrowRight className="sm:w-4 sm:h-4 w-3 h-3" />
                        <span className="absolute bottom-0 right-0 h-px w-full bg-white" />
                    </Link>
                </div>

                <div className="w-full border-t border-[#aaaaaa5a] pt-8!">
                    <h2 className="font-light text-4xl sm:mb-15! mb-10!">Digital Services</h2>
                    <div className="w-full flex md:flex-row flex-col md:justify-between md:gap-0 gap-6">
                        <p className='md:w-[50%] font-light sm:text-m text-sm'>Lark Heaven delivers high-performance web and software solutions that don't just tick boxes—they elevate your product. From scalable full-stack web applications to modern, high-converting digital platforms, we bring your vision to life with precision and clean code. Our approach goes beyond basic setup, building fast, resilient architectures designed to engage users and drive growth. For brands ready to scale, we’re here to make it happen.</p>
                        <ul className='md:w-[30%] font-light md:text-sm text-[13px] flex flex-col gap-2'>
                            <li>Custom Web Development</li>
                            <li>Full-Stack Applications</li>
                            <li>UI/UX Engineering</li>
                            <li>Frontend Architecture</li>
                            <li>API & System Design</li>
                            <li>Next.js & React Solutions</li>
                            <li>Cloud & Infrastructure</li>
                            <li>Mobile App Development</li>
                        </ul>
                        <span className='font-light md:text-sm text-[12px]'>(Fast & Scalable)</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceHero;