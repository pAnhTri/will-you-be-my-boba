export type SearchResult = {
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
};
