"use client";
import React, { JSX, useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  User,
  Eye,
  Edit3,
  Star,
  Shield,
  Car,
  Droplets,
  Zap,
  Wifi,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";
import img1 from "../../../assets/img/0682d8778e8969-3bedroom-flat-apartment-in-a-serviced-estate-for-rent-lekki-lagos.jpg";
import img2 from "../../../assets/img/06846e436aafe0-decent-furnished-studio-apartment-self-contained-for-rent-jibowu-yaba-lagos.jpeg";
import img3 from "../../../assets/img/068582529e578d-newly-built-six-units-of-1bedroom-mini-flats-for-rent-ushafa-bwari-abuja.jpg";
import img4 from "../../../assets/img/3-bedroom-bungalow-with-bq-9gJbMWe1jDnGra0xPN1J.jpeg";
import { useDeleteListing, useGetListings } from "@hooks/useListing";
import { useRouter } from "next/navigation";
import { getToken } from "@lib/authStorage";

// TypeScript interfaces
interface Image {
  url: string;
  isCover?: boolean;
}

interface Creator {
  id?: {
    name?: string;
  };
}

interface Listing {
  _id: string;
  id: string;
  title: string;
  area: string;
  locality: string;
  state: string;
  rentAmount: number;
  paymentFrequency: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  status: string;
  inviteAgentToBid?: boolean;
  landlordLivesInCompound?: boolean;
  facilities?: string[];
  images?: Image[];
  creator?: Creator;
}

interface FallbackImage {
  src: string;
}

export interface ApiResponse {
  data?: {
    listings?: Listing[];
  };
}

const ListingsGrid: React.FC = ({ data, isLoading, error }: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const fallbackImages: FallbackImage[] = [img1, img2, img3, img4];
  const token = getToken();
  const deleteListingMutation = useDeleteListing(token!);

  console.log(data);
  const router = useRouter();

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index: number) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse"
          >
            <div className="h-56 w-full bg-gray-300"></div>
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-300 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-lg w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded-lg w-2/3"></div>
              <div className="flex gap-4 mt-4">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-9 bg-gray-300 rounded-lg w-24"></div>
                <div className="h-9 bg-gray-300 rounded-lg w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4 font-medium">
            Failed to load listings
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get listings from API response
  const listings: Listing[] = data?.data?.listings || [];

  // Empty state
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No listings found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your search filters
          </p>
        </div>
      </div>
    );
  }

  const formatRent = (amount: number, frequency: string = "yearly"): string => {
    const frequencyMap: { [key: string]: string } = {
      monthly: "month",
      quarterly: "quarter",
      yearly: "year",
      daily: "day",
    };
    return `₦${amount.toLocaleString()}/${
      frequencyMap[frequency] || frequency
    }`;
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "occupied":
      case "rented":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "expired":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getDisplayStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
        return "Available";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const getCoverImage = (images?: Image[]): string | null => {
    if (!images || images.length === 0) return null;
    const coverImage = images.find((img: Image) => img.isCover);
    return coverImage?.url || images[0]?.url || null;
  };

  const getFacilityIcon = (facility: string): JSX.Element => {
    const facilityLower: string = facility.toLowerCase();
    if (facilityLower.includes("security"))
      return <Shield className="w-3 h-3" />;
    if (facilityLower.includes("parking")) return <Car className="w-3 h-3" />;
    if (facilityLower.includes("water"))
      return <Droplets className="w-3 h-3" />;
    if (
      facilityLower.includes("power") ||
      facilityLower.includes("electricity")
    )
      return <Zap className="w-3 h-3" />;
    if (facilityLower.includes("wifi") || facilityLower.includes("internet"))
      return <Wifi className="w-3 h-3" />;
    return <Star className="w-3 h-3" />;
  };

  const handleDeleteClick = (listing: Listing): void => {
    setSelectedListing(listing);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (): void => {
    if (selectedListing?.id) {
      deleteListingMutation.mutate(selectedListing.id, {
        onSuccess: () => {
          console.log("Deleted:", selectedListing.id);
          setShowDeleteModal(false);
          setSelectedListing(null);
        },
        onError: (error) => {
          console.error("Delete failed:", error);
        },
      });
    }
  };
  const handleCancelDelete = (): void => {
    setShowDeleteModal(false);
    setSelectedListing(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing: Listing, index: number) => (
          <div
            key={listing._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-green-300 group flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={
                  getCoverImage(listing.images) ||
                  fallbackImages[index % fallbackImages.length]?.src ||
                  fallbackImages[0].src
                }
                alt={listing.title}
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  target.src =
                    fallbackImages[index % fallbackImages.length]?.src ||
                    fallbackImages[0].src;
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    listing.status
                  )}`}
                >
                  {getDisplayStatus(listing.status)}
                </span>
              </div>

              {/* Agent Bid Badge */}
              {listing.inviteAgentToBid && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Open for Bids
                  </div>
                </div>
              )}

              {/* Landlord Status Badge */}
              <div className="absolute top-16 right-4">
                {listing.landlordLivesInCompound ? (
                  <div className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    On-Site
                  </div>
                ) : (
                  <div className="bg-gray-500 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Home className="w-3 h-3" />
                    Off-Site
                  </div>
                )}
              </div>

              {/* Additional Image Thumbnails */}
              {listing.images && listing.images.length > 1 && (
                <div className="absolute bottom-4 left-4">
                  <div className="flex gap-1">
                    {listing.images
                      .filter((img: Image) => !img.isCover)
                      .slice(0, 3)
                      .map((img: Image, idx: number) => (
                        <div
                          key={idx}
                          className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer"
                        >
                          <img
                            src={img.url}
                            alt={`Property ${idx + 2}`}
                            className="w-full h-full object-cover"
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement, Event>
                            ) => {
                              e.currentTarget.src = fallbackImages[0].src;
                            }}
                          />
                        </div>
                      ))}
                    {listing.images.filter((img: Image) => !img.isCover)
                      .length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-black bg-opacity-60 border-2 border-white shadow-md flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          +
                          {listing.images.filter((img: Image) => !img.isCover)
                            .length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Image Count */}
              {listing.images && listing.images.length > 1 && (
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded-lg flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {listing.images.length}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                {listing.title}
              </h2>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                <span className="text-sm truncate">
                  {listing.area}, {listing.locality}, {listing.state}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {formatRent(listing.rentAmount, listing.paymentFrequency)}
                </span>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {listing.bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {listing.bathrooms}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium capitalize">
                    {listing.propertyType}
                  </span>
                </div>
              </div>

              {/* Landlord Status Info */}
              <div
                className={`border rounded-lg p-3 mb-4 ${
                  listing.landlordLivesInCompound
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                    : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-full ${
                      listing.landlordLivesInCompound
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Home
                      size={14}
                      className={
                        listing.landlordLivesInCompound
                          ? "text-blue-600"
                          : "text-gray-600"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-xs font-semibold ${
                        listing.landlordLivesInCompound
                          ? "text-blue-900"
                          : "text-gray-900"
                      }`}
                    >
                      {listing.landlordLivesInCompound
                        ? "Landlord On-Site"
                        : "Landlord Off-Site"}
                    </h4>
                    <p
                      className={`text-xs ${
                        listing.landlordLivesInCompound
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {listing.landlordLivesInCompound
                        ? "Quick assistance & security"
                        : "Remote management"}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.landlordLivesInCompound
                        ? "bg-blue-600 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {listing.landlordLivesInCompound ? "✓" : "○"}
                  </div>
                </div>
              </div>

              {/* Facilities */}
              {listing.facilities && listing.facilities.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {listing.facilities
                      .slice(0, 3)
                      .map((facility: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-medium"
                        >
                          {getFacilityIcon(facility)}
                          {facility}
                        </div>
                      ))}
                    {listing.facilities.length > 3 && (
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                        +{listing.facilities.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="flex items-center text-gray-600 mb-4 pb-4 border-b border-gray-100 mt-auto">
                <User className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm">
                  <span className="font-medium text-gray-700">Owner:</span>{" "}
                  {listing.creator?.id?.name || "Unknown"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/listing/${listing.id}`)}
                  className="flex-1 bg-green-600 cursor-pointer text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                  type="button"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => router.push(`/listing/edit/${listing.id}`)}
                  className="flex-1 px-3 py-2 rounded-lg cursor-pointer border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                  type="button"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(listing)}
                  className="px-3 py-2 rounded-lg cursor-pointer border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors font-medium text-sm flex items-center justify-center"
                  type="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Property
                </h3>
              </div>
              <button
                onClick={handleCancelDelete}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  "{selectedListing?.title}"
                </span>
                ?
              </p>
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                This action cannot be undone. The property listing will be
                permanently removed.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                type="button"
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingsGrid;
