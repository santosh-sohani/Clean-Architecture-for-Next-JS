import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";
import { getUsers } from "@/applications/usecase/getUsers";

jest.mock("axios");

describe("getUsers", () => {
    it("fetches user details from API", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockResponse: userDetailsModel[] = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Apt. 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              },
              {
                "id": 2,
                "name": "John Cena",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Apt. 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              }
        ]

        // Simulate a successful API call without hitting the actual API
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

        // Call the function to test it (axios.get is mocked, so no real API call)
        const result = await getUsers();
        expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
        expect(result).toEqual(mockResponse);
    })

    it("throws an error when the API call fails", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
        await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    })

    it("response length should be 2", async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockResponse: userDetailsModel[] = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Apt. 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              },
              {
                "id": 2,
                "name": "John Cena",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                  "street": "Kulas Light",
                  "suite": "Apt. 556",
                  "city": "Gwenborough",
                  "zipcode": "92998-3874",
                  "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                  }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                  "name": "Romaguera-Crona",
                  "catchPhrase": "Multi-layered client-server neural-net",
                  "bs": "harness real-time e-markets"
                }
              }
        ]

        // Simulate a successful API call without hitting the actual API
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

        const result = await getUsers();
        expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
        expect(result).toHaveLength(2);
    })

})