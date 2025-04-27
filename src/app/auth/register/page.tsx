import RegisterForm from "@/components/Auth/Register/Register-Form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup | Will You Be My Boba",
  description: "Signup for Will You Be My Boba",
};

export const dynamic = "force-dynamic";

const SignupPage = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to Will You Be My Boba</h1>
        <p className="text-muted-foreground">Sign up to create your account</p>
      </div>

      {/* Register Form */}
      <RegisterForm />

      {/* Signin Link */}
      <p className="text-center">
        Already have an account?{" "}
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

export default SignupPage;
