import React from "react";
import { Users, Award, UserCheck } from "lucide-react";
import { Listing } from "store/types/listing";
import { formatPrice } from "@lib/util";

interface AgentsTabProps {
  listing: Listing;
}

const AgentsTab: React.FC<AgentsTabProps> = ({ listing }) => {
  if (!listing.inviteAgentToBid) {
    return (
      <div className="text-center py-12 text-gray-500">
        <UserCheck size={48} className="mx-auto mb-4 text-gray-300" />
        <p>Agent bidding is not available for this property.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
          <Users className="mr-2" size={20} />
          Agent Bidding Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              Commission Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Commission Rate:</span>
                <span className="font-medium text-green-600">
                  {formatPrice(listing.agentInviteDetails.commissionRate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Preferred Agent Type:</span>
                <span className="font-medium capitalize">
                  {listing.agentInviteDetails.preferredAgentType}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Requirements</h4>
            <p className="text-gray-700 text-sm">
              {listing.agentInviteDetails.additionalRequirements}
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800">
            <Award className="mr-2" size={16} />
            Currently {listing.agentBidsCount} agent bids received
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsTab;
