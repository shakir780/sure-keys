import React, { useState } from "react";
import { Building2, MapPin, TrendingUp } from "lucide-react";

const Filters = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    status: "",
    type: "",
    sort: "newest",
    landlord: "",
  });

  const filterOptions = {
    category: [
      { value: "", label: "All Categories" },
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "mixed", label: "Mixed Use" },
    ],
    status: [
      { value: "", label: "All Status" },
      { value: "available", label: "Available" },
      { value: "occupied", label: "Occupied" },
      { value: "maintenance", label: "Under Maintenance" },
    ],
    type: [
      { value: "", label: "All Types" },
      { value: "apartment", label: "Apartment" },
      { value: "house", label: "House" },
      { value: "studio", label: "Studio" },
      { value: "office", label: "Office Space" },
      { value: "retail", label: "Retail Space" },
    ],
    sort: [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "price-high", label: "Price: High to Low" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "name-az", label: "Name: A to Z" },
    ],
    landlord: [
      { value: "", label: "All Landlord Presence" },
      { value: "on-site", label: "On Site" },
      { value: "not-on-site", label: "Not On Site" },
    ],
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: "",
      status: "",
      type: "",
      sort: "newest",
      landlord: "",
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(
    (value) => value && value !== "newest"
  ).length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(filterOptions).map(([filterType, options]) => (
          <div key={filterType} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 capitalize flex items-center space-x-2">
              {filterType === "category" && (
                <Building2 size={14} className="text-green-600" />
              )}
              {filterType === "status" && (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              )}
              {filterType === "type" && (
                <MapPin size={14} className="text-green-600" />
              )}
              {filterType === "sort" && (
                <TrendingUp size={14} className="text-green-600" />
              )}
              {filterType === "landlordOnSite" && (
                <span className="w-3 h-3 bg-green-600 rounded-full inline-block" />
              )}
              <span>{filterType === "sort" ? "Sort By" : filterType}</span>
            </label>
            <div className="relative">
              <select
                value={activeFilters[filterType]}
                onChange={(e) => handleFilterChange(filterType, e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          {activeFilterCount > 0 && (
            <>
              <span className="text-sm font-medium text-gray-700">
                Active filters:
              </span>
              {Object.entries(activeFilters).map(([key, value]) => {
                if (!value || value === "newest") return null;
                const option = filterOptions[key]?.find(
                  (opt) => opt.value === value
                );
                return option ? (
                  <span
                    key={`${key}-${value}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                  >
                    {option.label}
                    <button
                      onClick={() => handleFilterChange(key, "")}
                      className="ml-2 hover:text-green-900"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
