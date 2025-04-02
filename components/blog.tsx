"use client"

import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Globe, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function Blog() {
  // State for search and featured articles
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  // State for category sections
  const [imageCreationScroll, setImageCreationScroll] = useState(0)
  const [videoAnimationsScroll, setVideoAnimationsScroll] = useState(0)
  const [soundDesigningScroll, setSoundDesigningScroll] = useState(0)
  const [productBrandingScroll, setProductBrandingScroll] = useState(0)

  // Featured articles data
  const featuredArticles = [
    {
      id: 1,
      title: "15 Seconds of Film Generation –  AI Powered Short Video Creation",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "The future of filmmaking is here with AI-powered film generation. Imagine creating a 15-second cinematic scene within minutes using AI-driven tools. From text-to-video models to AI-assisted editing, studios can now generate short films with dynamic characters, realistic environments, and seamless transitions. Tools like RunwayML, Pika Labs, and Google's Lumiere are pushing the boundaries of AI-driven storytelling, enabling filmmakers to bring their visions to life with minimal effort. The next era of filmmaking is all about speed, automation, and limitless creativity.",
      image: "/blog/blog1.png",
    },
    {
      id: 2,
      title: "AI Powered Comic Generation – A New Era of Digital Storytelling",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "AI is revolutionizing the comic industry by enabling artists to generate unique illustrations, dialogue, and storylines effortlessly. With AI-powered comic generators like MidJourney, Stable Diffusion, and Leonardo AI, creators can design characters, backgrounds, and even entire graphic novels in a fraction of the time. Whether you're a solo artist or a studio looking to speed up production, AI-assisted storytelling offers endless possibilities. Explore how AI is transforming the comic industry and how you can use it to create your next masterpiece.",
      image: "/blog/blog2.png",
    },
    {
      id: 3,
      title: "AI in Character Building – Crafting Unique Personalities with AI",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "Character design has never been easier with AI-driven tools. From video games to animated films, AI can generate detailed character models, personalities, and backstories based on simple prompts. Whether you need a 3D avatar, a lifelike animated character, or a concept for a new protagonist, AI-powered tools like MetaHuman Creator, Artbreeder, and DeepMotion provide endless creative opportunities. Learn how AI is redefining character creation and giving artists new ways to experiment with design, storytelling, and personality development.",
      image: "/blog/blog3.png",
    },
    {
      id: 4,
      title: "AI-Powered Visual Effects – Transforming Post-Production Workflows",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "Post-production workflows are being revolutionized by AI technologies that can automate tedious tasks and enhance creative possibilities. From automatic rotoscoping and color grading to scene extensions and digital doubles, AI tools are enabling VFX artists to achieve high-quality results in a fraction of the time. Discover how studios are implementing AI solutions to streamline their pipelines and deliver stunning visual effects for films, TV shows, and commercials.",
      image: "/blog/blog4.png",
    },
  ]

  // Category sections data
  const categorySections = [
    {
      id: "image-creation",
      title: "Image Creation",
      scrollPosition: imageCreationScroll,
      setScrollPosition: setImageCreationScroll,
      articles: [
        {
          title: "The Art of AI: How AI-Generated Images are Changing Digital Creativity",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "Stable Diffusion vs. MidJourney: Which AI Image Tool is Best for You?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "From Text to Masterpiece: The Best AI Prompt Strategies for Stunning Images",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "AI Image Generators: A Comprehensive Comparison for 2025",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "Creating Photorealistic Portraits with AI: Tips and Techniques",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
      ],
    },
    {
      id: "video-animations",
      title: "Video & Animations",
      scrollPosition: videoAnimationsScroll,
      setScrollPosition: setVideoAnimationsScroll,
      articles: [
        {
          title: "How AI is Revolutionizing Video Production in 2025",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "AI-Generated Animations: The Future of Motion Graphics",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "From Text to Short Film: How AI Can Create a 15-Second Video in Minutes",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "Character Animation with AI: Creating Lifelike Digital Actors",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "AI Video Editing Tools: Automating Post-Production Workflows",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/400x200/gray/white",
        },
      ],
    },
    {
      id: "sound-designing",
      title: "Sound Designing",
      scrollPosition: soundDesigningScroll,
      setScrollPosition: setSoundDesigningScroll,
      articles: [
        {
          title: "From Concept to Reality: AI's Role in 3D Asset Creation",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "AI and Virtual Environments: How Studios Are Using AI for Film and Game Worlds",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Best AI Tools for 3D Artists: A Complete Guide",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "AI-Generated Product Designs: Revolutionizing Brand Identity",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "Creating Brand Consistency with AI: Tools and Techniques",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
      ],
    },
    {
      id: "product-branding",
      title: "Product Branding",
      scrollPosition: productBrandingScroll,
      setScrollPosition: setProductBrandingScroll,
      articles: [
        {
          title: "From Concept to Reality: AI's Role in 3D Asset Creation",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "AI and Virtual Environments: How Studios Are Using AI for Film and Game Worlds",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Best AI Tools for 3D Artists: A Complete Guide",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "AI-Generated Product Designs: Revolutionizing Brand Identity",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "Creating Brand Consistency with AI: Tools and Techniques",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
        {
          title: "The Future of AI in Image Generation: What's Next?",
          image: "https://placehold.co/320x200/gray/white",
        },
      ],
    },
  ]

  // Auto-rotate featured articles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredArticles.length - 1 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredArticles.length])

  // Navigation functions for featured articles
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredArticles.length - 1 ? prev : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1))
  }

  // Generic scroll functions for category sections
  const scrollRight = (currentPosition: number, setPosition: (value: number) => void, maxLength: number) => {
    setPosition(Math.min(currentPosition + 1, maxLength - 3))
  }

  const scrollLeft = (currentPosition: number, setPosition: (value: number) => void) => {
    setPosition(Math.max(currentPosition - 1, 0))
  }

  const gridPatternStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white font-poppins">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#353535] border-b border-gray-800 py-3 px-4 md:px-8 flex items-center justify-between">
        <div className="w-full max-w-md relative">
          <div className="relative w-full flex items-start">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="1.2rem" />
            <input
              type="text"
              placeholder="Search all articles..."
              className="w-full py-2 pl-10 rounded-md bg-[#F1F3F4] text-black border border-gray-700 focus:outline-none focus:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-md transition-colors mx-4">
          Search
        </button>
        <div className="flex items-center">
          <div className="border border-gray-700 rounded-md py-2 px-4 flex items-center bg-transparent hover:bg-gray-800 transition-colors cursor-pointer">
            <Globe className="mr-2 text-gray-400" size={16} />
            <span className="mr-1">English</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-20 pt-10 px-8 font-poppins">
        {/* Featured Articles Section */}
        <div
          className="relative w-full h-[600px] mb-60"
          style={{
            backgroundImage: `url('/Blog/background.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 opacity-20 font-poppins" style={gridPatternStyle}></div>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden mx-auto my-auto border border-gray-800 max-h-[100%]">
              <div className="p-6 pt-8">
                <h2 className="text-2xl font-bold mb-4">Featured articles</h2>
                <div className="relative">
                  <div className="overflow-hidden rounded-lg relative">
                    <div
                      className="transition-transform duration-500 ease-in-out font-poppins"
                      style={{ transform: `translateX(-${currentSlide * 100}%)`, display: "flex" }}
                    >
                      {featuredArticles.map((article, index) => (
                        <div key={article.id} className="min-w-full">
                          <div className="bg-black rounded-lg overflow-hidden">
                            <div className="relative">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="w-full aspect-video object-contain rounded-lg px-4"
                                width={640}
                                height={320}
                                priority={index === 0}
                                quality={90}
                              />
                            </div>
                            <div className="px-4 -mt-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-blue-400 uppercase text-sm font-semibold">{article.author}</span>
                                <span className="text-blue-400 uppercase text-sm font-semibold">
                                  {article.authorTag}
                                </span>
                              </div>
                              <h3 className="text-lg md:text-3xl font-bold mb-2 font-poppins">{article.title}</h3>
                              <p className="text-gray-300 text-sm font-poppins">{article.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {currentSlide > 0 && (
                  <button
                    onClick={prevSlide}
                    className="absolute left-8 top-[50%] transform -translate-y-1/2 bg-white rounded-full p-4 text-black z-10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size="2rem" />
                  </button>
                )}
                {currentSlide < featuredArticles.length - 1 && (
                  <button
                    onClick={nextSlide}
                    className="absolute right-8 top-[50%] transform -translate-y-1/2 bg-white rounded-full p-4 text-black z-10"
                    aria-label="Next slide"
                  >
                    <ChevronRight size="2rem" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {featuredArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-gray-600"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {categorySections.map((section) => (
          <div key={section.id} className="max-w-[1600px] min-w-[1200px] mb-20 px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row items-start gap-10">
              <div className="flex flex-col items-start mb-4 w-full md:w-64 flex-shrink-0">
                <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
                <button className="flex items-center justify-center bg-[#FFFFFF] hover:bg-[#DADCE0] text-[#1A73E8] hover:text-[#1474F1] py-2 px-6 rounded-md transition-colors">
                  <span className="mr-2">See posts</span>
                  <ChevronRight size="1rem" />
                </button>
              </div>

              <div className="relative w-full ">
                <div className="overflow-hidden font-poppins">
                  <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${section.scrollPosition * 320}px)` }}
                  >
                    {section.articles.map((article, index) => (
                      <div key={index} className="w-[300px] flex-shrink-0 font-poppins">
                        <h3 className="text-lg font-semibold h-[4.5rem] line-clamp-3 overflow-hidden font-poppins mb-2">
                          {article.title}
                        </h3>
                        <Image
                          src={article.image || "/placeholder.svg?height=200&width=300"}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="h-[200px] w-[300px] object-cover rounded-lg bg-gray-700"
                          quality={85}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {section.scrollPosition > 0 && (
                  <button
                    onClick={() => scrollLeft(section.scrollPosition, section.setScrollPosition)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10 shadow-lg"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size="1.5rem" />
                  </button>
                )}

                {section.articles.length > 3 && section.scrollPosition < section.articles.length - 3 && (
                  <button
                    onClick={() =>
                      scrollRight(section.scrollPosition, section.setScrollPosition, section.articles.length)
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10 shadow-lg"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size="1.5rem" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Follow Section - Similar modifications applied */}
        <div className="max-w-5xl mx-auto py-20 px-4 md:px-10 rounded-lg mb-20">
          <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-16">Follow txt</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Social Media Sections */}
            {[
              {
                name: "YouTube",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-auto text-red-600" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
                description:
                  "Subscribe to join a community of creative developers and learn the latest in Google technology.",
              },
              {
                name: "Instagram",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-auto text-pink-500" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
                description: "Follow and discover developer resources, community events, and inspirational stories.",
              },
              {
                name: "LinkedIn",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-10 h-auto text-blue-600" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                description: "Join a community of creative developers and learn how to use the latest in technology.",
              },
            ].map((social) => (
              <div key={social.name} className="bg-black py-8 px-6 rounded-lg shadow-sm border border-[#DADCE0]">
                <div className="flex justify-start mb-6">{social.icon}</div>
                <p className="text-white text-start font-extralight">{social.description}</p>
                <div className="flex justify-start mt-8">
                  <button className="border bg-white rounded-md py-2 px-8 text-[#1A73E8] hover:border-[#1A73E8]">
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Email Subscription */}
          <div className="mt-10">
            <div className="bg-black p-8 rounded-lg shadow-sm max-w-md mx-auto border border-[#DADCE0]">
              <div className="flex justify-start mb-6">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-auto text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <p className="text-white text-start mb-10">
                Subscribe to Google for Developers news. Your information will be used in accordance with Google's
                privacy policy.
              </p>
              <div className="flex justify-start">
                <button className="border bg-white rounded-md py-2 px-8 text-[#1A73E8] hover:border-[#1A73E8]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  )
}

