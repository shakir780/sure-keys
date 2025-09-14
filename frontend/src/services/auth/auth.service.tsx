// services/auth.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
type AuthRole = "tenant" | "landlord" | "agent" | null;

export interface RegisterPayload {
  role: AuthRole;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const res = await axios.post(`${BASE_URL}/api/auth/register`, payload);
  return res.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, payload);
  return res.data;
};
export const verifyUser = async (payload: { email: string; otp: string }) => {
  const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, payload);
  return res.data;
};

export const resendOtp = async (payload: { email: string }) => {
  const res = await axios.post(`${BASE_URL}/api/auth/resend-otp`, payload);
  return res.data;
};

export const forgotPassword = async (payload: { email: string }) => {
  const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, payload);
  return res.data;
};

export const newPassword = async (payload: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const res = await axios.post(`${BASE_URL}/api/auth/reset-password`, payload);
  return res.data;
};
