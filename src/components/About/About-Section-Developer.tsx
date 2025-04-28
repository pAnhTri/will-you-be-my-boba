import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuGlobe, LuLinkedin } from "react-icons/lu";

const DeveloperSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="order-last md:order-first">
        <div className="flex flex-col md:items-start md:justify-start items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Meet the Developer</h2>
          <p className="text-muted-foreground">
            Hello! I&apos;m the solo developer behind Will You Be My Boba. I
            love boba and hanging out with my friends. I created this platform
            to solve a problem my friends and me faced: finding the best boba
            spots, keeping track of favorites, and picking a flavor combination
            when we don&apos;t know what to get.
            <br />
          </p>
          <p className="text-muted-foreground">
            <br />
            We love discovering new places and hanging out over a good cup of
            boba. This app is our way of sharing that joy with others and
            building a community around our shared love for boba.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4">
            <Link
              href="https://github.com/pAnhTri"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-md border-gray-300 hover:text-gray-500 transition-colors duration-300 p-2"
            >
              <div className="flex items-center gap-2">
                <LuGithub className="size-4" />
                <span>GitHub</span>
              </div>
            </Link>
            <Link
              href="https://linkedin.com/in/anh-tri-pham-12576a1a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-md border-gray-300 hover:text-blue-500 transition-colors duration-300 p-2"
            >
              <div className="flex items-center gap-2">
                <LuLinkedin className="size-4" />
                <span>LinkedIn</span>
              </div>
            </Link>
            <Link
              href="https://pham-anhtri.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-md border-gray-300 hover:text-pink-500 transition-colors duration-300 p-2"
            >
              <div className="flex items-center gap-2">
                <LuGlobe className="size-4" />
                <span>Website</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="order-first md:order-last">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src="/about/developer.jpeg"
              alt="Developer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSection;
