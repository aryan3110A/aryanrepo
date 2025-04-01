"use client"


import FeaturedArticles from "../featured-articles"
import FollowSection from "../follow-section"
import CategorySections from "./CategorySections"
import Header from "./header"

export default function BlogNew() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white font-poppins">
      <Header />
      
      <main className="mt-20 pt-10 px-8">
        <FeaturedArticles />
        <CategorySections />
        <FollowSection />
      </main>

      {/* Footer */}
      <footer className="mt-10 py-6 px-8 bg-black border-t border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-blue-500">WildMind</h2>
          </div>
          <div className="flex space-x-4">
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
        <div className="mt-4">
          <p className="text-gray-500 text-sm">© 2025 WildMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}