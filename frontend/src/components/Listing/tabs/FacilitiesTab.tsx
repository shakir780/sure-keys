import { getFacilityIcon } from "@lib/util";
import React from "react";
import { Listing } from "store/types/listing";

interface FacilitiesTabProps {
  listing: Listing;
}

const FacilitiesTab: React.FC<FacilitiesTabProps> = ({ listing }) => {
  if (!listing.facilities || listing.facilities.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">🏠</div>
        <p>No facilities information available for this property.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Available Facilities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listing.facilities.map((facility, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-green-50 hover:to-green-100 transition-all duration-200 group"
          >
            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">
              {getFacilityIcon(facility)}
            </span>
            <span className="capitalize font-medium text-gray-800 group-hover:text-green-700">
              {facility}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesTab;
