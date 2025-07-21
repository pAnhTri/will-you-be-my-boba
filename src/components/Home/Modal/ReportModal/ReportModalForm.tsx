import { cn } from "@/lib/utils";
import { getBobaByName } from "@/lib/utils/api/boba";
import { createReport } from "@/lib/utils/api/report";
import { getShopById } from "@/lib/utils/api/shop";
import { reportValidatorSchema, ReportInput } from "@/lib/validators/report";
import { useReportStore } from "@/lib/zustand/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  LoadingOverlay,
  Select,
  Skeleton,
  Textarea,
} from "@mantine/core";
import { HTMLAttributes, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert } from "react-icons/ci";

const ReportModalForm = ({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) => {
  const [cachedShopData, setCachedShopData] = useState<
    { value: string; label: string }[]
  >([]);
  const [isShopLoading, setIsShopLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setIsReportModalOpen = useReportStore(
    (state) => state.setIsReportModalOpen
  );

  const selectedBobaToReport = useReportStore(
    (state) => state.selectedBobaToReport
  );

  const setSelectedBobaToReport = useReportStore(
    (state) => state.setSelectedBobaToReport
  );

  const setSuccessMessage = useReportStore((state) => state.setSuccessMessage);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportInput>({
    resolver: zodResolver(reportValidatorSchema),
  });

  const reportType = watch("reportType");

  useEffect(() => {
    if (reportType !== "Shop" || !selectedBobaToReport) {
      return;
    }

    const fetchShopData = async () => {
      setIsShopLoading(true);
      setError(null);

      try {
        const boba = await getBobaByName(selectedBobaToReport!);

        if (!boba) {
          throw new Error("Boba not found");
        }

        const shopIds = boba.shopId;

        Promise.all(
          shopIds.map(async (shopId) => {
            const shop = await getShopById(shopId.toString());

            if (!shop) {
              throw new Error("Shop not found");
            }

            return { value: shop._id.toString(), label: shop.name };
          })
        )
          .then((shops) => {
            setCachedShopData(shops);
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to fetch shop data: ${error.message}`);
        } else {
          setError("Failed to fetch shop data");
        }
      } finally {
        setIsShopLoading(false);
      }
    };

    if (cachedShopData.length === 0) {
      fetchShopData();
    }
  }, [reportType, selectedBobaToReport, cachedShopData.length]);

  const handleCancel = () => {
    reset();
    setCachedShopData([]);
    setSelectedBobaToReport(null);
    setIsReportModalOpen(false);
  };

  const onSubmit: SubmitHandler<ReportInput> = async (data) => {
    const payload: ReportInput & { boba: string } = {
      ...data,
      boba: selectedBobaToReport!,
    };

    setIsSubmitLoading(true);
    setError(null);

    try {
      const message = await createReport(payload);

      reset();
      setCachedShopData([]);
      setSelectedBobaToReport(null);
      setSuccessMessage(message);
      setIsReportModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <form
      className={cn(
        "max-w-md flex flex-col gap-4 justify-center relative",
        className
      )}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoadingOverlay
        visible={isSubmitLoading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
        loaderProps={{ color: "pink", size: "sm" }}
      />
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Controller
        name="reportType"
        control={control}
        render={({ field }) => (
          <Select
            data-autofocus
            label="Report Type"
            withCheckIcon={false}
            withAsterisk
            disabled={isShopLoading}
            placeholder="Select a report type"
            data={["Flavor", "Shop", "Name", "Other"]}
            classNames={{
              input: "focus:outline-none focus:ring-2 focus:ring-pink-500",
            }}
            {...field}
            error={errors.reportType?.message}
          />
        )}
      />

      {watch("reportType") === "Shop" &&
        (isShopLoading ? (
          <Skeleton height={100} />
        ) : (
          <Controller
            name="shop"
            control={control}
            render={({ field }) => (
              <Select
                label="Shop"
                placeholder="Select a shop"
                withCheckIcon={false}
                withAsterisk
                searchable
                data={cachedShopData}
                classNames={{
                  input: "focus:outline-none focus:ring-2 focus:ring-pink-500",
                }}
                {...field}
                error={errors.shop?.message}
              />
            )}
          />
        ))}

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Reason"
            placeholder="Enter your reason, e.g. 'This boba doesn't like Taro', 'The shop doesn't have the boba', etc."
            autosize
            minRows={3}
            maxRows={10}
            classNames={{
              input: "focus:outline-none focus:ring-2 focus:ring-pink-500",
            }}
            {...field}
            error={errors.comment?.message}
          />
        )}
      />

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" color="red" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" color="pink">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReportModalForm;
