"use client";
import Header from "./Header";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./navbar"

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar />
      {/* Sidebar Navigation */}
      {isOpen && <div className="fixed inset-0 bg-[black/50] backdrop-blur-sm z-30" onClick={() => setIsOpen(false)} />}
      
       <main className="bg-[#28233D]">
        {/* Hero Section */}
        <section className="relative h-[100%] overflow-hidden rounded-2xl  w-[80vw] ml-[10vw] bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl font-bold mb-4 mt-[10%]">
              Introducing <span className="text-blue-400">3D</span>
            </h1>
            <Image
                    src="/aryangf.png" // Replace with actual image path
                    alt="User"
                    width={4000} // Adjust size as needed
                    height={400}
                    className="bg-black "
                  /> 
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* App Cards */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main> 
    </>
  );
}
