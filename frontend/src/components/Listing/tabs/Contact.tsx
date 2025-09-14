import React from "react";
import { Phone, Mail } from "lucide-react";
import { Listing } from "store/types/listing";

interface ContactTabProps {
  listing: Listing;
}

const ContactTab: React.FC<ContactTabProps> = ({ listing }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Contact Property Owner</h3>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
        <div className="flex items-start">
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-2">
              {listing.creator.id.name}
            </h4>
            <p className="text-gray-600 mb-4 capitalize">
              Property {listing.creator.role}
            </p>

            <div className="space-y-3">
              {listing.creator.id.phone && (
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-3" size={18} />
                  <span className="text-gray-700">
                    {listing.creator.id.phone}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-3" size={18} />
                <span className="text-gray-700">
                  {listing.creator.id.email}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-200">
              <p className="text-sm text-gray-600 mb-2">Property Owner ID:</p>
              <p className="font-mono text-xs text-gray-500">
                {listing.creator.id._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
