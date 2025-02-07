import React from "react";
import Link from "next/link";
import { MessageCircle, Instagram, Youtube, Newspaper } from "lucide-react";

const Footer = () => {
  const navigationLinks = {
    Home: {
      Features: "/features",
      Templets: "/templets",
      "Art station": "/art-station",
      "Plans & Pricing": "/pricing",
    },
    Features: {
      "Text to Image": "/text-to-image",
      "Text to Video (soon)": "#",
      "Sketch to Image (soon)": "#",
      "Real Time Genration (soon)": "#",
    },
    Company: {
      Blog: "/blog",
      FAQ: "/faq",
      Support: "/support",
      "About us": "/about",
    },
  };

  const legalLinks = [
    { name: "Terms of use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
    { name: "Legal Notice", href: "/legal" },
    { name: "DMCA", href: "/dmca" },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      href: "#",
      hoverColor: "hover:text-blue-500",
      borderHoverColor: "hover:border-blue-500",
      glowColor: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    },
    {
      icon: Instagram,
      href: "#",
      hoverColor: "hover:text-pink-500",
      borderHoverColor: "hover:border-pink-500",
      glowColor: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    },
    {
      icon: Youtube,
      href: "#",
      hoverColor: "hover:text-red-600",
      borderHoverColor: "hover:border-red-600",
      glowColor: "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
    },
    {
      icon: Newspaper,
      href: "#",
      hoverColor: "hover:text-green-500",
      borderHoverColor: "hover:border-green-500",
      glowColor: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    },
  ];

  return (
    <footer className="bg-[#050505] text-gray-300 py-8 px-36">
      <div className=" max-w-7xl mx-auto  ">
        <div className="flex gap-32 mb-16  ">
          {/* Logo and Description */}
          <div className="space-y-4 -ml-20  ">
            <div className="flex flex-col items-start space-y-2 -mb-3">
              {/* Logo */}
              <div className="ml-4 w-10 h-10 bg-gray-500 rounded-full"></div>

              {/* Text */}
              <h1 className=" text-6xl font-bold ">
                <span className="bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent">
                  WildMind
                </span>
              </h1>
            </div>
            <p className="text-xl mt-0">
              Wild Child Studios uses advanced AI to turn <br/> imagination into
              high-quality, creative visuals.
            </p>
            <div className="flex gap-4 space-x-4 " >

              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}

                  
                  className={`w-12 h-12  rounded-full flex items-center justify-center  border-2 border-[#545454] bg-[#1E1E1E] transition-all duration-300 ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                >
                  <social.icon className="w-6 h-6 " />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links]) => (
            <div key={category} className="-mb-10 mr-10">
              <h2 className="  mt-7 font-semibold text-white text-l mb-6">
                {category}
              </h2>
              <ul className="space-y-2 ">
                {Object.entries(links).map(([name, href]) => (
                  <li key={name} className="pb-3">
                    <Link
                      href={href}
                      className=" text-[#616161] hover:text-white text-l transition-colors "
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="-mt-10 -ml-20 -mr-20 border-t border-[#FFFFFF52] pt-8">
          <div className="flex   items-center">
            <p className="text-l text-[#616161]  mb-4 md:mb-0 pr-5">
              Copyright © 2025 WildMind Pvt ltd . All rights reserved.
            </p>
            <div className="  flex  flex-wrap gap-10 justify-center pl-[25rem]">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-l text-[#616161] hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
