import Link from "next/link";
import { MessageCircle, Instagram, Youtube, Newspaper } from "lucide-react";
import {
  IconBrandBlogger,
  IconBrandGithub,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
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
      "Real Time Generation (soon)": "#",
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
      title: "GitHub",
      icon: IconBrandGithub,
      href: "#",
      hoverColor: "hover:text-blue-500",
      borderHoverColor: "hover:border-blue-500",
      glowColor: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    },
    {
      title: "Instagram",
      icon: IconBrandInstagram,
      href: "#",
      hoverColor: "hover:text-pink-800",
      borderHoverColor: "hover:border-pink-800",
      glowColor: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    },
    {
      title: "Youtube",
      icon: IconBrandYoutube,
      href: "#",
      hoverColor: "hover:text-red-700",
      borderHoverColor: "hover:border-red-700",
      glowColor: "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
    },
    {
      title: "Blog",
      icon: IconBrandBlogger,
      href: "#",
      hoverColor: "hover:text-green-500",
      borderHoverColor: "hover:border-green-500",
      glowColor: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    },
  ];

  return (
    <footer className="bg-[#050505] text-gray-300 py-8 w-full">
      <div className="max-w-full px-4 md:px-24 lg:px-16">
        <div className="flex sm:gap-[7.5rem] md:gap-[8rem] lg:gap-[15rem] mb-0">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex flex-col items-start space-y-2 -mb-2">
              {/* Logo */}
              <div className="w-10 h-10 bg-gray-500 rounded-full"></div>

              {/* Text */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent">
                  WildMind
                </span>
              </h1>
            </div>
            <p className="sm:text-sm md:text-[1.120rem] lg:text-[1.2rem] lg:leading-6 ">
              Wild Child Studios uses advanced AI to turn <br /> imagination
              into high-quality, creative visuals.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <div key={index} className="relative group">
                  {/* Social Icon */}
                  <Link
                    href={social.href}
                    className={`w-10 h-10 md:w-12 md:h-12 md:mt-2 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 border-[#545454] bg-[#1E1E1E] 
        transition-transform duration-200 ease-in-out transform-gpu will-change-transform hover:scale-125 hover:-translate-y-2 
        ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                  >
                    <social.icon className="w-5 h-5 md:w-7 md:h-7 lg:w-6 lg:h-6 transition-transform duration-100 ease-in-out hover:scale-110" />
                  </Link>

                  {/* Social Title */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-[#1E1E1E] text-white text-xs md:text-xs lg:text-sm px-2 py-1 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {social.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links]) => (
            <div key={category} className="mt-4 mb-4 mr-10 lg:mr-16">
              <h2 className="font-semibold text-white md:text-lg lg:text-xl mb-4">
                {category}
              </h2>
              <ul className="space-y-2">
                {Object.entries(links).map(([name, href]) => (
                  <li key={name} className="pb-2 mb-2">
                    <Link
                      href={href}
                      className="text-[#616161]  md:text-[0.9rem] hover:text-white transition-colors"
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
        <div className="border-t border-[#FFFFFF52] pt-8">
          <div className="flex flex-col md:flex-row justify-start items-center">
            <p className="text-sm md:text-[0.875rem] lg:text-[1rem] text-[#616161] mb-4 md:mb-0">
              Copyright © 2025 WildMind Pvt ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap sm:gap-4 md:gap-[2.4rem] lg:gap-[4rem] justify-center md:ml-[31.4%] lg:ml-[36%]">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm md:text-[0.875rem] lg:text-[1rem] text-[#616161] hover:text-white transition-colors"
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
