import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ImagePlus, Star, Trash2 } from "lucide-react";
import { ImageType, PhotosFormData } from "@modules/postProperty/PhotosStep";

interface PhotosSectionProps {
  images: ImageType[];
  errors: FieldErrors<PhotosFormData>;
  register: UseFormRegister<PhotosFormData>;
  isUploading: boolean;
  hasCoverImage: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSetAsCover: (index: number) => void;
  onRemoveImage: (index: number) => void;
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({
  images,
  errors,
  register,
  isUploading,
  hasCoverImage,
  onFileUpload,
  onSetAsCover,
  onRemoveImage,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <ImagePlus className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-800">Property Photos</h3>
      </div>

      {/* Upload Button */}
      <div className="flex justify-start">
        <label className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-green-50 hover:bg-green-100 border border-green-600 text-green-700 rounded-md cursor-pointer transition-colors">
          <ImagePlus className="w-4 h-4" />
          {isUploading ? "Uploading..." : "Add Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onFileUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Validation Error */}
      {errors.images && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{errors.images.message}</p>
        </div>
      )}

      {/* Cover Image Warning */}
      {images.length > 0 && !hasCoverImage && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-sm">
            ⚠️ Please select a cover image by clicking the star icon on one of
            your photos.
          </p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img: ImageType, index: number) => (
            <div
              key={`${img.public_id}-${index}`}
              className="relative group border rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={img.url}
                alt={`Image ${index + 1}`}
                className="h-40 w-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  console.error("Image failed to load:", img.url);
                  e.currentTarget.src = "/placeholder-image.jpg";
                }}
              />

              {/* Cover Icon */}
              <button
                type="button"
                onClick={() => onSetAsCover(index)}
                className={`absolute top-2 left-2 p-1 rounded-full transition-colors ${
                  img.isCover
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-500 hover:text-green-600"
                }`}
                title="Set as cover"
              >
                <Star
                  className="w-4 h-4"
                  fill={img.isCover ? "white" : "none"}
                />
              </button>

              {/* Delete Icon */}
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500 hover:text-red-700 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {img.isCover && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs py-1 text-center">
                  Cover Photo
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Photo Count */}
      {images.length > 0 && (
        <div className="text-sm text-gray-600">
          {images.length} photo{images.length !== 1 ? "s" : ""} uploaded
          {images.length < 3 && (
            <span className="text-red-600 ml-2">
              ({3 - images.length} more needed)
            </span>
          )}
        </div>
      )}

      {/* Optional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo Notes <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Living room, exterior, kitchen..."
          className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.photoNotes ? "border-red-500" : "border-gray-300"
          }`}
          {...register("photoNotes")}
        />
        {errors.photoNotes && (
          <p className="text-red-500 text-xs mt-1">
            {errors.photoNotes.message}
          </p>
        )}
      </div>
    </div>
  );
};
