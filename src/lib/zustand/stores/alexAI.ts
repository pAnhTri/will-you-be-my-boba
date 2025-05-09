import { create } from "zustand";

interface AlexAIStore {
  isAlexAIResponseOpen: boolean;
  response: string | null;
  result: number | Record<string, unknown> | null;
  prefillBobaFormData: {
    name: string;
    flavors: string[];
    sweetnessLevel: string;
  } | null;
  setIsAlexAIResponseOpen: (isAlexAIResponseOpen: boolean) => void;
  setResponse: (response: string | null) => void;
  setResult: (result: number | Record<string, unknown> | null) => void;
  setPrefillBobaFormData: (
    data: {
      name: string;
      flavors: string[];
      sweetnessLevel: string;
    } | null
  ) => void;
}

export const useAlexAIStore = create<AlexAIStore>((set) => ({
  isAlexAIResponseOpen: false,
  response: null,
  result: null,
  prefillBobaFormData: null,
  setIsAlexAIResponseOpen: (isAlexAIResponseOpen) =>
    set({ isAlexAIResponseOpen }),
  setResponse: (response) => set({ response }),
  setResult: (result) => set({ result }),
  setPrefillBobaFormData: (data) => set({ prefillBobaFormData: data }),
}));
