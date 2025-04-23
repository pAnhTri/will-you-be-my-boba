import ForgotPasswordForm from "@/components/Auth/Forgot-Password/Forgot-Password-Form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password | Will You Be My Boba",
  description: "Reset your Will You Be My Boba password",
};

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">
          We&apos;ll send you a reset link
        </p>
      </div>

      {/* Forgot Password Form */}
      <ForgotPasswordForm />

      {/* Signin Link */}
      <p className="text-center">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="text-pink-500 hover:text-pink-600 font-medium"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
