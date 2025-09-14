"use client";
import { setToken } from "@lib/authStorage";
import {
  loginUser,
  RegisterPayload,
  registerUser,
  verifyUser,
  resendOtp,
  forgotPassword,
  newPassword,
} from "@src/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });

export const useLoginUser = () =>
  useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      loginUser(payload),
    onSuccess: (data) => {
      if (data?.token) {
        setToken(data.token);
      }
    },
  });

export const useVerifyUser = () => {
  return useMutation({
    mutationFn: (payload: { email: string; otp: any }) => verifyUser(payload),
  });
};
export const useResendOtp = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => resendOtp(payload),
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => forgotPassword(payload),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: {
      email: string;
      otp: string;
      newPassword: string;
    }) => newPassword(payload),
  });
};
