"use client";
import AuthWrapper from "@components/authWrapper";
import Input from "@components/ui/input";
import {
  useForgotPassword,
  useLoginUser,
  useResendOtp,
  useResetPassword,
} from "@hooks/useAuth";
import Loader from "@shared/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const ForgotPassword = () => {
  const { mutate } = useResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: resendOtp } = useResendOtp();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updated = [...otp];
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const arr = paste.split("");
      setOtp(arr);
      arr.forEach((val, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i]!.value = val;
        }
      });
      inputsRef.current[5]?.focus();
    }
    e.preventDefault();
  };
  const { email } = useAuthStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = otp.join("").trim();
    if (code.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    mutate(
      { email, otp: code, newPassword },
      {
        onSuccess: (data: { message?: string }) => {
          setIsLoading(false);
          toast.success(data?.message || "Password reset successful.");
          router.push("/auth/login");
        },
        onError: (error: any) => {
          setIsLoading(false);
          toast.error(
            error?.response?.data?.message || "Failed to reset password."
          );
        },
      }
    );
  };
  const handleResend = async () => {
    setIsLoading(true);
    resendOtp(
      { email },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success("OTP Resent!");
        },
        onError: (error: any) => {
          setIsLoading(false);

          toast.error(error?.response?.data?.message || "OTP failed");
        },
      }
    );
  };
  const [timer, setTimer] = useState(30); // seconds
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (timer > 0) {
      setCanResend(false);
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const handleClick = () => {
    if (canResend) {
      handleResend();
      setTimer(30);
    }
  };

  return (
    <AuthWrapper>
      {isLoading && <Loader />}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-2xl p-8 w-full overflow-auto scrollbar-hide h-screen max-w-lg space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold capitalize text-gray-800">
              Set New Password
            </h2>
            <span className="text-sm text-gray-400">
              Enter the OTP sent to your email and set a new password
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center gap-3 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
            </div>
            <p className="text-sm text-center text-gray-500 mt-4">
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-green-600 hover:underline"
                >
                  Resend
                </button>
              ) : (
                <span className="text-gray-400">Resend in {timer}s</span>
              )}
            </p>

            <Input
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
            />

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600">
            Know your password?
            <a
              href="/auth/login"
              className="text-green-600 font-medium hover:underline ml-1"
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
