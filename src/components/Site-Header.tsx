import Link from "next/link";
import Logo from "./Logo";
import SiteHeaderNavUserButtons from "./Site-Header-Nav-UserButtons";
import { getAvatar } from "@/lib/utils/server";

const Header = async () => {
  const avatar = await getAvatar();
  return (
    <header className="sticky px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <Logo width={32} height={32} />
          <span className="text-xl font-bold">Will You Be My Boba</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-pink-500 transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/shops"
            className="text-sm font-medium hover:text-pink-500 transition-colors"
          >
            Shops
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-pink-500 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* User Actions */}
        <SiteHeaderNavUserButtons initialAvatar={avatar} />
      </div>
    </header>
  );
};

export default Header;
