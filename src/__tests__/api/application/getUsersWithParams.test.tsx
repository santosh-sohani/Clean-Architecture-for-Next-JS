import axios from "axios";
import { getUserWithParam } from "@/applications/usecase/getUsersWithParam";
import { userDetailsModel } from "@/domain/models/user.model";

jest.mock("axios");

describe("getUserWithParam", () => {
    it('fetches user details from API with correct ID', async () => {
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
              }
        ];

        // Simulate a successful API call without hitting the actual API
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });


        // Call the function to test it (axios.get is mocked, so no real API call)
        const result = await getUserWithParam(1);

        expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/users/?id=1`);
        expect(result).toEqual(mockResponse);
    })

    

    it('throws an error when the API call fails', async () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        // Simulate a failed API call without hitting the actual API
        mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
        // Expect the function to throw an error due to the mocked failure
        await expect(getUserWithParam(1)).rejects.toThrow('Failed to fetch user with id: 1');
    })

})
