"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Car,
  Shield,
  Wifi,
  Droplets,
  Wind,
  Eye,
  Heart,
  ChevronDown,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useGetListings } from "@hooks/useListing";
import Footer from "@components/Footer/page";

// TypeScript interfaces
interface Creator {
  id: {
    _id: string;
    name: string;
    email: string;
  };
  role: string;
}

interface Image {
  url: string;
  isCover: boolean;
}

interface VideoLink {
  url: string;
  platform: string;
  title: string;
}

interface AgentInviteDetails {
  commissionRate: number;
  preferredAgentType: string;
  additionalRequirements: string;
}

interface Listing {
  creator: Creator;
  _id: string;
  title: string;
  purpose: string;
  state: string;
  locality: string;
  area: string;
  streetEstateNeighbourhood: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  kitchens: number;
  propertySize: number;
  facilities: string[];
  rentAmount: number;
  paymentFrequency: string;
  availability: string;
  description: string;
  landlordLivesInCompound: boolean;
  images: Image[];
  photoNotes: string;
  videoLinks: VideoLink[];
  inviteAgentToBid: boolean;
  agentInviteDetails: AgentInviteDetails;
  status: string;
  views: number;
  isFeatured: boolean;
  agentBids: any[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  activeBidsCount: number;
  isExpired: boolean;
  id: string;
}

interface Pagination {
  current: number;
  pages: number;
  total: number;
}

interface ApiResponse {
  message: string;
  data: {
    listings: Listing[];
    pagination: Pagination;
  };
}

interface Filters {
  state: string;
  locality: string;
  area: string;
  propertyType: string;
  minRent: string;
  maxRent: string;
  bedrooms: string;
  bathrooms: string;
  inviteAgentToBid: string;
  landlordLivesInCompound: string;
}

interface UseGetListingsParams {
  page: number;
  limit: number;
  sort: string;
  state?: string;
  locality?: string;
  area?: string;
  propertyType?: string;
  minRent?: string;
  maxRent?: string;
  bedrooms?: string;
  bathrooms?: string;
  inviteAgentToBid?: string;
  landlordLivesInCompound?: string;
}

// Mock hook (replace with your actual hook)

const FindApartmentPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    state: "",
    locality: "",
    area: "",
    propertyType: "",
    minRent: "",
    maxRent: "",
    bedrooms: "",
    bathrooms: "",
    inviteAgentToBid: "",
    landlordLivesInCompound: "",
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("-createdAt");

  // Build API parameters
  const buildApiParams = (): UseGetListingsParams => {
    const params: UseGetListingsParams = {
      page: currentPage,
      limit: 12,
      sort: sortBy,
    };

    // Only add filters that have values
    if (filters.state) params.state = filters.state;
    if (filters.locality) params.locality = filters.locality;
    if (filters.area) params.area = filters.area;
    if (filters.propertyType) params.propertyType = filters.propertyType;
    if (filters.minRent) params.minRent = filters.minRent;
    if (filters.maxRent) params.maxRent = filters.maxRent;
    if (filters.bedrooms) params.bedrooms = filters.bedrooms;
    if (filters.bathrooms) params.bathrooms = filters.bathrooms;
    if (filters.inviteAgentToBid)
      params.inviteAgentToBid = filters.inviteAgentToBid;
    if (filters.landlordLivesInCompound)
      params.landlordLivesInCompound = filters.landlordLivesInCompound;

    return params;
  };

  const {
    data,
    isLoading,
    error,
  }: { data?: ApiResponse; isLoading: boolean; error: any } = useGetListings(
    buildApiParams()
  );

  // Handle filter changes (triggers new API call)
  const handleFilterChange = (key: keyof Filters, value: string): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle sort change
  const handleSortChange = (newSort: string): void => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    setFilters({
      state: "",
      locality: "",
      area: "",
      propertyType: "",
      minRent: "",
      maxRent: "",
      bedrooms: "",
      bathrooms: "",
      inviteAgentToBid: "",
      landlordLivesInCompound: "",
    });
    setCurrentPage(1);
  };

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getFacilityIcon = (facility: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Security: Shield,
      Parking: Car,
      "Air Conditioning": Wind,
      Water: Droplets,
      Internet: Wifi,
    };
    return iconMap[facility] || Shield;
  };

  const handleViewDetails = (): void => {
    setShowAuthModal(true);
  };

  const getCoverImage = (images: Image[]): string => {
    const coverImage = images.find((img) => img.isCover);
    return (
      coverImage?.url ||
      images[0]?.url ||
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    );
  };

  const AuthModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Sign In Required
          </h3>
          <p className="text-gray-600">
            To view detailed property information and contact landlords, please
            sign in to your account.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Sign In
          </button>
          <button className="w-full border border-green-600 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            Create Account
          </button>
        </div>

        <button
          onClick={() => setShowAuthModal(false)}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 transition-colors"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Properties...
          </h2>
          <p className="text-gray-600">Finding the best apartments for you</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load the property listings. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-green-600">SureKeys</div>
              <div className="text-gray-600">/</div>
              <div className="text-gray-900 font-medium">Find Apartments</div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/auth"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign In
              </a>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                List Property
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Discover quality rental properties in Abuja with verified
              landlords and transparent pricing
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by locality (e.g., Durumi, Wuse II, Garki)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    value={filters.locality}
                    onChange={(e) =>
                      handleFilterChange("locality", e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                >
                  <option value="">All States</option>
                  <option value="FCT">FCT</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Kano">Kano</option>
                  <option value="Rivers">Rivers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locality
                </label>
                <input
                  type="text"
                  placeholder="e.g., Durumi, Wuse II"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.locality}
                  onChange={(e) =>
                    handleFilterChange("locality", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.propertyType}
                  onChange={(e) =>
                    handleFilterChange("propertyType", e.target.value)
                  }
                >
                  <option value="">All Types</option>
                  <option value="flat">Flat</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.bedrooms}
                  onChange={(e) =>
                    handleFilterChange("bedrooms", e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Rent (₦)
                </label>
                <input
                  type="number"
                  placeholder="Min rent"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.minRent}
                  onChange={(e) =>
                    handleFilterChange("minRent", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Rent (₦)
                </label>
                <input
                  type="number"
                  placeholder="Max rent"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.maxRent}
                  onChange={(e) =>
                    handleFilterChange("maxRent", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.bathrooms}
                  onChange={(e) =>
                    handleFilterChange("bathrooms", e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4">4+ Bathrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Bidding
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.inviteAgentToBid}
                  onChange={(e) =>
                    handleFilterChange("inviteAgentToBid", e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="true">Agent Bidding Allowed</option>
                  <option value="false">No Agent Bidding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landlord in Compound
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.landlordLivesInCompound}
                  onChange={(e) =>
                    handleFilterChange(
                      "landlordLivesInCompound",
                      e.target.value
                    )
                  }
                >
                  <option value="">Any</option>
                  <option value="true">Landlord Lives in Compound</option>
                  <option value="false">Landlord Lives Elsewhere</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearAllFilters}
                className="text-green-600 hover:text-green-700 font-medium mr-4"
              >
                Clear All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Properties
            </h2>
            <p className="text-gray-600 mt-1">
              {data?.data?.pagination?.total || 0} properties found
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="-createdAt">Sort by: Newest</option>
              <option value="createdAt">Sort by: Oldest</option>
              <option value="rentAmount">Price: Low to High</option>
              <option value="-rentAmount">Price: High to Low</option>
              <option value="bedrooms">Bedrooms: Low to High</option>
              <option value="-bedrooms">Bedrooms: High to Low</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.listings?.map((listing: Listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={getCoverImage(listing.images)}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400";
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {listing.purpose}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                {listing.isFeatured && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {listing.title}
                  </h3>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(listing.rentAmount)}
                    <span className="text-sm text-gray-500 font-normal">
                      /{listing.paymentFrequency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {listing.locality}, {listing.area}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{listing.bathrooms} bath</span>
                  </div>
                  <div className="text-sm">{listing.propertySize} sqm</div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {listing.description}
                </p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.facilities.slice(0, 3).map((facility: string) => {
                    const IconComponent = getFacilityIcon(facility);
                    return (
                      <div
                        key={facility}
                        className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs"
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {facility}
                      </div>
                    );
                  })}
                  {listing.facilities.length > 3 && (
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                      +{listing.facilities.length - 3} more
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Listed by {listing.creator.id.name}
                  </div>
                  <button
                    onClick={handleViewDetails}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {data?.data?.listings?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearAllFilters}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {data?.data?.listings &&
          data.data.listings.length > 0 &&
          data?.data?.pagination &&
          data.data.pagination.current < data.data.pagination.pages && (
            <div className="text-center mt-12">
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-white border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Load More Properties
              </button>
            </div>
          )}
      </section>

      {/* Features Section */}

      {/* Auth Modal */}
      {showAuthModal && <AuthModal />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FindApartmentPage;
