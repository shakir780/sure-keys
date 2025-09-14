"use client";

import { getToken } from "@lib/authStorage";
import {
  createListing,
  deleteListing,
  getListing,
  getListingById,
  getListings,
  ListingPayload,
  updateListing,
} from "@src/services/listing/listing.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateListing = (token: string) =>
  useMutation({
    mutationFn: (payload) => createListing(payload, token),
  });

export const useGetListings = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["listings", params],
    queryFn: () => getListings(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export const useDeleteListing = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteListing(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ListingPayload>;
    }) => {
      const token = getToken();
      if (!token) throw new Error("No auth token found");
      return updateListing(id, payload, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
};

export const useGetListing = (id: string, params?: Record<string, any>) =>
  useQuery({
    queryKey: ["listing", id, params],
    queryFn: () => getListingById(id),

    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
