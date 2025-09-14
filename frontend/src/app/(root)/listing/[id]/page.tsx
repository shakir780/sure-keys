import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Listing",
  description: "Listing",
};

const Listing = dynamic(() => import("@modules/listing"));

const ListingPage = () => <Listing />;

export default ListingPage;
