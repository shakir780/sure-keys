import React from "react";
import App from "../../app/assets/images/sureKeysApp-removebg.png";
const MobileAPP = () => {
  return (
    <section className="min-h-[70vh] bg-gradient-to-b from-[#F9FAFB] to-[#E5E7EB] flex items-center justify-center px-4">
      <div className="text-center text-black max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold py-8">App Coming Soon</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          We're working hard to bring you the best experience. Stay tuned!
        </p>
        <div className="flex justify-center">
          <img
            src={App.src}
            alt="App Mockup"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAPP;
