"use client";

import { cn, harversine } from "@/lib/utils";
import {
  getCurrentLocation,
  getGeolocation,
} from "@/lib/utils/api/getGeolocation";
import {
  LocationInput,
  locationValidatorSchema,
} from "@/lib/validators/location";
import {
  useBobaStore,
  useLocationStore,
  useShopStore,
} from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

interface LocationFormProps {
  topLabel: string;
  className?: string;
}

const LocationForm = ({ topLabel, className }: LocationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bobas = useBobaStore((state) => state.bobas);
  const setDisplayBobas = useBobaStore((state) => state.setDisplayBobas);

  const shops = useShopStore((state) => state.shops);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const setIsLocationEnabled = useLocationStore(
    (state) => state.setIsLocationEnabled
  );
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setMaxDistance = useLocationStore((state) => state.setMaxDistance);

  const setStoreLocationMap = useLocationStore(
    (state) => state.setStoreLocationMap
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationInput>({
    resolver: zodResolver(locationValidatorSchema),
    defaultValues: { location: "Current Location" },
  });

  const onSubmit: SubmitHandler<LocationInput> = async (data) => {
    // Reset loading and error states
    setIsLoading(true);
    setError(null);

    try {
      let result = null;

      if (data.location.toLowerCase() === "current location") {
        result = await getCurrentLocation();
      } else {
        result = await getGeolocation(data.location);
      }

      setIsLocationEnabled(true);

      const userLocation = result.location;
      setUserLocation(userLocation);

      const shopDistances: {
        key: string;
        value: number;
      }[] = [];

      shops.forEach((shop) => {
        const distance = harversine(userLocation, {
          latitude: shop.location.latitude,
          longitude: shop.location.longitude,
        });
        shopDistances.push({
          key: shop._id,
          value: distance,
        });
      });

      //Sort shop distances by distance in ascending order and store in map
      shopDistances.sort((a, b) => a.value - b.value);
      const shopDistancesMap = new Map<string, number>();
      shopDistances.forEach((shopDistance) => {
        shopDistancesMap.set(shopDistance.key, shopDistance.value);
      });

      setStoreLocationMap(shopDistancesMap);
      setIsLocationEnabled(true);

      // Filter bobas my max distance of 100 miles
      const filteredBobas = bobas.filter((boba) => {
        return boba.shopId.some((shopId) => {
          const distance = shopDistancesMap.get(shopId.toString());
          return distance && distance <= 100;
        });
      });

      setDisplayBobas(filteredBobas);
      setMaxDistance(100);
    } catch (error) {
      console.error(error);
      setError("Error getting location");
      setIsLocationEnabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-2 items-center", className)}
      >
        <label htmlFor="locationInput" className="text-sm text-gray-500">
          {topLabel}
        </label>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            id="locationInput"
            className={cn(
              "w-full border-2 border-gray-300 rounded-md pr-8 pl-2 py-2 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-pink-500",
              isLocationEnabled && "border-green-500 text-green-500",
              errors.location && "border-red-500",
              isLoading && "cursor-not-allowed bg-gray-100"
            )}
            {...register("location")}
            autoComplete="home city"
            placeholder="Enter a street, city, or zip code"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            {isLoading ? (
              <FiLoader className="size-6 text-pink-500 animate-spin" />
            ) : (
              <LuMapPin
                className="size-6 text-pink-500 cursor-pointer hover:text-pink-600"
                onClick={handleSubmit(onSubmit)}
              />
            )}
          </div>
        </div>
        {errors.location && (
          <span className="text-sm text-red-500">
            {errors.location.message}
          </span>
        )}
      </form>
    </>
  );
};

export default LocationForm;
