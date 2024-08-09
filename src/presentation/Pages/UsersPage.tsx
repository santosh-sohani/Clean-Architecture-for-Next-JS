import React, { useState, useEffect } from 'react';
import { userDetailsModel,userResponseModel} from '@/domain/models/user.model';
import { getUsers } from '@/applications/usecase/getUsers';
import ContentLoader from 'react-content-loader';

const CardPage = () => {
  const [users, setUsers] = useState<userResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
          try {
            const fetchedUsers = await getUsers();            
            setUsers(fetchedUsers);
          } catch (error) {
            setError('Failed to fetch users');
          } finally {
            setLoading(false);
          }
    };

    fetchData()
  },[])


  return (
    <>
      <div className='flex flex-wrap p-4 gap-4'>
        {loading ? (
          <ContentLoader>
            <rect x='0' y='0' rx='5' ry='5' width='300' height='200' />
          </ContentLoader>
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.map((user) => (
            <div
              key={user.USERID}
              className='border border-gray-300 bg-blue-100 rounded-md shadow-sm p-3 w-full md:w-1/3 lg:w-1/4 text-gray-700'
            >
              <p><strong>ID:</strong> {user.USERID}</p>
              <p><strong>Name:</strong> {user.USERNAME}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CardPage;
