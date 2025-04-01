"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"

type Article = {
  title: string
  image: string
}

type MoreBlogsProps = {
  category: string
  articles: Article[]
}

export default function MoreBlogs({ category, articles }: MoreBlogsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 1, articles.length - 1))
  }

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="w-100% mb-10vh">
      <div className="flex justify-between items-center mb-3vh">
        <h2 className="text-2xl font-bold">{category}</h2>
        <button className="flex items-center text-blue-400 hover:text-blue-300">
          <span className="mr-1vw">See posts</span>
          <ChevronRight size="1rem" />
        </button>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${scrollPosition * 33.33}%)` }}
          >
            {articles.map((article, index) => (
              <div key={index} className="min-w-33.33% px-1%">
                <div className="bg-gray-800 rounded-lg overflow-hidden h-100%">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-100% aspect-video object-cover"
                  />
                  <div className="p-5%">
                    <h3 className="text-lg font-semibold mb-2vh">{article.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {scrollPosition > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute left-1% top-50% transform -translate-y-50% bg-white rounded-full p-2% text-black z-10"
            aria-label="Scroll left"
          >
            <ChevronRight className="rotate-180" size="1.5rem" />
          </button>
        )}

        {scrollPosition < articles.length - 3 && (
          <button
            onClick={scrollRight}
            className="absolute right-1% top-50% transform -translate-y-50% bg-white rounded-full p-2% text-black z-10"
            aria-label="Scroll right"
          >
            <ChevronRight size="1.5rem" />
          </button>
        )}
      </div>
    </div>
  )
}

