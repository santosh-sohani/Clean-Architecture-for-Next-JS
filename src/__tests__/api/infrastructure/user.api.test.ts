import axios from "axios";
import {fecthUsersFromApi} from '@/infrastructure/api/user.api';
import { userDetailsModel } from "@/domain/models/user.model";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fecthUsersFromApi', () => {
    test('should return an array of users', async () => {
        const expectedUsers: userDetailsModel[] = [
            {
              id: 1,
              name: 'Leanne Graham',
              username: 'Bret',
              email: 'lZsF1@example.com', 
              address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                  lat: '-37.3159',
                  lng: '81.1496',
                },
              },
              phone: '1-770-736-8031 x56442',
              website: 'hildegard.org',
              company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets',
              },
            },
          ];
          
        mockedAxios.get.mockResolvedValue({ data: expectedUsers });
        const result = await fecthUsersFromApi();
        expect(result).toEqual(expectedUsers);
    });

    test('should throw an error if the API call fails', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Failed to fetch users'));
        await expect(fecthUsersFromApi()).rejects.toThrow('Failed to fetch users');
    })
})
