"use client";

import {
  Group,
  TextInput,
  Loader,
  Text,
  ScrollArea,
  LoadingOverlay,
  Stack,
  Alert,
  Skeleton,
  ActionIcon,
  Select,
  Button,
} from "@mantine/core";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useBobasPagination } from "@/lib/utils/hooks/bobas";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { LuPlus } from "react-icons/lu";
import { useAdminStore } from "@/lib/zustand/stores/admin";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const ScrollToTop = dynamic(() => import("./ScrollToTop"), {
  ssr: false,
});

const BobaCard = dynamic(() => import("./BobaCard"), {
  loading: () => <Skeleton height={500} />,
});

const InfiniteScrollArea = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [limit, setLimit] = useState<number>(20);
  const [debouncedLimit] = useDebouncedValue(limit, 300);
  const [flavors, setFlavors] = useState<string>("");
  const [debouncedFlavors] = useDebouncedValue(flavors, 300);
  const [sort, setSort] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [sortByEnjoymentFactorToggle, setSortByEnjoymentFactorToggle] =
    useState<"None" | "Ascending" | "Descending">("None");

  const setIsBobaModalOpen = useAdminStore((state) => state.setIsBobaModalOpen);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { ref: sentinelRef, entry } = useIntersection({
    root: scrollAreaRef.current,
  });
  const { ref: loadMoreBobaRef, entry: loadMoreBobaEntry } = useIntersection({
    root: scrollAreaRef.current,
  });

  const { bobas, isValidating, error, size, setSize, hasMore } =
    useBobasPagination(
      debouncedQuery.trim().toLowerCase(),
      debouncedLimit,
      sort,
      order,
      "",
      false
    );

  useEffect(
    () => {
      if (entry?.isIntersecting && !isValidating && hasMore) {
        setIsLoadingMore(true);
        setSize(size + 1);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidating, entry?.isIntersecting, hasMore]
  );

  // Reset loading more state when validation completes
  useEffect(() => {
    if (!isValidating && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isValidating, isLoadingMore]);

  const { completeBobaList, totalBobas } = useMemo(() => {
    if (!bobas) return { completeBobaList: [], totalBobas: 0 };

    let completeBobaList = bobas.flat();
    const totalBobas = completeBobaList.length;

    switch (sortByEnjoymentFactorToggle) {
      case "Ascending":
        completeBobaList = completeBobaList.sort(
          (a, b) => (a.enjoymentFactor ?? 0) - (b.enjoymentFactor ?? 0)
        );
        break;
      case "Descending":
        completeBobaList = completeBobaList.sort(
          (a, b) => (b.enjoymentFactor ?? 0) - (a.enjoymentFactor ?? 0)
        );
        break;
      default:
        break;
    }

    return { completeBobaList, totalBobas };
  }, [bobas, sortByEnjoymentFactorToggle]);

  if (bobas && bobas.length === 0) {
    return <Alert title="No boba found" color="red" />;
  }

  if (error) {
    return (
      <Alert title="Error fetching boba" color="red">
        {error.message}
      </Alert>
    );
  }

  return (
    <>
      <ScrollToTop
        scrollPosition={scrollPosition}
        scrollAreaRef={scrollAreaRef}
      />
      <Group
        justify="space-between"
        align="center"
        py="md"
        px="md"
        className="flex-col-reverse sm:flex-row"
      >
        <Group justify="space-between" align="center" gap="md">
          <Group>
            <Text fw={700} size="lg">
              Showing {totalBobas} boba(s)
            </Text>
            {isValidating && <Loader size="xs" />}
          </Group>
          <TextInput
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <TextInput
            placeholder="Limit"
            type="number"
            min={20}
            value={limit}
            onChange={(e) => {
              const value = Number(e.currentTarget.value);
              if (value < 20) {
                setLimit(20);
              } else {
                setLimit(value);
              }
            }}
          />
          <TextInput
            placeholder="Flavor"
            value={flavors}
            onChange={(e) => setFlavors(e.currentTarget.value)}
          />
          <Select
            placeholder="Sort"
            value={sort}
            onChange={(value) => setSort(value as string)}
            data={[
              { label: "Name", value: "name" },
              { label: "Created At", value: "createdAt" },
              { label: "Updated At", value: "updatedAt" },
            ]}
          />
          <Select
            placeholder="Order"
            value={order}
            onChange={(value) => setOrder(value as "asc" | "desc")}
            data={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" },
            ]}
          />
          <Button.Group>
            <Button
              onClick={() =>
                setSortByEnjoymentFactorToggle(
                  sortByEnjoymentFactorToggle === "None"
                    ? "Ascending"
                    : sortByEnjoymentFactorToggle === "Ascending"
                      ? "Descending"
                      : "None"
                )
              }
              variant="light"
              color="gray"
            >
              {sortByEnjoymentFactorToggle === "None" ? (
                <FaSort size={16} className="text-gray-500" />
              ) : sortByEnjoymentFactorToggle === "Ascending" ? (
                <FaSortUp size={16} className="text-green-500" />
              ) : (
                <FaSortDown size={16} className="text-red-500" />
              )}
            </Button>
            <Button.GroupSection variant="outline">
              {sortByEnjoymentFactorToggle === "None" ? (
                <Text>Sort by Enjoyment Factor</Text>
              ) : sortByEnjoymentFactorToggle === "Ascending" ? (
                <Text>Sort by Enjoyment Factor (Ascending)</Text>
              ) : (
                <Text>Sort by Enjoyment Factor (Descending)</Text>
              )}
            </Button.GroupSection>
          </Button.Group>
        </Group>
        <ActionIcon
          onClick={() => setIsBobaModalOpen(true)}
          variant="light"
          color="green"
          size="lg"
        >
          <LuPlus size={20} />
        </ActionIcon>
      </Group>
      <ScrollArea
        viewportRef={scrollAreaRef}
        offsetScrollbars
        onScrollPositionChange={onScrollPositionChange}
        classNames={{ root: "grow-1 min-h-0 p-2 overflow-hidden" }}
        pos="relative"
      >
        <LoadingOverlay
          visible={
            isValidating &&
            !isLoadingMore &&
            !entry?.isIntersecting &&
            !loadMoreBobaEntry?.isIntersecting
          }
          overlayProps={{
            blur: 2,
          }}
        />
        <Stack>
          {completeBobaList.map((boba) => {
            return (
              <BobaCard
                key={boba._id.toString()}
                boba={boba}
                searchParams={{
                  q: debouncedQuery.trim().toLowerCase(),
                  limit: debouncedLimit,
                  sort,
                  order,
                  flavor: debouncedFlavors,
                }}
              />
            );
          })}
          {!isValidating && hasMore ? (
            <div ref={sentinelRef} className="h-10" />
          ) : (
            hasMore && (
              <Group
                ref={loadMoreBobaRef}
                className="flex items-center justify-center"
              >
                <Loader size="xs" />
                <Text>Loading more boba...</Text>
              </Group>
            )
          )}
        </Stack>
      </ScrollArea>
    </>
  );
};

export default memo(InfiniteScrollArea);
