"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetListing } from "@hooks/useListing";
import { Listing, TabType } from "store/types/listing";
import HeroSection from "@components/Listing/HeroSetion";
import ListingHeader from "@components/Listing/listingHeader";
import TabNavigation from "@components/Listing/tabNavigation";
import TabContent from "@components/Listing/tabContent";
import ImageModal from "@components/Listing/ImageModal";

const ListingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const params = useParams();
  const listingId = params?.id as string;
  const { data, isLoading, error } = useGetListing(listingId);

  const listing: Listing | undefined = data?.data;

  useEffect(() => {
    if (listing) {
      console.log("Listing response:", listing);
    }
  }, [listing]);

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    document.body.style.overflow = "unset";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600">
            The property you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        listing={listing}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        openImageModal={openImageModal}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ListingHeader listing={listing} />
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            listing={listing}
          />
          <TabContent
            activeTab={activeTab}
            listing={listing}
            openImageModal={openImageModal}
          />
        </div>
      </div>

      <ImageModal
        show={showImageModal}
        images={listing.images}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
        onClose={closeImageModal}
      />
    </div>
  );
};

export default ListingPage;
