import Image, { ImageProps } from "next/image";

interface PictureProps extends ImageProps {
  mobileSize?: string;
  regularSize?: string;
}

const Picture = ({ src, alt, regularSize, mobileSize }: PictureProps) => {
  const className = `relative ${mobileSize ?? "size-64"} ${regularSize ?? "md:size-80"} rounded-full overflow-hidden border-4 border-white shadow-lg`;

  return (
    <div className={className}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
};

export default Picture;
