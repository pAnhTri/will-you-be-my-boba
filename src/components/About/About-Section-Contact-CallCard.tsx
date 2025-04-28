import Link from "next/link";
import { HTMLAttributes } from "react";
import {
  LuGithub,
  LuGlobe,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

interface CallCardProps extends HTMLAttributes<HTMLDivElement> {
  email: string;
  location: string;
  phone: string;
}

const CallCard = ({ email, location, phone, ...props }: CallCardProps) => {
  return (
    <div {...props}>
      <div className="flex flex-col justify-center gap-4 border-gray-200">
        <h3 className="text-xl font-bold text-center mb-2">
          Contact Information
        </h3>
        <Link href={`mailto:${email}`} className="flex items-center gap-2">
          <div className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors cursor-pointer">
            <LuMail className="text-white size-5" />
          </div>
          <div>
            <p>Email</p>
            <p className="text-pink-500 underline">{email}</p>
          </div>
        </Link>
        <Link href={`tel:${phone}`} className="flex items-center gap-2">
          <div className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors cursor-pointer">
            <LuPhone className="text-white size-5" />
          </div>
          <div>
            <p>Phone</p>
            <p className="text-pink-500 underline">
              {`(+1) ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(
                6
              )}`}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <div className="p-2 bg-pink-500 rounded-full">
            <LuMapPin className="text-white size-5" />
          </div>
          <div>
            <p>Location</p>
            <p className="text-muted-foreground">{location}</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-2">
          <Link
            href="https://github.com/pAnhTri"
            className="border-2 rounded-full border-gray-300 hover:text-gray-500 transition-colors duration-300 p-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuGithub className="size-4" />
          </Link>
          <Link
            href="https://linkedin.com/in/anh-tri-pham-12576a1a9/"
            className="border-2 rounded-full border-gray-300 hover:text-blue-500 transition-colors duration-300 p-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuLinkedin className="size-4" />
          </Link>
          <Link
            href="https://pham-anhtri.vercel.app"
            className="border-2 rounded-full border-gray-300 hover:text-pink-500 transition-colors duration-300 p-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuGlobe className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallCard;
