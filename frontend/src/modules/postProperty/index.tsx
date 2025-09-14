"use client";

import React, { useState } from "react";
import AddressStep from "./AddressStep";
import DetailsStep from "./DetailsStep";
import PhotosStep from "./PhotosStep";
import PreviewPage from "./previewPage";
import { usePropertyFormStore } from "store/propertyFormStore";

export default function AddPropertyPage() {
  const [step, setStep] = useState(1);

  const steps = ["Address", "Details", "Photos", "Preview"];
  const details = usePropertyFormStore((s) => s.details);
  const photos = usePropertyFormStore((s) => s.photos);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Stepper */}
      <div className="flex justify-between items-center px-4 md:px-8">
        {steps.map((label, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step - 1 === index
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-1 text-sm text-gray-700">{label}</span>
            {index < steps.length - 1 && (
              <div className="absolute top-4 right-[-50%] w-full border-t-2 border-dashed border-gray-300 z-0"></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      {step === 1 && <AddressStep onNext={() => setStep(2)} />}

      {step === 2 && (
        <DetailsStep
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          defaultValues={details}
        />
      )}

      {step === 3 && (
        <PhotosStep
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          defaultValues={photos}
        />
      )}
      {step === 4 && <PreviewPage onBack={() => setStep(3)} />}
    </div>
  );
}
