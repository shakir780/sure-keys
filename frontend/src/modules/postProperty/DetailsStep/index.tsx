import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePropertyFormStore } from "store/propertyFormStore";
import { detailsSchema } from "store/types/listingShema";
import { availableFacilities } from "@src/constants/facilities";
import { formatCurrency } from "@lib/util";

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsStepProps {
  onNext: (data: DetailsFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<DetailsFormData>;
}

export default function DetailsStep({
  onNext,
  onBack,
  defaultValues,
}: DetailsStepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      bedrooms: 0,
      bathrooms: 0,
      toilets: 0,
      kitchens: 0,
      propertySize: 0,
      facilities: [],
      rentAmount: "",
      paymentFrequency: undefined,
      availability: undefined,
      inviteAgentToBid: false,
      description: "",
      agentInviteDetails: {
        commissionRate: "",
        preferredAgentType: "any",
        additionalRequirements: "",
      },
      ...defaultValues,
    },

    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const selectedFacilities = watch("facilities");
  const selectedAvailability = watch("availability");
  const inviteAgentToBid = watch("inviteAgentToBid");
  const landlordLivesInCompound = watch("landlordLivesInCompound"); // Watch the new field

  useEffect(() => {
    if (inviteAgentToBid) {
      if (!getValues("agentInviteDetails")) {
        setValue("agentInviteDetails", {
          commissionRate: "",
          preferredAgentType: "any",
          additionalRequirements: "",
        });
      }
    }
  }, [inviteAgentToBid, setValue, getValues]);
  const onSubmit = (data: DetailsFormData) => {
    //@ts-ignore
    usePropertyFormStore.getState().setDetails(data);
    onNext(data);
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    const currentFacilities = getValues("facilities") || [];
    if (checked) {
      setValue("facilities", [...currentFacilities, facility]);
    } else {
      setValue(
        "facilities",
        currentFacilities.filter((f) => f !== facility)
      );
    }
  };

  const handleRentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValue("rentAmount", formatted);
  };

  const handleCommissionRateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatCurrency(e.target.value);
    setValue("agentInviteDetails.commissionRate", formatted);
  };

  const userRole = "landlord";

  console.log(isValid);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Property Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us more about the property so tenants know what to expect.
        </p>
      </div>

      <div className="space-y-6">
        {/* Property Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "bedrooms", label: "Bedrooms" },
            { name: "bathrooms", label: "Bathrooms" },
            { name: "toilets", label: "Toilets" },
            { name: "kitchens", label: "Kitchens" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} *
              </label>
              <input
                type="number"
                min={0}
                placeholder="0"
                className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors[name as keyof DetailsFormData]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...register(name as keyof DetailsFormData, {
                  valueAsNumber: true,
                })}
              />
              {errors[name as keyof DetailsFormData] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name as keyof DetailsFormData]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Property Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Size (m²) *
          </label>
          <input
            type="number"
            placeholder="e.g. 120"
            className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.propertySize ? "border-red-500" : "border-gray-300"
            }`}
            {...register("propertySize", { valueAsNumber: true })}
          />
          {errors.propertySize && (
            <p className="text-red-500 text-xs mt-1">
              {errors.propertySize.message}
            </p>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              className="accent-green-600"
              {...register("landlordLivesInCompound")}
            />
            <div>
              <span>Landlord lives in the compound</span>
              <p className="text-xs text-gray-500 font-normal mt-1">
                Check this if the property owner lives on the same compound or
                premises
              </p>
            </div>
          </label>

          {/* Optional: Show additional info when checked */}
          {landlordLivesInCompound && (
            <div className="mt-3 ml-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-start gap-2">
                <div className="text-blue-600 text-sm">ℹ️</div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Landlord on-site benefits:
                  </p>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>• Quick response to maintenance issues</li>
                    <li>• Enhanced security and property oversight</li>
                    <li>• Direct communication with property owner</li>
                    <li>• Immediate assistance when needed</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facilities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {availableFacilities.map((facility) => (
              <label key={facility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-green-600"
                  checked={selectedFacilities?.includes(facility) || false}
                  onChange={(e) =>
                    handleFacilityChange(facility, e.target.checked)
                  }
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent Amount *
            </label>
            <Controller
              name="rentAmount"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="e.g. ₦1,200,000"
                  className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.rentAmount ? "border-red-500" : "border-gray-300"
                  }`}
                  value={field.value}
                  onChange={handleRentAmountChange}
                />
              )}
            />
            {errors.rentAmount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rentAmount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Frequency *
            </label>
            <select
              className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.paymentFrequency ? "border-red-500" : "border-gray-300"
              }`}
              {...register("paymentFrequency")}
            >
              <option value="">Select</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.paymentFrequency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paymentFrequency.message}
              </p>
            )}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability *
          </label>
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="yes"
                    checked={selectedAvailability === "yes"}
                    onChange={() => field.onChange("yes")}
                    className="accent-green-600"
                  />
                  Available
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    value="no"
                    checked={selectedAvailability === "no"}
                    onChange={() => field.onChange("no")}
                    className="accent-green-600"
                  />
                  Not Available
                </label>
              </div>
            )}
          />
          {errors.availability && (
            <p className="text-red-500 text-xs mt-1">
              {errors.availability.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Description *
          </label>
          <textarea
            rows={4}
            placeholder="Describe the property in detail"
            className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Agent Invitation Section */}
        {userRole === "landlord" && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="accent-green-600"
                  {...register("inviteAgentToBid")}
                />
                Invite agent(s) to bid for this listing
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Allow real estate agents to submit proposals to manage your
                property
              </p>
            </div>

            {/* Agent Invitation Details - Only show when checkbox is checked */}
            {inviteAgentToBid && (
              <div className="space-y-4 ml-6 border-l-2 border-green-200 pl-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Commission Rate
                    </label>
                    <Controller
                      name="agentInviteDetails.commissionRate"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          placeholder="e.g. ₦50,000"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={field.value || ""}
                          onChange={handleCommissionRateChange}
                        />
                      )}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Set your preferred commission amount
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Agent Type
                    </label>
                    <select
                      className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      {...register("agentInviteDetails.preferredAgentType")}
                    >
                      <option value="any">Any Agent</option>
                      <option value="local">Local Agents</option>
                      <option value="experienced">Experienced Agents</option>
                      <option value="premium">Premium Agents</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requirements or preferences for agents (e.g., minimum years of experience, specific areas of expertise, etc.)"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("agentInviteDetails.additionalRequirements")}
                  />
                  {errors.agentInviteDetails?.additionalRequirements && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.agentInviteDetails.additionalRequirements.message}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <div className="text-blue-600 text-sm">ℹ️</div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        How it works:
                      </p>
                      <ul className="text-xs text-blue-700 mt-1 space-y-1">
                        <li>• Qualified agents will submit their proposals</li>
                        <li>
                          • You can review their profiles and commission rates
                        </li>
                        <li>• Choose the agent that best fits your needs</li>
                        <li>• You're not obligated to accept any proposal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className={`px-6 py-2 rounded-md text-sm transition-colors ${
              isValid
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Photos
          </button>
        </div>
      </div>
    </div>
  );
}
