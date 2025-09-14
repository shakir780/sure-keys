import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: string) => {
  // Remove all non-digit characters
  const numericValue = value.replace(/[^\d]/g, "");

  // Format with commas
  const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formatted ? `₦${formatted}` : "";
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getPlatformIcon = (platform: string): string => {
  switch (platform.toLowerCase()) {
    case "youtube":
      return "🎬";
    case "vimeo":
      return "🎥";
    case "tiktok":
      return "🎵";
    default:
      return "📹";
  }
};

export const getFacilityIcon = (facility: string): string => {
  const icons: Record<string, string> = {
    security: "🛡️",
    parking: "🚗",
    "air conditioning": "❄️",
    water: "💧",
    internet: "📶",
    "swimming pool": "🏊",
    gym: "💪",
    playground: "🏟️",
  };
  return icons[facility.toLowerCase()] || "✨";
};
