"use client"
import Image from "next/image"

import { useState, useEffect } from "react"
import { Menu, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import Navbar from "./navbar"

// Define types for dropdown items
interface DropdownItem {
  title: string;
  coming: boolean;
}

export default function Page(): JSX.Element {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [animating, setAnimating] = useState<boolean>(false)

  const toggleDropdown = (dropdown: string): void => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  useEffect(() => {
    if (activeDropdown) {
      setAnimating(true)
      const timer = setTimeout(() => {
        setAnimating(false)
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeDropdown]);

  const featuresDropdownItems: DropdownItem[] = [
    { 
      title: "Text to image", 
      coming: false 
    },
    { 
      title: "Text to 3D", 
      coming: true 
    },
    { 
      title: "Text to Video", 
      coming: true 
    },
    { 
      title: "Sketch to Image", 
      coming: true 
    },
    { 
      title: "Real Time Genration", 
      coming: true 
    }
  ]

  const templatesDropdownItems: DropdownItem[] = [
    { 
      title: "Image Generation", 
      coming: false 
    },
    { 
      title: "Video Generation", 
      coming: true 
    }
  ]

  // Common background style object for header and dropdown
  const backgroundStyle = {
    backgroundImage: "url('/eader.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className=" bg-[#000000] text-white">
      {/* Top Navigation */}
      <header 
        className="fixed top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-lg  shadow-lg"
        style={backgroundStyle}
      >
        <div className="flex items justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNavOpen(true)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <span className="text-xl font-bold">Logo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-40  text-nowrap font-poppins mr-[25%]">
            <div className="relative ">
              <button 
                onClick={() => toggleDropdown('features') } 
                className="flex items-center text-white hover:bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] hover:text-transparent bg-clip-text transition-colors "
              >
                Features 
                <ChevronDown 
                  className={`ml-[4%] w-6 h-6 transition-transform ${activeDropdown === 'features' ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('templates')} 
                className="flex items-center text-white hover:bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] hover:text-transparent bg-clip-text transition-colors"
              >
                Templates 
                <ChevronDown 
                  className={`ml-[4%] w-6 h-6 transition-transform ${activeDropdown === 'templates' ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>

            <Link href="/pricing" className="text-white hover:bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] hover:text-transparent bg-clip-text transition-colors">
              Pricing
            </Link>
            <Link href="/art-station" className="text-white hover:bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] hover:text-transparent bg-clip-text transition-colors">
              Art station
            </Link>
            <Link href="/support" className="text-white hover:bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] hover:text-transparent bg-clip-text transition-colors">
              Support
            </Link>
          </nav>

          <button className="fixed p-2 hover:bg-gray-800 rounded-lg transition-colors ml-[80vw]">
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Full-width dropdown menus */}
        {activeDropdown && (
          <div 
            className={` left-0 right-0  overflow-hidden transition-all duration-300 z-10 ${animating ? '' : ''}`}
            style={{
              ...backgroundStyle,
              maxHeight: activeDropdown ? '400px' : '0',
              opacity: animating ? 0 : 1,
              animation: animating ? 'dropdownFade 400ms ease-in-out forwards' : '',
            }}
          >
            <div className="container mx-auto px-8 py-6">
              <h3 className="text-lg font-bold mb-4 ml-[15.45%]">CREATE</h3>
              <div className="flex flex-col space-y-4 ml-[15.45%]">
                {activeDropdown === 'features' && featuresDropdownItems.map((item, index) => (
                  <Link href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="block">
                    <span className={item.coming ? 'text-gray-400' : 'text-white'}>
                      {item.title} {item.coming && '(coming soon)'}
                    </span>
                  </Link>
                ))}
                {activeDropdown === 'templates' && templatesDropdownItems.map((item, index) => (
                  <Link href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="block">
                    <span className={item.coming ? 'text-gray-400' : 'text-white'}>
                      {item.title} {item.coming && '(coming soon)'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sliding Navbar */}
      <Navbar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      
     

      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
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