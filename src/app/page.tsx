"use client"
import React from 'react';
import { Button } from '@/presentation/components/Button/Button';

const handleClick = () => {
  console.log("Button clicked");
};

const Home = () => {
  return (
    <Button config={{ label: "Click me" }} onClick={handleClick} />
  )
}

export default Home;
