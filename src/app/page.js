"use client";
import { useEffect } from 'react';
import HomePage from "../components/homepage/homepage";

const Home = () => {
  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_AUDIO_API_URL}/dummy`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Dummy API response:', data);
        
      })
      .catch((err) => console.error('Error calling dummy API:', err));
  }, []);

  return (
    <HomePage/>
  );
}

export default Home;