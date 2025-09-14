// store/propertyFormStore.ts
import { create } from "zustand";

interface AddressFormData {
  title: string;
  purpose: "For Rent" | "Short Let";
  state: string;
  locality: string;
  area: string;
  streetEstateNeighbourhood: string;
  propertyType: string;
}

interface DetailsFormData {
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  kitchens: number;
  rentAmount: string;
  description: string;
  paymentFrequency: any;
  availability: any;
  facilities: any;
  propertySize: any;
  landlordLivesInCompound: any;
  agentInviteDetails: any;
  inviteAgentToBid: any;
  // Add others as needed
}

interface ImageData {
  file?: File;
  url: string;
  public_id: string;
  isCover: boolean;
}

interface PhotosFormData {
  images: ImageData[];
  videoLinks?: string[];

  photoNotes?: string;
}

interface AgentInviteDetails {
  commissionRate?: string;
  preferredAgentType: "any" | "local" | "experienced" | "premium";
  additionalRequirements?: string;
}

interface PropertyFormState {
  address?: AddressFormData;
  details?: DetailsFormData;
  photos?: PhotosFormData;
  agentInviteDetails?: AgentInviteDetails;
  inviteAgentToBid?: boolean;
  setAddress: (data: AddressFormData) => void;
  setDetails: (data: DetailsFormData) => void;
  setPhotos: (data: PhotosFormData) => void;
  setAgentInviteDetails: (data: AgentInviteDetails) => void;
  setInviteAgentToBid: (invite: boolean) => void;
  reset: () => void;
}

export const usePropertyFormStore = create<PropertyFormState>((set) => ({
  address: undefined,
  details: undefined,
  photos: undefined,
  paymentFrequency: undefined,
  agentInviteDetails: undefined,
  inviteAgentToBid: false,
  setAddress: (data) => set({ address: data }),
  setDetails: (data) => set({ details: data }),
  setPhotos: (data) => set({ photos: data }),
  setAgentInviteDetails: (data) => set({ agentInviteDetails: data }),
  setInviteAgentToBid: (invite) => set({ inviteAgentToBid: invite }),
  reset: () =>
    set({
      address: undefined,
      details: undefined,
      photos: undefined,
      agentInviteDetails: undefined,
      inviteAgentToBid: false,
    }),
}));
