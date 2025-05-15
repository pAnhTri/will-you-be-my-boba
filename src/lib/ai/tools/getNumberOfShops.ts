import { dbConnect } from "@/lib/mongodb";
import { Shop } from "@/lib/mongodb";
import { Type } from "@google/genai";

export const getNumberOfShopsFunctionDeclaration = {
  name: "get_number_of_shops",
  description: "Get the number of shops in the database",
  parameters: { type: Type.OBJECT, properties: {}, required: [] },
};

export const getNumberOfShops = async () => {
  try {
    await dbConnect();

    const numberOfShops = await Shop.find().countDocuments();

    return numberOfShops;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
