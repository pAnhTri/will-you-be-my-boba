import Link from "next/link";
import Logo from "./Logo";
import SiteHeaderNavUserButtons from "./Site-Header-Nav-UserButtons";
import { getAvatar } from "@/lib/utils/server";
import AiButton from "./Site-Header-AIButton";

const Header = async () => {
  const avatar = await getAvatar();
  return (
    <header className="sticky px-2 top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <AiButton variant="desktop" />
        </nav>

        <AiButton variant="mobile" />

        {/* User Actions */}
        <SiteHeaderNavUserButtons initialAvatar={avatar} />
      </div>
    </header>
  );
};

export default Header;
