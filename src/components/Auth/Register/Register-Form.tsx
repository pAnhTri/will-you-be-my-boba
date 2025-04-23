"use client";

import { createClient } from "@/lib/supabase/client";
import { loginSignupSchema } from "@/lib/validators/login_signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";

const registerSchema = loginSignupSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    // Reset errors, success and loading state
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    // Sign up with email and password
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/confirm`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
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
        <h3 className="text-xl font-medium">Check your email</h3>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification link to{" "}
          <span className="font-medium">{watch("email")}</span>
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
            <span>Signing up...</span>
          </div>
        ) : (
          "Sign up"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
