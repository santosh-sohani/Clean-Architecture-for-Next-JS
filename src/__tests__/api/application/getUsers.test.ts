import { getUsers } from '@/applications/usecase/getUsers';
import { fecthUsersFromApi } from '@/infrastructure/api/user.api';
import { userDetailsModel } from '@/domain/models/user.model';

jest.mock('../../../infrastructure/api/user.api');
const mockedFetchUsersFromApi = fecthUsersFromApi as jest.MockedFunction<typeof fecthUsersFromApi>;

describe('getUsers', () => {
  it('should return users', async () => {
    const users: userDetailsModel[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Somewhere',
          zipcode: '12345',
          geo: {
            lat: '0.0000',
            lng: '0.0000',
          },
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Doe Inc',
          catchPhrase: 'Innovate and Lead',
          bs: 'business solutions',
        },
      },
    ];

    mockedFetchUsersFromApi.mockResolvedValue(users);

    const result = await getUsers();
    expect(result).toEqual(users);
  });

  it('should propagate error from infrastructure layer', async () => {
    mockedFetchUsersFromApi.mockRejectedValue(new Error('Failed to fetch users'));
    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});
