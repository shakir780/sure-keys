"use client";

import {
  Bell,
  Briefcase,
  Building2,
  FileText,
  Home,
  Settings,
  Star,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserCircle,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Logo from "../../../app/assets/images/sureKeysLogo.png";
import { useAuthStore } from "store/useAuthStore";
import { Wrench, CreditCard, MessageSquare } from "lucide-react";

const tenantNav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Properties", href: "/listings", icon: Building2 },
  { label: "My Apartment", href: "/apartment", icon: Building2 },
  { label: "Rent & Payments", href: "/payments", icon: CreditCard },
  { label: "Requests", href: "/requests", icon: Wrench },
  { label: "Community", href: "/community", icon: MessageSquare },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

const landlordNav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Properties", href: "/listings", icon: Building2 },
  { label: "Tenants", href: "/tenants", icon: Users },
  { label: "Agents", href: "/agent", icon: Briefcase },
  { label: "Documents", href: "/records", icon: FileText },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reviews", href: "/reputation", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
];
const agentNav = [
  { label: "AgentDashboard", href: "/dashboard", icon: Home },
  { label: "Properties", href: "/listings", icon: Building2 },
  { label: "Tenants", href: "/tenants", icon: Users },
  { label: "Agents", href: "/agent", icon: Briefcase },
  { label: "Documents", href: "/records", icon: FileText },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reviews", href: "/reputation", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const name = useAuthStore((state) => state.name);
  const avatar = null;
  const email = useAuthStore((state) => state.email);
  const role = useAuthStore((state) => state.role);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDesktopSidebar = () => setIsDesktopCollapsed(!isDesktopCollapsed);
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("surekeysToken");
    // Redirect to login or handle logout
    console.log("Logging out...");
  };

  const navItems =
    role === "landlord"
      ? landlordNav
      : role === "tenant"
      ? tenantNav
      : role === "agent"
      ? agentNav
      : [];

  return (
    <>
      {/* Mobile Header - Clean and Minimal */}
      <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <img
            src={Logo.src}
            alt="SureKeys"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Only Menu Button on Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg self-start fixed text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 shadow-sm transition-all duration-300 ease-in-out ${
          isDesktopCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Desktop Header */}
        <div className="flex h-fit items-center justify-between p-4 border-b border-gray-100">
          {!isDesktopCollapsed && (
            <img
              src={Logo.src}
              alt="SureKeys"
              className="h-[90px] w-[100px] object-contain transition-opacity duration-300"
            />
          )}
          <button
            onClick={toggleDesktopSidebar}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ml-auto"
            aria-label={
              isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isDesktopCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Desktop User Profile Section */}
        {!isDesktopCollapsed && (
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center w-full space-x-3 p-3 rounded-lg text-left hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCircle size={24} className="text-green-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                  </p>
                  <p className="text-xs text-gray-500 ">{email}</p>
                </div>
                {/* <ChevronDown
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                /> */}
              </button>

              {/* Desktop Profile Dropdown */}
              {/* {isProfileDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
                      {role}
                    </p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors">
                      <User size={16} className="mr-3 text-gray-500" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                      isActive
                        ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    title={isDesktopCollapsed ? label : undefined}
                  >
                    <Icon
                      size={20}
                      className={`flex-shrink-0 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                    {!isDesktopCollapsed && (
                      <span className="ml-3 truncate">{label}</span>
                    )}

                    {/* Desktop Tooltip for collapsed state */}
                    {isDesktopCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {label}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Footer */}
        {!isDesktopCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              © 2025 SureKeys
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar - Slide-in Panel */}
      <aside
        className={`md:hidden fixed left-0 top-0 w-80 bg-white shadow-2xl h-full z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
          <img
            src={Logo.src}
            alt="SureKeys"
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile User Profile Section */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4 mb-4">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-200"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-2 border-green-200">
                <UserCircle size={32} className="text-green-600" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{email}</p>
              <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full mt-1">
                {role}
              </span>
            </div>
          </div>

          {/* <div className="space-y-1">
            <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <User size={18} className="mr-3 text-gray-500" />
              Profile Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Sign Out
            </button>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-l-4 border-green-500 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={toggleMobileMenu} // Close menu when item is clicked
                  >
                    <Icon
                      size={22}
                      className={`flex-shrink-0 ${
                        isActive ? "text-green-600" : "text-gray-500"
                      }`}
                    />
                    <span className="ml-4">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 text-center font-medium">
            © 2025 SureKeys Dashboard
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
