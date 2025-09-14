// components/layouts/AuthenticatedLayout.tsx
import React, { Suspense, useEffect, useState } from "react";
import Sidebar from "@modules/dashboard/Sidebar";
import Topbar from "@modules/dashboard/Topbar";
import { useRouter } from "next/navigation";
import Loader from "@shared/Loader";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  bg-gray-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
