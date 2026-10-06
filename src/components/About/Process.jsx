import processReveal from "../../assets/images/process-reveal.jpg";


const PROCESS_DATA = [
  {
    id: '01',
    title: 'Discover',
    description:
      'Before writing code or designing pixels, we conduct deep-dive strategic research into your business objectives, audience behavior, and market competition. We analyze existing pain points and identify unique opportunities to position your web presence effectively. This phase lays a rock-solid foundation, ensuring every layout choice and feature serves a clear conversion goal.',

  },
  {
    id: '02',
    title: 'Design',
    description:
      'We transform strategic insights into sleek, modern visual systems tailored to capture attention and communicate value immediately. Focusing heavily on modern UI/UX design principles, interactive wireframes, and responsive design systems, we craft every screen to feel intuitive across all devices while keeping your brand identity front and center.',

  },
  {
    id: '03',
    title: 'Develop',
    description:
      'Turning visual concepts into robust, production-ready web applications using clean, scalable code. We prioritize lightning-fast load times, flawless responsiveness, clean component architecture, and seamless integrations. Every single line of code is written to ensure high performance, security, and long-term maintainability for easy future scaling.',

  },
  {
    id: '04',
    title: 'Refine',
    description:
      'Great websites are built through thorough refinement and continuous optimization. We run extensive cross-browser testing, accessibility checks, speed optimizations, and SEO audits to polish every detail. Once everything runs smoothly under stress, we execute a seamless deployment so your site launches in peak condition.',

  },
];


const PROCESS_DATA2 = [
  {
    id: '01',
    title: 'Call',
    description:
      'Before writing code or designing pixels, we conduct deep-dive strategic research into your business objectives, audience behavior, and market competition. We analyze existing pain points and identify unique opportunities to position your web presence effectively. This phase lays a rock-solid foundation, ensuring every layout choice and feature serves a clear conversion goal.',

  },
  {
    id: '02',
    title: 'Design',
    description:
      'We transform strategic insights into sleek, modern visual systems tailored to capture attention and communicate value immediately. Focusing heavily on modern UI/UX design principles, interactive wireframes, and responsive design systems, we craft every screen to feel intuitive across all devices while keeping your brand identity front and center.',

  },
  {
    id: '03',
    title: 'Develop',
    description:
      'Turning visual concepts into robust, production-ready web applications using clean, scalable code. We prioritize lightning-fast load times, flawless responsiveness, clean component architecture, and seamless integrations. Every single line of code is written to ensure high performance, security, and long-term maintainability for easy future scaling.',

  },
  {
    id: '04',
    title: 'Finish',
    description:
      'We run comprehensive cross-browser testing, accessibility checks, speed optimizations, and SEO audits to polish every detail. Once all features pass quality checks, we handle the deployment process to ensure a smooth launch, handing over a fully optimized, production-ready website.',

  },
];


const Process = () => {
  return (
    <section id="process" className="bg-black text-white w-full lg:pb-10!">
      <div className="border-t border-zinc-800">
        {PROCESS_DATA.map((item) => (
          <div
            key={item.id}
            className="group relative border-b border-zinc-800 transition-colors duration-300"
          >
            {/* Row Content */}
            <div className="py-10! sm:py-12! md:py-16! md:px-8! px-4!  flex lg:flex-row flex-col lg:gap-0 gap-4 lg:justify-between w-full relative z-1">
              {/* Title & Index */}
              <div className="md:col-span-5 flex items-baseline space-x-4!">
                <h3 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-7">
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl group-hover:text-zinc-200 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>


            <div className="z-0 absolute bottom-0 right-0 w-full h-0 group-hover:h-full transition-all duration-300 cubic-bezier(0.25, 1, 0.5, 1) overflow-hidden">
              <img
                src={processReveal}
                loading="lazy"
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-20! lg:flex hidden flex-row gap-10 md:px-8! px-4!">
        {PROCESS_DATA2.map((item) => (
          <div
            key={item.id}
            className="relative"
          >
            {/* Row Content */}
            <div className="flex flex-col gap-4 group">
              {/* Title & Index */}
              <div className="md:col-span-5 flex items-start space-x-2! relative">
                <h3 className="group-hover-text-black text-3xl relative sm:text-4xl md:text-5xl uppercase tracking-tight text-zinc-100 group-hover:text-black transition-colors duration-300 z-1">
                  {item.title}
                </h3>
                <span className="text-[13px] text-zinc-400 relative z-1 group-hover:text-black">{item.id}</span>
                <div className="w-full h-0 absolute bottom-0 left-0 z-0 group-hover:h-full bg-white transition-all duration-300 cubic-bezier(0.25, 1, 0.5, 1)"></div>                
              </div>

              {/* Description */}
              <div className="md:col-span-7">
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed  group-hover:text-zinc-200 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;