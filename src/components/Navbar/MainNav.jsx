import { useState } from "react";
import blackLogo from "../../assets/images/black-logo.png";
import whiteLogo from "../../assets/images/white-logo.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import FullNav from "./FullNav";


const MainNav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  }



  return (
    <>
    <div className="flex w-full items-center justify-between md:px-8! md:py-6! px-4! py-4! fixed top-0 left-0 z-50">
      <Link to="/">
        <div className="w-17 cursor-pointer">
          {!isOpen ? (
            <img
              src={blackLogo}
              alt="Logo"
                className="h-full w-full object-cover mix-blend-difference"
            />
          ) : (
              <img
                src={whiteLogo}
                alt="Logo"
                className="h-full w-full object-cover relative z-1"
              />
          )}
        </div>
      </Link>
      
        <div className="flex items-center justify-center relative">
        {!isOpen ? (
          <Menu
            onClick={handleMenuClick}
            className="relative z-1 cursor-pointer"
            size={28}
            color="black"
          />
        ) : (
          <X
            onClick={handleMenuClick}
            className="cursor-pointer z-1"
            size={28}
            color="white"
          />
        )}
        </div>

    </div>
    
      <div className={`fixed transition-all  rounded-full duration-1000 ease-in-out bg-black z-10 ${isOpen ? "-top-50 xl:-right-100 md:-right-50 sm:-right-40 -right-35 w-[150%] h-[150%]" : " top-5 right-5 w-0 h-0 "}`} >
        <FullNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default MainNav;