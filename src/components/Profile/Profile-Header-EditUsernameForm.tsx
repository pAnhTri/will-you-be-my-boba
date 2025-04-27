import {
  usernameInput,
  usernameValidatorSchema,
} from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiCheck, FiLoader } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef } from "react";

interface EditUsernameFormProps {
  currentUsername: string;
  isUsernameUpdating: boolean;
  handleUsernameUpdate: (username: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const EditUsernameForm = ({
  currentUsername,
  isUsernameUpdating,
  handleUsernameUpdate,
  setIsEditing,
}: EditUsernameFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<usernameInput>({
    resolver: zodResolver(usernameValidatorSchema),
    defaultValues: {
      username: currentUsername,
    },
  });

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<usernameInput> = (data) => {
    handleUsernameUpdate(data.username);
  };

  if (isUsernameUpdating) {
    return (
      <div className="flex items-center gap-2">
        <FiLoader className="animate-spin size-4" />
        <div>Updating username...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input
        type="text"
        {...register("username")}
        ref={(e) => {
          // Register the ref with react-hook-form
          register("username").ref(e);
          // Store the ref for focus
          inputRef.current = e;
        }}
        className="bg-white rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}
      <div className="flex gap-2">
        <button type="submit">
          <FiCheck className="size-4 text-gray-500 hover:text-green-700 transition-colors duration-300" />
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          <RxCross1 className="size-4 text-gray-500 hover:text-red-500 transition-colors duration-300" />
        </button>
      </div>
    </form>
  );
};

export default EditUsernameForm;
