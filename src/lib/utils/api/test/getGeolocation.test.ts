import { getGeolocation } from "../getGeolocation";
import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getGeolocation", () => {
  it("should call the geolocation API with the correct parameters", async () => {
    // Mock the API response
    const mockResponse = {
      data: {
        success: true,
        location: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    // Call the function
    const result = await getGeolocation("San Francisco");

    // Verify the API was called correctly
    expect(mockedAxios.post).toHaveBeenCalledWith("/api/google/geolocation", {
      location: "San Francisco",
    });

    // Verify the response
    expect(result).toEqual(mockResponse.data);
  });
});
