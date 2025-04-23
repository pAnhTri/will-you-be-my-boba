"use client";

import { createClient } from "@/lib/supabase/client";
import {
  LoginSignupInput,
  loginSignupSchema,
} from "@/lib/validators/login_signup";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSignupInput>({
    resolver: zodResolver(loginSignupSchema),
  });

  const onSubmit: SubmitHandler<LoginSignupInput> = async (data) => {
    // Reset errors and loading state
    setError(null);
    setIsLoading(true);

    // Sign in with email and password
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          placeholder="you@example.com"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-pink-500 hover:text-pink-600"
            tabIndex={-1}
          >
            Forgot password?
          </Link>
        </div>

        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="••••••••"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
