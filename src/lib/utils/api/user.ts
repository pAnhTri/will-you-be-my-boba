import axios from "axios";

export const updateUsername = async (supabaseId: string, username: string) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${encodeURIComponent(
        supabaseId
      )}`,
      { username }
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const updateFavoriteShop = async (
  supabaseId: string,
  shopId: string,
  operation: "add" | "remove"
) => {
  try {
    const { data } = await axios.put(
      `/api/user/${encodeURIComponent(supabaseId)}/${encodeURIComponent(shopId)}`,
      { operation }
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const getUser = async (supabaseId: string) => {
  try {
    const { data } = await axios.get(
      `/api/user/${encodeURIComponent(supabaseId)}`
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};
