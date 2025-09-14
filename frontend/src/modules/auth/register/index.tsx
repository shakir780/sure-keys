"use client";

import AuthWrapper from "@components/authWrapper";
import { useRegisterUser } from "@hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import NigeriaFlag from "../../../assets/img/nigeriaflag.png";
import { useAuthStore } from "store/useAuthStore";
import Loader from "@shared/Loader";
import Input from "@components/ui/input";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const { mutate } = useRegisterUser();

  const { setAuth } = useAuthStore.getState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    mutate(
      { role, name, email, password, phoneNumber },
      {
        onSuccess: () => {
          setAuth({ email, phonenumber: phoneNumber });
          toast.success("Registration successful!");
          router.push("/auth/verify");
          setIsLoading(false);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Registration failed");
          setIsLoading(false);
        },
      }
    );
  };
  return (
    <AuthWrapper>
      {loading && <Loader />}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className=" rounded-2xl p-8 w-full max-w-lg overflow-auto scrollbar-hide h-screen  space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Your SureKeys Account Now and Unlock Rental Simplicity
          </h2>

          {/* Social Sign-In */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaGoogle />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaFacebook />
              Sign up with Facebook
            </button>
          </div>

          <div className="flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">
              or continue with your email
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label=" Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex ">
                <div className="inline-flex mt-1 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm">
                  <Image
                    src={NigeriaFlag}
                    width={40}
                    height={40}
                    alt="nigeria"
                  />
                </div>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="8012345678"
                />
              </div>
            </div>
            <div>
              <Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="captcha" className="w-4 h-4" />
              <label htmlFor="captcha" className="text-sm text-gray-700">
                I’m not a robot
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-green-600 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Register;
