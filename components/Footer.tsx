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
    <footer className="bg-[#050505] text-gray-300 py-8 w-full">
      <div className="max-w-full px-4 md:px-8 lg:px-16">
        <div className="flex sm:gap-[7.5rem] md:gap-[10.5rem] lg:gap-[15rem] mb-0">
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
              Wild Child Studios uses advanced AI to turn <br /> imagination into high-quality, creative visuals.
            </p>
            <div className="flex gap-6 ">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 border-[#545454] bg-[#1E1E1E] transition-all duration-300 ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(navigationLinks).map(([category, links]) => (
            <div key={category} className="mt-2 mb-4 mr-10 lg:mr-16">
              <h2 className="font-semibold text-white text-lg lg:text-xl mb-4">{category}</h2>
              <ul className="space-y-2">
                {Object.entries(links).map(([name, href]) => (
                  <li key={name} className="pb-2 mb-4">
                    <Link href={href} className="text-[#616161] hover:text-white transition-colors">
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
            <div className="flex flex-wrap sm:gap-4 md:gap-10 lg:gap-[4rem] justify-center md:ml-[35%] lg:ml-[37%]">
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
