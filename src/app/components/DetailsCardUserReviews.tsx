import { z } from "zod";
import { EnjoymentScoreSchema } from "../lib/utils/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

interface DetailsCardUserReviewsProps {
  communityReviews: {
    userName: string;
    rating: number;
  }[];
  setRatingAndLoading: Dispatch<
    SetStateAction<{
      rating: number | null;
      loading: boolean;
    }>
  >;
}

type EnjoymentFactor = z.infer<typeof EnjoymentScoreSchema>;

const DetailsCardUserReviews = ({
  communityReviews,
  setRatingAndLoading,
}: DetailsCardUserReviewsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnjoymentFactor>({
    resolver: zodResolver(EnjoymentScoreSchema),
    defaultValues: {
      enjoymentFactor: 0,
    },
  });

  const onSubmit: SubmitHandler<EnjoymentFactor> = (data) => {
    setRatingAndLoading({ rating: data.enjoymentFactor, loading: true });
  };

  return (
    <div className="flex gap-2 border border-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
      {/* Community Reviews */}
      <div className="basis-1/2">
        <h1 className="flex w-full justify-center items-center font-bold text-lg">
          {communityReviews.length > 0 ? (
            <span>{communityReviews.length} Others think:</span>
          ) : (
            <span>Others think:</span>
          )}
        </h1>
        <div className="shadow-black shadow-xs p-2 rounded-md max-h-64 overflow-y-auto">
          {communityReviews.length > 0 ? (
            communityReviews.map((review, index) => (
              <div key={index}>
                {review.userName}: {review.rating}&#11088;
              </div>
            ))
          ) : (
            <div className="text-center">
              <h1>Nothing Yet!</h1>
              <p>Be the first to review!</p>
            </div>
          )}
        </div>
      </div>

      {/* User review */}
      <div className="basis-1/2">
        <h1 className="flex w-full justify-center items-center font-bold text-lg">
          But you think:
        </h1>
        <div className="flex justify-center items-center shadow-black shadow-xs p-2 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full gap-2 justify-between items-center">
              <input
                type="number"
                min={0}
                max={5}
                step={0.25}
                {...register("enjoymentFactor", { valueAsNumber: true })}
                className="input-field mt-2"
              />

              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 p-2 rounded-md text-white shadow-black shadow-sm"
              >
                Submit
              </button>
            </div>

            {errors.enjoymentFactor && (
              <span>{errors.enjoymentFactor.message}</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsCardUserReviews;
