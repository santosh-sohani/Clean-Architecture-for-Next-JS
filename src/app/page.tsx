"use client"
import React from 'react';
import { Button } from '@/presentation/components/Button/Button';
import UsersPage from '../presentation/Pages/UsersPage'

const handleClick = () => {
  console.log("Button clicked");
};

const Home = () => {
  return (
    <div className='m-2'>
      <UsersPage/>
    </div>
  )
}

export default Home;
