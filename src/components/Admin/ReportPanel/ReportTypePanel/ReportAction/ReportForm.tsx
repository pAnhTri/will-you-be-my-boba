import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { cn } from "@/lib/utils/cn";
import { ReportFixInput, reportFixValidator } from "@/lib/validators/reportFix";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TagsInput,
  TextInput,
  Badge,
  Stack,
  Text,
  Group,
  ScrollArea,
  MultiSelect,
  LoadingOverlay,
} from "@mantine/core";
import { HTMLAttributes, useEffect, useState, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import mongoose from "mongoose";
import { useBobaUpdater } from "@/lib/utils/hooks/bobas";
import { revalidate } from "@/lib/utils/server";
import { CiCircleAlert } from "react-icons/ci";
import { ReportDocument } from "@/lib/mongodb/models/Report";
import { useReportUpdater } from "@/lib/utils/hooks";

interface ReportFormProps extends HTMLAttributes<HTMLFormElement> {
  availableShops: ShopDocument[];
  availableFlavors: string[];
  currentBoba: BobaDocument;
  reportId: string;
  reportType?: "Flavor" | "Shop" | "Name" | "Other" | "Solved";
}

const ReportForm = ({
  availableFlavors,
  availableShops,
  currentBoba,
  reportId,
  reportType,
  className,
  ...props
}: ReportFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    updateBoba,
    isLoading: isBobaLoading,
    error: bobaError,
    updatedBoba,
  } = useBobaUpdater();
  const {
    updateReport,
    isLoading: isReportLoading,
    error: reportError,
  } = useReportUpdater();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFixInput>({
    resolver: zodResolver(reportFixValidator),
    defaultValues: {
      name: currentBoba?.name || "",
      flavors: currentBoba?.flavors || [],
    },
  });

  // Filter available flavors based on search term, show only 20
  const filteredFlavors = useMemo(() => {
    return availableFlavors
      .filter((flavor) =>
        flavor.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 20);
  }, [availableFlavors, searchTerm]);

  const availableShopsDataMap = useMemo(() => {
    if (!availableShops) return [];
    return availableShops
      .map((shop) => {
        if (shop) {
          return {
            value: shop._id.toString(),
            label: `${shop.name} (${shop.location.city})`,
          };
        }
        return null;
      })
      .filter(
        (item): item is { value: string; label: string } => item !== null
      );
  }, [availableShops]);

  // Set default values on mount and when currentBoba changes
  useEffect(() => {
    reset({
      name: currentBoba?.name || "",
      flavors: currentBoba?.flavors || [],
      shops: currentBoba?.shopId.map((shop) => shop.toString()) || [],
    });
  }, [currentBoba, reset]);

  const onSubmit: SubmitHandler<ReportFixInput> = async (data) => {
    const payload: Partial<BobaDocument> = {
      name: data.name,
      flavors: data.flavors,
      shopId: data.shops.map((shop) => new mongoose.Types.ObjectId(shop)),
    };

    await updateBoba(currentBoba._id.toString(), payload);

    const reportPayload: Partial<ReportDocument> = {
      boba: updatedBoba?.name || currentBoba.name,
    };

    await updateReport(reportId, reportPayload);

    // Reset the values after update
    reset({
      name: updatedBoba?.name || currentBoba.name,
      flavors: updatedBoba?.flavors || currentBoba.flavors,
      shops:
        updatedBoba?.shopId.map((shop) => shop.toString()) ||
        currentBoba.shopId.map((shop) => shop.toString()),
    });

    revalidate("/admin");
  };

  return (
    <form
      className={cn("flex flex-col gap-2 p-2 relative", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoadingOverlay
        visible={isBobaLoading || isReportLoading}
        overlayProps={{ blur: 2 }}
      />

      {/* Error */}
      {(bobaError || reportError) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{bobaError || reportError}</span>
        </div>
      )}

      {/* Edit Name */}
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            label="Name"
            {...field}
            error={errors.name?.message}
            placeholder="Enter new name"
          />
        )}
      />

      {/* Flavor tags */}
      <Controller
        control={control}
        name="flavors"
        render={({ field }) => (
          <Stack gap="xs">
            <TagsInput
              label="Flavors"
              placeholder="Type to search flavors..."
              value={field.value}
              onChange={field.onChange}
              error={errors.flavors?.message}
              clearable
              onInput={(event) => setSearchTerm(event.currentTarget.value)}
              classNames={{ pill: "bg-pink-500 text-white" }}
            />

            {/* Available flavors container */}
            <Stack gap="xs">
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
                        className="cursor-pointer hover:opacity-80 transition-opacity hover:scale-105"
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
          <MultiSelect
            label="Shops"
            placeholder="Type to search shops..."
            {...field}
            error={errors.shops?.message}
            clearable
            searchable
            data={availableShopsDataMap}
            disabled={reportType !== "Shop"}
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ReportForm;
