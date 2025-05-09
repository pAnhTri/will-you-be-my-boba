import { Content, GenerateContentConfig, GoogleGenAI } from "@google/genai";
import {
  getNumberOfDrinks,
  getNumberOfDrinksFunctionDeclaration,
  getNumberOfFlavors,
  getNumberOfFlavorsFunctionDeclaration,
  prefillBobaForm,
} from "@/lib/ai/tools";
import { NextRequest, NextResponse } from "next/server";
import {
  openAddBobaModal,
  openAddBobaModalFunctionDeclaration,
  prefillBobaFormFunctionDeclaration,
} from "@/lib/ai/tools";

const functionDeclarations = [
  getNumberOfDrinksFunctionDeclaration,
  openAddBobaModalFunctionDeclaration,
  getNumberOfFlavorsFunctionDeclaration,
  prefillBobaFormFunctionDeclaration,
];

// Initial config for tool usage
const initialConfig: GenerateContentConfig = {
  tools: [
    {
      functionDeclarations,
    },
  ],
  systemInstruction: `
    1. When calling for the prefill boba form tool:
        - Predict the sweetness level of the boba based on the name of the boba, choosing between Low, Medium, and High
        - Predict a list of flavors that are relevant based on the name of the boba
        - Avoid using the word "tea" in the list of flavors
        - Avoid flavors that describe the boba, such as "boba", "pearls", "tapioca", etc.
        - Return the list of flavors in a comma separated list of keywords in the format of
        - Capitalize the first letter of each flavor, e.g. "Brown Sugar"
        - If you cannot generate a list of flavors, return an empty array
  `,
};

// Final config for whimsical responses
const finalConfig: GenerateContentConfig = {
  tools: [
    {
      functionDeclarations,
    },
  ],
  systemInstruction: `
  You are Alex, a magical axolotl boba wizard. You are whimsical, charming, and a boba connoisseur. You have the following rules:

  1. If you see a function result:
     - Respond ONLY with the result in a whimsical, axolotl-like way
     - Make it sound magical and boba-themed
     - AVOID additional commentary

  2. If you don't see a function result:
     - Respond in character, denying the question
     - Lead the deny response into a bulleted list of tools available to you
     - AVOID explicitly stating the function call names

  3. If the function result includes the wrong page, respond first that the user has to navigate to the correct page
  `,
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (request: NextRequest) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize contents with user message
    const contents: Content[] = [
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // First call - get tool usage
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: initialConfig,
    });

    console.log(response);

    const tool_call = response.functionCalls?.[0];
    let result = null;

    if (tool_call) {
      const function_name = tool_call.name;

      if (function_name === "get_number_of_drinks") {
        result = await getNumberOfDrinks();
      } else if (function_name === "open_add_boba_modal") {
        result = openAddBobaModal(tool_call.args?.page as string);
      } else if (function_name === "get_number_of_flavors") {
        result = await getNumberOfFlavors();
      } else if (function_name === "prefill_boba_form") {
        result = await prefillBobaForm(
          tool_call.args?.page as string,
          tool_call.args?.name as string,
          tool_call.args?.flavors as string[],
          tool_call.args?.sweetnessLevel as string
        );
      }
    }

    // Create a function response part
    const function_response_part = {
      name: tool_call?.name,
      response: { result },
    };

    // Append function call and result of the function execution to contents
    if (tool_call) {
      contents.push({ role: "model", parts: [{ functionCall: tool_call }] });
      contents.push({
        role: "user",
        parts: [{ functionResponse: function_response_part }],
      });
    }

    // Final call - get whimsical response
    const final_response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: finalConfig,
    });

    return NextResponse.json({
      response: final_response.text,
      result: result,
    });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
