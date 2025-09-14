import z from "zod";

export const detailsSchema = z
  .object({
    bedrooms: z.number().min(0).max(20),
    bathrooms: z.number().min(0).max(20),
    toilets: z.number().min(0).max(20),
    kitchens: z.number().min(0).max(10),
    propertySize: z.number().min(1).max(10000),
    facilities: z.array(z.string()),
    rentAmount: z
      .string()
      .min(1, "Rent amount is required")
      .refine((val) => {
        const cleanValue = val.replace(/[₦,\s]/g, "");
        return !isNaN(Number(cleanValue)) && Number(cleanValue) > 0;
      }, "Enter a valid amount"),
    paymentFrequency: z.enum(["monthly", "quarterly", "yearly"]),
    availability: z.enum(["yes", "no"]),
    description: z.string().min(20).max(1000),
    inviteAgentToBid: z.boolean().optional().default(false),
    landlordLivesInCompound: z.boolean().default(false),

    agentInviteDetails: z
      .object({
        commissionRate: z.string().optional(),
        preferredAgentType: z
          .enum(["any", "local", "experienced", "premium"])
          .optional()
          .default("any"),
        additionalRequirements: z
          .string()
          .max(500, "Additional requirements must be less than 500 characters")
          .optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.inviteAgentToBid && !data.agentInviteDetails) {
        return false;
      }
      return true;
    },
    {
      message: "Agent invite details are required when inviting agents to bid",
      path: ["agentInviteDetails"],
    }
  );

export const photosSchema = z.object({
  images: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string(),
        isCover: z.boolean(),
      })
    )
    .min(3, "Please upload at least 3 photos")
    .max(20, "Maximum 20 photos allowed"),
  videoLinks: z
    .array(z.string().url("Please provide a valid video link"))
    .max(5, "Maximum 5 video links allowed")
    .optional(),
  photoNotes: z
    .string()
    .max(500, "Photo notes must be less than 500 characters")
    .optional(),
});
