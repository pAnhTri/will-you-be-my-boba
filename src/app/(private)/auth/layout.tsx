import Logo from "@/components/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-50 to to-purple-50 p-4">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 mb-8">
        <Logo width={128} height={128} />
        <span className="text-xl font-bold">Will You Be My Boba</span>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
