"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Article = {
  id: number
  title: string
  author: string
  authorTag: string
  content: string
  image: string
}

export default function FeaturedArticles() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const articles: Article[] = [
    {
      id: 1,
      title: "15 Seconds of Film Generation – AI Powered Short Video Creation",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "The future of filmmaking is here with AI-powered film generation. Imagine creating a 15-second cinematic scene within minutes using AI-driven tools. From text-to-video models to AI-assisted editing, studios can now generate short films with dynamic characters, realistic environments, and seamless transitions. Tools like RunwayML, Pika Labs, and Google's Lumiere are pushing the boundaries of AI-driven storytelling, enabling filmmakers to bring their visions to life with minimal effort. The next era of filmmaking is all about speed, automation, and limitless creativity.",
      image: "https://placehold.co/800x400/black/white",
    },
    {
      id: 2,
      title: "AI Powered Comic Generation – A New Era of Digital Storytelling",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "AI is revolutionizing the comic industry by enabling artists to generate unique illustrations, dialogue, and storylines effortlessly. With AI-powered comic generators like MidJourney, Stable Diffusion, and Leonardo AI, creators can design characters, backgrounds, and even entire graphic novels in a fraction of the time. Whether you're a solo artist or a studio looking to speed up production, AI-assisted storytelling offers endless possibilities. Explore how AI is transforming the comic industry and how you can use it to create your next masterpiece.",
      image: "https://placehold.co/800x400/black/white",
    },
    {
      id: 3,
      title: "AI in Character Building – Crafting Unique Personalities with AI",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "Character design has never been easier with AI-driven tools. From video games to animated films, AI can generate detailed character models, personalities, and backstories based on simple prompts. Whether you need a 3D avatar, a lifelike animated character, or a concept for a new protagonist, AI-powered tools like MetaHuman Creator, Artbreeder, and DeepMotion provide endless creative opportunities. Learn how AI is redefining character creation and giving artists new ways to experiment with design, storytelling, and personality development.",
      image: "https://placehold.co/800x400/black/white",
    },
    {
      id: 4,
      title: "AI-Powered Visual Effects – Transforming Post-Production Workflows",
      author: "GEMMA",
      authorTag: "AI",
      content:
        "Post-production workflows are being revolutionized by AI technologies that can automate tedious tasks and enhance creative possibilities. From automatic rotoscoping and color grading to scene extensions and digital doubles, AI tools are enabling VFX artists to achieve high-quality results in a fraction of the time. Discover how studios are implementing AI solutions to streamline their pipelines and deliver stunning visual effects for films, TV shows, and commercials.",
      image: "https://placehold.co/800x400/black/white",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === articles.length - 1 ? prev : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === articles.length - 1 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(interval)
  }, [articles.length])

  return (
    <div className="w-100% bg-black rounded-lg overflow-hidden mb-10vh">
      <div className="p-5% bg-black rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-5vh">Featured articles</h2>

        <div className="relative">
          <div className="overflow-hidden rounded-lg relative">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)`, display: "flex" }}
            >
              {articles.map((article) => (
                <div key={article.id} className="min-w-100% px-1%">
                  <div className="bg-black rounded-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-100% aspect-[2/1] object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-3% pt-2%">
                      <div className="flex items-center space-x-2 mb-2vh">
                        <span className="text-blue-400 uppercase font-semibold">{article.author}</span>
                        <span className="text-blue-400 uppercase font-semibold">{article.authorTag}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2vh">{article.title}</h3>
                      <p className="text-gray-300 mb-2vh">{article.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-2% top-50% transform -translate-y-50% bg-white rounded-full p-2% text-black z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size="1.5rem" />
              </button>
            )}

            {currentSlide < articles.length - 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-2% top-50% transform -translate-y-50% bg-white rounded-full p-2% text-black z-10"
                aria-label="Next slide"
              >
                <ChevronRight size="1.5rem" />
              </button>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-3vh space-x-1vw">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2vw h-2vw max-w-8 max-h-8 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

