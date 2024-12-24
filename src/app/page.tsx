"use client"

import { useState, useEffect } from 'react';

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
      <div>
        <h1>{`${100 - Math.round((weeksLife.flat().filter(week => week === 1).length / (weeksLife.flat().length)) * 100)}% life remaining`}</h1>
        
        {weeksLife.length > 0 && (
          <div className="grid grid-cols-52 gap-1 mt-5">
            {weeksLife.map((year, yearIndex) => (
                <div key={yearIndex} className="flex">
                {year.map((week, weekIndex) => (
                  <div
                  key={weekIndex}
                  className={`w-5 h-5 m-[0.1rem] border-black border-2 ${
                    week ? 'bg-black' : 'bg-gray-200'
                  } ${weekIndex % 4 === 3 ? 'mr-2' : ''}`}
                  ></div>
                ))}
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
