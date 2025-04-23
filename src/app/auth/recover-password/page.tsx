import { Metadata } from "next";
import RecoverPasswordForm from "@/components/Auth/Recover-Password/Recover-Password-Form";

export const metadata: Metadata = {
  title: "Recover Password | Will You Be My Boba",
  description: "Recover your Will You Be My Boba account's password",
};

const RecoverPasswordPage = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">
          Please enter your new password below
        </p>
      </div>

      <RecoverPasswordForm />
    </>
  );
};

export default RecoverPasswordPage;
