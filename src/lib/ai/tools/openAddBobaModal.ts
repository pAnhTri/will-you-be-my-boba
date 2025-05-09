import { Type } from "@google/genai";

export const openAddBobaModalFunctionDeclaration = {
  name: "open_add_boba_modal",
  description: "Open the add boba modal",
  parameters: {
    type: Type.OBJECT,
    properties: {
      page: {
        type: Type.STRING,
        description: "The page currently open",
      },
    },
    required: ["page"],
  },
};

export const openAddBobaModal = (page: string) => {
  // Return a special response that the client can use to trigger the modal
  if (page !== "home") {
    return "Wrong page! Must be home page";
  }
  return { action: "OPEN_ADD_BOBA_MODAL" };
};
