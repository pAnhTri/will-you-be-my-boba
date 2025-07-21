"use server";

import { Boba, dbConnect } from "@/lib/mongodb";

export const getBobaByName = async (bobaName: string) => {
  try {
    await dbConnect();

    const boba = await Boba.findOne({ name: bobaName });

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
