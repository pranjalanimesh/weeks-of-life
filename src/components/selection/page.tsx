"use client"

import { useState, useEffect } from 'react';

const Page = () => {
  const [dob, setDob] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [weeksLife, setWeeksLife] = useState<number[][]>([]);
  const [isClient, setIsClient] = useState(false);

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
    <div className='w-full sm:w-1/2 mx-auto'>
    <div className="p-5 font-sans flex flex-col items-center">
    <div className="flex gap-3">
      <h1 className='flex justify-center items-center'>Your Life in Weeks</h1>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
          className="p-3 m-2 text-base"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Expected Age"
          className="p-3 m-2 text-base"
        />
      </div>
    </div>
    </div>
  );
};

export default Page;