// types/listing.ts
export interface Image {
  url: string;
  isCover?: boolean;
}

export interface VideoLink {
  platform: string;
  url: string;
  title?: string;
}

export interface AgentInviteDetails {
  commissionRate: number;
  preferredAgentType: string;
  additionalRequirements: string;
}

export interface Creator {
  id: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  role: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  streetEstateNeighbourhood: string;
  area: string;
  locality: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  kitchens: number;
  propertySize: number;
  views: number;
  propertyType: string;
  availability: "yes" | "no";
  rentAmount: number;
  paymentFrequency: string;
  purpose: string;
  status: "active" | "inactive";
  isFeatured: boolean;
  landlordLivesInCompound: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  isExpired: boolean;
  agentBidsCount: number;
  activeBidsCount: number;
  images: Image[];
  videoLinks?: VideoLink[];
  facilities?: string[];
  inviteAgentToBid: boolean;
  agentInviteDetails: AgentInviteDetails;
  photoNotes?: string;
  creator: Creator;
}

export type TabType =
  | "overview"
  | "media"
  | "facilities"
  | "agents"
  | "details"
  | "contact";
