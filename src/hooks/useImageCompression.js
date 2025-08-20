import { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = async (file, maxSizeKB = 500, maxWidthOrHeight = 1920) => {
    if (!file) return null;

    setIsCompressing(true);
    try {
      const sizeInKB = file.size / 1024;

      if (sizeInKB <= maxSizeKB) {
        setIsCompressing(false);
        return { compressedFile: file, previewUrl: await imageCompression.getDataUrlFromFile(file) };
      }

      const options = {
        maxSizeMB: maxSizeKB / 1024,
        maxWidthOrHeight,
        useWebWorker: true,
        fileType: file.type.includes('png') ? 'image/png' : 'image/jpeg',
      };

      let compressedFile = await imageCompression(file, options);
      const compressedSizeKB = compressedFile.size / 1024;

      if (compressedSizeKB > maxSizeKB) {
        compressedFile = await imageCompression(file, {
          ...options,
          initialQuality: 0.6,
        });
      }

      const previewUrl = await imageCompression.getDataUrlFromFile(compressedFile);
      return { compressedFile, previewUrl };
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Failed to compress image");
      return { compressedFile: file, previewUrl: await imageCompression.getDataUrlFromFile(file) };
    } finally {
      setIsCompressing(false);
    }
  };

  return { compressImage, isCompressing };
};

export default useImageCompression;