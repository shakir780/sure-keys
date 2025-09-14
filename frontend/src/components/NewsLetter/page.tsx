import React from "react";

const NewsLetter = () => {
  return (
    <section className="bg-[#F9FAFB] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter and get the latest property tips, agent
          insights, and housing news straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full  px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
