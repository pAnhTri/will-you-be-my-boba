"use client";

import { cn, getFlavorColor } from "@/lib/utils";
import { useBobaPaginationDelete } from "@/lib/utils/hooks/bobas";
import { useAdminStore } from "@/lib/zustand/stores/admin";
import { PopulatedBoba } from "@/types/boba";
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Pill,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { memo, useMemo, useCallback, useState } from "react";
import {
  LuStar,
  LuUsers,
  LuMapPin,
  LuTrash,
  LuPencil,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";

interface BobaCardProps {
  boba: PopulatedBoba;
  searchParams: {
    q: string;
    limit: number;
    sort: string;
    order: "asc" | "desc";
    flavor: string;
  };
}

const BobaCard = ({ boba, searchParams }: BobaCardProps) => {
  const [showAllShops, setShowAllShops] = useState(false);

  const setCurrentBoba = useAdminStore((state) => state.setCurrentBoba);
  const setSearchParams = useAdminStore((state) => state.setSearchParams);

  const {
    deleteBoba,
    isLoading: isDeleting,
    error: deleteError,
  } = useBobaPaginationDelete(
    searchParams.q,
    searchParams.limit,
    searchParams.sort,
    searchParams.order,
    searchParams.flavor
  );

  // Memoize sweetness calculations
  const { averageSweetnessLevel, sweetnessProgress } = useMemo(() => {
    const levels = boba.sweetness?.map((s) => s.sweetnessLevel) || [];
    const scores = levels.map((level) => {
      switch (level) {
        case "Low":
          return 0;
        case "Medium":
          return 1;
        case "High":
          return 2;
        default:
          return 1;
      }
    });

    const avgScore =
      scores.length > 0
        ? Math.round(
            scores.reduce((sum: number, score: number) => sum + score, 0) /
              scores.length
          )
        : 1;

    const avgLevel =
      avgScore === 0 ? "Low" : avgScore === 1 ? "Medium" : "High";
    const progress = (avgScore / 2) * 100;

    return {
      averageSweetnessScore: avgScore,
      averageSweetnessLevel: avgLevel,
      sweetnessProgress: progress,
    };
  }, [boba.sweetness]);

  // Memoize community reviews count
  const reviewCount = boba.communityReviews?.length || 0;

  // Memoize displayed shops
  const { displayedShops, hasMoreShops, remainingCount } = useMemo(() => {
    const shops = boba.shopId || [];
    const shouldShowAll = showAllShops || shops.length <= 3;
    const displayed = shouldShowAll ? shops : shops.slice(0, 3);

    return {
      displayedShops: displayed,
      hasMoreShops: shops.length > 3 && !showAllShops,
      remainingCount: shops.length - 3,
    };
  }, [boba.shopId, showAllShops]);

  // Memoize flavor colors
  const flavorElements = useMemo(
    () =>
      boba.flavors.map((flavor) => (
        <Pill
          key={flavor}
          size="sm"
          classNames={{
            root: cn(getFlavorColor(flavor), "font-medium"),
          }}
        >
          {flavor}
        </Pill>
      )),
    [boba.flavors]
  );

  // Memoize shop badges
  const shopBadges = useMemo(
    () =>
      displayedShops.map((shop) => (
        <Badge
          key={shop._id.toString()}
          variant="light"
          color="blue"
          size="sm"
          className="font-medium"
        >
          {shop.name}
        </Badge>
      )),
    [displayedShops]
  );

  // Memoize sweetness color
  const sweetnessColor = useMemo(() => {
    switch (averageSweetnessLevel) {
      case "Low":
        return "green";
      case "Medium":
        return "yellow";
      case "High":
        return "red";
      default:
        return "gray";
    }
  }, [averageSweetnessLevel]);

  // Memoize star color class
  const starColorClass = cn(
    (boba.enjoymentFactor ?? 0) >= 4
      ? "text-yellow-500 fill-current"
      : "text-gray-400"
  );

  // Memoize handlers
  const handleDelete = useCallback(async () => {
    await deleteBoba(boba._id.toString());
  }, [deleteBoba, boba._id]);

  const toggleShowAllShops = useCallback(() => {
    setShowAllShops((prev) => !prev);
  }, []);

  if (deleteError) {
    return (
      <Alert title="Error deleting boba" color="red">
        {deleteError}
      </Alert>
    );
  }

  return (
    <Paper
      withBorder
      radius="md"
      className="relative p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-gray-50 border border-gray-200"
    >
      <LoadingOverlay visible={isDeleting} overlayProps={{ blur: 2 }} />
      <Stack gap="md">
        {/* Header: Name and enjoyment factor and actions */}
        <Group justify="space-between" align="center">
          <Group gap="xs" align="center">
            <ActionIcon
              variant="light"
              color="gray"
              onClick={() => {
                setCurrentBoba(boba);
                setSearchParams({
                  q: searchParams.q,
                  limit: searchParams.limit,
                  sort: searchParams.sort,
                  sortOrder: searchParams.order,
                  flavors: searchParams.flavor,
                });
              }}
            >
              <LuPencil size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={handleDelete}
              loading={isDeleting}
            >
              <LuTrash size={18} />
            </ActionIcon>
          </Group>
          <Text fw={700} size="lg" className="text-gray-800">
            {boba.name}
          </Text>
          <Group gap="xs">
            <Text fw={600} size="sm" className="text-gray-600">
              {boba.enjoymentFactor || 0}
            </Text>
            <LuStar size={18} className={starColorClass} />
          </Group>
        </Group>

        {/* Flavors */}
        <div>
          <Text
            size="xs"
            fw={600}
            className="text-gray-500 mb-2 uppercase tracking-wide"
          >
            Flavors
          </Text>
          <Group gap="xs" wrap="wrap">
            {flavorElements}
          </Group>
        </div>

        {/* Shops */}
        {boba.shopId.length > 0 && (
          <div>
            <Group gap="xs" align="center" className="mb-2">
              <LuMapPin size={14} className="text-gray-500" />
              <Text
                size="xs"
                fw={600}
                className="text-gray-500 uppercase tracking-wide"
              >
                Shops
              </Text>
            </Group>
            <Group gap="xs" wrap="wrap">
              {shopBadges}
              {hasMoreShops && (
                <Button
                  variant="light"
                  size="xs"
                  onClick={toggleShowAllShops}
                  rightSection={<LuChevronDown size={12} />}
                  className="font-medium"
                >
                  +{remainingCount} more
                </Button>
              )}
              {showAllShops && boba.shopId.length > 3 && (
                <Button
                  variant="light"
                  size="xs"
                  onClick={toggleShowAllShops}
                  rightSection={<LuChevronUp size={12} />}
                  className="font-medium"
                >
                  Show less
                </Button>
              )}
            </Group>
          </div>
        )}

        {/* Average Sweetness Level */}
        <div>
          <Group gap="xs" align="center" className="mb-2">
            <Text
              size="xs"
              fw={600}
              className="text-gray-500 uppercase tracking-wide"
            >
              Avg. Sweetness
            </Text>
            <Badge variant="light" color={sweetnessColor} size="xs">
              {averageSweetnessLevel}
            </Badge>
          </Group>
          <Progress
            value={sweetnessProgress}
            color={sweetnessColor}
            size="sm"
            radius="xl"
            className="mb-1"
          />
          <Group gap="xs" justify="space-between">
            <Text size="xs" className="text-gray-500">
              Low
            </Text>
            <Text size="xs" className="text-gray-500">
              Medium
            </Text>
            <Text size="xs" className="text-gray-500">
              High
            </Text>
          </Group>
        </div>

        {/* Community Reviews */}
        <Group gap="xs" align="center">
          <LuUsers size={16} className="text-gray-500" />
          <Text size="sm" className="text-gray-600">
            {reviewCount} community review{reviewCount !== 1 ? "s" : ""}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default memo(BobaCard);
