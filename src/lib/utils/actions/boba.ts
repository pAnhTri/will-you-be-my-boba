"use server";

import { Boba, dbConnect } from "@/lib/mongodb";
import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { bobaDocumentValidatorSchema } from "@/lib/validators/boba";
import { PopulatedBoba } from "@/types/boba";
import { FilterQuery } from "mongoose";
import { getBobaPipelineStages } from "../aggregations";

export const getBobasAction = async (): Promise<PopulatedBoba[]> => {
  try {
    await dbConnect();

    const bobas = await Boba.find<PopulatedBoba>()
      .populate("sweetness")
      .populate("communityReviews")
      .populate("shopId");

    return JSON.parse(JSON.stringify(bobas));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get bobas"
    );
  }
};

export const getBobasPaginationAction = async (
  q: string = "",
  page: number = 0,
  limit: number = 20,
  sort: string = "name",
  sortOrder: "asc" | "desc" = "asc",
  flavors: string = ""
): Promise<PopulatedBoba[]> => {
  try {
    await dbConnect();

    const bobasAggreation = await Boba.aggregate<PopulatedBoba>(
      getBobaPipelineStages(q, page, limit, sort, sortOrder, flavors)
    );

    return JSON.parse(JSON.stringify(bobasAggreation));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get bobas pagination"
    );
  }
};

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

export const createBobaAction = async (
  payload: Omit<Partial<BobaDocument>, "shopId"> & { shopId: string[] }
): Promise<BobaDocument> => {
  try {
    if (Object.keys(payload).length === 0) {
      throw new Error("No payload provided");
    }

    // payload validation
    const validatedPayload = bobaDocumentValidatorSchema
      .omit({ communityReviews: true })
      .safeParse(payload);

    if (!validatedPayload.success) {
      throw new Error(validatedPayload.error.message);
    }

    await dbConnect();

    const newBoba = await Boba.create(validatedPayload.data);

    return JSON.parse(JSON.stringify(newBoba));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create boba"
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
  payload: Omit<Partial<BobaDocument>, "shopId"> & { shopId: string[] }
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
      { new: true }
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

export const deleteBobaAction = async (
  bobaId: string
): Promise<BobaDocument> => {
  try {
    await dbConnect();

    const deletedBoba = await Boba.findByIdAndDelete<BobaDocument>(bobaId);

    return JSON.parse(JSON.stringify(deletedBoba));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete boba"
    );
  }
};
