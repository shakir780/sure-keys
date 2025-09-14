import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Apartment",
  description: "My Apartment",
};

const Apartment = dynamic(() => import("@modules/apartment"));

const ApartmentPage = () => <Apartment />;

export default ApartmentPage;
