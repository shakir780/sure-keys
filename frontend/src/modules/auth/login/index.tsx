"use client";
import AuthWrapper from "@components/authWrapper";
import Input from "@components/ui/input";
import { useLoginUser } from "@hooks/useAuth";
import { getToken } from "@lib/authStorage";
import Loader from "@shared/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const Login = () => {
  const { mutate } = useLoginUser();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setAuth } = useAuthStore.getState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setAuth({
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            token: data.token,
          });
          setIsLoading(false);
          toast.success("Login successful!");
          router.push("/dashboard");
        },
        onError: (error: any) => {
          setIsLoading(false);

          toast.error(error?.response?.data?.message || "Login failed");
        },
      }
    );
  };
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);
  if (checkingAuth) {
    return <Loader />;
  }

  return (
    <AuthWrapper>
      {isLoading && <Loader />}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className=" rounded-2xl p-8 w-full  overflow-auto scrollbar-hide h-screen max-w-lg space-y-6">
          <h2 className="text-2xl font-semibold capitalize text-gray-800">
            Log in to your Account
          </h2>

          {/* Social Sign-In */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaGoogle />
              Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaFacebook />
              Sign in with Facebook
            </button>
          </div>

          <div className="flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">
              or sign in with your email
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="keepmeSignedIn" className="w-4 h-4" />
              <label htmlFor="captcha" className="text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Log in
              </button>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-center text-green-500 cursor-pointer"
              >
                Forgot password
              </Link>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600">
            Dont have an account?{" "}
            <a
              href="/auth"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
