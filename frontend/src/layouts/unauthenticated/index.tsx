import React, { Suspense } from "react";

const UnauthenticatedLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* <div className="w-[50%]  flex justify-center items-center"> */}
      <Suspense>
        <div className="w-full  ">{children}</div>
      </Suspense>
      {/* </div> */}
    </div>
  );
};

export default UnauthenticatedLayout;
