"use client";
import React, { useState, useEffect } from 'react';
import { userDetailsModel } from '@/domain/models/user.model';
import { getUserWithParam } from '@/applications/usecase/getUsersWithParam';
import ContentLoader from 'react-content-loader';

const UserPage = () => {
  const [user, setUser] = useState<userDetailsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await getUserWithParam(1);
        setUser(fetchedUser);
      } catch (error) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='flex flex-wrap p-4 gap-4'>
      {loading ? (
        <ContentLoader
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='5' ry='5' width='300' height='200' />
        </ContentLoader>
      ) : error ? (
        <p>{error}</p>
      ) : (
        user.map((user,index) => (
            <div
              key={index}
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
  );
}

export default UserPage;
