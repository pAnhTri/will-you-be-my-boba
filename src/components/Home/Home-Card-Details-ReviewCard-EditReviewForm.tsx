import { CommunityReviewType } from "@/lib/mongodb/models/Boba";
import { ReviewInput, reviewValidatorSchema } from "@/lib/validators/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditFormProps {
  review: CommunityReviewType;
  setIsEditing: (isEditing: boolean) => void;
  handleEditSubmit: (data: ReviewInput) => void;
}

const EditForm = ({
  review,
  setIsEditing,
  handleEditSubmit,
}: EditFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewValidatorSchema),
    defaultValues: {
      rating: review.rating,
      review: review.review || undefined,
    },
  });

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const onSubmit: SubmitHandler<ReviewInput> = handleEditSubmit;

  return (
    <div className="flex flex-col gap-4 p-4 min-h-[400px] max-h-[400px] overflow-y-auto ring-1 ring-gray-200 rounded-lg">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Rating */}
        <div className="flex items-center gap-2">
          <label htmlFor="rating" className="font-medium">
            Your Rating:{" "}
          </label>
          <input
            id="rating"
            type="number"
            min={0}
            max={5}
            step={0.25}
            {...register("rating", { valueAsNumber: true })}
            className={`ring-1 ring-pink-200 rounded-lg p-2 grow-0 w-16 focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all ${
              watch("rating") >= 4 ? "text-yellow-500" : "text-gray-400"
            }`}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>

        {/* Review */}
        <div className="flex flex-col gap-2">
          <label htmlFor="review" className="font-medium">
            Review
          </label>
          <textarea
            {...register("review")}
            className="ring-1 ring-pink-200 rounded-lg p-2 focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all min-h-[100px] resize-y whitespace-pre-wrap"
            placeholder="Share your thoughts about this boba..."
            rows={4}
          />
          {/* Word Count */}
          <p
            className={`ml-auto text-xs text-muted-foreground ${
              (watch("review")?.length ?? 0) > 500 && "text-red-500"
            }`}
          >
            {watch("review")?.length ?? 0} / 500
          </p>
          {errors.review && (
            <p className="text-red-500 text-sm">{errors.review.message}</p>
          )}
        </div>

        {/* Cancel + Clear + Submit Button */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="bg-pink-100 text-pink-700 p-2 rounded-lg hover:bg-pink-200 transition-colors"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-pink-100 text-pink-700 p-2 rounded-lg hover:bg-pink-200 transition-colors"
            onClick={() => reset()}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
