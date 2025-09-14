import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Listings",
  description: "Listings",
};

const Listings = dynamic(() => import("@modules/listings"));

const ListingsPage = () => <Listings />;

export default ListingsPage;
