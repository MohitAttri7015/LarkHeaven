import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import navImage1 from "../../assets/images/navbarImage/navImage-1.avif"
import navImage2 from "../../assets/images/navbarImage/navImage-2.avif"
import navImage3 from "../../assets/images/navbarImage/navImage-3.webp"
import navImage4 from "../../assets/images/navbarImage/navImage-4.avif"
import navImage5 from "../../assets/images/navbarImage/navImage-5.avif"

import NavSlider from "./NavSlide";

const navLinks = [
  { name: "HOME", path: "/", active: true },
  {
    name: "WORK",
    path: "/work",
    image: navImage1
  },
  {
    name: "SERVICES",
    path: "/services",
    image: navImage2
  },
  {
    name: "ABOUT",
    path: "/about",
    image: navImage3
  },
  {
    name: "CONTACT",
    path: "/contact",
    image: navImage4
  },
];

const FullNav = ({ isOpen, setIsOpen }) => {
  const navRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const hoverImgRef = useRef(null);
  const linksRef = useRef([]);
  const navSlide = useRef(null);

  const [activeHoverImg, setActiveHoverImg] = useState(null);

  // Handle Entrance Timeline
  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline({ delay: 0.7 });

    gsap.set(headingRef.current, { y: 80, opacity: 0 });
    gsap.set(imageRef.current, { height: 0 });
    gsap.set(linksRef.current, { y: "100%", opacity: 0 });
    gsap.set(navSlide.current, { y: "100%", opacity: 0 });

    gsap.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(
      imageRef.current,
      {
        height: "160px",
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

    gsap.to(
      navSlide.current,
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

    tl.to(
      linksRef.current,
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Handle Link Hover Enter & Leave
  const handleMouseEnter = (index) => {
    if (!navLinks[index].image) return;

    setActiveHoverImg(navLinks[index].image);

    // Slide Up Animation
    gsap.to(hoverImgRef.current, {
      height: "100%",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    // Slide Down Animation
    gsap.to(hoverImgRef.current, {
      height: "0%",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={navRef}
      className={`fixed md:px-8! px-6! py-6! flex flex-col justify-between  inset-0 z-49 transition-opacity duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="sm:hidden block"></div>

      <div className="h-fit sm:h-full w-full flex flex-row items-center justify-between bg-red text-white ">
        <div className="w-fit">
          <h1 ref={headingRef} className="md:text-7xl sm:text-5xl text-3xl font-light leading-[1.2]">
            DIGITAL
            <br />
            EXPERIENCES
            <br />
            THAT MATTER
          </h1>
        </div>

        {/* CENTER — Image Container */}
        <div className="hidden md:flex w-[20%] items-center justify-center">
          <div ref={imageRef} className="w-full h-40 overflow-hidden relative">
            {/* Base Image */}
            <img
              src={navImage5}
              alt=""
              className="h-full w-full object-cover"
            />

            {/* Hover Reveal Image */}
            <div
              ref={hoverImgRef}
              className="absolute bottom-0 left-0 w-full h-0 overflow-hidden"
            >
              <img
                src={activeHoverImg || null}
                alt=""
                loading="lazy"
                className="absolute bottom-0 left-0 h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex md:w-[20%] flex-col sm:gap-4 gap-2">
          {navLinks.map((link, index) => (
            <div className="w-fit overflow-hidden" key={link.name}>
              <Link
                ref={(el) => (linksRef.current[index] = el)}
                onClick={() => setIsOpen(false)}
                to={link.path}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`group relative inline-block pb-1! md:text-3xl sm:text-2xl text-xl transition-all duration-500 ease-out hover:text-white font-light leading-none ${link.active ? "text-white" : "text-white/45"
                  }`}
              >
                {link.name}
                <span className="absolute bottom-0 right-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:left-0" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden block w-full h-40" ref={navSlide}>
        <NavSlider />
      </div>
    </div>
  );
};

export default FullNav;