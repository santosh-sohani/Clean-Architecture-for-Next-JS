"use client"
import React from 'react';
import UserIDComponent from '@/presentation/components/UserID/UserIDComponent';
import CardPage from '@/presentation/Pages/UsersPage';

const Home = () => {
  return (
      <div className='m-2'>
        <UserIDComponent/>
        <CardPage/>
      </div>
  )
}

export default Home;
