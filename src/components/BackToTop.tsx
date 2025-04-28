import Link from "next/link";
import { LuArrowUp } from "react-icons/lu";

const BackToTop = () => {
  return (
    <Link
      href="#"
      className="fixed bottom-8 right-8 p-3 rounded-full bg-pink-500 opacity-40 md:opacity-10 text-white shadow-lg hover:bg-pink-600 hover:opacity-100 transition-all duration-300"
      aria-label="Back to top"
    >
      <LuArrowUp className="size-6" />
    </Link>
  );
};

export default BackToTop;
