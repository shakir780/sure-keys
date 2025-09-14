import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "store/types/listing";

interface ImageModalProps {
  show: boolean;
  images: Image[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  show,
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  if (!show) return null;

  const nextImage = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevImage = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl max-h-screen mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-200"
        >
          <X size={24} />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black bg-opacity-50 text-white rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Image */}
        <img
          src={images[currentIndex]?.url}
          alt={`Property image ${currentIndex + 1}`}
          className="max-w-full max-h-screen object-contain"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 rounded-lg p-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex ? "border-white" : "border-transparent"
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
