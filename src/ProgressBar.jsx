import React, { useEffect, useState } from "react";
const ProgressBar = ({ timeLeft, totalTime }) => {
    const [width, setWidth] = useState(100);
    useEffect(() => {
        const percentage = (timeLeft / totalTime) * 100;
        setWidth(percentage);
      }, [timeLeft, totalTime]);
      return (
        <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${width}%` }}
          />
        </div>
      );
    };
    export default ProgressBar;
