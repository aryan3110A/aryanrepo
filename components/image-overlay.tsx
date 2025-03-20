"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  Bookmark,
  Share,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ArtImage {
  id: string;
  src: string;
  alt: string;
  username: string;
  model: string;
  prompt: string;
  aspectRatio: number;
}

interface ImageOverlayProps {
  image: ArtImage;
  onClose: () => void;
}

export default function ImageOverlay({ image, onClose }: ImageOverlayProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isRemixMode, setIsRemixMode] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [currentImage, setCurrentImage] = useState(image);
  const [originalImage, setOriginalImage] = useState(image);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hide scrollbar but allow scrolling
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.scrollbarWidth = "none";
      overlayRef.current.style.msOverflowStyle = "none";
    }
  }, []);

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const handleRemixClick = () => {
    if (!isRemixMode) {
      setIsRemixMode(true);
      setOriginalImage(currentImage);
      // Simulate changing the image when entering remix mode
      const newImage = {
        ...currentImage,
        src: "/placeholder.svg?height=600&width=400&text=Lighthouse",
        alt: "Lighthouse on rocky shore",
        prompt: "A lighthouse on rocky shore with dramatic sky and waves",
      };
      setCurrentImage(newImage);
    }
  };

  const handleGenerateClick = () => {
    if (promptText.trim()) {
      // Simulate generating a new image based on the prompt
      const newImage = {
        ...currentImage,
        src: promptText.includes("lighthouse")
          ? "/placeholder.svg?height=600&width=400&text=NewLighthouse"
          : "/placeholder.svg?height=600&width=400&text=Generated",
        prompt: promptText,
      };
      setCurrentImage(newImage);
      setPromptText("");
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-start justify-center mt-[15vh] "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div
        className="relative bg-zinc-900 rounded-lg w-full max-w-7xl mx-auto overflow-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isRemixMode ? (
          // Remix mode layout
          <div
            className="flex flex-col w-full overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Current image at top */}
            <div className="w-full relative">
              <div className="relative w-full" style={{ height: "50vh" }}>
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  className="p-4"
                />
              </div>
            </div>

            {/* Remix input and button */}
            <div className="w-full px-6 py-4 flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Type a prompt..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full p-4 pr-24 rounded-full bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleGenerateClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-colors"
                >
                  <span className="mr-2">Remix</span>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Original image toggle */}
            <div className="w-full px-6">
              <button
                onClick={toggleOriginal}
                className="flex items-center justify-between w-full p-3 bg-zinc-800 rounded-md mb-4 hover:bg-zinc-700 transition-colors"
              >
                <span>Original image</span>
                {showOriginal ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {showOriginal ? (
              // Show original image and info side by side
              <div className="flex flex-col md:flex-row w-full px-6 pb-6">
                <div className="w-full md:w-1/2 pr-0 md:pr-4">
                  {/* User info */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                      <span>U</span>
                    </div>
                    <span className="text-lg font-semibold">
                      {originalImage.username}
                    </span>
                  </div>

                  <div className="flex space-x-4 mb-6">
                    <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark</span>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Download className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300">
                      <span className="font-semibold">Model:</span>{" "}
                      {originalImage.model}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {originalImage.prompt}
                    </p>
                  </div>
                </div>

                {/* Original image */}
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div className="relative w-full" style={{ height: "40vh" }}>
                    <Image
                      src={originalImage.src || "/placeholder.svg"}
                      alt={`Original ${originalImage.alt}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Just show user info when original is collapsed
              <div className="w-full px-6 pb-6">
                {/* User info */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                    <span>U</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {currentImage.username}
                  </span>
                </div>

                <div className="flex space-x-4 mb-6">
                  <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Download className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300">
                    <span className="font-semibold">Model:</span>{" "}
                    {currentImage.model}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {currentImage.prompt}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Regular view (not remix mode) - side by side layout
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  className="p-4"
                />
              </div>
            </div>

            {/* Right side - Info */}
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              {/* User info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                    <span>U</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {currentImage.username}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-1 rounded-md border border-gray-600 hover:bg-gray-800 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Download className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Model info */}
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Model:</span>{" "}
                  {currentImage.model}
                </p>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {currentImage.prompt}
                </p>
              </div>

              {/* Remix section */}
              <div className="mt-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a prompt..."
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="w-full p-4 pr-24 rounded-full bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleRemixClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-colors"
                  >
                    <span className="mr-2">Remix</span>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
