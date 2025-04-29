import Link from "next/link";
import Logo from "../Logo";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-8 px-4 flex flex-col items-center gap-4">
      <div className="bg-white rounded-full p-2 shadow-md">
        <Logo width={128} height={128} />
      </div>
      <h1 className="text-5xl font-bold text-center">
        About Will You Be My Boba
      </h1>
      <p className="text-center text-muted-foreground">
        A shared platform created by a solo developer and friends who love boba
        and bringing people together.
      </p>

      {/* Section buttons for navigation */}
      <div className="md:flex md:flex-wrap md:justify-center text-center whitespace-nowrap gap-4 grid grid-cols-2 ">
        <Link
          href="#mission"
          className="px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
        >
          Our Mission
        </Link>
        <Link
          href="#developer"
          className="px-6 py-3 rounded-full bg-white border border-pink-200 text-pink-500 font-medium hover:bg-pink-50 transition-colors"
        >
          Who Built This?
        </Link>
        <Link
          href="#faq"
          className="px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
        >
          FAQ
        </Link>
        <Link
          href="#contact"
          className="px-6 py-3 rounded-full bg-white border border-pink-200 text-pink-500 font-medium hover:bg-pink-50 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
};

export default Hero;
