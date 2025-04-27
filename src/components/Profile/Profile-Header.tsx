"use client";

import { FaCamera } from "react-icons/fa";
import Avatar from "../Site-Avatar";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/zustand/stores";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { compressImage } from "@/lib/utils";
import { useAvatarStore } from "@/lib/zustand/stores/avatar";

interface ProfileHeaderProps {
  initialAvatar: string | null;
}

const ProfileHeader = ({ initialAvatar }: ProfileHeaderProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const avatar = useAvatarStore((state) => state.avatar);
  const isImageLoading = useAvatarStore((state) => state.isImageLoading);
  const { setAvatar, setIsImageLoading } = useAvatarStore();

  const user = useAuthStore((state) => state.user);

  const supabase = createClient();

  useEffect(() => {
    setAvatar(initialAvatar);
  }, [initialAvatar]);

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    //Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    //Check if the file is too large
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    // Set error and uploading state
    setError(null);
    setIsUploading(true);
    setIsImageLoading(true);

    // Upload avatar to supabase storage
    try {
      //Compress the image
      const compressedFile = await compressImage(file);

      // Get file extension
      const fileExt = file.name.split(".").pop();
      const userId = user?.id;

      //Format is userId/avatar.extension

      if (!fileExt || !userId) throw new Error("Invalid file or user ID");

      // Upload with userId as filename
      const tag = `avatar-${Date.now()}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${userId}/${tag}.${fileExt}`, compressedFile, {
          upsert: true,
        });

      // Get public url
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${userId}/${tag}.${fileExt}`);

      setAvatar(publicUrlData.publicUrl);

      if (error) throw error;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
            <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Image + Username + Edit + Basic Info + Tabs */}
        <div className="relative">
          <div className="relative size-24 ring-4 ring-white rounded-full overflow-hidden">
            <Avatar
              src={avatar ?? undefined}
              alt="Profile Image"
              isImageLoading={isImageLoading}
              setIsImageLoading={setIsImageLoading}
            />
          </div>

          {isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center ring-4 ring-white/50 rounded-full bg-white/50 opacity-100">
              <FiLoader className="size-6 animate-spin" />
            </div>
          ) : (
            <>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center ring-4 ring-black/50 rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <FaCamera className="size-8" />
                <span className="sr-only">Upload new avatar</span>
              </label>

              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
