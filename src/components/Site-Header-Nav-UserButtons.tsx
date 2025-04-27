"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useAuthStore } from "@/lib/zustand/stores/auth";
import { FiLoader } from "react-icons/fi";
import { useAvatarStore } from "@/lib/zustand/stores/avatar";
import Avatar from "./Site-Avatar";

interface SiteHeaderNavUserButtonsProps {
  initialAvatar: string | null;
}

export default function SiteHeaderNavUserButtons({
  initialAvatar,
}: SiteHeaderNavUserButtonsProps) {
  const { user, isLoading } = useAuthStore();

  const avatar = useAvatarStore((state) => state.avatar);
  const isImageLoading = useAvatarStore((state) => state.isImageLoading);
  const { setAvatar, setIsImageLoading } = useAvatarStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setAvatar(initialAvatar);
  }, [initialAvatar]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const initials = user?.email?.split("@")[0].slice(0, 2).toUpperCase() || "?";

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <FiLoader className="size-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`hidden md:flex items-center justify-center size-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${
              avatar
                ? "relative overflow-hidden hover:ring-2 hover:ring-gray-300"
                : ""
            }`}
          >
            {avatar ? (
              <Avatar
                src={avatar}
                alt={user.email || ""}
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
              />
            ) : (
              <span className="text-sm font-medium text-gray-700">
                {initials}
              </span>
            )}
          </button>

          {dropdownOpen && (
            <div className="hidden md:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" onClick={() => setDropdownOpen(false)}>
                <Link
                  href={`/profile/${user.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Favorites
                </Link>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
          >
            Sign Up
          </Link>
        </>
      )}

      <div className="relative">
        {/* Mobile Menu Button */}
        {user ? (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex items-center justify-center size-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${
              avatar
                ? "relative overflow-hidden hover:ring-2 hover:ring-gray-300"
                : ""
            }`}
          >
            {avatar ? (
              <Avatar
                src={avatar}
                alt={user.email || ""}
                isImageLoading={isImageLoading}
                setIsImageLoading={setIsImageLoading}
              />
            ) : (
              <span className="text-sm font-medium text-gray-700">
                {initials}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <RxCross1 className="size-6" />
            ) : (
              <RxHamburgerMenu className="size-6" />
            )}
          </button>
        )}
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" onClick={() => setMobileMenuOpen(false)}>
              {/* Navigation Links - Accessible to all users */}
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Discover
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>
              <div className="border-t border-gray-200 my-1" />

              {!user && (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    href={`/profile/${user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Favorites
                  </Link>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
