import { Loader, Skeleton } from "@mantine/core";
import dynamic from "next/dynamic";

const BobaModal = dynamic(() => import("./BobaPanel/BobaModal"), {
  loading: () => <Loader size="xs" />,
});

const InfiniteScrollArea = dynamic(
  () => import("./BobaPanel/InfiniteScrollArea"),
  {
    loading: () => <Skeleton width="100%" height="100%" />,
  }
);

const BobaPanel = () => {
  return (
    <>
      <BobaModal />
      <InfiniteScrollArea />
    </>
  );
};

export default BobaPanel;
