import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">SureKeys</h3>
          <p className="text-gray-400">
            Simplifying property search and rentals across Nigeria. Verified
            agents, trusted listings.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="/listings" className="hover:text-white">
                Find Properties
              </a>
            </li>
            <li>
              <a href="/agents" className="hover:text-white">
                Verified Agents
              </a>
            </li>
            <li>
              <a href="/app" className="hover:text-white">
                Mobile App
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:support@surekeys.ng" className="hover:text-white">
                support@surekeys.ng
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+2348000000000" className="hover:text-white">
                +234 800 000 0000
              </a>
            </li>
            <li>Address: Lagos, Nigeria</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SureKeys. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
