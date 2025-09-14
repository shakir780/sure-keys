import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};

const Register = dynamic(() => import("@modules/auth/register"));

const RegisterPage = () => <Register />;

export default RegisterPage;
