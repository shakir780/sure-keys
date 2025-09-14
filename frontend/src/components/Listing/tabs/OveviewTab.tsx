import React from "react";
import { Calendar, Info } from "lucide-react";
import { Listing } from "store/types/listing";
import { formatDate } from "@lib/util";

interface OverviewTabProps {
  listing: Listing;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ listing }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700 leading-relaxed">{listing.description}</p>
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2" size={18} />
            Important Dates
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Listed:</span>
              <span className="font-medium">
                {formatDate(listing.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium">
                {formatDate(listing.updatedAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expires:</span>
              <span
                className={`font-medium ${
                  listing.isExpired ? "text-red-600" : "text-green-600"
                }`}
              >
                {formatDate(listing.expiresAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="mr-2" size={18} />
            Quick Stats
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Property ID:</span>
              <span className="font-medium font-mono text-sm">
                {listing.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Views:</span>
              <span className="font-medium">{listing.views}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Bids:</span>
              <span className="font-medium">{listing.activeBidsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
