import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
