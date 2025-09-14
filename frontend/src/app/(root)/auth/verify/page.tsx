import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Verify",
  description: "Verify",
};

const Verify = dynamic(() => import("@modules/auth/verify"));

const VerifyPage = () => <Verify />;

export default VerifyPage;
