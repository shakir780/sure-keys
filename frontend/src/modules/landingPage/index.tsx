import Benefits from "@components/Benefits";
import Blogs from "@components/Blogs/page";
import FAQs from "@components/Faqs/page";
import Footer from "@components/Footer/page";
import Hero from "@components/Hero/page";
import HowItWorks from "@components/HowItWorks/page";
import MobileAPP from "@components/MobileApp/page";
import NewsLetter from "@components/NewsLetter/page";
import Testimonials from "@components/Testimonials/page";
import React from "react";
// import heroImage from "@assets/images/sureKeysHero1.jpg";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Benefits />
      <FAQs />
      <Testimonials />
      <Blogs />
      <MobileAPP />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default LandingPage;
