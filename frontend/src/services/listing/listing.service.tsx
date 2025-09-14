// services/listings.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ========== Types ==========
export interface ListingPayload {
  title: string;
  purpose: "For Rent" | "Short Let";
  state: string;
  locality: string;
  area: string;
  streetEstateNeighbourhood: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  kitchens: number;
  propertySize: number;
  facilities: string[];
  rentAmount: string | number;
  paymentFrequency: "monthly" | "quarterly" | "yearly";
  availability: "yes" | "no";
  description: string;
  images: any[]; // or a more specific type if you have image metadata
  photoNotes?: string;
  inviteAgentToBid?: boolean;
  agentInviteDetails?: {
    commissionRate?: string | number;
    preferredAgentType?: "any" | "local" | "experienced" | "premium";
    additionalRequirements?: string;
  };
}

// ========== Create Listing ==========
export const createListing = async (payload: any, token: string) => {
  const res = await axios.post(`${BASE_URL}/api/listings`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
// ========== Get Listings with Filters ==========
export const getListings = async (params?: Record<string, any>) => {
  const res = await axios.get(`${BASE_URL}/api/listings`, { params });
  return res.data;
};
export const getListing = async (id: string, params?: Record<string, any>) => {
  const { data } = await axios.get(`/listings/${id}`, { params });
  return data;
};

// ========== Get Single Listing ==========
export const getListingById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/api/listing/${id}`);
  return res.data;
};

// ========== Update Listing ==========
export const updateListing = async (
  id: string,
  payload: Partial<ListingPayload>,
  token: string
) => {
  const res = await axios.put(`${BASE_URL}/api/listings/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ========== Delete Listing ==========
export const deleteListing = async (id: string, token: string) => {
  const res = await axios.delete(`${BASE_URL}/api/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ========== Agent: Submit Bid ==========
export const submitAgentBid = async (
  listingId: string,
  payload: {
    proposedCommission: string | number;
    coverLetter: string;
    experience?: string;
  }
) => {
  const res = await axios.post(
    `${BASE_URL}/api/listings/${listingId}/bids`,
    payload
  );
  return res.data;
};

// ========== Landlord: Accept Bid ==========
export const acceptAgentBid = async (listingId: string, bidId: string) => {
  const res = await axios.put(
    `${BASE_URL}/api/listings/${listingId}/bids/${bidId}/accept`
  );
  return res.data;
};

// ========== Landlord: Reject Bid ==========
export const rejectAgentBid = async (listingId: string, bidId: string) => {
  const res = await axios.put(
    `${BASE_URL}/api/listings/${listingId}/bids/${bidId}/reject`
  );
  return res.data;
};

// ========== Landlord: Get All Bids for a Listing ==========
export const getListingBids = async (listingId: string) => {
  const res = await axios.get(`${BASE_URL}/api/listings/${listingId}/bids`);
  return res.data;
};
