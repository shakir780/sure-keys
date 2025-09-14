import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Post a Property",
  description: "Post a Property",
};

const PostProperty = dynamic(() => import("@modules/postProperty"));

const PostPropertyPage = () => <PostProperty />;

export default PostPropertyPage;
