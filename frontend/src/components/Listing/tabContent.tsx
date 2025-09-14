import React from "react";
import { Listing, TabType } from "store/types/listing";
import OverviewTab from "./tabs/OveviewTab";
import MediaTab from "./tabs/MediaTab";
import FacilitiesTab from "./tabs/FacilitiesTab";
import AgentsTab from "./tabs/AgentsTab";
import DetailsTab from "./tabs/DetailsTab";
import ContactTab from "./tabs/Contact";

interface TabContentProps {
  activeTab: TabType;
  listing: Listing;
  openImageModal: (index: number) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  listing,
  openImageModal,
}) => {
  return (
    <div className="p-8">
      {activeTab === "overview" && <OverviewTab listing={listing} />}
      {activeTab === "media" && (
        <MediaTab listing={listing} openImageModal={openImageModal} />
      )}
      {activeTab === "facilities" && <FacilitiesTab listing={listing} />}
      {activeTab === "agents" && <AgentsTab listing={listing} />}
      {activeTab === "details" && <DetailsTab listing={listing} />}
      {activeTab === "contact" && <ContactTab listing={listing} />}
    </div>
  );
};

export default TabContent;
