"use client";
import RentDueTable from "@components/landlord/RentDueTable/page";
import { SummaryCard } from "@components/landlord/SummaryCard/page";
import { getToken } from "@lib/authStorage";
import Loader from "@shared/Loader";
import { Briefcase, Building, FileText, Home, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LandlordDashboard = () => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      if (!token) {
        router.replace("/auth/login");
      } else {
        setCheckingAuth(false);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 2000);

    return () => clearInterval(interval);
  }, [router]);

  if (checkingAuth) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Building className="text-green-700" />}
          label="Total Listings"
          value="4"
          link="/dashboard/landlord/listings"
        />
        <SummaryCard
          icon={<Users className="text-green-700" />}
          label="Active Tenants"
          value="6"
          link="/dashboard/landlord/tenants"
        />
        <SummaryCard
          icon={<FileText className="text-green-700" />}
          label="Rent Due Soon"
          value="2"
          link="/dashboard/landlord/records"
        />
        <SummaryCard
          icon={<Briefcase className="text-green-700" />}
          label="Agents Hired"
          value="1"
          link="/dashboard/landlord/agents"
        />
      </div>

      {/* Agents Preview */}
      <SectionHeader title="Your Agents" link="/dashboard/landlord/agents" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "James Adebayo", count: 3 },
          { name: "Amaka Onu", count: 2 },
        ].map((agent) => (
          <div
            key={agent.name}
            className="bg-white rounded-xl shadow p-5 flex gap-4 items-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-lg">
              {agent.name[0]}
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">
                {agent.name}
              </h3>
              <p className="text-sm text-gray-500">
                Managing {agent.count}{" "}
                {agent.count === 1 ? "property" : "properties"}
              </p>
            </div>

            <a
              href="/dashboard/landlord/agents"
              className="text-sm text-green-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {/* Rent Due Preview */}
      <SectionHeader
        title="Upcoming Rent Due"
        link="/dashboard/landlord/records"
      />
      <RentDueTable />
    </div>
  );
};

export default LandlordDashboard;

const SectionHeader = ({ title, link }: { title: string; link: string }) => (
  <div className="flex justify-between items-center mt-8 mb-4">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <a href={link} className="text-sm text-green-600 hover:underline">
      View All
    </a>
  </div>
);
