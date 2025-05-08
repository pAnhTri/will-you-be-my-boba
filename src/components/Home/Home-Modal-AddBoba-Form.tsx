/*
 * Form requires:
 * - Name: Text input
 * - Flavor: Text input with multiple flavors,
 * able to add more than one flavor with comma separated values,
 * new flavros can be added,
 * pre-populated with available flavors
 *
 * - Sweetness Level: Select input with options: Low, Medium, High
 * - Shop: Select input with options: available shops by name, setValue as shop._id, an option to add new shop which is default if no shop is found
 * - Submit Button: Submit button to add boba to database
 */

import { addBoba } from "@/lib/utils/api/boba";
import { BobaInput, bobaValidatorSchema } from "@/lib/validators/boba";
import {
  useBobaStore,
  useModalStore,
  useShopStore,
} from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

interface AddBobaFormProps {
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
}

const AddBobaForm = ({
  error,
  isLoading,
  setError,
  setIsLoading,
  setIsSuccess,
}: AddBobaFormProps) => {
  const [usedFlavors, setUsedFlavors] = useState<string[]>([]);

  const bobas = useBobaStore((state) => state.bobas);

  const shops = useShopStore((state) => state.shops);
  const selectedResult = useShopStore((state) => state.selectedResult);
  const { setSelectedResult } = useShopStore();

  const isAddShopModalOpen = useModalStore((state) => state.isAddShopModalOpen);
  const { setIsAddShopModalOpen } = useModalStore();

  const flavorInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<BobaInput>({
    resolver: zodResolver(bobaValidatorSchema),
    defaultValues: { sweetnessLevel: "Medium" },
  });

  const onSubmit: SubmitHandler<BobaInput> = async (data) => {
    // Reset states
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      await addBoba(data);

      // Reset form and states
      reset();
      setUsedFlavors([]);
      setSelectedResult(null);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAddShopModalOpen && selectedResult) {
      const dataListValue = `${selectedResult.displayName.text}, ${
        selectedResult.formattedAddress
      } (${
        selectedResult.addressComponents.find((component) =>
          component.types.includes("locality")
        )?.longText
      })`;
      setValue("shop", dataListValue, { shouldTouch: true });
      trigger("shop");
    }
  }, [isAddShopModalOpen, selectedResult]);

  const flavors = useMemo(() => {
    if (bobas.length === 0) return [];
    const uniqueFlavors = new Set<string>();
    bobas.forEach((boba) => {
      boba.flavors.forEach((flavor) => {
        uniqueFlavors.add(flavor);
      });
    });
    return Array.from(uniqueFlavors);
  }, [bobas]);

  const handleFlavorClick = (flavor: string) => {
    if (flavorInputRef.current) {
      flavorInputRef.current.focus();
      const currentValue = flavorInputRef.current.value;

      // Handle empty input case
      if (currentValue === "") {
        flavorInputRef.current.value = flavor;
        setUsedFlavors([flavor]);
        setValue("flavors", [flavor], { shouldTouch: true });
        trigger("flavors");
        return;
      }

      const currentFlavors = currentValue
        ? currentValue.split(", ").filter((f) => f !== "")
        : [];

      const updatedFlavors = currentFlavors.includes(flavor)
        ? currentFlavors.filter((f) => f !== flavor).join(", ")
        : `${currentFlavors.join(", ")}, ${flavor}`;

      const flavorsArray = updatedFlavors.split(", ");

      setUsedFlavors(flavorsArray);
      setValue("flavors", flavorsArray, { shouldTouch: true });
      flavorInputRef.current.value = updatedFlavors;
      trigger("flavors");
    }
  };

  const handleFlavorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value; // Always the latest value

    // Check if the latest input was a comma
    if (inputValue[inputValue.length - 1] === ",") {
      // Separate flavors by comma
      const flavors = inputValue.split(",");
      const trimmedFlavors = flavors.map((flavor) => {
        const trimmedFlavor = flavor.trim();

        // Return the trimmed flavor if it's not empty and capitalize the first letter
        return trimmedFlavor && trimmedFlavor !== ""
          ? trimmedFlavor[0].toUpperCase() + trimmedFlavor.slice(1)
          : "";
      });

      // Ensure unique flavors
      const uniqueFlavors = new Set(trimmedFlavors);
      const newFlavors = Array.from(uniqueFlavors);

      // Update the used flavors
      setUsedFlavors(newFlavors);
      setValue(
        "flavors",
        newFlavors.filter((flavor) => flavor !== ""),
        {
          shouldTouch: true,
        }
      );
      trigger("flavors");

      // Replace the input value with the unique flavors
      event.target.value = newFlavors.join(", ");
    }

    // Reset used flavors if the input is empty
    if (inputValue === "") {
      setUsedFlavors([]);
    }
  };

  const handleNameOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const usedBoba = bobas.find((boba) => boba.name === inputValue);

    if (!usedBoba) {
      setUsedFlavors([]);
      return;
    }

    // When found, fill out sweetness level and flavors
    const flavorsDisplay = usedBoba.flavors.join(", ");
    setUsedFlavors(usedBoba.flavors);
    setValue("flavors", usedBoba.flavors, { shouldTouch: true });

    if (flavorInputRef.current) {
      flavorInputRef.current.value = flavorsDisplay;
    }

    setValue("sweetnessLevel", usedBoba.sweetnessLevel, {
      shouldTouch: true,
    });
  };

  const isFlavorUsed = (flavor: string) => {
    return usedFlavors.includes(flavor);
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <FiLoader className="size-4 animate-spin" />
        <span>Adding boba to database</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          list="nameList"
          {...register("name")}
          onBlur={handleNameOnBlur}
          placeholder="Enter the name of your boba"
          className="rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <datalist id="nameList">
          {bobas.map((boba) => (
            <option key={boba._id} value={boba.name} />
          ))}
        </datalist>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Flavor */}
      <div className="flex flex-col gap-2">
        <label htmlFor="flavors">Flavors</label>
        <input
          id="flavors"
          {...register("flavors", {
            setValueAs: (value) => {
              if (typeof value !== "string") return value;

              const flavorsArray = value.split(", ");
              if (flavorsArray[0] === "") {
                return [];
              } else {
                return flavorsArray;
              }
            },
          })}
          ref={(element) => {
            flavorInputRef.current = element;
            register("flavors").ref(element);
          }}
          onChange={handleFlavorChange}
          placeholder="Flavor 1, Flavor 2, Flavor 3, etc."
          className="rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {errors.flavors && (
          <p className="text-red-500">{errors.flavors.message}</p>
        )}

        {/* Flavor List */}
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
          {flavors.map((flavor) => (
            <div
              key={flavor}
              className={`text-xs rounded-lg p-2 cursor-pointer ${
                isFlavorUsed(flavor) ? "bg-pink-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleFlavorClick(flavor)}
            >
              {flavor}
            </div>
          ))}
        </div>
      </div>

      {/* Sweetness Level */}
      <div className="flex flex-col gap-2">
        <label htmlFor="sweetnessLevel">Sweetness Level</label>
        <select
          id="sweetnessLevel"
          {...register("sweetnessLevel")}
          className="rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.sweetnessLevel && (
          <p className="text-red-500">{errors.sweetnessLevel.message}</p>
        )}
      </div>

      {/* Shop */}
      <div className="flex flex-col gap-2">
        <label htmlFor="shop">Shop</label>
        <div className="flex items-center gap-2">
          <input
            id="shop"
            list="shopList"
            {...register("shop", {
              setValueAs: (value) => {
                const shopOption = Array.from(
                  document.querySelectorAll("#shopList option")
                ).find(
                  (option) => (option as HTMLOptionElement).value === value
                );
                return shopOption?.getAttribute("data-shop-id") ?? value;
              },
            })}
            className="flex-1 rounded-lg border-2 border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            className="bg-black text-white rounded-lg p-2"
            onClick={() => setIsAddShopModalOpen(true)}
          >
            <MdAdd className="size-6" />
          </button>
        </div>
        <datalist id="shopList">
          {shops.map((shop) => (
            <option
              key={shop._id}
              value={`${shop.name}, ${shop.location.address} (${shop.location.city})`}
              data-shop-id={shop._id}
            />
          ))}
        </datalist>
        {errors.shop && <p className="text-red-500">{errors.shop.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-pink-500 text-white rounded-lg p-2">
        Submit
      </button>
    </form>
  );
};

export default AddBobaForm;
