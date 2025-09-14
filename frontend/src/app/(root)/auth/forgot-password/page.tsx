import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

const ForgotPassword = dynamic(() => import("@modules/auth/forgot-password"));

const ForgotPasswordPage = () => <ForgotPassword />;

export default ForgotPasswordPage;
