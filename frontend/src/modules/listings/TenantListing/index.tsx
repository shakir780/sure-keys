import React, { useState } from "react";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Car,
  Wifi,
  Zap,
  Shield,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Star,
  ArrowLeft,
  Share2,
  Download,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  address: string;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  rentFrequency: "monthly" | "annually";
  images: string[];
  amenities: string[];
  description: string;
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  features: {
    parking: boolean;
    furnished: boolean;
    petFriendly: boolean;
    internet: boolean;
    security: boolean;
    generator: boolean;
  };
  availability: "available" | "rented" | "pending";
  rating: number;
  reviews: number;
  datePosted: string;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClasses = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 disabled:hover:bg-green-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    ghost: "text-green-600 hover:bg-green-50",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const PropertyCard: React.FC<{
  property: Property;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onViewDetails: (id: string) => void;
  viewMode: "grid" | "list";
}> = ({
  property,
  isWishlisted,
  onToggleWishlist,
  onViewDetails,
  viewMode,
}) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-300">
        <div className="flex gap-4">
          <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={property.images[0] || "/api/placeholder/300/200"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.address}</span>
                </div>
              </div>

              <button
                onClick={() => onToggleWishlist(property.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>
                  {property.rating} ({property.reviews})
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  ₦{property.rent.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">
                    /{property.rentFrequency}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Posted {property.datePosted}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(property.id)}
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={property.images[0] || "/api/placeholder/300/200"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => onToggleWishlist(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.availability === "available"
                ? "bg-green-100 text-green-800"
                : property.availability === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {property.availability.charAt(0).toUpperCase() +
              property.availability.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{property.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {property.features.parking && (
            <Car className="h-4 w-4 text-gray-500" />
          )}
          {property.features.internet && (
            <Wifi className="h-4 w-4 text-gray-500" />
          )}
          {property.features.security && (
            <Shield className="h-4 w-4 text-gray-500" />
          )}
          {property.features.generator && (
            <Zap className="h-4 w-4 text-gray-500" />
          )}
        </div>

        <div className="flex justify-between items-end pt-2 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-green-600">
              ₦{property.rent.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">/{property.rentFrequency}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(property.id)}
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

const PropertyDetails: React.FC<{
  property: Property;
  onBack: () => void;
  onRentNow: (id: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}> = ({ property, onBack, onRentNow, isWishlisted, onToggleWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Button>

        <div className="flex-1" />

        <div className="flex gap-2">
          <Button variant="ghost">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" onClick={() => onToggleWishlist(property.id)}>
            <Heart
              className={`h-4 w-4 ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {isWishlisted ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={
                  property.images[currentImageIndex] ||
                  "/api/placeholder/800/400"
                }
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? "border-green-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-5 w-5" />
                <span>
                  {property.address}, {property.location}
                </span>
              </div>

              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-600" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>
                    {property.rating} ({property.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Features
              </h3>
              <div className="flex flex-wrap gap-3">
                {property.features.parking && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Car className="h-4 w-4" /> Parking
                  </span>
                )}
                {property.features.internet && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Wifi className="h-4 w-4" /> Internet
                  </span>
                )}
                {property.features.security && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Shield className="h-4 w-4" /> Security
                  </span>
                )}
                {property.features.generator && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Zap className="h-4 w-4" /> Generator
                  </span>
                )}
                {property.features.furnished && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="h-4 w-4" /> Furnished
                  </span>
                )}
                {property.features.petFriendly && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="h-4 w-4" /> Pet Friendly
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price and CTA */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-green-600">
                ₦{property.rent.toLocaleString()}
                <span className="text-lg font-normal text-gray-600">
                  /{property.rentFrequency}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Posted {property.datePosted}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => onRentNow(property.id)}
                disabled={property.availability !== "available"}
              >
                <Calendar className="h-5 w-5" />
                {property.availability === "available"
                  ? "Apply to Rent"
                  : "Not Available"}
              </Button>

              <Button variant="outline" size="lg" className="w-full">
                <Calendar className="h-5 w-5" />
                Schedule Tour
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                Contact Landlord
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {property.landlord.avatar ? (
                      <img
                        src={property.landlord.avatar}
                        alt={property.landlord.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {property.landlord.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {property.landlord.name}
                    </p>
                    <p className="text-sm text-gray-600">Property Owner</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Availability</span>
                <span
                  className={`font-medium ${
                    property.availability === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {property.availability.charAt(0).toUpperCase() +
                    property.availability.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Furnished</span>
                <span className="font-medium">
                  {property.features.furnished ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pet Friendly</span>
                <span className="font-medium">
                  {property.features.petFriendly ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantListings: React.FC = () => {
  const [currentView, setCurrentView] = useState<"listings" | "details">(
    "listings"
  );
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(["1", "3"]); // Mock wishlisted properties
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    location: "",
    type: "",
  });

  // Mock properties data
  const properties: Property[] = [
    {
      id: "1",
      title: "Modern 2-Bedroom Apartment",
      address: "15 Victoria Island Road",
      location: "Victoria Island, Lagos",
      type: "2-Bedroom Flat",
      bedrooms: 2,
      bathrooms: 2,
      rent: 1200000,
      rentFrequency: "annually",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      amenities: [
        "Swimming Pool",
        "Gym",
        "24/7 Security",
        "Parking",
        "Generator",
        "Internet",
      ],
      description:
        "Beautiful modern apartment in the heart of Victoria Island. Features spacious rooms, modern fixtures, and access to premium amenities. Perfect for professionals working in the area.",
      landlord: {
        name: "Mr. Adebayo",
        phone: "+234 801 234 5678",
        email: "adebayo@email.com",
      },
      features: {
        parking: true,
        furnished: true,
        petFriendly: false,
        internet: true,
        security: true,
        generator: true,
      },
      availability: "available",
      rating: 4.8,
      reviews: 24,
      datePosted: "2 days ago",
    },
    {
      id: "2",
      title: "Luxury 3-Bedroom Duplex",
      address: "8 Banana Island Estate",
      location: "Banana Island, Lagos",
      type: "3-Bedroom Duplex",
      bedrooms: 3,
      bathrooms: 3,
      rent: 2500000,
      rentFrequency: "annually",
      images: ["/api/placeholder/400/300"],
      amenities: [
        "Private Pool",
        "Garden",
        "Maid Quarters",
        "Parking",
        "Security",
        "Generator",
      ],
      description:
        "Luxurious duplex in exclusive Banana Island estate. Spacious living areas, private garden, and premium finishes throughout. Ideal for families seeking upscale living.",
      landlord: {
        name: "Mrs. Johnson",
        phone: "+234 802 345 6789",
        email: "johnson@email.com",
      },
      features: {
        parking: true,
        furnished: false,
        petFriendly: true,
        internet: true,
        security: true,
        generator: true,
      },
      availability: "available",
      rating: 4.9,
      reviews: 18,
      datePosted: "1 week ago",
    },
    {
      id: "3",
      title: "Affordable 1-Bedroom Studio",
      address: "22 Surulere Road",
      location: "Surulere, Lagos",
      type: "1-Bedroom Studio",
      bedrooms: 1,
      bathrooms: 1,
      rent: 450000,
      rentFrequency: "annually",
      images: ["/api/placeholder/400/300"],
      amenities: ["Parking", "Security", "Internet Ready"],
      description:
        "Cozy and affordable studio apartment perfect for young professionals. Well-maintained building with basic amenities and good transportation links.",
      landlord: {
        name: "Mr. Okafor",
        phone: "+234 803 456 7890",
        email: "okafor@email.com",
      },
      features: {
        parking: true,
        furnished: false,
        petFriendly: false,
        internet: false,
        security: true,
        generator: false,
      },
      availability: "pending",
      rating: 4.2,
      reviews: 12,
      datePosted: "3 days ago",
    },
    {
      id: "4",
      title: "Family 4-Bedroom House",
      address: "5 Lekki Phase 1",
      location: "Lekki, Lagos",
      type: "4-Bedroom Detached",
      bedrooms: 4,
      bathrooms: 4,
      rent: 1800000,
      rentFrequency: "annually",
      images: ["/api/placeholder/400/300"],
      amenities: [
        "Swimming Pool",
        "Garden",
        "Parking",
        "Security",
        "Generator",
        "Internet",
      ],
      description:
        "Spacious family home in serene Lekki environment. Large compound, multiple living areas, and excellent security. Perfect for families with children.",
      landlord: {
        name: "Mrs. Emeka",
        phone: "+234 804 567 8901",
        email: "emeka@email.com",
      },
      features: {
        parking: true,
        furnished: false,
        petFriendly: true,
        internet: true,
        security: true,
        generator: true,
      },
      availability: "available",
      rating: 4.7,
      reviews: 31,
      datePosted: "5 days ago",
    },
  ];

  const filteredProperties = properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleToggleWishlist = (propertyId: string) => {
    setWishlist((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleViewDetails = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setCurrentView("details");
    }
  };

  const handleRentNow = (propertyId: string) => {
    console.log("Apply to rent property:", propertyId);
    // Navigate to rental application form
  };

  if (currentView === "details" && selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty}
        onBack={() => setCurrentView("listings")}
        onRentNow={handleRentNow}
        isWishlisted={wishlist.includes(selectedProperty.id)}
        onToggleWishlist={handleToggleWishlist}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Find Your Perfect Home
          </h1>
          <p className="text-gray-600">
            Discover amazing properties available for rent
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-gray-600">Popular:</span>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Victoria Island
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Lekki
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              2 Bedrooms
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Under ₦1M
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProperties.length}
            </span>{" "}
            properties
          </p>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Sort by: Newest</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
          </select>
        </div>

        {/* Properties Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isWishlisted={wishlist.includes(property.id)}
              onToggleWishlist={handleToggleWishlist}
              onViewDetails={handleViewDetails}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {properties.length}+
            </p>
            <p className="text-sm text-gray-600">Available Properties</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">15+</p>
            <p className="text-sm text-gray-600">Locations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">4.7</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">24/7</p>
            <p className="text-sm text-gray-600">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantListings;
