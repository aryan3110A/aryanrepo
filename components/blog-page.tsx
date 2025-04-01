"use client";

import { useState } from "react";
import { Search } from 'lucide-react';
import FeaturedArticles from "./featured-articles";
import MoreBlogs from "./more-blogs";
import FollowSection from "./follow-section";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("")
  
    return (
      <div className="flex flex-col min-h-100vh w-100vw bg-black text-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 w-100% z-50 bg-black border-b border-gray-800 py-2vh px-3vw flex items-center justify-between">
          <div className="w-60% md:w-50% relative">
            <div className="relative w-100%">
              <input
                type="text"
                placeholder="Search all articles..."
                className="w-100% py-1vh px-3vw rounded-md bg-gray-800 text-white border border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3vw top-50% transform -translate-y-50% text-gray-400" size="1.2rem" />
            </div>
          </div>
          <button className="bg-blue-500 text-white py-1vh px-3vw rounded-md">Search</button>
          <div className="flex items-center">
            <div className="border border-gray-700 rounded-md py-1vh px-2vw flex items-center">
              <span className="mr-1vw">English</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1vw"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="mt-10vh pt-5vh px-3vw">
          <FeaturedArticles />
          <MoreBlogs
            category="Image Creation"
            articles={[
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
            ]}
          />
          <MoreBlogs
            category="Vedio & Animations"
            articles={[
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
            ]}
          />
          <MoreBlogs
            category="Sound designing"
            articles={[
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
            ]}
          />
          <MoreBlogs
            category="Product Branding"
            articles={[
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
            ]}
          />
          <FollowSection />
        </main>
  
        {/* Footer */}
        <footer className="mt-5vh py-3vh px-3vw bg-black border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-blue-500">WildMind</h2>
            </div>
            <div className="flex space-x-2vw">
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Features
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Company
              </a>
            </div>
          </div>
          <div className="mt-2vh">
            <p className="text-gray-500 text-sm">© 2025 WildMind. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }
  
  