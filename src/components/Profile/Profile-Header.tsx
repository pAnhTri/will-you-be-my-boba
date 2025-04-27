"use client";

import { FaCamera } from "react-icons/fa";
import Avatar from "../Site-Avatar";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore, useBobaStore } from "@/lib/zustand/stores";
import { CiCircleAlert } from "react-icons/ci";
import { FiEdit, FiLoader } from "react-icons/fi";
import { compressImage } from "@/lib/utils";
import { useAvatarStore } from "@/lib/zustand/stores/avatar";
import { UserType } from "@/lib/mongodb/models/User";
import { useEffect, useState } from "react";
import StatusCard from "./Profile-Header-StatusCard";
import EditUsernameForm from "./Profile-Header-EditUsernameForm";
import { updateUsername } from "@/lib/utils/api/user";
import { getBobas } from "@/lib/utils/api/boba";

interface ProfileHeaderProps {
  initialUserProfile: UserType;
}

const ProfileHeader = ({ initialUserProfile }: ProfileHeaderProps) => {
  const [userProfile, setUserProfile] = useState<UserType>(initialUserProfile);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUsernameUpdating, setIsUsernameUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const avatar = useAvatarStore((state) => state.avatar);
  const isImageLoading = useAvatarStore((state) => state.isImageLoading);
  const { setAvatar, setIsImageLoading } = useAvatarStore();

  const selectedBoba = useBobaStore((state) => state.selectedBoba);
  const { setBobas, setSelectedBoba } = useBobaStore();

  const user = useAuthStore((state) => state.user);

  const supabase = createClient();

  useEffect(() => {
    setUserProfile(initialUserProfile);
  }, [initialUserProfile]);

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

  const handleUsernameUpdate = async (username: string) => {
    setIsUsernameUpdating(true);
    setError(null);

    try {
      await updateUsername(user?.id ?? "", username);

      setUserProfile((prev) => ({
        ...prev,
        username: username,
      }));

      // Update the states of boba and selected boba
      const { bobas } = await getBobas();
      setBobas(bobas);
      setSelectedBoba(
        bobas.find((boba) => boba._id === selectedBoba?._id) ?? null
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating username:", error);
      setError("Failed to update username. Please try again.");
    } finally {
      setIsUsernameUpdating(false);
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
        <div className="flex flex-col gap-2">
          {/* Username + Edit */}
          <div className="flex justify-center md:justify-start items-center gap-2">
            {isEditing ? (
              <EditUsernameForm
                currentUsername={userProfile.username ?? ""}
                isUsernameUpdating={isUsernameUpdating}
                setIsEditing={setIsEditing}
                handleUsernameUpdate={handleUsernameUpdate}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                <button onClick={() => setIsEditing(true)}>
                  <FiEdit className="size-4 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
                </button>
              </>
            )}
          </div>

          {/* Email */}
          <p className="text-gray-500 text-center md:text-left">
            {userProfile.email}
          </p>

          {/* Status Card */}
          <div className="flex justify-center md:justify-start items-center gap-2">
            <StatusCard
              className="flex flex-col items-center justify-center"
              status={userProfile.reviews.length.toString()}
              title="Rated Bobas"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
