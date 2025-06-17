import React, { useEffect, useState } from "react";

const CountDown = ({ expireDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, sec: 0});
  useEffect(() => {
    const expire = new Date(expireDate).getTime();
    const interval = setInterval(() => {
      const today = new Date().getTime();
      const diff = expire - today;
      if (diff < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000*60*60*24))
      const hours = Math.floor((diff %(1000*60*60*24)) / (1000*60*60))
      const mins = Math.floor((diff %(1000*60*60)) / (1000*60))
      const sec = Math.floor((diff %(1000*60)) / 1000)
     setTimeLeft({days, hours,mins,sec})
    }, 1000);
        return () => clearInterval(interval);
  }, [expireDate]);
  return (
  <div>
{/* For TSX uncomment the commented types below */}
<div className="grid grid-flow-col gap-1 text-center auto-cols-max text-red-400 text-lg lg:text-xl">
  <div className="flex flex-col">
    <span className="countdown">
      <span style={{"--value": timeLeft.days } /* as React.CSSProperties */ } aria-live="polite" aria-label={timeLeft.days}> {timeLeft.days} </span> 
      :
    </span>
  </div>
  
  <div className="flex flex-col">
    <span className="countdown">
      <span style={{"--value": timeLeft.hours } /* as React.CSSProperties */ } aria-live="polite" aria-label={timeLeft.hours}> {timeLeft.hours} </span>
      :
    </span>
  </div>
  
  <div className="flex flex-col">
    <span className="countdown">
      <span style={{"--value": timeLeft.mins } /* as React.CSSProperties */ } aria-live="polite" aria-label={timeLeft.mins}> {timeLeft.mins} </span>
      :
    </span>
  </div>
  
<div className="flex flex-col">
    <span className="countdown">
      <span style={{"--value": timeLeft.sec } /* as React.CSSProperties */ } aria-live="polite" aria-label={timeLeft.sec}> {timeLeft.sec} </span>
    </span>
  </div>
</div>
  </div>
  );
};

export default CountDown;
