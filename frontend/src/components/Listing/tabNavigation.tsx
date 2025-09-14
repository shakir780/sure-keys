import React from "react";
import { Listing, TabType } from "store/types/listing";

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  listing: Listing;
}

interface TabButtonProps {
  id: TabType;
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  count,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
      isActive
        ? "text-green-600 border-green-600 bg-green-50"
        : "text-gray-600 border-transparent hover:text-green-600 hover:border-green-300"
    }`}
  >
    {label}
    {count !== undefined && (
      <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
        {count}
      </span>
    )}
  </button>
);

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  listing,
}) => {
  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: "overview", label: "Overview" },
    { id: "media", label: "Photos & Videos" },
    { id: "facilities", label: "Facilities" },
    { id: "agents", label: "Agent Bidding", count: listing.agentBidsCount },
    { id: "details", label: "Property Details" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex min-w-max">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
