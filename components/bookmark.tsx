"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

// Define the bookmarked image type
export interface BookmarkedImage {
  id: string
  src: string
  alt: string
  username: string
  model: string
  prompt: string
  bookmarkedAt: string
}

// Create a simple in-memory store for bookmarks
// In a real app, you might want to use localStorage or a more robust solution
let bookmarkedImages: BookmarkedImage[] = []

// Bookmark store functions
export const bookmarkStore = {
  getBookmarks: () => {
    // Try to load from localStorage on client
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bookmarkedImages")
      if (stored) {
        bookmarkedImages = JSON.parse(stored)
      }
    }
    return bookmarkedImages
  },
  
  addBookmark: (image: Omit<BookmarkedImage, "bookmarkedAt">) => {
    // Don't add if already bookmarked
    if (bookmarkStore.isBookmarked(image.id)) return
    
    const newBookmark = {
      ...image,
      bookmarkedAt: new Date().toISOString()
    }
    
    bookmarkedImages = [...bookmarkedImages, newBookmark]
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedImages", JSON.stringify(bookmarkedImages))
    }
    
    return newBookmark
  },
  
  removeBookmark: (imageId: string) => {
    bookmarkedImages = bookmarkedImages.filter(img => img.id !== imageId)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedImages", JSON.stringify(bookmarkedImages))
    }
  },
  
  isBookmarked: (imageId: string) => {
    return bookmarkedImages.some(img => img.id === imageId)
  }
}

// Group bookmarks by date
const groupBookmarksByDate = (bookmarks: BookmarkedImage[]) => {
  const grouped: Record<string, BookmarkedImage[]> = {}
  
  bookmarks.forEach(bookmark => {
    const dateStr = format(new Date(bookmark.bookmarkedAt), "yyyy-MM-dd")
    
    if (!grouped[dateStr]) {
      grouped[dateStr] = []
    }
    
    grouped[dateStr].push(bookmark)
  })
  
  // Convert to array of date groups sorted by date (newest first)
  return Object.entries(grouped)
    .map(([dateStr, images]) => ({
      date: new Date(dateStr),
      images
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export default function Bookmark() {
  const [dateGroups, setDateGroups] = useState<{ date: Date; images: BookmarkedImage[] }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Load bookmarks
    const bookmarks = bookmarkStore.getBookmarks()
    setDateGroups(groupBookmarksByDate(bookmarks))
    setIsLoading(false)
    
    // Setup event listener for bookmark changes
    const handleStorageChange = () => {
      const bookmarks = bookmarkStore.getBookmarks()
      setDateGroups(groupBookmarksByDate(bookmarks))
    }
    
    window.addEventListener("bookmarkUpdated", handleStorageChange)
    
    return () => {
      window.removeEventListener("bookmarkUpdated", handleStorageChange)
    }
  }, [])
  
  // Function to trigger a refresh when bookmarks change
  const refreshBookmarks = () => {
    const bookmarks = bookmarkStore.getBookmarks()
    setDateGroups(groupBookmarksByDate(bookmarks))
  }
  
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-16 md:mt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">#Bookmark</h1>
        
        <div className="mb-4">
          <p className="text-gray-400">Recent Bookmarks</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : dateGroups.length > 0 ? (
          dateGroups.map(group => (
            <div key={group.date.toISOString()} className="mb-12">
              <h2 className="text-xl font-medium mb-2">{format(group.date, "EEEE, d MMMM yyyy")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.images.map(image => (
                  <div 
                    key={`${image.id}-${image.bookmarkedAt}`}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No bookmarks yet</p>
            <Link
              href="/art-station"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Explore ArtStation
            </Link>
          </div>
        )}
        
        {/* Loading indicator */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading more...</p>
        </div>
      </div>
    </div>
  )
}
