import React, { JSX, useState } from "react";
import {
  BedDouble,
  Bath,
  MapPin,
  Home,
  Toilet,
  UtensilsCrossed,
  Users,
  UserCheck,
  Square,
  CreditCard,
  Calendar,
  Video,
  ExternalLink,
  Play,
} from "lucide-react";
import Image from "next/image";
import { usePropertyFormStore } from "store/propertyFormStore";
import { useCreateListing } from "@hooks/useListing";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getToken } from "@lib/authStorage";

const PreviewPage = ({ onBack }: { onBack: () => void }) => {
  const { address, details, photos } = usePropertyFormStore((state) => state);

  console.log(details);

  const mainImage = photos?.images?.find((img) => img.isCover);
  const subImages = photos?.images?.filter((img) => !img.isCover).slice(0, 4);

  console.log(details);
  const token = getToken();

  const { mutate: create, isPending } = useCreateListing(token!);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Video platform icon helper
  const getPlatformIcon = (platform: string): JSX.Element => {
    const iconClass = "w-4 h-4";
    const safePlatform = platform || "other";

    switch (safePlatform) {
      case "youtube":
        return <span className={`${iconClass} text-red-600`}>▶</span>;
      case "tiktok":
        return <span className={`${iconClass} text-black`}>🎵</span>;
      case "facebook":
        return <span className={`${iconClass} text-blue-600`}>f</span>;
      case "instagram":
        return <span className={`${iconClass} text-pink-600`}>📷</span>;
      case "vimeo":
        return <span className={`${iconClass} text-blue-500`}>V</span>;
      case "twitter":
        return <span className={`${iconClass} text-blue-400`}>🐦</span>;
      default:
        return <Video className={iconClass} />;
    }
  };

  const handleSubmit = async () => {
    if (!address || !details) return;

    const payload = {
      ...address,
      ...details,
      role: "landlord",
      rentAmount: parseFloat(details?.rentAmount.replace(/[^\d.]/g, "")),
      photoNotes: photos?.photoNotes,
      images: photos?.images?.map((img) => ({
        url: img.url,
        public_id: img.public_id,
        isCover: img.isCover,
      })),
      videoLinks: photos?.videoLinks || [], // Include video links
      ...(details.agentInviteDetails && {
        agentInviteDetails: details.agentInviteDetails,
      }),
    };

    try {
      await create(payload);

      // More specific invalidation - adjust based on your actual query key structure
      queryClient.invalidateQueries({
        queryKey: [
          "listings",
          {
            page: 1,
            limit: 12,
            sort: "-createdAt",
          },
        ],
      });

      // Or invalidate all listings queries
      queryClient.invalidateQueries({ queryKey: ["listings"] });

      router.push("/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  console.log(photos);
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Image */}
        {mainImage && (
          <div className="md:col-span-2">
            <Image
              src={mainImage.url}
              alt="Main Image"
              width={900}
              height={600}
              className="w-full h-80 md:h-[24rem] rounded-lg object-cover"
              onError={(e) => {
                console.error("Main image failed to load:", mainImage.url);
                e.currentTarget.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        )}

        {/* Sub Images */}
        <div className="grid grid-cols-2 gap-2">
          {subImages?.map((img, index) => (
            <Image
              key={`${img.public_id}-${index}`}
              src={img.url}
              alt={`Sub Image ${index + 1}`}
              width={200}
              height={150}
              className="w-full h-36 rounded-lg object-cover"
              onError={(e) => {
                console.error("Sub image failed to load:", img.url);
                e.currentTarget.src = "/placeholder-image.jpg";
              }}
            />
          ))}
        </div>
      </div>

      {/* Video Links Section */}
      {photos?.videoLinks && photos.videoLinks.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <Video size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-900">
                Property Videos
              </h3>
              <p className="text-xs text-purple-700">
                Watch video tours and highlights of this property
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {photos.videoLinks.map((linkData: any, index: number) => {
              // Normalize the link data to handle different formats
              const link =
                typeof linkData === "string"
                  ? { url: linkData, title: "", platform: "other" }
                  : {
                      url: linkData.url || "",
                      title: linkData.title || "",
                      platform: linkData.platform || "other",
                    };

              // Safe platform name function
              const getPlatformDisplayName = (platform: string): string => {
                if (!platform || platform.length === 0) return "Video";
                return platform.charAt(0).toUpperCase() + platform.slice(1);
              };

              // Enhanced getPlatformIcon function

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                      {getPlatformIcon(link.platform)}
                    </div>
                    <div className="absolute -top-1 -right-1 bg-green-500 p-1 rounded-full">
                      <Play className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {link.title ||
                          `${getPlatformDisplayName(link.platform)} Video`}
                      </p>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-500 capitalize">
                      {link.platform} • Click to watch
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Title + Location */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          {address?.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-gray-400" />
          {address?.streetEstateNeighbourhood}, {address?.area},{" "}
          {address?.locality}, {address?.state}
        </div>
      </div>

      {/* Landlord Lives in Compound - Highlight Badge */}
      {details?.landlordLivesInCompound && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Home size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900">
                Landlord On-Site
              </h3>
              <p className="text-xs text-blue-700">
                Property owner lives in the same compound for quick assistance
                and security
              </p>
            </div>
            <div className="ml-auto">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                ✓ Available
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Property Details + Meta Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left - Property Details */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Property Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex flex-col">
              <span className="font-medium">Bedrooms</span>
              <div className="flex items-center gap-1">
                <BedDouble size={16} /> {details?.bedrooms}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Bathrooms</span>
              <div className="flex items-center gap-1">
                <Bath size={16} /> {details?.bathrooms}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Toilets</span>
              <div className="flex items-center gap-1">
                <Toilet size={16} /> {details?.toilets}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Kitchens</span>
              <div className="flex items-center gap-1">
                <UtensilsCrossed size={16} /> {details?.kitchens}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Property Type</span>
              <div className="flex items-center gap-1">
                <Home size={16} /> {address?.propertyType}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Purpose</span>
              <span>{address?.purpose}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">State</span>
              <span>{address?.state}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Locality</span>
              <span>{address?.locality}</span>
            </div>
          </div>

          {/* Property Features Section */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              Property Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Property Size */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <div className="bg-gray-200 p-1.5 rounded">
                  <Square size={14} className="text-gray-600" />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Size</span>
                  <p className="text-sm font-medium text-gray-800">
                    {details?.propertySize} m²
                  </p>
                </div>
              </div>

              {/* Landlord on-site indicator */}
              <div
                className={`flex items-center gap-2 p-2 rounded-md ${
                  details?.landlordLivesInCompound
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50"
                }`}
              >
                <div
                  className={`p-1.5 rounded ${
                    details?.landlordLivesInCompound
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  <UserCheck
                    size={14}
                    className={
                      details?.landlordLivesInCompound
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Landlord</span>
                  <p
                    className={`text-sm font-medium ${
                      details?.landlordLivesInCompound
                        ? "text-green-800"
                        : "text-gray-800"
                    }`}
                  >
                    {details?.landlordLivesInCompound ? "On-Site" : "Remote"}
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              <div
                className={`flex items-center gap-2 p-2 rounded-md ${
                  details?.availability === "yes"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div
                  className={`p-1.5 rounded ${
                    details?.availability === "yes"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  <Calendar
                    size={14}
                    className={
                      details?.availability === "yes"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Availability</span>
                  <p
                    className={`text-sm font-medium ${
                      details?.availability === "yes"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {details?.availability === "yes"
                      ? "Available Now"
                      : "Not Available"}
                  </p>
                </div>
              </div>

              {/* Payment Frequency */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <div className="bg-gray-200 p-1.5 rounded">
                  <CreditCard size={14} className="text-gray-600" />
                </div>
                <div>
                  <span className="text-xs text-gray-500">Payment</span>
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {details?.paymentFrequency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          {details?.facilities && details.facilities.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Facilities</h4>
              <div className="flex flex-wrap gap-2">
                {details?.facilities.map((facility: any, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {details?.description && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {details?.description}
              </p>
            </div>
          )}

          {/* Optional Photo Notes */}
          {photos?.photoNotes && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-1">
                Additional Notes
              </h4>
              <p className="text-sm text-gray-600">{photos?.photoNotes}</p>
            </div>
          )}

          {/* Agent Invitation Preview */}
          {details?.inviteAgentToBid && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Users size={18} className="text-green-600" />
                Agent Invitation Details
              </h3>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {details?.agentInviteDetails.commissionRate && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Preferred Commission Rate:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {details.agentInviteDetails.commissionRate}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Preferred Agent Type:
                    </span>
                    <p className="text-sm text-gray-900 mt-1 capitalize">
                      {details?.agentInviteDetails.preferredAgentType === "any"
                        ? "Any Agent"
                        : details?.agentInviteDetails.preferredAgentType ===
                          "local"
                        ? "Local Agents"
                        : details?.agentInviteDetails.preferredAgentType ===
                          "experienced"
                        ? "Experienced Agents"
                        : details?.agentInviteDetails.preferredAgentType ===
                          "premium"
                        ? "Premium Agents"
                        : details?.agentInviteDetails.preferredAgentType}
                    </p>
                  </div>
                </div>

                {details?.agentInviteDetails.additionalRequirements && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Additional Requirements:
                    </span>
                    <p className="text-sm text-gray-900 mt-1">
                      {details?.agentInviteDetails.additionalRequirements}
                    </p>
                  </div>
                )}

                <div className="bg-white border border-green-300 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-green-600 text-sm">✓</div>
                    <div>
                      <p className="text-sm text-green-800 font-medium">
                        Agent invitation enabled
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Qualified agents will be able to submit proposals for
                        this property once published.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Pricing + CTA */}
        <div className="space-y-4">
          {/* Pricing Card */}
          <div className="border border-gray-200 bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {details?.rentAmount?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 capitalize">
                per {details?.paymentFrequency}
              </div>
            </div>

            {/* Key highlights */}
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Property Size</span>
                <span className="font-medium">{details?.propertySize} m²</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Bedrooms</span>
                <span className="font-medium">{details?.bedrooms}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Bathrooms</span>
                <span className="font-medium">{details?.bathrooms}</span>
              </div>
              {details?.landlordLivesInCompound && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-600">Landlord</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <UserCheck size={12} />
                    On-Site
                  </span>
                </div>
              )}
            </div>

            {/* Video count if available */}
            {photos?.videoLinks && photos.videoLinks.length > 0 && (
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <Video size={14} />
                  <span className="text-xs font-medium">
                    {photos.videoLinks.length} Video
                    {photos.videoLinks.length !== 1 ? "s" : ""} Available
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <div className="border border-gray-100 bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Ready to post?
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              All looks good. Submit your listing when you're ready.
            </p>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isPending
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isPending ? "Submitting..." : "Submit Listing"}
            </button>
            <button
              onClick={onBack}
              disabled={isPending}
              className="w-full mt-2 text-sm text-gray-500 hover:underline disabled:cursor-not-allowed"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
