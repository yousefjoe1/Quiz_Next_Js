import React, { useState, useEffect } from 'react';

const Countdown = ({ initialNumber , onFinish }:{initialNumber:number,onFinish:Function}) => {
  const [minutes, setMinutes] = useState(initialNumber);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (minutes > 0 || seconds > 0) {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      } else {
        clearInterval(intervalId);
        if (onFinish) {
          onFinish();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function
  }, [minutes, seconds, onFinish]);

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className='className="question_num h-8 bg-teal-700 white flex justify-center items-center rounded-full"'>
      {formattedTime}
    </div>
  );
};

export default Countdown;
