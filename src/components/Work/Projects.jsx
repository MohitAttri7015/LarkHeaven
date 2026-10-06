import { useState } from "react";
import { Link } from 'react-router-dom'
import GlowingBg from './GlowingBg';

const projectsData = [
  {
    id: 1,
    title: "Italy Summer",
    count: "[1]",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Market Stories",
    count: "[2]",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Food Food",
    count: "[3]",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Porto Walk",
    count: "[4]",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Night Lights",
    count: "[5]",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 selection:bg-neutral-800 ">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <GlowingBg />
      </div>

      <div className="relative z-1 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 w-full max-w-4xl">
          {projectsData.map((project) => (
            <Link to='/' key={project.id}>
              <div
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                className="relative cursor-pointer group flex items-start justify-center"
              >
                <div className="flex items-baseline space-x-2 text-center">
                  <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-neutral-400 transition-margin transition-color duration-300 group-hover:text-black hover:mr-5! inline">
                    {project.title}
                  </span>
                  <sup className="text-xs sm:text-sm text-neutral-400 font-sans tracking-wide">
                    {project.count}
                  </sup>
                </div>

                {/* Hover Image Pop-up */}
                <div
                  className={`absolute left-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 hidden md:block w-28 h-16 lg:w-36 lg:h-20 overflow-hidden rounded shadow-xl transition-all duration-300 pointer-events-none z-10 ${activeProject === project.id
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 -translate-x-2"
                    }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;