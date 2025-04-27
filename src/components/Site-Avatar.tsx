import Image from "next/image";
import { FiLoader } from "react-icons/fi";

interface AvatarProps {
  src?: string;
  alt: string;
  isImageLoading: boolean;
  setIsImageLoading: (isImageLoading: boolean) => void;
}

const Avatar = ({
  src,
  alt,
  isImageLoading,
  setIsImageLoading,
}: AvatarProps) => {
  return (
    <>
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <FiLoader className="size-6 animate-spin" />
        </div>
      )}
      <Image
        src={src ?? "/profile/placeholder.svg"}
        alt={alt}
        fill
        className={`${src ? "object-cover" : "object-none"} ${
          isImageLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        priority={!isImageLoading}
        onLoadingComplete={() => {
          setIsImageLoading(false);
        }}
      />
    </>
  );
};

export default Avatar;
