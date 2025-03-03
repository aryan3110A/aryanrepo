"use client"

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
    backgroundImage: "url('/header.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className="min-h-screen bg-[#37436D] text-white">
      {/* Top Navigation */}
      <header 
        className="fixed top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-lg"
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
          <nav className="hidden md:flex items-center gap-40 ml-[10%] text-nowrap font-poppins">
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

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors mr-[20%]">
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Full-width dropdown menus */}
        {activeDropdown && (
          <div 
            className={`absolute left-0 right-0 bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-lg overflow-hidden transition-all duration-300 z-10 ${animating ? 'animate-dropdown' : ''}`}
            style={{
              ...backgroundStyle,
              maxHeight: activeDropdown ? '400px' : '0',
              opacity: animating ? 0 : 1,
              animation: animating ? 'dropdownFade 300ms ease-in-out forwards' : '',
            }}
          >
            <div className="container mx-auto px-8 py-6">
              <h3 className="text-lg font-bold mb-4 ml-[14.5%]">CREATE</h3>
              <div className="flex flex-col space-y-4 ml-[14.5%]">
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

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden rounded-2xl mt-14 w-[80vw] ml-[10vw] bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl font-bold mb-4">
              Introducing <span className="text-blue-400">3D</span>
            </h1>
          </div>
        </section>

        {/* Featured Apps Section */}
        <section className="px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Apps</h2>
            <Link href="/tools" className="text-sm text-blue-400 hover:underline">
              View all tools
            </Link>
          </div>
          <p className="text-gray-400 mb-8">Create and explore image, video and audio AI powered tools</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* App Cards */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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