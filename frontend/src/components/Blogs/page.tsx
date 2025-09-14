import React from "react";
import LanlordBlog from "../../app/assets/images/landlordBlog.jpg";
import AgentBlog from "../../app/assets/images/VerifiedAgent.jpeg";
import TenantBlog from "../../app/assets/images/RentalScam.jpg";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose a Verified Agent You Can Trust",
    excerpt:
      "Learn what to look for before hiring a real estate agent and why verification matters.",
    image: AgentBlog,
    category: "Agents",
    link: "/blog/verified-agent-tips",
  },
  {
    id: 2,
    title: "Tenant Red Flags Landlords Shouldn’t Ignore",
    excerpt:
      "From late payments to unverifiable histories — here are the warning signs.",
    image: LanlordBlog,
    category: "Landlords",
    link: "/blog/tenant-red-flags",
  },
  {
    id: 3,
    title: "Avoiding Rental Scams in Nigeria",
    excerpt:
      "We break down the most common housing scams and how to protect yourself.",
    image: TenantBlog,
    category: "Tenants",
    link: "/blog/rental-scam-guide",
  },
];

const Blogs = () => {
  return (
    <div className="p-10 lg:p-20">
      <h2 className="text-3xl font-bold text-gray-900">
        From the SureKeys Blog
      </h2>
      <p className="text-gray-600 mt-2">
        Tips, insights, and updates for landlords, tenants, and agents.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
          >
            <img
              src={post.image.src}
              alt={post.title}
              className="w-full h-50  object-cover rounded-lg mb-4"
            />
            <span className="text-sm text-primary font-semibold">
              {post.category}
            </span>
            <h3 className="text-lg font-bold mt-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
            <a
              href={post.link}
              className="text-primary mt-4 inline-block font-medium"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
