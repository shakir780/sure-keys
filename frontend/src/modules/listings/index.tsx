"use client";
import Loader from "@shared/Loader";
import React from "react";
import { useAuthStore } from "store/useAuthStore";
import LandlordListing from "./LandlordListing";
import TenantListing from "./TenantListing";
import AgentListing from "./AgentListing";

const index = () => {
  const role = useAuthStore((state) => state.role);

  console.log(role);
  if (!role) return <Loader />;

  switch (role) {
    case "landlord":
      return <LandlordListing />;
    case "tenant":
      return <TenantListing />;
    case "agent":
      return <AgentListing />;
    default:
      return <p>Unknown role</p>;
  }
};

export default index;
