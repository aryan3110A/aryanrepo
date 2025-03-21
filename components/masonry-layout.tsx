import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";

interface ArtImage {
  id: string;
  src: string;
  alt: string;
  username: string;
  model: string;
  prompt: string;
}

interface MasonryLayoutProps {
  images: ArtImage[];
  onImageClick: (image: ArtImage) => void;
}

export default function MasonryLayout({ images, onImageClick }: MasonryLayoutProps) {
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number }>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns] = useState(3); // Fixed number of columns (3 per row)

  // Load image dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: Record<string, { width: number; height: number }> = {};

      const promises = images.map((image) => {
        return new Promise<void>((resolve) => {
          const imgElement = document.createElement('img');
          imgElement.crossOrigin = "anonymous";
          imgElement.onload = () => {
            dimensions[image.id] = {
              width: imgElement.width,
              height: imgElement.height,
            };
            resolve();
          };
          imgElement.onerror = () => {
            dimensions[image.id] = { width: 500, height: 500 };
            resolve();
          };
          imgElement.src = image.src;
        });
      });

      await Promise.all(promises);
      setImageDimensions(dimensions);
      setImagesLoaded(true);
    };

    loadImageDimensions();
  }, [images]);

  // Organize images into columns
  const getColumnImages = () => {
    if (!imagesLoaded) return Array.from({ length: columns }, () => []);

    // Calculate total height of each column
    const columnHeights = Array(columns).fill(0);
    const columnImages: ArtImage[][] = Array.from({ length: columns }, () => []);

    // Distribute images to the shortest column
    images.forEach((image) => {
      const dimensions = imageDimensions[image.id] || { width: 1, height: 1 };
      const ratio = dimensions.height / dimensions.width;

      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

      // Add image to the shortest column
      columnImages[shortestColumnIndex].push(image);

      // Update column height
      columnHeights[shortestColumnIndex] += ratio;
    });

    return columnImages;
  };

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex w-full" style={{ gap: 10 }}>
      {getColumnImages().map((column, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex-1" style={{ marginRight: 0 }}>
          {column.map((image) => {
            const dimensions = imageDimensions[image.id] || { width: 1, height: 1 };

            return (
              <div
                key={image.id}
                className="relative w-full cursor-pointer pb-2"
                style={{ marginBottom: 0 }}
                onMouseEnter={() => setHoveredImageId(image.id)}
                onMouseLeave={() => setHoveredImageId(null)}
                onClick={() => onImageClick(image)}
              >
                {/* Image with original aspect ratio */}
                <div
                  className="relative w-full"
                  style={{ paddingBottom: `${(dimensions.height / dimensions.width) * 100}%` }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Hover Overlay */}
                {hoveredImageId === image.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 transition-opacity duration-300">
                    <div className="flex justify-center space-x-6 mb-auto mt-[45%]">
                      <Heart className="w-8 h-8 text-white hover:text-pink-400" />
                      <Bookmark className="w-8 h-8 text-white hover:text-yellow-400" />
                    </div>
                    <div className="text-white mt-auto">
                      <div className="flex items-center mb-2">
                        <div className="mr-2 flex items-center justify-center">
                          <Image src="/artstation/usr.png" alt="user" width={28} height={28} />
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
      ))}
    </div>
  );
}
