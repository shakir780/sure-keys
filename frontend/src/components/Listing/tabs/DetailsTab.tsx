import React from "react";
import { AlertCircle } from "lucide-react";
import { Listing } from "store/types/listing";

interface DetailsTabProps {
  listing: Listing;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ listing }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6">Complete Property Details</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Room Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bedrooms:</span>
              <span className="font-medium">{listing.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bathrooms:</span>
              <span className="font-medium">{listing.bathrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Toilets:</span>
              <span className="font-medium">{listing.toilets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kitchens:</span>
              <span className="font-medium">{listing.kitchens}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Property Info</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium capitalize">
                {listing.propertyType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{listing.propertySize} sqm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purpose:</span>
              <span className="font-medium">{listing.purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                className={`font-medium capitalize ${
                  listing.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {listing.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Location</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">State:</span>
              <span className="font-medium">{listing.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Locality:</span>
              <span className="font-medium capitalize">{listing.locality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Area:</span>
              <span className="font-medium capitalize">{listing.area}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Street/Estate:</span>
              <span className="font-medium capitalize">
                {listing.streetEstateNeighbourhood}
              </span>
            </div>
          </div>
        </div>
      </div>

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

export default DetailsTab;
