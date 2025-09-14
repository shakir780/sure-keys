"use client";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../app/assets/images/sureKeysLogo.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-40 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-6  border-b">
        <img
          src={Logo.src}
          alt="SureKeys Logo"
          //   width={10}
          //   height={50}
          className=" w-[160px] h-[50px] object-cover"
        />
        <button onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col p-6 gap-8 text-gray-700 font-semibold">
        <Link href="/" onClick={() => setSidebarOpen(false)}>
          Find Apartments
        </Link>
        <Link href="/#about" onClick={() => setSidebarOpen(false)}>
          List Your Property
        </Link>
        <Link href="/#how-it-works" onClick={() => setSidebarOpen(false)}>
          How It Works
        </Link>
        <Link href="/#hire-an-agent" onClick={() => setSidebarOpen(false)}>
          Hire An Agent
        </Link>
        <Link href="/#contact" onClick={() => setSidebarOpen(false)}>
          Pricing
        </Link>
        <Link href="/#contact" onClick={() => setSidebarOpen(false)}>
          FAQs
        </Link>
        <hr />
        <button className="text-left">Log In</button>
        <button className="text-left">Register</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
