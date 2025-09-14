"use client";

import LandlordDashboard from "./LanlordDashboard";
import Loader from "@shared/Loader";
import TenantDashboard from "./TenantDashboard";
import AgentDashboard from "./AgentDashboard";
import { useAuthStore } from "store/useAuthStore";

const Dashboard = () => {
  const role = useAuthStore((state) => state.role);

  console.log(role);
  if (!role) return <Loader />;

  switch (role) {
    case "landlord":
      return <LandlordDashboard />;
    case "tenant":
      return <TenantDashboard />;
    case "agent":
      return <AgentDashboard />;
    default:
      return <p>Unknown role</p>;
  }
};

export default Dashboard;
