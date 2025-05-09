import axios from "axios";

export const getAlexAIResponse = async (
  pathname: string,
  query: string
): Promise<{
  response: string;
  result: number | Record<string, string>;
}> => {
  const page = pathname === "/" ? "home" : pathname.slice(1);

  try {
    const { data } = await axios.post(`/api/ai`, {
      message: `We are in the ${page} page. ${query}`,
    });

    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};
