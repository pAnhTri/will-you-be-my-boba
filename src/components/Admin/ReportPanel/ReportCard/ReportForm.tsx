import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { ReportDocument } from "@/lib/mongodb/models/Report";
import { cn } from "@/lib/utils";
import { revalidatePath } from "@/lib/utils/actions";
import { useReportUpdater, useShops } from "@/lib/utils/hooks";
import {
  useBobaByName,
  useBobaFlavors,
  useBobaUpdater,
} from "@/lib/utils/hooks/bobas";
import { ReportFixInput, reportFixValidator } from "@/lib/validators/reportFix";
import { useAdminStore } from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Group,
  Loader,
  LoadingOverlay,
  MultiSelect,
  ScrollArea,
  Skeleton,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ReportFormProps {
  bobaName: string;
}

const ReportForm = ({ bobaName }: ReportFormProps) => {
  const {
    boba,
    isLoading: isBobaLoading,
    error: bobaError,
    isValidating: isBobaValidating,
    mutate: mutateBoba,
  } = useBobaByName(bobaName);

  const {
    updateBoba,
    isLoading: isBobaUpdating,
    error: bobaUpdateError,
  } = useBobaUpdater(bobaName);

  const {
    flavors,
    isLoading: isFlavorsLoading,
    isValidating: isFlavorsValidating,
  } = useBobaFlavors();

  const { shops, isValidating: isShopsValidating } = useShops();

  const {
    updateReport,
    isLoading: isReportUpdating,
    error: reportUpdateError,
  } = useReportUpdater();

  const currentReport = useAdminStore((state) => state.currentReport);
  const setCurrentReport = useAdminStore((state) => state.setCurrentReport);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSolved, setIsSolved] = useState(currentReport?.type === "Solved");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFixInput>({
    resolver: zodResolver(reportFixValidator),
    defaultValues: {
      name: bobaName,
      flavors: [],
      shops: [],
    },
  });

  useEffect(
    () => {
      if (!boba) mutateBoba();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (boba) {
        reset({
          name: boba.name,
          flavors: boba.flavors,
          shops: boba.shopId.map((shop) => shop.toString()),
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boba]
  );

  // Filter available flavors based on search term, show only 20
  const filteredFlavors = useMemo(() => {
    if (!flavors) return [];
    return flavors
      .filter((flavor) =>
        flavor.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 20);
  }, [flavors, searchTerm]);

  const availableShopsDataMap = useMemo(() => {
    if (!shops) return [];
    return shops
      .map((shop) => {
        return {
          value: shop._id.toString(),
          label: `${shop.name} (${shop.location.city})`,
        };
      })
      .filter(
        (item): item is { value: string; label: string } => item !== null
      );
  }, [shops]);

  if (isBobaLoading) {
    return <Skeleton height={200} width="100%" maw={500} />;
  }

  const onSubmit: SubmitHandler<ReportFixInput> = async (data) => {
    const bobaPayload: Omit<Partial<BobaDocument>, "shopId"> & {
      shopId: string[];
    } = {
      name: data.name,
      flavors: data.flavors,
      shopId: data.shops,
    };

    await updateBoba(bobaPayload);

    const reportPayload: Partial<ReportDocument> = {
      type: isSolved ? "Solved" : undefined,
      boba: data.name,
    };

    const isUpdatingName = currentReport?.boba !== data.name;

    await updateReport(
      currentReport?._id?.toString() ?? "",
      reportPayload,
      isUpdatingName,
      isUpdatingName ? currentReport?.boba : null
    );

    revalidatePath("/admin");
    setCurrentReport(null);
  };

  if (bobaError) {
    return (
      <Alert color="red" title="Error">
        {bobaError}
      </Alert>
    );
  }

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 relative"
    >
      <LoadingOverlay
        visible={isReportUpdating || isBobaUpdating}
        overlayProps={{
          blur: 2,
        }}
      />
      <Alert
        color="red"
        title="Error"
        hidden={!bobaUpdateError || !reportUpdateError}
      >
        {bobaUpdateError || reportUpdateError}
      </Alert>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            data-autofocus
            placeholder="name"
            label="Name"
            {...field}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="flavors"
        render={({ field }) => (
          <Stack gap="xs">
            <Group>
              <TagsInput
                label="Flavors"
                placeholder="Add flavors"
                {...field}
                onInput={(e) => setSearchTerm(e.currentTarget.value)}
                acceptValueOnBlur={false}
                clearable
                error={errors.flavors?.message}
                disabled={isBobaValidating || isBobaUpdating}
                classNames={{
                  pill: "bg-pink-300",
                }}
              />
              {isBobaValidating || (isBobaUpdating && <Loader size="xs" />)}
            </Group>

            {/* Available flavors container */}
            <Stack gap="xs" className="relative">
              <LoadingOverlay
                visible={isFlavorsValidating}
                overlayProps={{
                  blur: 2,
                }}
              />
              <Text className="text-sm text-gray-600">Available flavors:</Text>

              <ScrollArea.Autosize mah={200}>
                <Group gap="xs" p="xs">
                  {filteredFlavors.length > 0 ? (
                    filteredFlavors.map((flavor) => (
                      <Badge
                        key={flavor}
                        variant={
                          field.value.includes(flavor) ? "filled" : "outline"
                        }
                        color="pink"
                        className={cn(
                          "cursor-pointer hover:opacity-80 transition-opacity hover:scale-105",
                          (isFlavorsLoading || isFlavorsValidating) &&
                            "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => {
                          const newValue = field.value.includes(flavor)
                            ? field.value.filter((f) => f !== flavor)
                            : [...field.value, flavor];
                          field.onChange(newValue);
                        }}
                      >
                        {flavor}
                      </Badge>
                    ))
                  ) : (
                    <Text className="text-sm text-gray-600">
                      No flavors found
                    </Text>
                  )}
                </Group>
              </ScrollArea.Autosize>
            </Stack>
          </Stack>
        )}
      />

      {/* Shop tags select */}
      <Controller
        control={control}
        name="shops"
        render={({ field }) => (
          <Group>
            <MultiSelect
              label="Shops"
              placeholder="Type to search shops..."
              {...field}
              error={errors.shops?.message}
              clearable
              searchable
              data={availableShopsDataMap}
              disabled={
                isShopsValidating ||
                isShopsValidating ||
                currentReport?.type !== "Shop"
              }
            />
            {isShopsValidating && <Loader size="xs" />}
          </Group>
        )}
      />

      <Group justify="end">
        <Checkbox
          checked={isSolved}
          onChange={(e) => setIsSolved(e.target.checked)}
          color="green"
          label="Mark as solved"
        />
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default ReportForm;
