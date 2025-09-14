"use client";
import AuthWrapper from "@components/authWrapper";
import Input from "@components/ui/input";
import { useForgotPassword, useLoginUser } from "@hooks/useAuth";
import Loader from "@shared/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const ForgotPassword = () => {
  const { mutate } = useForgotPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { setEmail: storeEmail } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    mutate(
      { email },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success("OTP Sent to your email!");
          storeEmail(email);
          router.push("/auth/new-password");
        },
        onError: (error: any) => {
          setIsLoading(false);

          toast.error(error?.response?.data?.message || "OTP failed to send");
        },
      }
    );
  };

  return (
    <AuthWrapper>
      {isLoading && <Loader />}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className=" rounded-2xl p-8 w-full  overflow-auto scrollbar-hide h-screen max-w-lg space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold capitalize text-gray-800">
              Recover Your Password
            </h2>
            <span className="text-sm text-gray-400">
              Enter you email and we will send you an OTP
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Enter your Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Recover
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600">
            Remeber?
            <a
              href="/auth/login"
              className="text-green-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
