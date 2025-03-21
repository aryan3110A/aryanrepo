"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import Hamburger from "./Hamburger"

// Define types for dropdown items
interface DropdownItem {
  title: string
  coming: boolean
}

export default function Navbar(): JSX.Element {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [animating, setAnimating] = useState<boolean>(false)
  const headerRef = useRef<HTMLElement>(null)

  const toggleDropdown = (dropdown: string): void => {
    // If clicking the same dropdown, close it
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      // If clicking a different dropdown, switch to new dropdown
      setActiveDropdown(dropdown)
    }
  }

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the header
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    // Add click event listener to document
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (activeDropdown) {
      setAnimating(true)
      const timer = setTimeout(() => {
        setAnimating(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [activeDropdown])

  const featuresDropdownItems: DropdownItem[] = [
    {
      title: "Text to image",
      coming: false,
    },
    {
      title: "Text to 3D",
      coming: true,
    },
    {
      title: "Text to Video",
      coming: true,
    },
    {
      title: "Sketch to Image",
      coming: true,
    },
    {
      title: "Real Time Genration",
      coming: true,
    },
  ]

  const templatesDropdownItems: DropdownItem[] = [
    {
      title: "Image Generation",
      coming: false,
    },
    {
      title: "Video Generation",
      coming: true,
    },
  ]

  // Common background style object for header and dropdown
  const backgroundStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
  }

  return (
    <div className=" bg-[#000000] text-white">
      {/* Top Navigation */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-3xl  shadow-lg"
        style={backgroundStyle}
      >
        <div className="flex items-center justify-start pl-[2vw] py-[1vh]">
          <div className=" flex items-center gap-4">
            <button
              onClick={() => setIsNavOpen(true)}
              className="p-2  rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-8 h-8" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <span className="text-xl font-bold">Logo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex lg:flex items-center justify-center gap-[4vw] text-nowrap font-poppins md:pl-[20vw] lg:pl-[25vw] py-0">
            <div className="relative ">
              <button
                onClick={() => toggleDropdown("features")}
                className="flex items-center text-white transition-colors hover:text-[#dbdbdb] group"
              >
                <span className="">Features</span>
                <ChevronDown
                  className={`ml-1 w-6 h-6 transition-transform group-hover:text-[#dbdbdb] ${
                    activeDropdown === "features" ? "rotate-180 text-[#dbdbdb]" : "text-[white]"
                  } group-hover:text-[#dbdbdb]`}
                />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("templates")}
                className="flex items-center text-white transition-colors hover:text-[#dbdbdb] group"
              >
                <span className="">Templates</span>
                <ChevronDown
                  className={`ml-1 w-6 h-6 transition-transform group-hover:text-[#dbdbdb]${
                    activeDropdown === "templates" ? "rotate-180 text-[#dbdbdb]" : "text-[white]"
                  } group-hover:text-[#dbdbdb]`}
                />{" "}
              </button>
            </div>

            <nav>
              <Link
                href="/subscription-toggle"
                className="text-white hover:text-[#dbdbdb]"
                onClick={() => setActiveDropdown(null)}
              >
                Pricing
              </Link>
            </nav>
            <Link
              href="/art-station"
              className="text-white hover:text-[#dbdbdb]"
              onClick={() => setActiveDropdown(null)}
            >
              Art station
            </Link>
            <Link href="/support" className="text-white hover:text-[#dbdbdb]" onClick={() => setActiveDropdown(null)}>
              Support
            </Link>
          </nav>
          <button className="fixed p-2 rounded-lg transition-colors right-[2vw]">
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Full-width dropdown menus */}
        {activeDropdown && (
          <div
            className={` left-0 right-0  overflow-hidden transition-all duration-1000 z-10  ${animating ? "" : ""}`}
            style={{
              ...backgroundStyle,
              maxHeight: activeDropdown ? "50vh" : "0",
              opacity: animating ? 0 : 1,
              animation: animating ? "dropdownFade 500ms ease-in-out forwards" : "",
            }}
          >
            <div className="container   py-2">
              <h3 className="text-lg font-bold mb-[2vh] md:pl-[31.8%] lg:pl-[30%]">CREATE</h3>
              <div className="flex flex-col space-y-[1.5vh] md:pl-[31.8%] lg:pl-[30%]">
                {activeDropdown === "features" &&
                  featuresDropdownItems.map((item, index) => (
                    <Link
                      href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      key={index}
                      className="block px-0 py-0 rounded-md transition-all duration-300 hover:text-[#dbdbdb]"
                    >
                      <span className="">
                        {item.title} {item.coming && "(coming soon)"}
                      </span>
                    </Link>
                  ))}
                {activeDropdown === "templates" &&
                  templatesDropdownItems.map((item, index) => (
                    <Link
                      href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      key={index}
                      className="block px-0 py-0 rounded-md transition-all duration-300 hover:text-[#dbdbdb]"
                    >
                      <span className="">
                        {item.title} {item.coming && "(coming soon)"}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sliding Navbar */}
      <Hamburger isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-1vh);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

