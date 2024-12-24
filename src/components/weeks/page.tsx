"use client";

import { useState, useEffect } from "react";

interface PageProps {
    weeksLife: number[][];
}

const Page = ({ weeksLife }: PageProps) => {
    return (
        <div>
            <h1>{`${
                100 -
                Math.round(
                    (weeksLife.flat().filter((week) => week === 1).length /
                        weeksLife.flat().length) *
                        100
                )
            }% life remaining`}</h1>

            {weeksLife.length > 0 && (
                <div className="grid grid-cols-52 gap-1 mt-5">
                    {weeksLife.map((year, yearIndex) => (
                        <div key={yearIndex} className="flex">
                            {year.map((week, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className={`w-5 h-5 m-[0.1rem] border-black border-2 ${
                                        week ? "bg-black" : "bg-gray-200"
                                    } ${weekIndex % 4 === 3 ? "mr-2" : ""}`}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;
