"use client"

import { useState } from "react"

import Image from 'next/image';
import ImageOverlay from "@/components/image-overlay";
import MasonryLayout from "@/components/masonry-layout";


// Define the image data structure
interface ArtImage {
  id: string
  src: string
  alt: string
  username: string
  model: string
  prompt: string
}

// Sample images without hardcoded dimensions
const sampleImages: ArtImage[] = [
  {
    id: "1",
    src: "/artstation/Card.png",
    alt: "Eiffel Tower with burger",
    username: "Username",
    model: "Flux.1 Dev",
    prompt: "A giant burger in front of the Eiffel Tower with trees",
  },
  {
    id: "2",
    src: "/artstation/Card1.png",
    alt: "Mystical forest",
    username: "Username",
    model: "Name",
    prompt: "txt txt txt txt",
  },
  {
    id: "3",
    src: "/artstation/Card.png",
    alt: "Lighthouse",
    username: "Username",
    model: "Name",
    prompt: "A lighthouse on rocky shore",
  },
  {
    id: "4",
    src: "/artstation/Card.png",
    alt: "Abstract art",
    username: "Username",
    model: "Name",
    prompt: "Abstract digital art",
  },
  {
    id: "5",
    src: "/artstation/Card2.png",
    alt: "Nature scene",
    username: "Username",
    model: "Name",
    prompt: "Beautiful nature landscape",
  },
  {
    id: "6",
    src: "/artstation/Card1.png",
    alt: "Urban cityscape",
    username: "Username",
    model: "Name",
    prompt: "Futuristic cityscape at night",
  },
  {
    id: "7",
    src: "/artstation/Card1.png",
    alt: "Portrait",
    username: "Username",
    model: "Name",
    prompt: "Artistic portrait",
  },
  {
    id: "8",
    src: "/artstation/Card.png",
    alt: "Space scene",
    username: "Username",
    model: "Name",
    prompt: "Nebula in deep space",
  },
  {
    id: "9",
    src: "/artstation/Card2.png",
    alt: "Mountain landscape",
    username: "Username",
    model: "Name",
    prompt: "Mountain landscape at sunset",
  },
  {
    id: "10",
    src: "/artstation/Card1.png",
    alt: "Wide panorama",
    username: "Username",
    model: "Name",
    prompt: "Wide panoramic landscape",
  },
]

export default function ArtStation() {
  const [selectedImage, setSelectedImage] = useState<ArtImage | null>(null)
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number }>>({})

  // This function will be called when an image is loaded and its dimensions are known
  const handleImageDimensionsLoaded = (id: string, dimensions: { width: number; height: number }) => {
    setImageDimensions((prev) => ({
      ...prev,
      [id]: dimensions,
    }))
  }

  return (
    <> 
    <div className="w-full min-h-screen bg-black text-white p-5">
      <div className="max-w-[90%] mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-2">ArtStation Gallery</h1>
        <p className="text-xl mb-10">Explore AI-generated artwork</p>

        {/* Use the MasonryLayout component */}
        <MasonryLayout images={sampleImages} onImageClick={setSelectedImage}/>
      </div>

      {/* Image Overlay Modal */}
      {selectedImage && (

        <ImageOverlay image={selectedImage}
        dimensions={imageDimensions[selectedImage.id] || { width: 500, height: 500 }}
        onClose={() => setSelectedImage(null)}/>

        
      )}
    </div>
    </>    

  )
}

