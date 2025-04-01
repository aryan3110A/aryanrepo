"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function CategorySections() {
  // State for category sections
  const [imageCreationScroll, setImageCreationScroll] = useState(0)
  const [videoAnimationsScroll, setVideoAnimationsScroll] = useState(0)
  const [soundDesigningScroll, setSoundDesigningScroll] = useState(0)
  const [productBrandingScroll, setProductBrandingScroll] = useState(0)

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
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "Stable Diffusion vs. MidJourney: Which AI Image Tool is Best for You?",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "From Text to Masterpiece: The Best AI Prompt Strategies for Stunning Images",
          image: "https://placehold.co/400x200/gray/white",
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
      ],
    },
    {
      id: "sound-designing",
      title: "Sound Designing",
      scrollPosition: soundDesigningScroll,
      setScrollPosition: setSoundDesigningScroll,
      articles: [
        {
          title: "Composing with AI: Can AI Replace Music Producers?",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "The Future of AI in Film Scores: Creating Soundtracks with AI",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "Top AI Music Tools for Creators: The Best Platforms for AI-Generated Sound",
          image: "https://placehold.co/400x200/gray/white",
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
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "AI and Virtual Environments: How Studios Are Using AI for Film and Game Worlds",
          image: "https://placehold.co/400x200/gray/white",
        },
        {
          title: "The Best AI Tools for 3D Artists: A Complete Guide",
          image: "https://placehold.co/400x200/gray/white",
        },
      ],
    },
  ]

  // Generic scroll functions for category sections
  const scrollRight = (currentPosition, setPosition, maxLength) => {
    setPosition(Math.min(currentPosition + 1, maxLength - 1))
  }

  const scrollLeft = (currentPosition, setPosition) => {
    setPosition(Math.max(currentPosition - 1, 0))
  }

  return (
    <>
      {categorySections.map((section) => (
        <div key={section.id} className="w-full mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <button className="flex items-center text-blue-400 hover:text-blue-300">
              <span className="mr-2">See posts</span>
              <ChevronRight size="1rem" />
            </button>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${section.scrollPosition * 33.33}%)` }}
              >
                {section.articles.map((article, index) => (
                  <div key={index} className="min-w-1/3 px-2">
                    <div className="bg-gray-800 rounded-lg overflow-hidden h-full">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">{article.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {section.scrollPosition > 0 && (
              <button
                onClick={() => scrollLeft(section.scrollPosition, section.setScrollPosition)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10"
                aria-label="Scroll left"
              >
                <ChevronRight className="rotate-180" size="1.5rem" />
              </button>
            )}

            {section.scrollPosition < section.articles.length - 3 && (
              <button
                onClick={() =>
                  scrollRight(section.scrollPosition, section.setScrollPosition, section.articles.length)
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10"
                aria-label="Scroll right"
              >
                <ChevronRight size="1.5rem" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  )
}