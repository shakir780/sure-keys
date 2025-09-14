import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // fallback for dev

export interface UploadResponse {
  message: string;
  data: {
    url: string;
    public_id: string;
  };
}

/**
 * Upload a single image to the backend which sends it to Cloudinary.
 * @param file A single image file (JPEG, PNG, WebP)
 * @param token Auth token from localStorage or cookies
 */
export const uploadImage = async (
  file: File,
  token: string
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${BASE_URL}/api/media/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
