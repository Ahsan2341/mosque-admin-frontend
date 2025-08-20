import { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const useImageUpload = (uploadImageNameApi) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const compressImage = async (file) => {
    const MAX_SIZE_KB = 500; 
    const sizeInKB = file.size / 1024; 

    if (sizeInKB <= MAX_SIZE_KB) {
      return file; 
    }
  
    const options = {
      maxSizeMB: MAX_SIZE_KB / 1024, 
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type.includes('png') ? 'image/png' : 'image/jpeg',
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      const compressedSizeKB = compressedFile.size / 1024;
      
      console.log(`Compressed size: ${compressedSizeKB.toFixed(2)}KB`);
      if (compressedSizeKB > MAX_SIZE_KB) {
        return await imageCompression(file, {
          ...options,
          initialQuality: 0.6 
        });
      }
      
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return file; 
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgUploading(true);
    try {
      const compressedFile = await compressImage(file);
      const previewUrl = await imageCompression.getDataUrlFromFile(
        compressedFile
      );
      setImagePreview(previewUrl);
      setSelectedFile(compressedFile);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setImgUploading(false);
    }
  };
  const handleReset = () => {
    setImagePreview(null);
    setImageUrl("");
    setSelectedFile(null);
  };
  const handleUploadImageName = async () => {
    if (!selectedFile) return;
    const data = {
      file: selectedFile.name,
    };

    try {
      const response = await uploadImageNameApi(data);
      const uploadedUrl = response.data.data.signedUrl || response.data.url;
      setImageUrl(uploadedUrl);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleUploadFile = async (uploadFileAPI) => {
    if (!imageUrl || !selectedFile) return;

    try {
      await uploadFileAPI(imageUrl, selectedFile);
      setImgUploading(false);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return {
    imgUploading,
    imageUrl,
    imagePreview,
    handleUploadFile,
    handleFileChange,
    handleUploadImageName,
    handleReset,
  };
};

export default useImageUpload;
