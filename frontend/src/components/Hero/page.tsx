import React from "react";
import heroImage from "../../app/assets/images/sureKeysHero6.jpeg";

const Hero = () => {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          heroImage.src || heroImage
        })`,
      }}
      className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex  flex-col items-center justify-center text-white"
    >
      <h1 className="text-2xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
        Smarter Renting Starts Here 🏠
      </h1>
      <p className="text-lg text-center px-6 md:px-0 md:text-xl text-white font-medium max-w-xl leading-[40px] mx-auto mt-4">
        SureKeys helps Nigerians rent with confidence — track rent due dates,
        save rent money, verify tenants & agents, and manage everything in one
        place.
      </p>
      <div className="mt-8  flex items-center gap-4 justify-center">
        <button className="bg-blue-800 text-white px-5 md:px-10  py-4 rounded-full text-sm md:text-base font-semibold">
          Get Started
        </button>
        <button className="bg-white text-black px-5 md:px-10  py-4 rounded-full text-sm md:text-base font-semibold">
          See How It Works
        </button>
      </div>
    </section>
  );
};

export default Hero;
