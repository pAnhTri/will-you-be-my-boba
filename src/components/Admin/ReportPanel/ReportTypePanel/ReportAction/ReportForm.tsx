import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { cn } from "@/lib/utils/cn";
import { Pill } from "@mantine/core";
import { HTMLAttributes } from "react";

interface ReportFormProps extends HTMLAttributes<HTMLFormElement> {
  availableShops: ShopDocument[];
  availableFlavors: string[];
  currentBoba: BobaDocument;
}

const ReportForm = ({
  availableFlavors,
  availableShops,
  currentBoba,
  className,
  ...props
}: ReportFormProps) => {
  return (
    <form className={cn("flex flex-col gap-2 p-2", className)} {...props}>
      {/* Flavor pills */}
      <Pill.Group>
        {availableFlavors.map((flavor) => (
          <Pill key={flavor}>{flavor}</Pill>
        ))}
      </Pill.Group>
    </form>
  );
};

export default ReportForm;
