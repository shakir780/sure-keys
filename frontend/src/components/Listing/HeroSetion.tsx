import React from "react";
import {
  Star,
  Heart,
  Share2,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Listing } from "store/types/listing";

interface HeroSectionProps {
  listing: Listing;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  openImageModal: (index: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  listing,
  currentImageIndex,
  setCurrentImageIndex,
  isLiked,
  setIsLiked,
  openImageModal,
}) => {
  const nextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === listing.images.length - 1
        ? 0
        : currentImageIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? listing.images.length - 1
        : currentImageIndex - 1
    );
  };

  return (
    <div
      className="relative h-96 bg-gray-900 overflow-hidden cursor-pointer"
      onClick={() => openImageModal(currentImageIndex)}
    >
      <img
        src={listing.images[currentImageIndex]?.url}
        alt="Property"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Click to View Full Image Indicator */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        <Camera size={16} />
        <span>Click to view full image</span>
      </div>

      {/* Status Badges */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            listing.status === "active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white">
          {listing.purpose}
        </span>
        {listing.isFeatured && (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white flex items-center">
            <Star size={14} className="mr-1" />
            Featured
          </span>
        )}
      </div>

      {/* Image Navigation */}
      {listing.images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
            {listing.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Top Actions */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-700 hover:bg-white"
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-3 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg transition-all duration-200"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
