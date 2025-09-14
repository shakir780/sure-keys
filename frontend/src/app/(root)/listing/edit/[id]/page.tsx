import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Edit Listing",
  description: "Edit Listing",
};

const EditListing = dynamic(() => import("@modules/listing/editListing"));

const EditListingPage = () => <EditListing />;

export default EditListingPage;
