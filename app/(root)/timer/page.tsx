"use client"
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Calculate the target time (25 minutes into the future)
    const target = new Date();
    target.setMinutes(target.getMinutes() + 25);

    // Update the countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      // Calculate days, hours, minutes, and seconds remaining
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      // Update state variables
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      // Check if the countdown has reached zero
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
        clearInterval(interval); // Stop the interval when countdown reaches zero
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md w-screen items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 ">Countdown Timer</h2>
      <div className="flex items-center">
        <div className="flex flex-col items-center justify-center mr-8">
          <div className="text-4xl font-bold">{minutes}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">{seconds}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
