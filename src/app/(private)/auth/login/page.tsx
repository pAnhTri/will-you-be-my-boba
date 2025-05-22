import LoginMethod from "@/components/Auth/Login/Login-Method";
import OAuthGoogleButton from "@/components/Auth/Login/Login-OAuth-Google";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Will You Be My Boba",
  description: "Login to your Will You Be My Boba account",
};

export const dynamic = "force-dynamic";

const LoginPage = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <LoginMethod />

      {/* OAuth Providers */}

      <div className="flex flex-col gap-4 border-t pt-4 mb-6">
        <p className="text-muted-foreground text-center">Or sign in with</p>
        <div className="flex items-center gap-4">
          <OAuthGoogleButton />
        </div>
      </div>

      {/* Signup Link */}
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-pink-500 hover:text-pink-600 font-medium"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
