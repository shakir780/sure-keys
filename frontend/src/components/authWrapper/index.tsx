import Navbar from "@components/Navbar/page";
import React, { Suspense } from "react";

const AuthWrapper = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <div className="w-[50%] hidden   h-screen pb-20 lg:flex items-center justify-center bg-black">
          <img
            src="/sureKeysAuthImage.png"
            alt="authBg"
            className="w-full h-auto object-contain mb-[120px]"
          />
        </div>

        <div className="lg:w-[50%] w-full flex justify-center items-center">
          <Suspense>
            <div className="w-full  ">{children}</div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
