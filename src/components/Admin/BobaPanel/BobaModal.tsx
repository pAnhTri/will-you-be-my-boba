"use client";

import { useAdminStore } from "@/lib/zustand/stores/admin";
import { Modal } from "@mantine/core";
import dynamic from "next/dynamic";

const BobaForm = dynamic(() => import("./BobaForm"), {
  ssr: false,
});

const BobaModal = () => {
  const currentBoba = useAdminStore((state) => state.currentBoba);
  const setCurrentBoba = useAdminStore((state) => state.setCurrentBoba);
  const isBobaModalOpen = useAdminStore((state) => state.isBobaModalOpen);
  const setIsBobaModalOpen = useAdminStore((state) => state.setIsBobaModalOpen);

  return (
    <Modal
      opened={isBobaModalOpen || !!currentBoba}
      onClose={() => {
        setCurrentBoba(null);
        setIsBobaModalOpen(false);
      }}
      title={currentBoba ? "Update Boba Details" : "Add New Boba"}
      size="lg"
      zIndex={1000}
    >
      <BobaForm />
    </Modal>
  );
};

export default BobaModal;
