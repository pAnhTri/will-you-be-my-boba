import { Boba, dbConnect } from "@/lib/mongodb";
import { Type } from "@google/genai";

export const getNumberOfFlavorsFunctionDeclaration = {
  name: "get_number_of_flavors",
  description: "Get the number of flavors in the database",
  parameters: { type: Type.OBJECT, properties: {}, required: [] },
};

export const getNumberOfFlavors = async () => {
  try {
    await dbConnect();

    const flavors = await Boba.find().distinct("flavors");

    return flavors.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
