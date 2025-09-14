import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Video } from "lucide-react";
import { usePropertyFormStore } from "store/propertyFormStore";
import { useUploadImage } from "@hooks/useUploadImage";
import { photosSchema } from "store/types/listingShema";
import { getToken } from "@lib/authStorage";
import { VideoLinksSection } from "@components/videosComponent";
import { PhotosSection } from "@components/photosComponent";
// Types
export type PhotosFormData = z.infer<typeof photosSchema>;

export interface ImageType {
  url: string;
  public_id: string;
  isCover: boolean;
  file?: File;
}

export interface VideoLinkType {
  url: string;
  title: string;
  platform: string;
}

interface PhotosStepProps {
  onNext: (data: PhotosFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<PhotosFormData>;
}

export default function PhotosStep({
  onNext,
  onBack,
  defaultValues,
}: PhotosStepProps): JSX.Element {
  const [images, setImages] = useState<ImageType[]>(
    defaultValues?.images || []
  );

  const [videoLinks, setVideoLinks] = useState<VideoLinkType[]>(
    defaultValues?.videoLinks || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    reset,
  } = useForm<PhotosFormData>({
    resolver: zodResolver(photosSchema),
    defaultValues: {
      images: [],
      photoNotes: "",
      videoLinks: [],
      ...defaultValues,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const token: string | null = getToken();
  console.log(token);

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage(
    token || ""
  );

  // Update form values when state changes
  useEffect(() => {
    setValue("images", images);
    trigger("images");
  }, [images, setValue, trigger]);

  useEffect(() => {
    // Convert VideoLinkType[] to string[] for form validation
    const videoUrlsOnly: string[] = videoLinks.map(
      (link: VideoLinkType) => link.url
    );
    setValue("videoLinks", videoUrlsOnly);
  }, [videoLinks, setValue]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) return;

    const selectedFiles: File[] = Array.from(e.target.files);

    // Validate file types and sizes
    const validFiles: File[] = selectedFiles.filter((file: File) => {
      const isValidType: boolean = file.type.startsWith("image/");
      const isValidSize: boolean = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (!isValidType) {
        alert(`${file.name} is not a valid image file.`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    const uploadedImages: ImageType[] = [];

    for (const file of validFiles) {
      try {
        const result = await uploadImage(file);
        uploadedImages.push({
          url: result.data.url,
          public_id: result.data.public_id,
          isCover: false,
        });
      } catch (err) {
        console.error("Upload error:", err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    const updatedImages: ImageType[] = [...images, ...uploadedImages];
    setImages(updatedImages);
  };

  const setAsCover = (index: number): void => {
    const updatedImages: ImageType[] = images.map(
      (img: ImageType, i: number) => ({
        ...img,
        isCover: i === index,
      })
    );
    setImages(updatedImages);
  };

  const removeImage = (index: number): void => {
    const updatedImages: ImageType[] = images.filter(
      (_: ImageType, i: number) => i !== index
    );
    setImages(updatedImages);
  };

  const addVideoLink = (videoLink: VideoLinkType): void => {
    const updatedVideoLinks: VideoLinkType[] = [...videoLinks, videoLink];
    setVideoLinks(updatedVideoLinks);
  };

  const removeVideoLink = (index: number): void => {
    const updatedVideoLinks: VideoLinkType[] = videoLinks.filter(
      (_: VideoLinkType, i: number) => i !== index
    );
    setVideoLinks(updatedVideoLinks);
  };

  const onSubmit = (data: PhotosFormData): void => {
    // Ensure at least one image is set as cover
    const hasCover: boolean = data.images.some((img: ImageType) => img.isCover);
    if (!hasCover && data.images.length > 0) {
      const updatedImages: ImageType[] = data.images.map(
        (img: ImageType, i: number) => ({
          ...img,
          isCover: i === 0,
        })
      );
      setImages(updatedImages);
      data.images = updatedImages;
    }

    // Convert VideoLinkType[] to string[] to match schema
    data.videoLinks = videoLinks.map((link: VideoLinkType) => link.url);

    console.log("Submitting data:", data); // Debug log
    usePropertyFormStore.getState().setPhotos(data);
    onNext(data);
  };

  const hasCoverImage: boolean = images.some((img: ImageType) => img.isCover);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Property Photos & Videos
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add at least 3 clear photos and optional video links to showcase your
          property.
        </p>
      </div>

      {/* Photos Section */}
      <PhotosSection
        images={images}
        errors={errors}
        register={register}
        isUploading={isUploading}
        hasCoverImage={hasCoverImage}
        onFileUpload={handleFileUpload}
        onSetAsCover={setAsCover}
        onRemoveImage={removeImage}
      />

      {/* Video Links Section */}
      <VideoLinksSection
        videoLinks={videoLinks}
        onAddVideoLink={addVideoLink}
        onRemoveVideoLink={removeVideoLink}
      />

      {/* Upload Guidelines */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Photo Guidelines:
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Upload at least 3 high-quality photos</li>
          <li>• Maximum file size: 5MB per image</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Include exterior, interior, and key features</li>
          <li>• Set your best photo as the cover image</li>
        </ul>
      </div>

      {/* Navigation */}
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
          disabled={images.length < 3 || isUploading}
          className={`px-6 py-2 rounded-md text-sm transition-colors ${
            isValid && images.length >= 3 && !isUploading
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Uploading..." : "See Preview"}
        </button>
      </div>
    </div>
  );
}
