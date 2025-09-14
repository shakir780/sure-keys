import React from "react";
import {
  Camera,
  Video,
  Eye,
  Play,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Listing } from "store/types/listing";
import { getPlatformIcon } from "@lib/util";

interface MediaTabProps {
  listing: Listing;
  openImageModal: (index: number) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({ listing, openImageModal }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Camera className="mr-2" size={20} />
          Property Photoss ({listing.images.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listing.images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-square"
              onClick={() => openImageModal(index)}
            >
              <img
                src={image.url}
                alt={`Property image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.isCover && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  Cover Photo
                </div>
              )}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <Eye size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Links Section */}
      {listing.videoLinks && listing.videoLinks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Video className="mr-2" size={20} />
            Property Videos ({listing.videoLinks.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {listing.videoLinks.map((video, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">
                      {getPlatformIcon(video.platform)}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {video.title || `${video.platform} Video`}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {video.platform} Video
                      </p>
                    </div>
                  </div>
                  <Play className="text-purple-600" size={24} />
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <Play size={16} className="mr-2" />
                  Watch Video
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {listing.photoNotes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
            <AlertCircle className="mr-2" size={18} />
            Photo Notes
          </h4>
          <p className="text-yellow-700">{listing.photoNotes}</p>
        </div>
      )}
    </div>
  );
};

export default MediaTab;
