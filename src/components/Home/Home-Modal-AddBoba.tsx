"use client";

import AddBobaForm from "./Home-Modal-AddBoba-Form";
import { useState } from "react";
import { useModalStore } from "@/lib/zustand/stores";
import { useRouter } from "next/navigation";
import CloseButton from "./Home-Modal-AddBoba-CloseButton";

const AddBobaModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const isAddBobaModalOpen = useModalStore((state) => state.isAddBobaModalOpen);
  const setIsAddBobaModalOpen = useModalStore(
    (state) => state.setIsAddBobaModalOpen
  );

  const handleCloseModal = () => {
    setIsAddBobaModalOpen(false);
    if (isSuccess) {
      setIsSuccess(false);
      router.refresh();
    }
  };

  if (!isAddBobaModalOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-25">
        <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Boba added successfully</h2>
            <CloseButton onClick={handleCloseModal} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You can now close this modal to refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-25">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-lg">
        {/* Title and close button Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add a Boba</h2>
          <CloseButton onClick={handleCloseModal} />
        </div>
        {/* Sub header */}
        <p className="text-sm text-muted-foreground mb-4">
          Add a boba to share with others.
        </p>

        {/* Form */}
        <AddBobaForm
          error={error}
          isLoading={isLoading}
          setError={setError}
          setIsLoading={setIsLoading}
          setIsSuccess={setIsSuccess}
        />
      </div>
    </div>
  );
};

export default AddBobaModal;
