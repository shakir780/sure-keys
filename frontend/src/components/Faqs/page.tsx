import {
  ShieldCheck,
  Users,
  Key,
  Home,
  Settings,
  HelpCircle,
  CalendarCheck2,
  UserCheck,
} from "lucide-react";

const faqs = [
  {
    icon: <Home className="text-primary" size={24} />,
    question: "What is SureKeys?",
    answer:
      "SureKeys is a platform that connects landlords, agents, and tenants for easy, secure, and verified rental property management in Nigeria.",
  },
  {
    icon: <Users className="text-primary" size={24} />,
    question: "Can I hire an agent to help post my property?",
    answer:
      "Yes! Landlords who don’t want to manage listings can hire verified agents to handle everything for them on SureKeys.",
  },
  {
    icon: <ShieldCheck className="text-primary" size={24} />,
    question: "Are the agents verified?",
    answer:
      "All agents on SureKeys undergo a verification process to ensure trust and professionalism.",
  },
  {
    icon: <Key className="text-primary" size={24} />,
    question: "How do I rent a property?",
    answer:
      "Just browse available listings, contact the agent or landlord, schedule a viewing, and complete payment securely.",
  },
  {
    icon: <UserCheck className="text-primary" size={24} />,
    question: "How do I register as an agent?",
    answer:
      "Click on 'Join as Agent', submit your details and documents, and once verified, you can begin posting listings.",
  },
  {
    icon: <CalendarCheck2 className="text-primary" size={24} />,
    question: "Can I schedule inspections?",
    answer:
      "Absolutely. You can contact landlords or agents directly to set up inspection times.",
  },
  {
    icon: <Settings className="text-primary" size={24} />,
    question: "Can I edit my listings later?",
    answer:
      "Yes. Log in to your dashboard to update, pause, or delete any of your property listings.",
  },
  {
    icon: <HelpCircle className="text-primary" size={24} />,
    question: "What if I need help?",
    answer:
      "Our support team is available to help you via email or in-app chat for any issue you encounter.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mb-12">
          Everything you need to know about using SureKeys, all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-gray-100 p-2 text-purple-600">{faq.icon}</div>
              <div>
                <h4 className="text-lg font-semibold">{faq.question}</h4>
                <p className="text-gray-600 mt-1">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
