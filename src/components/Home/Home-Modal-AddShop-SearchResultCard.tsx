import { SearchResult } from "@/types";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

interface SearchResultCardProps {
  result: SearchResult;
  selectedResult: SearchResult | null;
  onClick: (result: SearchResult) => void;
}

const SearchResultCard = ({
  result,
  selectedResult,
  onClick,
}: SearchResultCardProps) => {
  const shopName = result.displayName.text;
  const shopAddress = result.formattedAddress;
  return (
    <div
      className={`ring-1 ring-gray-200 rounded-lg p-2 ${
        selectedResult?.id === result.id ? "bg-pink-200" : ""
      }`}
      onClick={() => onClick(result)}
    >
      <div>
        {/* Name and link to google maps */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{shopName}</h3>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              shopAddress
            )}&query_place_id=${result.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuExternalLink />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">{shopAddress}</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
