"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import ImageOverlay from "./image-overlay";

// Define the image data structure with aspect ratio
interface ArtImage {
  id: string;
  src: string;
  alt: string;
  username: string;
  model: string;
  prompt: string;
  aspectRatio: number; // Aspect ratio is now required for consistency
}

// Standardized image data
const sampleImages: ArtImage[] = [
  {
    id: "1",
    src: "/artstation/Card.png",
    alt: "Eiffel Tower with burger",
    username: "Username",
    model: "Flux.1 Dev",
    prompt: "A giant burger in front of the Eiffel Tower with trees",
    aspectRatio: 1, // Default to square
  },
  {
    id: "2",
    src: "/artstation/Card.png",
    alt: "Mystical forest",
    username: "Username",
    model: "Name",
    prompt: "txt txt txt txt",
    aspectRatio: 1, // Default to square
  },
  {
    id: "3",
    src: "/artstation/Card.png",
    alt: "Lighthouse",
    username: "Username",
    model: "Name",
    prompt: "A lighthouse on rocky shore",
    aspectRatio: 1, // Default to square
  },
  {
    id: "4",
    src: "/artstation/Card.png",
    alt: "Abstract art",
    username: "Username",
    model: "Name",
    prompt: "Abstract digital art",
    aspectRatio: 1, // Square
  },
  {
    id: "5",
    src: "/artstation/Card.png",
    alt: "Nature scene",
    username: "Username",
    model: "Name",
    prompt: "Beautiful nature landscape",
    aspectRatio: 1.5, // Landscape
  },
  {
    id: "6",
    src: "/artstation/Card.png",
    alt: "Urban cityscape",
    username: "Username",
    model: "Name",
    prompt: "Futuristic cityscape at night",
    aspectRatio: 0.67, // Portrait
  },
  {
    id: "7",
    src: "/artstation/Card.png",
    alt: "Portrait",
    username: "Username",
    model: "Name",
    prompt: "Artistic portrait",
    aspectRatio: 1, // Square
  },
  {
    id: "8",
    src: "/artstation/Card.png",
    alt: "Space scene",
    username: "Username",
    model: "Name",
    prompt: "Nebula in deep space",
    aspectRatio: 1.5, // Landscape
  },
  {
    id: "9",
    src: "/artstation/Card.png",
    alt: "Mountain landscape",
    username: "Username",
    model: "Name",
    prompt: "Mountain landscape at sunset",
    aspectRatio: 0.67, // Portrait
  },
  {
    id: "10",
    src: "/artstation/Card.png",
    alt: "Wide panorama",
    username: "Username",
    model: "Name",
    prompt: "Wide panoramic landscape",
    aspectRatio: 2, // Wide Landscape
  },
];

export default function ArtStation() {
  const [selectedImage, setSelectedImage] = useState<ArtImage | null>(null);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-black text-white p-5">
      <div className="max-w-[90%] mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-2">ArtStation Gallery</h1>
        <p className="text-xl mb-10">Explore AI-generated artwork</p>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sampleImages.map((image) => {
            // Determine width & height based on aspect ratio
            const width = 400; // Fixed width
            const height = Math.round(width / image.aspectRatio); // Auto height

            return (
              <div
                key={image.id}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredImageId(image.id)}
                onMouseLeave={() => setHoveredImageId(null)}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Display with Aspect Ratio */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={width}
                  height={height}
                  className="w-full h-auto object-cover rounded-lg"
                />

                {/* Hover Overlay */}
                {hoveredImageId === image.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 transition-opacity duration-300">
                    <div className="flex justify-center space-x-6 mb-auto mt-[45%]">
                      <Heart className="w-8 h-8 text-white hover:text-pink-400" />
                      <Bookmark className="w-8 h-8 text-white hover:text-yellow-400" />
                    </div>
                    <div className="text-white mt-auto  ">
                      <div className="flex items-center mb-2">
                        <div className=" mr-2 flex items-center justify-center">
                          <Image
                          src="/artstation/usr.png"
                          alt="user"
                          width={28}
                          height={28}
                          />
                        </div>
                        <span>{image.username}</span>
                      </div>
                      <div className="text-sm">
                        <p>
                          <span className="font-semibold">Model:</span> {image.model}
                        </p>
                        <p>
                          <span className="font-semibold">Prompt:</span> {image.prompt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Overlay Modal */}
      {selectedImage && (
        <ImageOverlay image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
