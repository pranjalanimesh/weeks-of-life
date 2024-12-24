"use client"

import { useState, useEffect } from 'react';
import SelectionComponent from '@/components/selection/page';
import WeeksComponent from '@/components/weeks/page'

const Home = () => {
  const [dob, setDob] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [weeksLife, setWeeksLife] = useState<number[][]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showWeeks, setShowWeeks] = useState(false);

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
    {!showWeeks &&
    <>
    <SelectionComponent dob={dob} setDob={setDob} age={age} setAge={setAge} isClient={isClient} setIsClient={setIsClient}/>
    <button onClick={() => setShowWeeks(!showWeeks)} className='p-3 m-2 w-1/4 text-base bg-blue-500 text-white rounded-md'>Show Weeks</button>
    </>
    }
    {showWeeks && <WeeksComponent weeksLife={weeksLife}/>}
    </div>
    </div>
  );
};

export default Home;
