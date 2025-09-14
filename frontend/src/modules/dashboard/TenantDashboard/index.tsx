import React from "react";
import {
  Home,
  DollarSign,
  FileText,
  Users,
  Calendar,
  Phone,
  Download,
  CreditCard,
} from "lucide-react";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-lg shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  const sizeClasses = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5";

  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    secondary:
      "bg-gray-100 text-green-600 hover:bg-gray-200 border border-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
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

const TenantDashboard: React.FC = () => {
  // Mock data - replace with actual data from your API
  const tenantData = {
    apartment: {
      name: "Sunset Apartments Unit 4B",
      address: "123 Oak Street, Downtown",
      landlord: "Sarah Johnson",
      landlordPhone: "(555) 123-4567",
      leaseStatus: "Active", // "Active" | "Ending Soon"
      leaseEndDate: "2024-12-31",
    },
    rent: {
      amount: 1250,
      nextDueDate: "2025-01-01",
      isOverdue: false,
      daysUntilDue: 7,
    },
    receipts: {
      paymentsThisYear: 11,
      lastReceiptDate: "2024-12-01",
      totalPaid: 13750,
    },
    community: {
      lastMessage: "Hey everyone! The maintenance team will be...",
      unreadCount: 3,
      lastMessageTime: "2 hours ago",
    },
  };

  const handlePayRent = () => {
    console.log("Navigate to payment portal");
  };

  const handleViewHistory = () => {
    console.log("Navigate to payment history");
  };

  const handleContactLandlord = () => {
    console.log("Open contact modal or dial");
  };

  const handleDownloadReceipt = () => {
    console.log("Download last receipt");
  };

  const handleJoinChat = () => {
    console.log("Navigate to community chat");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Tenant Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's your property overview.
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* My Apartment Card */}
        <DashboardCard className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  My Apartment
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tenantData.apartment.leaseStatus === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tenantData.apartment.leaseStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">
                {tenantData.apartment.name}
              </h4>
              <p className="text-gray-600 text-sm">
                {tenantData.apartment.address}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Landlord</p>
                <p className="font-medium text-gray-900">
                  {tenantData.apartment.landlord}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleContactLandlord}
              >
                <Phone className="h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>
        </DashboardCard>

        {/* Rent Status Card */}
        <DashboardCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Rent Status</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${tenantData.rent.amount}
              </p>
              <p className="text-sm text-gray-600">Monthly rent</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  Next Due
                </span>
              </div>
              <p
                className={`text-sm ${
                  tenantData.rent.isOverdue
                    ? "text-red-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {tenantData.rent.nextDueDate}
                {!tenantData.rent.isOverdue &&
                  ` (${tenantData.rent.daysUntilDue} days)`}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={handlePayRent}>
                <CreditCard className="h-4 w-4" />
                Pay Rent
              </Button>
              <Button variant="secondary" size="sm" onClick={handleViewHistory}>
                History
              </Button>
            </div>
          </div>
        </DashboardCard>

        {/* Receipts / Rent History Card */}
        <DashboardCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Receipts</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {tenantData.receipts.paymentsThisYear}
                </p>
                <p className="text-xs text-gray-600">Payments this year</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  ${tenantData.receipts.totalPaid.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Total paid</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Last Receipt
              </p>
              <p className="text-xs text-gray-600">
                {tenantData.receipts.lastReceiptDate}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownloadReceipt}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={handleViewHistory}
              >
                View All
              </Button>
            </div>
          </div>
        </DashboardCard>

        {/* Community Chat Card */}
        <DashboardCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Community Chat
              </h3>
              {tenantData.community.unreadCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {tenantData.community.unreadCount}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-900 mb-2">Latest Message</p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {tenantData.community.lastMessage}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {tenantData.community.lastMessageTime}
              </p>
            </div>

            <Button size="sm" className="w-full" onClick={handleJoinChat}>
              <Users className="h-4 w-4" />
              Join Discussion
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Quick Actions Footer */}
      <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm">
            Report Maintenance Issue
          </Button>
          <Button variant="secondary" size="sm">
            Schedule Inspection
          </Button>
          <Button variant="secondary" size="sm">
            Update Profile
          </Button>
          <Button variant="secondary" size="sm">
            Download Lease
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
