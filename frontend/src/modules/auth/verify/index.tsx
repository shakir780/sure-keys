"use client";
import AuthWrapper from "@components/authWrapper";
import { useResendOtp, useVerifyUser } from "@hooks/useAuth";
import Loader from "@shared/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { mutate } = useVerifyUser();
  const { mutate: resendOtp } = useResendOtp();
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { email } = useAuthStore();

  const router = useRouter();
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
  const handleSubmit = (e: React.FormEvent) => {
    const code = otp.join("");
    if (code.length !== 6) {
      return alert("Please enter the full 6-digit OTP.");
    }
    e.preventDefault();
    setIsLoading(true);
    mutate(
      { email, otp: code },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Verified!");

          router.push("/auth/login");
        },
        onError: (error: any) => {
          setIsLoading(false);

          toast.error(error?.response?.data?.message || "Verification failed");
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
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Enter OTP to Verify Account
          </h2>
          <p className="text-sm text-center text-gray-600">
            We've sent a 6-digit code to your email.
          </p>

          <div className="flex justify-center gap-3 mt-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el: any) => (inputsRef.current[index] = el)}
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

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Verify Account
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Didn't receive the code?{" "}
            {canResend ? (
              <button
                onClick={handleClick}
                className="text-green-600 hover:underline"
              >
                Resend
              </button>
            ) : (
              <span className="text-gray-400">Resend in {timer}s</span>
            )}
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Verify;
