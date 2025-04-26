import {
  ShopSearchInput,
  shopSearchValidatorSchema,
} from "@/lib/validators/shopSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddShopFormProps {
  isSearching: boolean;
  handleSearchResults: (data: ShopSearchInput) => void;
}

const AddShopForm = ({
  isSearching,
  handleSearchResults,
}: AddShopFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopSearchInput>({
    resolver: zodResolver(shopSearchValidatorSchema),
  });

  const onSubmit: SubmitHandler<ShopSearchInput> = handleSearchResults;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="search">Search</label>
        <div className="flex gap-2">
          <input
            type="text"
            id="search"
            placeholder="Shop Name, Address, and/ or City"
            {...register("search")}
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={isSearching}
          />
          {errors.search && (
            <p className="text-red-500">{errors.search.message}</p>
          )}
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddShopForm;
