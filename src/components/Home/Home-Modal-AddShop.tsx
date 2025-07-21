"use client";

import React, { useState } from "react";
import CloseButton from "./Home-Modal-AddBoba-CloseButton";
import { useModalStore, useShopStore } from "@/lib/zustand/stores";
import AddShopForm from "./Home-Modal-AddShop-Form";
import { SearchResult } from "@/types";
import { getGooglePlacesDetails } from "@/lib/utils/api/googplacesapi";
import { ShopSearchInput } from "@/lib/validators/shopSearch";
import { CiCircleAlert } from "react-icons/ci";
import SearchResultCard from "./Home-Modal-AddShop-SearchResultCard";
import { LuMapPin } from "react-icons/lu";
import Fuse from "fuse.js";
import { ShopType } from "@/lib/mongodb/models/Shop";
import { addShop } from "@/lib/utils/api/shop";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";

const AddShopModal = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedResult = useShopStore((state) => state.selectedResult);
  const { setSelectedResult } = useShopStore();

  const isAddShopModalOpen = useModalStore((state) => state.isAddShopModalOpen);
  const { setIsAddShopModalOpen } = useModalStore();

  const router = useRouter();

  const handleCloseModal = () => {
    setIsAddShopModalOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const handleSearchResults = async (data: ShopSearchInput) => {
    // Reset search results and error
    setSearchResults([]);
    setError(null);
    setIsSearching(true);

    try {
      const response = await getGooglePlacesDetails(data.search || "");

      const fuse = new Fuse<SearchResult>(response.places, {
        includeScore: true,
        threshold: 0.4,
        keys: ["displayName.text"],
      });

      const relevantResults = fuse
        .search(data.search || "")
        .map((result) => result.item);

      const nonRelevantResults = response.places.filter(
        (result: SearchResult) => !relevantResults.includes(result)
      );

      // Sort nonRelevantResults by name
      nonRelevantResults.sort((a: SearchResult, b: SearchResult) =>
        a.displayName.text.localeCompare(b.displayName.text)
      );

      setSearchResults([...relevantResults, ...nonRelevantResults]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddShop = async () => {
    const shopPayload: ShopType = {
      name: selectedResult?.displayName.text || "",
      location: {
        placesId: selectedResult?.id || "",
        address: selectedResult?.formattedAddress || "",
        latitude: selectedResult?.location.latitude || 0,
        longitude: selectedResult?.location.longitude || 0,
        city:
          selectedResult?.addressComponents.find(
            (component) =>
              component.types.includes("locality") ||
              component.types.includes("sublocality")
          )?.longText || "",
      },
    };

    setIsLoading(true);

    try {
      await addShop(shopPayload);

      // Close the modal
      setIsAddShopModalOpen(false);

      //Refresh
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isAddShopModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-lg">
          {/* Title and close button Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LuMapPin className="size-6 text-pink-500" />
              <h2 className="text-2xl font-bold">Add a new Shop</h2>
            </div>
            <CloseButton onClick={handleCloseModal} />
          </div>
          {/* Sub header */}
          <p className="text-sm text-muted-foreground mb-4">
            Look up a shop by name or address and share it with others.
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
              <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <AddShopForm
            handleSearchResults={handleSearchResults}
            isSearching={isSearching}
          />

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <>
              <h3 className="text-lg font-semibold mb-2">
                {searchResults.length} Search Results
              </h3>
              <div className="mt-4 flex flex-col gap-2 p-2 max-h-[300px] overflow-y-auto">
                {searchResults.map((result) => (
                  <SearchResultCard
                    key={result.id}
                    result={result}
                    selectedResult={selectedResult}
                    onClick={handleResultClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No results found. Please try again.
            </p>
          )}

          {/* Add shop button if there is a selected result */}
          {selectedResult && (
            <button
              onClick={handleAddShop}
              className="flex items-center justify-center w-full bg-pink-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-pink-600 transition-colors duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <FiLoader className="size-4 animate-spin" />
                  <span>Adding Shop...</span>
                </div>
              ) : (
                "Add Shop"
              )}
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default AddShopModal;
