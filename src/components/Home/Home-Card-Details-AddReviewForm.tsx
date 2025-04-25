import { addCommunityReview, getBobas } from "@/lib/utils/api/boba";
import { ReviewInput, reviewValidatorSchema } from "@/lib/validators/review";
import { useAuthStore, useBobaStore } from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

interface AddReviewFormProps {
  isLoading: boolean;
  error: string | null;
  setIsAddingReview: (isAddingReview: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setReviewsSortedBy: (reviewsSortedBy: string) => void;
}

const AddReviewForm = ({
  isLoading,
  error,
  setIsAddingReview,
  setIsLoading,
  setError,
  setReviewsSortedBy,
}: AddReviewFormProps) => {
  const user = useAuthStore((state) => state.user);

  const selectedBoba = useBobaStore((state) => state.selectedBoba);
  const { setBobas, setDisplayBobas, setSelectedBoba } = useBobaStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewValidatorSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const onSubmit: SubmitHandler<ReviewInput> = async (data) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      userId: user?.id ?? null,
      rating: data.rating,
      review: data.review,
    };

    if (selectedBoba) {
      try {
        await addCommunityReview(payload, selectedBoba._id);

        // Fetch updated bobas from database optimistically
        const updatedBobas = await getBobas();

        //From the updated bobas, find the updated boba and update the selectedBoba
        const updatedBoba = updatedBobas.bobas.find(
          (boba) => boba._id === selectedBoba._id
        );

        if (!updatedBoba) {
          throw new Error("Boba not found");
        }

        setBobas(updatedBobas.bobas);
        setDisplayBobas(updatedBobas.bobas);
        setSelectedBoba(updatedBoba);
        setIsAddingReview(false);
        setReviewsSortedBy("newest");

        // Reset form
        reset();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <FiLoader className="animate-spin size-4" />
        <span>Adding review...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[400px] overflow-y-auto ring-1 ring-gray-200 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
            <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
            className="ring-1 ring-pink-200 rounded-lg p-2 focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all min-h-[100px]"
          />
          {errors.review && (
            <p className="text-red-500 text-sm">{errors.review.message}</p>
          )}
        </div>

        {/* Clear + Submit Button */}
        <div className="flex items-center justify-end gap-2">
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

export default AddReviewForm;
