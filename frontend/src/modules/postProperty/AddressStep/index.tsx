import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { nigerianStates } from "@src/constants/states";
import { usePropertyFormStore } from "store/propertyFormStore";

const addressSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must be less than 100 characters"),
  purpose: z.enum(["For Rent", "Short Let"], {
    required_error: "Please select a purpose",
  }),
  state: z.string().min(1, "Please select a state"),
  locality: z.string().min(2, "Locality must be at least 2 characters"),
  area: z.string().min(2, "Area must be at least 2 characters"),
  streetEstateNeighbourhood: z
    .string()
    .min(5, "Street/Estate/Neighbourhood must be at least 5 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressStepProps {
  onNext: () => void;
  defaultValues?: Partial<AddressFormData>;
}

export default function AddressStep({
  onNext,
  defaultValues,
}: AddressStepProps) {
  const { address } = usePropertyFormStore((state) => state); // get saved address data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address ?? {},

    mode: "onChange",
  });

  const selectedPurpose = watch("purpose");

  const onSubmit = (data: AddressFormData) => {
    usePropertyFormStore.getState().setAddress(data);
    onNext();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Tell us more about this listing
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          We'd love to help. Please provide clear details to help renters or
          buyers.
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Newly Built 4 Bedroom Duplex in Lekki"
            className={`w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose *
          </label>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <div className="flex gap-3">
                {["For Rent", "Short Let"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => field.onChange(label)}
                    className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                      selectedPurpose === label
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "border-gray-300 hover:bg-green-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          />
          {errors.purpose && (
            <p className="text-red-500 text-xs mt-1">
              {errors.purpose.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <select
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
              {...register("state")}
            >
              <option value="">Select a State</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Locality *
            </label>
            <input
              type="text"
              className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.locality ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Yaba"
              {...register("locality")}
            />
            {errors.locality && (
              <p className="text-red-500 text-xs mt-1">
                {errors.locality.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area *
            </label>
            <input
              type="text"
              className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.area ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Tejuosho"
              {...register("area")}
            />
            {errors.area && (
              <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>
            )}
          </div>
        </div>

        {/* Street / Estate / Neighbourhood */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street / Estate / Neighbourhood *
          </label>
          <input
            type="text"
            placeholder="e.g. Lekki Gardens Phase 2"
            className={`w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.streetEstateNeighbourhood
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...register("streetEstateNeighbourhood")}
          />
          {errors.streetEstateNeighbourhood && (
            <p className="text-red-500 text-xs mt-1">
              {errors.streetEstateNeighbourhood.message}
            </p>
          )}
        </div>

        {/* Property Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Property *
            </label>
            <select
              className={`w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              }`}
              {...register("propertyType")}
            >
              <option value="">-- Select --</option>
              <option value="flat">Flat</option>
              <option value="duplex">Duplex</option>
              <option value="self-contained">Self-contained</option>
              <option value="bungalow">Bungalow</option>
              <option value="terrace">Terrace</option>
              <option value="detached">Detached</option>
              <option value="semi-detached">Semi-detached</option>
            </select>
            {errors.propertyType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyType.message}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-4">
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
