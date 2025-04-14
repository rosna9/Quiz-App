import React, { useState, useEffect } from "react";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      // Auto-submit or go to next question here
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <div className="text-lg">{timeLeft} seconds remaining</div>;
};

export default Timer;
