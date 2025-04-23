"use client";

import { createClient } from "@/lib/supabase/client";
import {
  RecoverPasswordInput,
  recoverPasswordSchema,
} from "@/lib/validators/recover_password";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

const RecoverPasswordForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  }, [isSuccess, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordInput>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onSubmit: SubmitHandler<RecoverPasswordInput> = async (data) => {
    // Reset error and success state
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw new Error(error.message);

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(`Failed to recover password: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-green-100 p-2 rounded-full">
            <CiCircleCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-medium">Successfully Recovered Password</h3>
        <p className="text-muted-foreground">
          We&apos;ve successfully recovered your password. You will be
          redirected to the start page shortly or click{" "}
          <Link href="/" className="text-pink-500 hover:text-pink-600">
            here
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          placeholder="••••••••"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <FiLoader className="size-4 animate-spin" />
            <span>Recovering password...</span>
          </div>
        ) : (
          "Recover Password"
        )}
      </button>
    </form>
  );
};

export default RecoverPasswordForm;
