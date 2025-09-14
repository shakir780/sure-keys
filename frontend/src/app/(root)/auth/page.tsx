import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "register",
  description: "register",
};

const Auth = dynamic(() => import("@modules/auth"));

const AuthPage = () => <Auth />;

export default AuthPage;
