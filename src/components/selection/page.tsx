"use client"

import { useState, useEffect } from 'react';

const Page = ({
    dob,
    setDob,
    age,
    setAge,
    isClient,
    setIsClient
} : {
    dob: string,
    setDob: (dob: string) => void,
    age: number | string,
    setAge: (age: number | string) => void,
    isClient: boolean,
    setIsClient: (isClient: boolean) => void
}) => {

  useEffect(() => {
    const savedDob = localStorage.getItem('dob');
    const savedAge = localStorage.getItem('age');
    if (savedDob) setDob(savedDob);
    if (savedAge) setAge(savedAge);
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('dob', dob);
      localStorage.setItem('age', age.toString());
    }
  }, [dob, age, isClient]);

  return (
    <div className='w-full mx-auto'>
    <div className="p-5 font-sans flex flex-col items-center">
      <h1 className='flex justify-center items-center'>Your Life in Weeks</h1>
      <div className="flex w-full justify-center">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
          className="p-3 m-2 w-1/4 text-base"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Expected Age"
          className="p-3 m-2 w-1/4 text-base"
          max="100"
          min="1"
        />
      </div>
    </div>
    </div>
  );
};

export default Page;