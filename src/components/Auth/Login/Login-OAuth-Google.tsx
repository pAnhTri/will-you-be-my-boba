"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const OAuthGoogleButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClient();
  const searchParams = useSearchParams();

  const handleOnClick = async () => {
    // Reset errors and loading state
    setError(null);
    setIsLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/callback${searchParams.get("redirectTo") ? `?redirectTo=${searchParams.get("redirectTo")}` : ""}`,
        },
      });

      if (signInError) {
        setError(signInError.message);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <button
        className={cn(
          "p-2 rounded-lg border border-gray-300",
          "hover:bg-gray-50",
          className
        )}
        {...props}
        onClick={handleOnClick}
      >
        {isLoading ? (
          <FiLoader className="size-10 animate-spin" />
        ) : (
          <Image src="/google.svg" alt="Google" width={40} height={40} />
        )}
      </button>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default OAuthGoogleButton;
