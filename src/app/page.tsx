"use client"
import React from 'react';
import UserIDComponent from '@/presentation/components/UserID/UserIDComponent';
import UserPage from '@/presentation/Pages/UserPage';

const handleClick = () => {
  console.log("Button clicked");
};

const Home = () => {
  return (
    <div className='m-2'>
      <UserIDComponent/>
      <UserPage/>
    </div>
  )
}

export default Home;
