"use client"

import { useState } from "react"
import { Menu, User } from "lucide-react"
import Link from "next/link"
import Navbar from "./navbar"

export default function Page() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
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
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/features" className="hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="/templates" className="hover:text-blue-400 transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link href="/art-station" className="hover:text-blue-400 transition-colors">
              Art station
            </Link>
            <Link href="/support" className="hover:text-blue-400 transition-colors">
              Support
            </Link>
          </nav>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Sliding Navbar */}
      <Navbar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden rounded-2xl mx-4 mt-4">
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
    </div>
  )
}

