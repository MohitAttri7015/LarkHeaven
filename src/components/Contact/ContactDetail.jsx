

import NavSlider from "../Navbar/NavSlide";


const ContactDetail = () => {
  const contactGroups = [
    {
      label: "general inquiries",
      lines: ["attrimohit6846@gmail.com", "+91 7015846134"],
    },
    {
      label: "careers",
      lines: ["attrimohit6846@gmail.com"],
    },
    {
      label: "collaborations",
      lines: ["attrimohit6846@gmail.com", "+91 7015846134"],
    },
    {
      label: "address",
      lines: ["Khatkar, Haryana 131028,", "India"]
    },
  ];

  const socialLinks = ["Dribble", "Instagram", "Behance"];

  return (
    <section className="w-full sm:h-screen min-h-screen bg-black pt-15! pb-5! md:px-8! px-4! md:pt-20! md:pb-14! relative">
      {/* main content */}
      <div className="flex w-full h-full md:justify-between md:flex-row flex-col gap-30">
        {/* left: heading */}
        <div className="flex md:flex-col  md:justify-between ">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              Contact us
            </h1>
            <p className="md:mt-4! max-w-xs text-sm md:text-base text-neutral-500 ">
              Get in touch with us for any enquiries and questions
            </p>
          </div>

          {/* footer: social links */}
          <div className="flex items-center gap-6 text-sm  text-white md:relative absolute bottom-2 left-5">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-neutral-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

        </div>
        {/* right: contact grid + image */}
        <div className="h-full flex flex-col md:gap-0 gap-10 md:justify-between md:w-[50%]">
          <div className="grid grid-cols-2 justify-between  gap-y-8! sm:gap-x-12! text-white">
            {contactGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-wide text-neutral-400">
                  {group.label}
                </p>
                <div className="mt-2! space-y-0.5">
                  {group.lines.map((line) => (
                    <p
                      key={line}
                      className="text-[10px] mobile:text-sm sm:text-base  text-white"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8! sm:mb-0! mb-10!  w-full h-70 sm:aspect-video overflow-hidden ">
            {/* <img
              src="https://i.pinimg.com/1200x/87/ad/9c/87ad9cf97ca44398ea830d1996eef884.jpg"
              alt="Studio interior"
              className="h-full w-full object-cover"
            /> */}
            <NavSlider />
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default ContactDetail;
