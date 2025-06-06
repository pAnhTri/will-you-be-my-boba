import Link from "next/link";
import { LuGithub, LuGlobe, LuLinkedin } from "react-icons/lu";
import Picture from "./About-Section-Developer-Picture";

const DeveloperSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="order-last md:order-first">
        <div className="flex flex-col md:items-start md:justify-start items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Meet the Developers</h2>
          <div className="text-muted-foreground">
            <b>
              Hello! I&apos;m the technical developer behind Will You Be My
              Boba.
            </b>{" "}
            I love boba and hanging out with my friends. I created this platform
            to solve a problem my friends and me faced: finding the best boba
            spots, keeping track of favorites, and picking a flavor combination
            when we don&apos;t know what to get.
            <br />
            <br />
            <b>
              Hi! I&apos;m the designer of the logo and some aesthetics seen on
              this site. Also the girlfriend :D
            </b>{" "}
            Boba was one of the first things that broke my wallet often when I
            first started college. As an indecisive person, picking a singular
            flavor always took me some time. Personally, this app saves me so
            much time because it just chooses for me, and I don&apos;t spend any
            time awkwardly standing in front of the menu. So many people I
            interact with have this same issue, and I really think this is the
            solution to everything.
            <br />
            <br />
            We love discovering new places and hanging out over a good cup of
            boba. This app is our way of sharing that joy with others and
            building a community around our shared love for boba.
          </div>

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
        <div className="flex md:flex-col flex-row justify-center items-center gap-4">
          <Picture
            src="/about/developer.jpeg"
            alt="Developer"
            mobileSize="size-32"
            regularSize="md:size-64"
          />
          <Picture
            src="/about/co-developer.jpg"
            alt="Developer"
            mobileSize="size-32"
            regularSize="md:size-64"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperSection;
