"use server";

import { Boba, dbConnect } from "@/lib/mongodb";
import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { bobaDocumentValidatorSchema } from "@/lib/validators/boba";
import { FilterQuery } from "mongoose";

export const getBobaByName = async (
  bobaName: string
): Promise<BobaDocument> => {
  try {
    await dbConnect();

    const boba = await Boba.findOne<BobaDocument>({ name: bobaName });

    if (!boba) {
      throw new Error("Boba not found");
    }

    return JSON.parse(JSON.stringify(boba));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get boba by name"
    );
  }
};

export const getBobaFlavors = async (): Promise<string[]> => {
  try {
    await dbConnect();

    const flavors = await Boba.find<{ flavors: string[] }>({})
      .select("flavors")
      .distinct("flavors")
      .sort({ flavors: 1 });

    return flavors;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get boba flavors"
    );
  }
};

export const updateBoba = async (
  bobaUpdateCondition: FilterQuery<BobaDocument>,
  payload: Partial<BobaDocument>
): Promise<BobaDocument> => {
  try {
    if (Object.keys(payload).length === 0) {
      throw new Error("No payload provided");
    }

    // payload validation
    const validatedPayload = bobaDocumentValidatorSchema
      .partial()
      .safeParse(payload);

    if (!validatedPayload.success) {
      throw new Error(validatedPayload.error.message);
    }

    await dbConnect();

    const boba = await Boba.findOneAndUpdate<BobaDocument>(
      bobaUpdateCondition,
      validatedPayload.data,
      { new: true, lean: true }
    );

    if (!boba) {
      throw new Error("Boba not found");
    }

    return JSON.parse(JSON.stringify(boba));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update boba"
    );
  }
};
