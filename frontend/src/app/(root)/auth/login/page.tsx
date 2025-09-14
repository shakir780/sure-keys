import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

const Login = dynamic(() => import("@modules/auth/login"));

const LoginPage = () => <Login />;

export default LoginPage;
