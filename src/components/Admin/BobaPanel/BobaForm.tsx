"use client";

import {
  useBobaFlavors,
  useBobaPaginationCreate,
  useBobaPaginationUpdate,
  useReportUpdater,
  useShops,
} from "@/lib/utils/hooks";
import {
  BobaDocumentInput,
  BobaFormInput,
  bobaFormValidator,
  SweetnessDocumentInput,
  sweetnessDocumentValidatorSchema,
} from "@/lib/validators/boba";
import { useAdminStore } from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Pill,
  PillsInput,
  Select,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { useMemo } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const BobaForm = () => {
  const currentBoba = useAdminStore((state) => state.currentBoba);
  const setCurrentBoba = useAdminStore((state) => state.setCurrentBoba);
  const setIsBobaModalOpen = useAdminStore((state) => state.setIsBobaModalOpen);

  const searchParams = useAdminStore((state) => state.searchParams);

  const {
    isLoading: isUpdateLoading,
    error: updateError,
    updateBoba,
  } = useBobaPaginationUpdate(
    searchParams.q,
    searchParams.limit,
    searchParams.sort,
    searchParams.sortOrder,
    searchParams.flavors
  );

  const {
    updateReport,
    isLoading: isUpdateReportLoading,
    error: updateReportError,
  } = useReportUpdater();

  const {
    flavors,
    isValidating: isFlavorsValidating,
    isLoading: isFlavorsLoading,
    error: flavorsError,
  } = useBobaFlavors();

  const {
    shops,
    isValidating: isShopsValidating,
    isLoading: isShopsLoading,
    error: shopsError,
  } = useShops();

  const {
    isLoading: isCreateLoading,
    error: createError,
    createBoba,
  } = useBobaPaginationCreate(
    searchParams.q,
    searchParams.limit,
    searchParams.sort,
    searchParams.sortOrder,
    searchParams.flavors
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BobaFormInput>({
    resolver: zodResolver(bobaFormValidator),
    defaultValues: {
      name: currentBoba?.name || "",
      flavors: currentBoba?.flavors || [],
      shopId: currentBoba?.shopId?.map((shop) => shop._id?.toString()) || [],
      sweetness:
        currentBoba?.sweetness
          ?.map((sweetness) => {
            return Object.keys(sweetness).length > 0
              ? {
                  sweetnessLevel: sweetness.sweetnessLevel,
                  shopId: sweetness.shopId._id.toString(),
                }
              : null;
          })
          .filter((sweetness) => sweetness !== null) || [],
    },
  });

  // Sweetness object builder
  const {
    control: sweetnessControl,
    handleSubmit: sweetnessHandleSubmit,
    reset: sweetnessReset,
    formState: { errors: sweetnessErrors },
  } = useForm({
    resolver: zodResolver(sweetnessDocumentValidatorSchema),
    defaultValues: {
      sweetnessLevel: "Medium" as const,
      shopId: currentBoba?.shopId?.[0]._id.toString() || "",
    },
  });

  const {
    fields: sweetnesses,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "sweetness",
  });

  const onRemove = (index: number) => {
    remove(index);
  };

  const handleOnSweetnessAdd: SubmitHandler<SweetnessDocumentInput> = (
    data
  ) => {
    if (sweetnesses.find((sweetness) => sweetness.shopId === data.shopId)) {
      return;
    }

    append(data);

    sweetnessReset();
  };

  const mappedShopToSweetness = useMemo(() => {
    if (sweetnesses.length === 0) return [];

    return sweetnesses.map((sweetness) => {
      const matchingShop = shops?.find(
        (shop) => shop._id?.toString() === sweetness.shopId
      );

      return `${matchingShop?.name} (${matchingShop?.location.city}): ${sweetness.sweetnessLevel}`;
    });
  }, [sweetnesses, shops]);

  const availableFlavors = useMemo(() => {
    if (isFlavorsLoading || !flavors) return [];

    return flavors.map((flavor) => ({
      value: flavor,
      label: flavor,
    }));
  }, [flavors, isFlavorsLoading]);

  const availableShops = useMemo(() => {
    if (isShopsLoading || !shops) return [];

    return shops.map((shop) => ({
      value: shop._id?.toString() || "",
      label: `${shop.name} (${shop.location.city})`,
    }));
  }, [shops, isShopsLoading]);

  const handleReset = (
    data?: Omit<
      Partial<BobaDocumentInput>,
      "sweetness" | "communityReviews"
    > & { shopId: string[] }
  ) => {
    reset({
      name: data?.name || currentBoba?.name || "",
      flavors: data?.flavors || currentBoba?.flavors || [],
      shopId:
        data?.shopId ||
        currentBoba?.shopId?.map((shop) => shop._id?.toString()) ||
        [],
    });

    setCurrentBoba(null);
    setIsBobaModalOpen(false);
  };

  const onSubmit: SubmitHandler<
    Omit<Partial<BobaDocumentInput>, "sweetness" | "communityReviews"> & {
      shopId: string[];
    }
  > = async (data) => {
    // Update if current boba is not null
    const sanitizedPayload = {
      ...data,
      name: data.name?.trim(),
    };

    if (currentBoba) {
      const currentBobaName = currentBoba.name;

      await updateBoba(currentBoba._id.toString(), sanitizedPayload);

      if (data.name && currentBobaName !== data.name.trim()) {
        await updateReport(
          null,
          { boba: data.name.trim() },
          true,
          currentBobaName
        );
      }
    } else {
      await createBoba(sanitizedPayload);
    }

    handleReset(sanitizedPayload);
  };

  const isReportOrPaginationLoading =
    isUpdateReportLoading || isUpdateLoading || isCreateLoading;

  if (
    flavorsError ||
    shopsError ||
    updateError ||
    updateReportError ||
    createError
  ) {
    return (
      <Alert color="red" title="Error">
        {flavorsError && flavorsError.message}
        {shopsError && shopsError.message}
        {updateError && updateError}
        {updateReportError && updateReportError}
        {createError && createError}
      </Alert>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 relative"
    >
      <LoadingOverlay
        visible={isReportOrPaginationLoading}
        overlayProps={{ blur: 2 }}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            label="Boba Name"
            placeholder="Boba Name"
            {...field}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="flavors"
        render={({ field }) => (
          <TagsInput
            label="Flavors"
            placeholder="Flavors"
            data={availableFlavors}
            disabled={
              isFlavorsLoading ||
              isFlavorsValidating ||
              isReportOrPaginationLoading
            }
            clearable
            comboboxProps={{
              zIndex: 1010,
            }}
            {...field}
            error={errors.flavors?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="shopId"
        render={({ field }) => (
          <MultiSelect
            label="Shops"
            placeholder="Shops"
            data={availableShops}
            disabled={
              isShopsLoading || isShopsValidating || isReportOrPaginationLoading
            }
            searchable
            clearable
            comboboxProps={{
              zIndex: 1010,
            }}
            {...field}
            error={errors.shopId?.message}
          />
        )}
      />

      {/* Show the current list of sweetness */}
      <Controller
        control={control}
        name="sweetness"
        render={({ field }) => (
          <PillsInput
            label="Sweetness"
            {...field}
            error={errors.sweetness?.message}
          >
            <Pill.Group>
              {mappedShopToSweetness.map((sweetness, index) => (
                <Pill
                  key={sweetness}
                  withRemoveButton
                  onRemove={() => onRemove(index)}
                >
                  {sweetness}
                </Pill>
              ))}
            </Pill.Group>
          </PillsInput>
        )}
      />

      {/* Sweetness Builder */}
      <Group gap="xs" justify="center" align="flex-end">
        <Controller
          control={sweetnessControl}
          name="sweetnessLevel"
          render={({ field }) => (
            <Select
              label="Sweetness Level"
              placeholder="Sweetness Level"
              data={["Low", "Medium", "High"]}
              comboboxProps={{
                zIndex: 1010,
              }}
              disabled={
                isShopsLoading ||
                isShopsValidating ||
                isReportOrPaginationLoading
              }
              {...field}
              error={sweetnessErrors.sweetnessLevel?.message}
            />
          )}
        />
        <Controller
          control={sweetnessControl}
          name="shopId"
          render={({ field }) => (
            <Select
              label="Shop"
              placeholder="Shop"
              searchable
              data={availableShops}
              comboboxProps={{
                zIndex: 1010,
              }}
              disabled={
                isShopsLoading ||
                isShopsValidating ||
                isReportOrPaginationLoading
              }
              {...field}
              error={sweetnessErrors.shopId?.message}
            />
          )}
        />
        <Button
          onClick={sweetnessHandleSubmit(handleOnSweetnessAdd)}
          disabled={isReportOrPaginationLoading}
          loading={isReportOrPaginationLoading}
        >
          Add Sweetness
        </Button>
      </Group>

      <Button
        type="submit"
        disabled={isReportOrPaginationLoading}
        loading={isReportOrPaginationLoading}
      >
        {currentBoba ? "Update Boba" : "Create Boba"}
      </Button>
    </form>
  );
};

export default BobaForm;
