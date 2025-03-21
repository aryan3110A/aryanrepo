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
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle scrolling behavior
  useEffect(() => {
    if (showOriginal && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showOriginal]);

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const handleRemixClick = () => {
    // Only proceed if there's text in the prompt input
    if (promptText.trim()) {
      if (!isRemixMode) {
        // First click with valid prompt - enter remix mode
        setIsRemixMode(true);
        setOriginalImage(currentImage);
      }

      // Update the image and prompt regardless of whether we're entering remix mode or already in it
      const newImage = {
        ...currentImage,
        src: "/artstation/remix1.png", // Change to remix image
        prompt: promptText, // Update the prompt to user's input
      };
      setCurrentImage(newImage);
      setPromptText(""); // Clear the prompt input after generating
    }
  };

  // Determine if the Remix button should be disabled
  const isRemixButtonDisabled = promptText.trim() === "";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="relative bg-[#1F1F1F] rounded-lg w-[70%] max-w-7xl mx-auto mt-[15vh] mb-[5vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main content area - consistent layout for both modes */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 relative  ">
            <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
                className="pt-[5vh] pb-[5vh] pl-[1vw]"
              />
            </div>
          </div>

          {/* Right side - Info */}
          <div className="w-full md:w-1/2  pt-[6vh] -ml-[1vw] pr-[1vw] flex flex-col">
            {/* User info */}
            <div className="flex items-center mb-[2vh] ">
              <div className="flex items-center mr-[1vw]">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-[1vw]">
                  <Image
                    src="/artstation/usr.png"
                    alt="User"
                    width={36}
                    height={36}
                  />
                </div>
                <span className="text-md font-semibold text-white">
                  {currentImage.username}
                </span>
              </div>

              <div className="pl-[6vw] flex space-x-4">
                <button className="flex items-center space-x-2 px-2 py-1 text-sm rounded-md border border-[#919191] bg-[#1f1f1f] hover:bg-[#3D3D3D] hover:border-white transition-colors">
                  <Share className="w-3 h-3" />
                  <span>Share</span>
                </button>
                <button className="flex items-center text-sm space-x-2 px-2 py-1 rounded-md  hover:bg-[#3D3D3D] transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark</span>
                </button>
                <button className="text-[#777777] hover:text-red-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="text-[#777777] hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Model info */}
            <div className="mb-4">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">Model:</span>{" "}
                {currentImage.model}
              </p>
            </div>

            {/* Prompt */}
            <div className="mb-6 text-sm">
              <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
              <p className="text-gray-200 text-sm leading-relaxed">
                {currentImage.prompt}
              </p>
            </div>

            {/* Remix section */}
            <div className="mt-[28vh]">
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
                  disabled={isRemixButtonDisabled}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-full flex items-center transition-colors ${
                    isRemixButtonDisabled
                      ? "bg-blue-500 opacity-50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
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

            {/* Original image button (only shown in remix mode) */}
            {isRemixMode && (
              <div className="w-[11vw] mt-4 mb-2 pt-2 flex-nowrap">
                <button
                  onClick={toggleOriginal}
                  className="flex items-center gap-2 w-full p-3  rounded-md hover:bg-zinc-700 transition-colors"
                >
                  {showOriginal ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                  <span>Original image</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Original image section (conditionally rendered) */}
        {isRemixMode && showOriginal && (
          <div
            ref={contentRef}
            className="flex flex-col md:flex-row w-full pl-[7%]  "
          >
            {/* User info */}
            <div className="w-full md:w-1/2  pt-[5vh] -ml-[1vw] pr-[1vw] flex flex-col mt-[2vh]">
              {/* User info */}
              <div className="flex items-center mb-6 ">
                <div className="flex items-center mr-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/artstation/usr.png"
                      alt="User"
                      width={36}
                      height={36}
                    />
                  </div>
                  <span className="text-md font-semibold text-white">
                    {currentImage.username}
                  </span>
                </div>

                <div className="pl-[6vw] flex space-x-4">
                  <button className="flex items-center space-x-2 px-2 py-1 text-sm rounded-md border border-[#919191] bg-[#1f1f1f] hover:bg-[#3D3D3D] hover:border-white transition-colors">
                    <Share className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center text-sm space-x-2 px-2 py-1 rounded-md  hover:bg-[#3D3D3D] transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </button>
                  <button className="text-[#777777] hover:text-red-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="text-[#777777] hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Model info */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold">Model:</span>{" "}
                  {currentImage.model}
                </p>
              </div>

              {/* Prompt */}
              <div className="mb-6 text-sm">
                <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {currentImage.prompt}
                </p>
              </div>
            </div>

            {/* Original image */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                <Image
                  src={originalImage.src || "/placeholder.svg"}
                  alt={originalImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  className="pt-[5vh] pb-[5vh] pl-[1vw]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
