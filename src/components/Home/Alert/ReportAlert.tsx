"use client";

import { useReportStore } from "@/lib/zustand/stores";
import { useEffect } from "react";
import { Alert, Button, Transition } from "@mantine/core";
import { FaCheck } from "react-icons/fa";

const ReportAlert = () => {
  const successMessage = useReportStore((state) => state.successMessage);
  const setSuccessMessage = useReportStore((state) => state.setSuccessMessage);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  }, [successMessage, setSuccessMessage]);

  return (
    <Transition
      mounted={!!successMessage}
      transition="fade-left"
      enterDelay={500}
      exitDelay={250}
    >
      {(transitionStyles) => (
        <Alert
          variant="light"
          color="green"
          style={transitionStyles}
          icon={<FaCheck className="size-4" />}
          classNames={{
            root: "fixed top-12 right-4 z-50 flex items-center gap-2",
          }}
        >
          <p>{successMessage}</p>
          <Button
            variant="transparent"
            color="green"
            size="xs"
            onClick={() => setSuccessMessage(null)}
          >
            Dismiss
          </Button>
        </Alert>
      )}
    </Transition>
  );
};

export default ReportAlert;
