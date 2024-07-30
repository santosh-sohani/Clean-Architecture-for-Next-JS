import React, { useState, useEffect } from 'react';
import { userDetailsModel } from '@/domain/models/user.model';
import { getUsers } from '@/applications/usecase/getUsers';

import ContentLoader from 'react-content-loader';

const CardPage = () => {
  const [users, setUsers] = useState<userDetailsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
        setTimeout(async () => {
          try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
          } catch (error) {
            setError('Failed to fetch users');
          } finally {
            setLoading(false);
          }
        },2000)
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
              key={user.id}
              className='border border-gray-300 bg-blue-100 rounded-md shadow-sm p-3 w-full md:w-1/3 lg:w-1/4 text-gray-700'
            >
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CardPage;
