import { Boba, dbConnect } from "@/lib/mongodb";
import { Type } from "@google/genai";

export const getNumberOfDrinksFunctionDeclaration = {
  name: "get_number_of_drinks",
  description: "Get the number of drinks (boba) in the database",
  parameters: {
    type: Type.OBJECT,
    properties: {},
    required: [],
  },
};

export const getNumberOfDrinks = async () => {
  try {
    await dbConnect();

    const numberOfDrinks = await Boba.countDocuments();

    return numberOfDrinks;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
