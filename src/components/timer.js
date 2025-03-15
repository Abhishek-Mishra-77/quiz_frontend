import React, { useState, useEffect } from 'react';

function Timer() {
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          // Timer has reached 0
        } else {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [minutes, seconds]);

  // Format the timer to display MM:SS
  const formattedTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  return (
    <div className='fw-bolder p-1 text-success'>
       {formattedTime}
    </div>
  );
}

export default Timer;
