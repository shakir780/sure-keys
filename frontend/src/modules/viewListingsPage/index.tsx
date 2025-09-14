"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Home,
  Eye,
  Heart,
  Share2,
  Phone,
  Mail,
  User,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Shield,
  Wifi,
  Car,
  Dumbbell,
  Waves,
} from "lucide-react";

const PropertyDetailsPage = ({ listingId = "507f1f77bcf86cd799439011" }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock fallback data for demo
  const mockListing = {
    _id: "507f1f77bcf86cd799439011",
    title: "Luxury 3 Bedroom Apartment with Pool View",
    rentAmount: 450000,
    paymentFrequency: "monthly",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "apartment",
    area: "Victoria Island",
    locality: "Lagos Island",
    state: "Lagos",
    status: "available",
    landlordLivesInCompound: true,
    inviteAgentToBid: false,
    description:
      "This stunning 3-bedroom apartment offers modern luxury living with breathtaking pool views. Located in the heart of Victoria Island, it features high-end finishes, spacious rooms, and access to premium amenities including a swimming pool, gym, and 24/7 security.",
    facilities: [
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Parking",
      "WiFi",
      "Generator",
      "Water Supply",
      "Air Conditioning",
    ],
    images: [
      { url: "/api/placeholder/800/600", isCover: true },
      { url: "/api/placeholder/800/600", isCover: false },
      { url: "/api/placeholder/800/600", isCover: false },
      { url: "/api/placeholder/800/600", isCover: false },
    ],
    creator: {
      id: {
        name: "John Okafor",
        email: "john@example.com",
        phone: "+234 80 1234 5678",
        avatar: "/api/placeholder/60/60",
      },
    },
    views: 156,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
  };

  useEffect(() => {
    fetchListing();
  }, [listingId]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual endpoint
      const response = await fetch(`/api/listings/${listingId}`);

      if (response.ok) {
        const data = await response.json();
        setListing(data.data);
      } else {
        // Use mock data for demo
        setTimeout(() => {
          setListing(mockListing);
          setLoading(false);
        }, 1000);
        return;
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching listing:", err);
      // Use mock data on error
      setListing(mockListing);
      setLoading(false);
    }
  };

  const formatRent = (amount, frequency) => {
    const formatted = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

    return `${formatted}/${frequency}`;
  };

  const getFacilityIcon = (facility) => {
    const iconMap = {
      "Swimming Pool": <Waves className="w-4 h-4" />,
      Gym: <Dumbbell className="w-4 h-4" />,
      WiFi: <Wifi className="w-4 h-4" />,
      Parking: <Car className="w-4 h-4" />,
      "24/7 Security": <Shield className="w-4 h-4" />,
    };
    return iconMap[facility] || <Star className="w-4 h-4" />;
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading property details</p>
          <button
            onClick={fetchListing}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Property not found</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 text-green-600 hover:text-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Listings</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={
                    listing.images[currentImageIndex]?.url ||
                    "/api/placeholder/800/600"
                  }
                  alt={listing.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-600 text-white">
                    Available
                  </span>
                  {listing.landlordLivesInCompound && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
                      Landlord On-Site
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {listing.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index
                          ? "border-green-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    <span>
                      {listing.area}, {listing.locality}, {listing.state}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {formatRent(listing.rentAmount, listing.paymentFrequency)}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {listing.views} views
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <Bed className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {listing.bedrooms}
                  </div>
                  <div className="text-gray-600 text-sm">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <Bath className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {listing.bathrooms}
                  </div>
                  <div className="text-gray-600 text-sm">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 capitalize">
                    {listing.propertyType}
                  </div>
                  <div className="text-gray-600 text-sm">Property Type</div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Facilities */}
              {listing.facilities && listing.facilities.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Amenities & Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {listing.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg"
                      >
                        {getFacilityIcon(facility)}
                        <span className="font-medium">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Landlord Status */}
              <div className="mt-8">
                <div
                  className={`border rounded-xl p-4 ${
                    listing.landlordLivesInCompound
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                      : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        listing.landlordLivesInCompound
                          ? "bg-blue-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Home
                        size={24}
                        className={
                          listing.landlordLivesInCompound
                            ? "text-blue-600"
                            : "text-gray-600"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold ${
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
                        className={`text-sm ${
                          listing.landlordLivesInCompound
                            ? "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        {listing.landlordLivesInCompound
                          ? "Property owner lives in the same compound for quick assistance and security"
                          : "Property is managed remotely by the landlord"}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full font-medium ${
                        listing.landlordLivesInCompound
                          ? "bg-blue-600 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {listing.landlordLivesInCompound
                        ? "✓ Available"
                        : "○ Remote"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Owner */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={
                      listing.creator?.id?.avatar || "/api/placeholder/60/60"
                    }
                    alt={listing.creator?.id?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {listing.creator?.id?.name}
                    </h3>
                    <p className="text-gray-600 text-sm">Property Owner</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current text-yellow-400"
                        />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">(4.8)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Owner
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Typically responds within</span>
                    <span className="font-medium">1 hour</span>
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Property Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-medium">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-medium">
                      #{listing._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-green-600 capitalize">
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{listing.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={listing.images[currentImageIndex]?.url}
            alt={listing.title}
            className="max-w-full max-h-full object-contain"
          />

          {listing.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
