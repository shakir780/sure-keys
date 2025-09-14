"use client";
import AuthWrapper from "@components/authWrapper";
import { cn } from "@lib/util";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthStore } from "store/useAuthStore";

const options = [
  {
    label: "Register as a Tenant",
    value: "tenant",
    description: "Find trusted apartments easily with SureKeys.",
  },
  {
    label: "Register as a Landlord",
    value: "landlord",
    description: "List your properties securely and reach more tenants.",
  },
  {
    label: "Register as an Agent",
    value: "agent",
    description: "Connect clients with verified homes and earn commissions.",
  },
];

const Auth = () => {
  const { role, setRole } = useAuthStore();

  const [selected, setSelected] = useState("tenant");
  const router = useRouter();
  const handleSelect = (value: string) => {
    if (["tenant", "landlord", "agent"].includes(value)) {
      setRole(value as typeof role);
    }
  };
  const handleClick = (ev: any) => {
    ev.preventDefault();
    router.push(`/auth/register`);
  };
  return (
    <AuthWrapper>
      <div className="w-full max-w-md mx-auto py-10 px-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
          Let's get you started
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Choose the type of account that best suits your goal
        </p>

        <div className="flex flex-col gap-4 mb-6">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full border rounded-lg p-4 cursor-pointer text-left transition-all",
                role === option.value
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300 hover:border-green-500"
              )}
            >
              <h3 className="font-medium text-sm text-gray-800">
                {option.label}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{option.description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 rounded-md font-semibold"
        >
          Continue
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Auth;
