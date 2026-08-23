// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from 'react-router-dom';
// import { ArrowRight } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// const projects = [
//     {
//         title: "Project One",
//         description: "A modern digital experience built for the future.",
//         image: "https://i.pinimg.com/736x/54/45/b2/5445b2a52e9b281ff53c6b479ce36f63.jpg",
//     },
//     {
//         title: "Project Two",
//         description: "A powerful web platform designed around its users.",
//         image: "https://i.pinimg.com/1200x/5b/04/7e/5b047e6f9afafbe23e133b362c853503.jpg",
//     },
//     {
//         title: "Project Three",
//         description: "A scalable digital product built to make an impact.",
//         image: "https://i.pinimg.com/736x/92/f5/52/92f5527a99b89066428fbcd0be1e6366.jpg",
//     },
// ];

// const Intro = ({ className = "" }) => {
//     return (
//         <div
//             className={`intro-panel md:w-[42vw] w-full shrink-0 flex  flex-col items-center justify-center  ${className}`}
//         >
//             <h2 className="text-6xl leading-[0.9] tracking-[-0.06em] font-light">
//                 Selected work
//                 <br />
//                 & explorations
//             </h2>

//             <div className="mt-8! w-fit">
//                 <Link className="group flex items-center gap-8 pb-1! text-sm relative">
//                     VIEW ALL PROJECTS

//                     <ArrowRight
//                         size={16}
//                         strokeWidth={1.5}
//                     />
//                     <span className="absolute bottom-0 left-0 h-px w-full bg-black transition-all duration-500 ease-out group-hover:w-0" />
//                 </Link>
//             </div>
//         </div>
//     );
// };

// const ProjectCard = ({ project, index }) => {
//     return (
//         <article className="project-card h-full flex items-center w-full md:w-[40vw] border-l border-[#ddd] shrink-0 px-10!">
//             <div className="project-inner">
//                 <div className="relative aspect-[1.45] w-full  rounded-[6px]">
//                     <img
//                         src={project.image}
//                         alt={project.title}
//                         className="h-full w-full object-cover"
//                     />

//                     <div className="absolute inset-6 border border-white/30 pointer-events-none" />

//                     <div className="absolute left-8 top-8 text-white">
//                         <span className="text-xs">
//                             0{index + 1}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="mt-5! flex items-end justify-between gap-8">
//                     <div>
//                         <h3 className="text-3xl tracking-tight">
//                             {project.title}
//                         </h3>

//                         <p className="mt-2! max-w-md text-sm text-neutral-500">
//                             {project.description}
//                         </p>
//                     </div>

//                     <Link className="group w-fit flex  items-center gap-4  pb-1! text-sm relative">
//                         EXPLORE PROJECT
//                         <ArrowRight
//                             size={16}
//                             strokeWidth={1.5}
//                         />
//                         <span className="absolute bottom-0 left-0 h-px w-full bg-black transition-all duration-500 ease-out group-hover:w-0" />
//                     </Link>
//                 </div>
//             </div>
//         </article>
//     );
// };

// const SelectedWork = () => {
//     const sectionRef = useRef(null);
//     const trackRef = useRef(null);

//     useLayoutEffect(() => {
//         const section = sectionRef.current;
//         const track = trackRef.current;

//         if (!section || !track) return;

//         const ctx = gsap.context(() => {
//             const cards = gsap.utils.toArray(".project-card");

//             const getDistance = () => {
//                 return track.scrollWidth - window.innerWidth;
//             };

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: section,
//                     start: "top top",
//                     end: () => `+=${getDistance()}`,
//                     scrub: 1,
//                     pin: true,
//                     anticipatePin: 1,
//                     invalidateOnRefresh: true,
//                 },
//             });

//             /*
//              * Horizontal movement
//              */
//             tl.to(track, {
//                 x: () => -getDistance(),
//                 ease: "none",
//                 duration: 1,
//             });

//             /*
//              * Project cards rise from bottom.
//              */
//             cards.forEach((card) => {
//                 const inner = card.querySelector(".project-inner");

//                 gsap.fromTo(
//                     inner,
//                     {
//                         y: 200,
//                         x: 100,
//                         opacity: 0,
//                     },
//                     {
//                         y: 0,
//                         x:0,
//                         opacity: 1,
//                         ease: "power2.out",
//                         scrollTrigger: {
//                             trigger: card,
//                             containerAnimation: tl,
//                             start: "left 90%",
//                             end: "left 45%",
//                             scrub: true,
//                         },
//                     }
//                 );
//             });
//         }, sectionRef);

//         return () => ctx.revert();
//     }, []);

//     return (
//         <section
//             ref={sectionRef}
//             className="relative h-screen w-full  overflow-hidden! px-6!"
//         >
//             <div
//                 ref={trackRef}
//                 className="flex h-full items-center will-change-transform "
//             >
//                 <Intro />

//                 {projects.map((project, index) => (
//                     <ProjectCard
//                         key={index}
//                         project={project}
//                         index={index}
//                     />
//                 ))}

//                 <Intro />
//             </div>
//         </section>
//     );
// };

// export default SelectedWork;



import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Project One",
        description: "A modern digital experience built for the future.",
        image: "https://i.pinimg.com/736x/54/45/b2/5445b2a52e9b281ff53c6b479ce36f63.jpg",
    },
    {
        title: "Project Two",
        description: "A powerful web platform designed around its users.",
        image: "https://i.pinimg.com/1200x/5b/04/7e/5b047e6f9afafbe23e133b362c853503.jpg",
    },
    {
        title: "Project Three",
        description: "A scalable digital product built to make an impact.",
        image: "https://i.pinimg.com/736x/92/f5/52/92f5527a99b89066428fbcd0be1e6366.jpg",
    },
];

const Intro = ({ className = "" }) => {
    return (
        <div
            className={`
                intro-panel
                w-screen md:w-[42vw]
                h-full
                shrink-0
                flex flex-col
                items-center
                justify-center
                px-6 md:px-10
                ${className}
            `}
        >
            <h2 className="text-5xl md:text-6xl leading-[0.9] tracking-[-0.06em] font-light">
                Selected work
                <br />
                & explorations
            </h2>

            <div className="mt-8! w-fit">
                <Link className="group flex items-center gap-8 pb-1! text-sm relative">
                    VIEW ALL PROJECTS

                    <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                    />

                    <span className="absolute bottom-0 left-0 h-px w-full bg-black transition-all duration-500 ease-out group-hover:w-0" />
                </Link>
            </div>
        </div>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <article
            className="
                project-card
                h-full
                flex items-center
                w-screen md:w-[40vw]
                border-l border-[#ddd]
                shrink-0
                px-6! md:px-10!
            "
        >
            <div className="project-inner w-full">
                <div className="relative md:aspect-[1.45] aspect-[0.8] w-full rounded-[6px] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-6 border border-white/30 pointer-events-none" />

                    <div className="absolute left-8 top-8 text-white">
                        <span className="text-xs">
                            0{index + 1}
                        </span>
                    </div>
                </div>

                <div className="mt-5! flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                    <div>
                        <h3 className="text-2xl md:text-3xl tracking-tight">
                            {project.title}
                        </h3>

                        <p className="mt-2! max-w-md text-sm text-neutral-500">
                            {project.description}
                        </p>
                    </div>

                    <Link className="group w-fit flex items-center gap-4 pb-1! text-sm relative">
                        EXPLORE PROJECT

                        <ArrowRight
                            size={16}
                            strokeWidth={1.5}
                        />

                        <span className="absolute bottom-0 left-0 h-px w-full bg-black transition-all duration-500 ease-out group-hover:w-0" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

const SelectedWork = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".project-card");

            const getDistance = () => {
                return Math.max(0, track.scrollWidth - window.innerWidth);
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getDistance()}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Horizontal movement
            tl.to(track, {
                x: () => -getDistance(),
                ease: "none",
                duration: 1,
            });

            // Project entrance animation
            cards.forEach((card) => {
                const inner = card.querySelector(".project-inner");

                gsap.fromTo(
                    inner,
                    {
                        y: 200,
                        x: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        x: 0,
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: tl,
                            start: "left 90%",
                            end: "left 45%",
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden!"
        >
            <div
                ref={trackRef}
                className="flex h-full w-max items-center will-change-transform"
            >
                {/* INTRO */}
                <Intro />

                {/* PROJECTS */}
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        index={index}
                    />
                ))}

                {/* FINAL INTRO */}
                <Intro />
            </div>
        </section>
    );
};

export default SelectedWork;