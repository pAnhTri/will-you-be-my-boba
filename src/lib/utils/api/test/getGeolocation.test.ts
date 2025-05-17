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

  it("should use geolocation API for current location", async () => {
    // Mock position data
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: () => ({}),
      },
      timestamp: Date.now(),
      toJSON: () => ({}),
    } as GeolocationPosition;

    // Create a mock for getCurrentPosition that calls the success callback
    const getCurrentPositionMock = jest.fn((success: PositionCallback) => {
      success(mockPosition);
    });

    // Replace the real geolocation with our mock
    Object.defineProperty(global.navigator, "geolocation", {
      value: { getCurrentPosition: getCurrentPositionMock },
      writable: true,
    });

    // Call the function
    const result = await getGeolocation("Current Location");

    // Verify getCurrentPosition was called with correct options
    expect(getCurrentPositionMock).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Verify the result
    expect(result).toEqual({
      success: true,
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    });
  });
});
