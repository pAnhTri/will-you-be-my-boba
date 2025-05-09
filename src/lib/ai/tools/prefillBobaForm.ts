import { Type } from "@google/genai";

export const prefillBobaFormFunctionDeclaration = {
  name: "prefill_boba_form",
  description: "Prefill the boba form",
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        description: "The page currently open",
      },
      name: {
        type: Type.STRING,
        description: "The name of the boba",
      },
      flavors: {
        type: Type.ARRAY,
        description:
          "The flavors of the boba in a comma separated list of keywords",
        items: {
          type: Type.STRING,
          description: "A single flavor keyword",
        },
      },
      sweetnessLevel: {
        type: Type.STRING,
        description: "The sweetness level of the boba, Low, Medium, High",
      },
    },
    required: ["name"],
  },
};

export const prefillBobaForm = (
  page: string,
  name: string,
  flavors: string[],
  sweetnessLevel: string
) => {
  // Return a special response that the client can use to trigger the modal
  if (page !== "home") {
    return "Wrong page! Must be home page";
  }
  return {
    action: "PREFILL_ADD_BOBA_FORM",
    formData: {
      name,
      flavors,
      sweetnessLevel,
    },
  };
};
