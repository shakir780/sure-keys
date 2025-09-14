"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Camera,
  Video,
  FileText,
} from "lucide-react";
import { useGetListing, useUpdateListing } from "@hooks/useListing";
import { useParams } from "next/navigation";
import { Listing } from "store/types/listing";
import Loader from "@shared/Loader";
import { useUploadImage } from "@hooks/useUploadImage";
import { getToken } from "@lib/authStorage";

interface ImageFile {
  file?: File;
  preview?: string;
  url?: string;
  isCover: boolean;
  name?: string;
}

interface VideoLink {
  url: string;
  platform: string;
  title: string;
}

interface FormData {
  title: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  kitchens: number;
  propertySize: number;
  description: string;
  facilities: string[];
  paymentFrequency: string;
  availability: string;
  streetEstateNeighbourhood: string;
  images: ImageFile[];
  videoLinks: VideoLink[];
}
const PropertyEditForm = () => {
  // Pre-populated data from your listing
  const [formData, setFormData] = useState<FormData>({
    title: "",
    rentAmount: 0,
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    kitchens: 0,
    propertySize: 0,
    description: "",
    facilities: [],
    paymentFrequency: "yearly",
    availability: "yes",
    streetEstateNeighbourhood: "",
    images: [],
    videoLinks: [],
  });

  const facilityOptions = [
    "Security",
    "Parking",
    "Air Conditioning",
    "Water",
    "Internet",
    "Generator",
    "Gym",
    "Swimming Pool",
    "Garden",
    "Balcony",
    "Elevator",
  ];

  const params = useParams();

  const listingId = params?.id as string;
  const { data, isLoading, error } = useGetListing(listingId);

  const listing: Listing | undefined = data?.data;
  const { mutate: updateListing, isLoading: isUpdating } = useUpdateListing();

  useEffect(() => {
    if (listing) {
      console.log("Listing response:", listing);
      setFormData({
        title: listing.title || "",
        rentAmount: listing.rentAmount || 0,
        bedrooms: listing.bedrooms || 0,
        bathrooms: listing.bathrooms || 0,
        toilets: listing.toilets || 0,
        kitchens: listing.kitchens || 0,
        propertySize: listing.propertySize || 0,
        description: listing.description || "",
        facilities: listing.facilities || [],
        paymentFrequency: listing.paymentFrequency || "yearly",
        availability: listing.availability || "yes",
        streetEstateNeighbourhood: listing.streetEstateNeighbourhood || "",
        images:
          listing.images?.map((img) => ({
            url: img.url,
            isCover: img.isCover || false,
          })) || [],
        videoLinks:
          listing.videoLinks?.map((video) => ({
            url: video.url || "",
            platform: video.platform || "youtube",
            title: video.title || "",
          })) || [],
      });
    }
  }, [listing]);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const token = getToken();

  const uploadImageMutation = useUploadImage(token!);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Please select files under 5MB.`);
        continue;
      }

      try {
        // 🔥 Upload file via your mutation
        const res = await uploadImageMutation.mutateAsync(file);
        console.log(res);
        // res should contain { url: "https://..." }
        setFormData((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              url: res?.data?.url, // ✅ correct format
              isCover: prev.images.length === 0, // first image as cover
            },
          ],
        }));
      } catch (err) {
        console.error("Upload failed:", err);
        alert(`Failed to upload ${file.name}`);
      }
    }
    e.target.value = "";
  };

  const handleSetCoverImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isCover: i === index,
      })),
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleVideoChange = (
    index: number,
    field: keyof VideoLink,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      videoLinks: prev.videoLinks.map((video, i) =>
        i === index ? { ...video, [field]: value } : video
      ),
    }));
  };

  const handleRemoveVideo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      videoLinks: prev.videoLinks.filter((_, i) => i !== index),
    }));
  };

  const handleAddVideo = () => {
    setFormData((prev) => ({
      ...prev,
      videoLinks: [
        ...prev.videoLinks,
        { url: "", platform: "youtube", title: "" },
      ],
    }));
  };

  const handleSave = () => {
    if (!listingId) return;

    updateListing(
      { id: listingId, payload: formData },
      {
        onSuccess: () => {
          alert("Property updated successfully!");
        },
        onError: (err: any) => {
          console.error("Update failed:", err);
          alert("Failed to update property. Try again.");
        },
      }
    );
  };
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes?")) {
      // Reset to original listing values
      if (listing) {
        setFormData({
          title: listing.title || "",
          rentAmount: listing.rentAmount || 0,
          bedrooms: listing.bedrooms || 0,
          bathrooms: listing.bathrooms || 0,
          toilets: listing.toilets || 0,
          kitchens: listing.kitchens || 0,
          propertySize: listing.propertySize || 0,
          description: listing.description || "",
          facilities: listing.facilities || [],
          paymentFrequency: listing.paymentFrequency || "yearly",
          availability: listing.availability || "yes",
          streetEstateNeighbourhood: listing.streetEstateNeighbourhood || "",
          images:
            listing.images?.map((img) => ({
              url: img.url,
              isCover: img.isCover || false,
            })) || [],
          videoLinks:
            listing.videoLinks?.map((video) => ({
              url: video.url || "",
              platform: video.platform || "youtube",
              title: video.title || "",
            })) || [],
        });
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading property details
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Property not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Home className="text-green-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Edit Property Listing
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Update your property information
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset Changes
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Home className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData?.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter property title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Property Size (sqm) *
                  </label>
                  <input
                    type="number"
                    name="propertySize"
                    value={formData?.propertySize}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter property size"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-green-600 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="streetEstateNeighbourhood"
                  value={formData?.streetEstateNeighbourhood}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter full address"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-green-600 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                  placeholder="Describe your property in detail..."
                />
              </div>
            </div>
          </div>

          {/* Room Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">
                  Room Configuration
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData?.bedrooms}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData?.bathrooms}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Toilets
                  </label>
                  <input
                    type="number"
                    name="toilets"
                    value={formData?.toilets}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Kitchens
                  </label>
                  <input
                    type="number"
                    name="kitchens"
                    value={formData?.kitchens}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Availability */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">
                  Pricing & Availability
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Rent Amount (₦) *
                  </label>
                  <input
                    type="number"
                    name="rentAmount"
                    value={formData?.rentAmount}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter rent amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Payment Frequency *
                  </label>
                  <select
                    name="paymentFrequency"
                    value={formData?.paymentFrequency}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-600 mb-2">
                    Available for Rent *
                  </label>
                  <select
                    name="availability"
                    value={formData?.availability}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">
                  Facilities
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {facilityOptions.map((facility) => (
                  <label
                    key={facility}
                    className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData?.facilities?.includes(facility)}
                      onChange={() => handleFacilityChange(facility)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700 text-sm font-medium">
                      {facility}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="text-green-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Property Images
                  </h2>
                </div>
                <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <Upload size={16} />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="p-6">
              {/* Upload Area */}
              <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                <Camera className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-2">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-gray-500">
                  Support: JPG, PNG, GIF (Max 5MB each)
                </p>
                <label className="inline-block mt-4 px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  Select Files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Existing Images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData?.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e: any) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xNSA5LTYgNi02LTYiIHN0cm9rZT0iIzk5YTNhZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+";
                      }}
                    />

                    {/* Cover Badge */}
                    {image.isCover && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">
                          Cover
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                        {!image.isCover && (
                          <button
                            onClick={() => handleSetCoverImage(index)}
                            className="bg-white text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {formData?.images.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Camera size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm">
                    Upload some images to showcase your property
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Video Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="text-green-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Video Links
                  </h2>
                </div>
                <button
                  onClick={handleAddVideo}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Video
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {formData?.videoLinks?.map((video, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video URL
                        </label>
                        <input
                          type="url"
                          value={video.url}
                          onChange={(e) =>
                            handleVideoChange(index, "url", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Enter video URL"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Platform
                        </label>
                        <select
                          value={video.platform}
                          onChange={(e) =>
                            handleVideoChange(index, "platform", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        >
                          <option value="youtube">YouTube</option>
                          <option value="vimeo">Vimeo</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => handleRemoveVideo(index)}
                          className="w-full py-2 px-3 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) =>
                          handleVideoChange(index, "title", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Enter video title"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pb-8">
            <button
              onClick={handleReset}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset All Changes
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditForm;
