import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { ReportFixInput, reportFixValidator } from "@/lib/validators/reportFix";
import {
  useAdminStore,
  useFlavorStore,
  useShopStore,
} from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Button,
  Group,
  MultiSelect,
  ScrollArea,
  Skeleton,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ReportFormProps {
  boba: BobaDocument | null;
}

const ReportForm = ({ boba }: ReportFormProps) => {
  const currentReport = useAdminStore((state) => state.currentReport);
  const flavors = useFlavorStore((state) => state.flavors);
  const isFlavorsLoading = useFlavorStore((state) => state.isFlavorsLoading);
  const shops = useShopStore((state) => state.shopDocuments);
  const isShopsLoading = useShopStore((state) => state.isShopsLoading);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFixInput>({
    resolver: zodResolver(reportFixValidator),
    defaultValues: {
      name: boba?.name ?? "",
      flavors: boba?.flavors ?? [],
      shops: boba?.shopId.map((shop) => shop.toString()) ?? [],
    },
  });

  // Filter available flavors based on search term, show only 20
  const filteredFlavors = useMemo(() => {
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
  }, [shops]);

  const onSubmit: SubmitHandler<ReportFixInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 relative"
    >
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
            <TagsInput
              label="Flavors"
              placeholder="Add flavors"
              {...field}
              onInput={(e) => setSearchTerm(e.currentTarget.value)}
              acceptValueOnBlur={false}
              clearable
              error={errors.flavors?.message}
              classNames={{
                pill: "bg-pink-300",
              }}
            />

            {/* Available flavors container */}
            <Stack gap="xs">
              <Text className="text-sm text-gray-600">Available flavors:</Text>
              {isFlavorsLoading ? (
                <Skeleton height={200} />
              ) : (
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
              )}
            </Stack>
          </Stack>
        )}
      />

      {/* Shop tags select */}
      <Controller
        control={control}
        name="shops"
        render={({ field }) =>
          isShopsLoading ? (
            <Skeleton width="100%" height={50} />
          ) : (
            <MultiSelect
              label="Shops"
              placeholder="Type to search shops..."
              {...field}
              error={errors.shops?.message}
              clearable
              searchable
              data={availableShopsDataMap}
              disabled={isShopsLoading || currentReport?.type !== "Shop"}
            />
          )
        }
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ReportForm;
