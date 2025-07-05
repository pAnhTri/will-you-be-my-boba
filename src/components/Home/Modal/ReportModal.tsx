import { useReportStore } from "@/lib/zustand/stores";
import { Modal } from "@mantine/core";
import ReportModalForm from "./ReportModal/ReportModalForm";

const ReportModal = () => {
  const isReportModalOpen = useReportStore((state) => state.isReportModalOpen);
  const setIsReportModalOpen = useReportStore(
    (state) => state.setIsReportModalOpen
  );

  const selectedBobaToReport = useReportStore(
    (state) => state.selectedBobaToReport
  );

  return (
    <Modal
      opened={isReportModalOpen}
      onClose={() => setIsReportModalOpen(false)}
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <h3 className="text-2xl font-bold text-center">Report: </h3>
      <p className="text-center text-lg text-pink-400">
        {selectedBobaToReport}
      </p>
      <ReportModalForm />
    </Modal>
  );
};

export default ReportModal;
