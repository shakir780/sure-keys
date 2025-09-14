"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@src/services/upload/upload.service";

export const useUploadImage = (token: string) =>
  useMutation({
    mutationFn: (file: File) => uploadImage(file, token),
  });
