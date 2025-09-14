"use client";
import React from "react";
import {
  Home,
  DollarSign,
  Phone,
  MessageCircle,
  Calendar,
  Wrench,
  FileText,
  Download,
  MapPin,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "xs";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "sm",
  onClick,
  className = "",
}) => {
  const baseClasses =
    "font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-1.5";
  const sizeClasses =
    size === "xs" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-100 text-green-600 hover:bg-gray-200",
    ghost: "text-green-600 hover:bg-green-50",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface StatusBadgeProps {
  status: "Active Lease" | "Expiring Soon" | "Ended" | "No Apartment Yet";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const badgeClasses = {
    "Active Lease": "bg-green-100 text-green-800",
    "Expiring Soon": "bg-yellow-100 text-yellow-800",
    Ended: "bg-red-100 text-red-800",
    "No Apartment Yet": "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeClasses[status]} ${className}`}
    >
      {status}
    </span>
  );
};

const index: React.FC = () => {
  // Mock data - replace with actual data from your API
  const apartmentData = {
    hasApartment: true,
    photo: null, // URL to apartment photo or null for placeholder
    address: "Sunset Apartments, 123 Oak Street, Unit 4B",
    location: "Downtown, Lagos",
    type: "2-Bedroom Flat",
    status: "Active Lease" as const,
    rent: {
      amount: 850000, // in Naira
      frequency: "annual",
      nextDueDate: "Mar 15, 2025",
      isPaidInAdvance: true,
      paidTill: "Dec 2025",
    },
    landlord: {
      name: "Mrs. Adebayo",
      role: "Landlord",
      phone: "+234 801 234 5678",
      email: "adebayo@email.com",
    },
    lease: {
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2025",
      status: "Active" as const,
      daysToExpiry: 456,
    },
    maintenance: {
      openRequests: 1,
      pendingCount: 1,
    },
    documents: {
      leaseAgreement: true,
      otherDocuments: 3,
    },
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking"],
    emergencyContact: "+234 700 HELP NOW",
  };

  const handleViewPayments = () => console.log("Navigate to payments history");
  const handleCallLandlord = () => console.log("Call landlord");
  const handleMessageLandlord = () => console.log("Message landlord");
  const handleReportIssue = () => console.log("Report maintenance issue");
  const handleDownloadLease = () => console.log("Download lease agreement");
  const handleViewDocuments = () => console.log("View all documents");
  const handleViewAmenities = () => console.log("View amenities");

  if (!apartmentData.hasApartment) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 text-center">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Home className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Apartment Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't been assigned an apartment. Contact your agent to get
            started.
          </p>
          <Button variant="primary">Contact Agent</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-600 mb-2">My Apartment</h1>
        <p className="text-gray-600">
          Your property overview and management hub
        </p>
      </div>

      <div className="space-y-6">
        {/* Apartment Overview */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Apartment Photo */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {apartmentData.photo ? (
                  <img
                    src={apartmentData.photo}
                    alt="Apartment"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Home className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No photo available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Apartment Details */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {apartmentData.type}
                    </h2>
                    <StatusBadge status={apartmentData.status} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{apartmentData.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Home className="h-4 w-4" />
                    <span className="text-sm">{apartmentData.location}</span>
                  </div>
                </div>
              </div>

              {/* Lease & Rent Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Rent Amount
                    </span>
                  </div>
                  <p className="text-lg font-bold text-green-900">
                    ₦{apartmentData.rent.amount.toLocaleString()}
                    <span className="text-sm font-normal">
                      /{apartmentData.rent.frequency}
                    </span>
                  </p>
                  {apartmentData.rent.isPaidInAdvance ? (
                    <p className="text-xs text-green-700">
                      Paid till {apartmentData.rent.paidTill}
                    </p>
                  ) : (
                    <p className="text-xs text-green-700">
                      Next due: {apartmentData.rent.nextDueDate}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleViewPayments}
                  >
                    <Eye className="h-4 w-4" />
                    View Payments
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Landlord/Agent Contact */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {apartmentData.landlord.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {apartmentData.landlord.role}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="xs"
                className="flex-1"
                onClick={handleCallLandlord}
              >
                <Phone className="h-3 w-3" />
                Call
              </Button>
              <Button
                variant="secondary"
                size="xs"
                className="flex-1"
                onClick={handleMessageLandlord}
              >
                <MessageCircle className="h-3 w-3" />
                Message
              </Button>
            </div>
          </div>

          {/* Lease Summary */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Lease Summary</h3>
            </div>
            <div className="space-y-2">
              <div className="text-xs">
                <span className="text-gray-600">Start: </span>
                <span className="font-medium">
                  {apartmentData.lease.startDate}
                </span>
              </div>
              <div className="text-xs">
                <span className="text-gray-600">End: </span>
                <span className="font-medium">
                  {apartmentData.lease.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <StatusBadge status="Active Lease" />
                <span className="text-xs text-gray-500">
                  {apartmentData.lease.daysToExpiry} days left
                </span>
              </div>
            </div>
          </div>

          {/* Quick Maintenance */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Wrench className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Maintenance</h3>
                {apartmentData.maintenance.pendingCount > 0 && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-orange-600">
                      {apartmentData.maintenance.pendingCount} pending
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleReportIssue}
            >
              <Wrench className="h-3 w-3" />
              Report an Issue
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Documents</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-700">
                  Lease Agreement (PDF)
                </span>
                <Button variant="ghost" size="xs" onClick={handleDownloadLease}>
                  <Download className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleViewDocuments}
              >
                View all documents ({apartmentData.documents.otherDocuments + 1}
                )
              </Button>
            </div>
          </div>

          {/* Amenities & Emergency */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-900">Amenities</h3>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {apartmentData.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
                {apartmentData.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{apartmentData.amenities.length - 3} more
                  </span>
                )}
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-1">Emergency Contact:</p>
                <p className="text-xs font-medium text-red-600">
                  {apartmentData.emergencyContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
