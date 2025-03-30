import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BobaSchema } from "../lib/utils/validators";
import { Dispatch, SetStateAction } from "react";
import { useFilterContext } from "../contexts/FilterProvider";

interface BobaCardsFormsProps {
  setDataAndLoading: Dispatch<
    SetStateAction<{
      data: {
        name: string;
        shopId: string;
        flavors: string[];
        sweetnessLevel: "Low" | "Medium" | "High";
      } | null;
      loading: boolean;
    }>
  >;
}

const partialSchema = BobaSchema.partial();
type BobaSchemaType = z.infer<typeof partialSchema>;

const BobaCardsForms = ({ setDataAndLoading }: BobaCardsFormsProps) => {
  const { shopList, setIsLocationModalOpen } = useFilterContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BobaSchemaType>({
    resolver: zodResolver(partialSchema),
    defaultValues: {
      name: "Boba Name",
      sweetnessLevel: "Medium",
      shopId: "Boba Shop",
    },
  });

  const onSubmit: SubmitHandler<BobaSchemaType> = (data) => {
    if (data) {
      const body = { ...data } as {
        name: string;
        shopId: string;
        flavors: string[];
        sweetnessLevel: "Low" | "Medium" | "High";
      } | null;

      setDataAndLoading({
        data: body,
        loading: true,
      });
    }
  };

  return (
    <div
      className="relative bg-white h-1/2 w-1/2 p-2 flex flex-col rounded-md shadow-md cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* Name */}
        <label htmlFor="name">Name</label>
        <input id="name" className="input-field" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        {/* Flavors */}
        <label htmlFor="flavors">Flavors</label>
        <input
          id="flavors"
          className="input-field"
          {...register("flavors", {
            setValueAs: (value: string) => {
              return value
                .split(",")
                .map((flavor) => flavor.trim())
                .filter((flavor) => flavor);
            },
          })}
        />
        {/* Display all flavor errors */}
        {Array.isArray(errors.flavors) &&
          errors.flavors.map((error, index) => (
            <span key={index}>{error?.message}</span>
          ))}

        {/* Sweetness Level */}
        <label htmlFor="sweetness">Sweetness</label>
        <select
          id="sweetness"
          className="input-field"
          {...register("sweetnessLevel")}
        >
          {(() => {
            const sweetnessLevels =
              BobaSchema.shape.sweetnessLevel._def.innerType.options;
            return sweetnessLevels.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ));
          })()}
        </select>
        {errors.sweetnessLevel && <span>{errors.sweetnessLevel.message}</span>}

        {/* ShopId */}
        <div className="flex flex-col">
          <label htmlFor="shopId">Store</label>

          <div className="flex h-full w-full items-center">
            <input
              id="shopId"
              list="shopList"
              className="input-field"
              {...register("shopId", {
                setValueAs: (value: string) => {
                  const foundShop = shopList.find(
                    (shop) =>
                      shop.name.toLowerCase() === value.toLowerCase().trim()
                  );
                  if (foundShop) {
                    return foundShop._id;
                  } else {
                    return value;
                  }
                },
              })}
            />

            {/* Location Modal */}
            <button
              type="button"
              className="h-fit w-fit bg-blue-400 hover:bg-blue-500 p-2 rounded-md text-white shadow-black shadow-sm mb-2"
              onClick={() => setIsLocationModalOpen(true)}
            >
              +
            </button>
          </div>

          {errors.shopId && <span>{errors.shopId.message}</span>}

          <datalist id="shopList">
            {shopList.map((shop) => (
              <option key={shop._id} value={shop.name}>
                {shop.name} ({shop.location.city})
              </option>
            ))}
          </datalist>
        </div>

        <button
          type="submit"
          className="h-fit w-fit bg-blue-400 hover:bg-blue-500 p-2 rounded-md text-white shadow-black shadow-sm"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default BobaCardsForms;
