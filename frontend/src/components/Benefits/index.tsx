import React from "react";
import LanlordImage from "../../app/assets/images/landlords.webp";
import Agents from "../../app/assets/images/agents.webp";
import Tenants from "../../app/assets/images/tenants.webp";
const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Use SureKeys?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Landlords */}
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <img
              src={LanlordImage.src}
              alt="Landlord"
              className="w-[500px]    object-cover"
            />
            <h3 className="text-xl font-semibold py-4">For Landlords</h3>
            <ul className="text-gray-600 space-y-4 text-sm">
              <li>• Let agents handle listing for you</li>
              <li>• Get verified to attract serious tenants</li>
              <li>• Track rent, receipts & records digitally</li>
            </ul>
          </div>

          {/* Agents */}
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <img
              src={Agents.src}
              alt="Agent"
              className="w-[500px]    object-cover"
            />
            <h3 className="text-xl font-semibold py-4">For Agents</h3>
            <ul className="text-gray-600 space-y-4 text-sm">
              <li>• Get hired by landlords directly</li>
              <li>• Earn commission posting listings</li>
              <li>• Build trust with verified profiles</li>
            </ul>
          </div>

          {/* Tenants */}
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <img
              src={Tenants.src}
              alt="Tenant"
              className="w-[500px]    object-cover"
            />
            <h3 className="text-xl font-semibold py-4">For Tenants</h3>
            <ul className="text-gray-600 space-y-4 text-sm">
              <li>• No scams – only verified listings</li>
              <li>• Pay inspection fee with confidence</li>
              <li>• Keep track of all your rent payments in one place</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
