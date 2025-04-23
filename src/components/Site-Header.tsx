import Link from "next/link";
import { GiBoba } from "react-icons/gi";
import SiteHeaderNavUserButtons from "./Site-Header-Nav-UserButtons";

const Header = () => {
  return (
    <header className="sticky px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <GiBoba className="size-8 text-pink-500" />
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
            href="#"
            className="text-sm font-medium hover:text-pink-500 transition-colors"
          >
            Community
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-pink-500 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* User Actions */}
        <SiteHeaderNavUserButtons />
      </div>
    </header>
  );
};

export default Header;
