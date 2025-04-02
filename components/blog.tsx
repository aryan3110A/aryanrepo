"use client"

import CategorySections from "./blog/CategorySections"
import FollowSection from "./blog/Follow"

import FeaturedArticles from "./blog/FeaturedArticles"
import Header from "./blog/header"


export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white font-poppins">
      <Header />

      {/* Main Content */}
      <main className="mt-20 pt-10 font-poppins">
        <FeaturedArticles />
        <CategorySections />
        <FollowSection />
      </main>
    </div>
  )
}

