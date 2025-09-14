import Navbar from "@components/Navbar/page";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Landing = dynamic(() => import("@modules/landingPage"));

const LandingPage = () => {
  return (
    <Suspense>
      <Navbar />
      <Landing />
    </Suspense>
  );
};

export default LandingPage;
