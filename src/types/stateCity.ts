export type StateCity = {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  country_id: number;
  cities: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
  }[];
};
