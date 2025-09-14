import React from "react";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  Utensils,
  Square,
  Eye,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import { Listing } from "store/types/listing";

interface ListingHeaderProps {
  listing: Listing;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-8 border-b border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {listing.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={18} className="mr-2" />
            <span>
              {listing.streetEstateNeighbourhood}, {listing.area},{" "}
              {listing.locality}, {listing.state}
            </span>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="flex items-center">
              <Bed size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.bedrooms} Beds
              </span>
            </div>
            <div className="flex items-center">
              <Bath size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.bathrooms} Baths
              </span>
            </div>
            <div className="flex items-center">
              <Home size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.toilets} Toilets
              </span>
            </div>
            <div className="flex items-center">
              <Utensils size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.kitchens} Kitchens
              </span>
            </div>
            <div className="flex items-center">
              <Square size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.propertySize} sqm
              </span>
            </div>
            <div className="flex items-center">
              <Eye size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">
                {listing.views} Views
              </span>
            </div>
          </div>

          {/* Property Type & Availability */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Home size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-700 capitalize font-medium">
                {listing.propertyType}
              </span>
            </div>
            <div
              className={`flex items-center rounded-lg px-3 py-2 ${
                listing.availability === "yes" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {listing.availability === "yes" ? (
                <CheckCircle size={16} className="text-green-600 mr-2" />
              ) : (
                <XCircle size={16} className="text-red-600 mr-2" />
              )}
              <span
                className={`font-medium ${
                  listing.availability === "yes"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {listing.availability === "yes" ? "Available" : "Not Available"}
              </span>
            </div>
            {listing.landlordLivesInCompound && (
              <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2">
                <Shield size={16} className="text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium">
                  Landlord on Site
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:text-right mt-4 lg:mt-0">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatPrice(listing.rentAmount)}
          </div>
          <div className="text-gray-600 capitalize">
            per {listing.paymentFrequency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
