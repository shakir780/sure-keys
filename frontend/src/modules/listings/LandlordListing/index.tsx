"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Filter, Grid3X3, List, Building2 } from "lucide-react";
import ListingsGrid, { ApiResponse } from "../ListingsGrid";
import Filters from "../filters";
import { useGetListings } from "@hooks/useListing";

const LandlordListing = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);

  const {
    data,
    isLoading,
    error,
  }: { data?: ApiResponse; isLoading: any; error: any } = useGetListings({
    page: 1,
    limit: 12,
    sort: "-createdAt",
  });

  return (
    <div className="min-h-fit bg-gray-50">
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                My Properties
              </h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Building2 size={16} className="text-green-600" />
                  <span>24 Total Properties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>18 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>6 Occupied</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Add Property Button */}
              <Link
                href="/post-a-property"
                className="inline-flex items-center px-4 lg:px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-sm lg:text-base rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={18} className="mr-2" />
                <span className="hidden sm:inline">Add New</span>
                <span className="sm:hidden">Add</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Filters Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Filter size={18} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <p className="text-xs text-gray-500">
                  Refine your property search
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Filter size={16} />
              <span>{showFilters ? "Hide" : "Show"}</span>
            </button>
          </div>

          {/* Filters Component */}
          {showFilters && <Filters />}
        </div>

        {/* Listings Grid */}
        <ListingsGrid
          isLoading={isLoading}
          data={data}
          error={error}
          viewMode={viewMode}
        />
      </main>
    </div>
  );
};

export default LandlordListing;
