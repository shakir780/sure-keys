import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "ViewListings",
  description: "ViewListings",
};

const ViewListings = dynamic(() => import("@modules/viewListingsPage"));

const ViewListingsPage = () => <ViewListings />;

export default ViewListingsPage;
