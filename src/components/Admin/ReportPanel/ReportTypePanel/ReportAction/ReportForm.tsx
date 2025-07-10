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
} from "@mantine/core";
import { HTMLAttributes, useEffect, useState, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ReportFormProps extends HTMLAttributes<HTMLFormElement> {
  availableShops: ShopDocument[];
  availableFlavors: string[];
  currentBoba: BobaDocument;
  reportType?: "Flavor" | "Shop" | "Name" | "Other" | "Solved";
}

const ReportForm = ({
  availableFlavors,
  availableShops,
  currentBoba,
  reportType,
  className,
  ...props
}: ReportFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const onSubmit: SubmitHandler<ReportFixInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
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
