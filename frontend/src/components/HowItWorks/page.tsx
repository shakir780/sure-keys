"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const howItWorks = {
  landlord: [
    {
      title: "All in One Management Tool",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li> Manage your listings in one place.</li>

          <li> View tenant history.</li>

          <li> View inspection records.</li>

          <li> Access communication logs.</li>

          <li> Streamline your property management effortlessly.</li>
        </div>
      ),
    },
    {
      title: "Rent Due Tracker",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li> Track rent status for multiple apartments in one dashboard.</li>

          <li>Get notified when a tenant's rent is almost due.</li>

          <li> Stay on top of payments to reduce delays.</li>

          <li> Simplify rent collection and improve cash flow.</li>
        </div>
      ),
    },

    {
      title: "Verified Tenant System",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            {" "}
            Ensure peace of mind with tenants who have been thoroughly screened
            and verified
          </li>

          <li>
            {" "}
            Reduce risks by confirming tenant identity, rental history, and
            creditworthiness.
          </li>

          <li>
            {" "}
            Make smarter leasing decisions backed by trusted tenant
            verification.
          </li>
        </div>
      ),
    },

    {
      title: "Hire Trusted Agents",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            {" "}
            Hire verified agents to manage your properties on your behalf.
          </li>
          <li> Browse agent profiles, ratings, and reviews before choosing.</li>
          <li>
            {" "}
            Save time and reduce stress by delegating listing and tenant
            management.
          </li>
          <li>
            {" "}
            Work with top-rated agents who prioritize your rental success.
          </li>
        </div>
      ),
    },
  ],
  agent: [
    {
      title: "More Exposure",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li> Post Verified listings on a platform designed for trust</li>

          <li> Connect with more potential tenants and close deals faster.</li>

          <li>
            {" "}
            Leverage our platform to boost your visibility and grow your client
            base effortlessly.
          </li>
        </div>
      ),
    },
    {
      title: "Verified Agent Profile",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            {" "}
            Build trust with clients through a verified and credible agent
            profile.
          </li>

          <li>
            Showcase your qualifications, experience, and positive reviews to
            stand out.
          </li>

          <li>
            Increase your chances of securing listings and closing deals
            confidently.
          </li>
        </div>
      ),
    },

    {
      title: "Top Agent Rankings",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            {" "}
            Earn higher rankings based on your ratings and completed rentals.
          </li>
          <li>
            {" "}
            Get featured at the top of agent search results for more leads.
          </li>
          <li> Build your reputation and grow your business faster.</li>
        </div>
      ),
    },
    {
      title: "Smart Viewing Scheduler",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            Easily manage and automate property viewing appointments with
            interested renters.
          </li>

          <li>
            Save time by letting prospects book available slots directly from
            your profile.
          </li>

          <li>
            Stay organized with calendar syncing and automated reminders — no
            more double bookings.
          </li>
        </div>
      ),
    },
  ],
  tenant: [
    {
      title: "Full Details Before Payment",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            Get complete information about the property, landlord, and terms
            before making any payment
          </li>

          <li>
            View photos, rent breakdown, amenities, and agent verification
            upfront.
          </li>

          <li>
            Make confident rental decisions with full transparency and no
            surprises.
          </li>
        </div>
      ),
    },
    {
      title: "Agent Assistance & Support",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            {" "}
            Get support from trusted agents throughout your rental journey.
          </li>
          <li>
            {" "}
            Agents help with viewing schedules, paperwork, and negotiations.
          </li>
          <li>
            {" "}
            Experience smoother renting with professional agent assistance.
          </li>
        </div>
      ),
    },

    {
      title: "Rent Payment Tracker",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>See how many months left before rent is due</li>

          <li>Get reminders before rent expires</li>

          <li>Keep track of all your rent payments in one place.</li>
        </div>
      ),
    },
    {
      title: "Verified Landlords and agents",
      description: (
        <div className="flex flex-col gap-5 mt-4">
          <li>
            Rent with confidence by connecting only with verified landlords and
            licensed agents.
          </li>

          <li>
            We screen every profile to ensure legitimacy, safety, and
            professionalism.
          </li>

          <li>
            Say goodbye to scams — and hello to secure, stress-free renting.
          </li>
        </div>
      ),
    },
  ],
};

const roles = ["landlord", "agent", "tenant"];
const HowItWorks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("landlord");

  const steps = howItWorks[activeTab];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };
  return (
    <section className="relative md:h-[150vh] xl:h-screen   text-gray-800">
      <div className="bg-blue-600 px-4 py-16">
        <h2 className="text-3xl font-medium text-white text-center mb-8">
          How It Works
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-10">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => {
                setActiveTab(role);
                setCurrentSlide(0); // Reset on role switch
              }}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeTab === role
                  ? "bg-blue-300 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      {/* Cards for small screen (carousel) */}
      <div className="sm:hidden relative px-4 py-20">
        <div className="overflow-hidden  flex justify-center items-center ">
          <div className="transition-transform duration-500 ease-in-out">
            <div className="bg-white h-[400px] w-[350px] py-6 px-8 mt-4 rounded-2xl shadow-xl relative">
              <div className="text-blue-600 flex items-center justify-center absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-white rounded-full w-[50px] h-[50px] text-2xl font-bold mb-2">
                <span className="border-2 border-blue-300 flex items-center justify-center w-[40px] h-[40px] rounded-full">
                  {currentSlide + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {steps[currentSlide].title}
              </h3>
              <div className="text-gray-600">
                {steps[currentSlide].description}
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-between items-center mt-4 px-2">
          <button onClick={handlePrev}>
            <FaArrowLeft className="text-blue-600" />
          </button>
          <div className="flex space-x-2">
            {steps.map((_: any, idx: number) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
          <button onClick={handleNext}>
            <FaArrowRight className="text-blue-600" />
          </button>
        </div>
      </div>

      {/* Cards grid for medium+ screens */}
      <div className="hidden sm:grid absolute top-[250px] gap-8 px-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step: any, index: number) => (
          <div
            key={index}
            className="bg-white relative h-[400px] p-6 rounded-2xl shadow-md transition duration-300"
          >
            <div className="text-blue-600 flex items-center justify-center absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-white rounded-full w-[50px] h-[50px] text-2xl font-bold mb-2">
              <span className="border-2 border-blue-300 flex items-center justify-center w-[40px] h-[40px] rounded-full">
                {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <div className="text-gray-600">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
