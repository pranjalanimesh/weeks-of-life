"use client"

import { useState, useEffect } from 'react';
import SelectionComponent from '@/components/selection/page';
import WeeksComponent from '@/components/weeks/page'

const Home = () => {
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

  useEffect(() => {
    if (dob && age) {
      const birthDate = new Date(dob);
      const expectedAge = Number(age);
      const currentDate = new Date();

      const totalWeeksInLife = 52 * expectedAge;
      const weeksLived = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 3600 * 24 * 7));

      console.log(totalWeeksInLife, weeksLived);

      const weeksGrid: number[][] = [];
      for (let year = 0; year < expectedAge; year++) {
        const yearWeeks: number[] = [];
        for (let week = 0; week < 52; week++) {
          const totalWeeksPassed = year * 52 + week;
          yearWeeks.push(totalWeeksPassed < weeksLived ? 1 : 0);
        }
        weeksGrid.push(yearWeeks);
      }

      setWeeksLife(weeksGrid);
    }
  }, [dob, age]);
  return (
    <div className='w-full sm:w-1/2 mx-auto'>
    <div className="p-5 font-sans flex flex-col items-center">
    <SelectionComponent/>
    <WeeksComponent weeksLife={weeksLife}/>
    </div>
    </div>
  );
};

export default Home;
