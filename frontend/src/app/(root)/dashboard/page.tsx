import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Dashbaord",
  description: "Dashbaord",
};

const Dashbaord = dynamic(() => import("@modules/dashboard"));

const DashbaordPage = () => <Dashbaord />;

export default DashbaordPage;
