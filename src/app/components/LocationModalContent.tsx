import { z } from "zod";
import { LocationSchema } from "../lib/utils/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

interface LocationModalContentProps {
  children: React.ReactNode;
  setDataAndLoading: Dispatch<
    SetStateAction<{
      data: {
        city?: string;
        range?: number;
      } | null;
      loading: boolean;
    }>
  >;
}

const partialLocationSchema = LocationSchema.partial();
type paritalLocation = z.infer<typeof partialLocationSchema>;

const LocationModalContent = ({
  children,
  setDataAndLoading,
}: LocationModalContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<paritalLocation>({
    resolver: zodResolver(partialLocationSchema),
    defaultValues: {
      city: "City or Shop Name",
      range: 0,
    },
  });

  const onSubmit: SubmitHandler<paritalLocation> = (data) => {
    setDataAndLoading({
      data: {
        ...data,
      },
      loading: true,
    });
  };

  return (
    <div
      className="relative bg-white h-1/2 w-1/2 p-2 flex flex-col rounded-md shadow-md cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* City */}
        <label htmlFor="city">City</label>
        <input id="city" className="input-field" {...register("city")} />
        {errors.city && <span>{errors.city.message}</span>}

        {/* Range */}
        <label htmlFor="range">Range (Miles)</label>
        <input
          id="range"
          type="number"
          className="input-field"
          {...register("range", { valueAsNumber: true })}
        />

        <button
          type="submit"
          className="h-fit w-fit bg-blue-400 hover:bg-blue-500 p-2 rounded-md text-white shadow-black shadow-sm"
        >
          Search
        </button>
      </form>
      {children}
    </div>
  );
};

export default LocationModalContent;
