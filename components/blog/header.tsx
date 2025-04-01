"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800 py-4 px-8 flex items-center justify-between">
      <div className="w-3/5 md:w-1/2 relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search all articles..."
            className="w-full py-2 px-8 rounded-md bg-gray-800 text-white border border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400" size="1.2rem" />
        </div>
      </div>
      <button className="bg-blue-500 text-white py-2 px-8 rounded-md">Search</button>
      <div className="flex items-center">
        <div className="border border-gray-700 rounded-md py-2 px-4 flex items-center">
          <span className="mr-2">English</span>
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
            className="ml-2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  )
}