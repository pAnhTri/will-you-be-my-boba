import { z } from "zod";
import { LocationSchema } from "../lib/utils/validators";

export type Location = z.infer<typeof LocationSchema>;

export interface GooglePlace {
  id: string;
  formattedAddress: string;
  addressComponents: {
    longText: string;
    shortText: string;
    languageCode: string;
    types: string[];
  }[];
  displayName: {
    languageCode: string;
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}
