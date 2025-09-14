import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password",
};

const NewPassword = dynamic(() => import("@modules/auth/new-password"));

const NewPasswordPage = () => <NewPassword />;

export default NewPasswordPage;
