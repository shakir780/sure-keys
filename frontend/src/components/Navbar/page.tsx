"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../app/assets/images/sureKeysLogo.png";
import { Menu } from "lucide-react";
import Sidebar from "@components/Sidebar/page";
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <header className="h-[10vh] flex items-center  justify-between px-6 md:px-12 bg-white shadow-md sticky top-0 z-30">
        <div className="flex items-center h-fit w-full   gap-4  ">
          <img
            src={Logo.src}
            alt="SureKeys Logo"
            className=" w-[160px] h-[50px] object-cover"
          />
          <nav className="hidden lg:flex w-[70%]   items-center  font-bold gap-6 text-sm  text-gray-700">
            <Link href="/findApartments">Find Apartments</Link>
            <Link href="/about">List Your Property</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/hire-an-agent">Hire An Agent</Link>
            <Link href="/contact">Pricing </Link>
            <Link href="/faqs">FAQs </Link>
          </nav>
        </div>

        <div className="hidden lg:flex w-[20%] font-bold  justify-end items-center gap-3">
          <Link href="/auth/login">Log In</Link>
          <Link href="/auth">Register</Link>
        </div>
        <button className="lg:hidden z-50" onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>
      </header>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Navbar;
