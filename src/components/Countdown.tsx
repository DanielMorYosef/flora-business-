import { useState, useEffect } from 'react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 11,
    minutes: 7,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-1.5 md:gap-4 my-4" dir="ltr">
      {[
        { label: 'ימים', value: timeLeft.days },
        { label: 'שעות', value: timeLeft.hours },
        { label: 'דקות', value: timeLeft.minutes },
        { label: 'שניות', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="glass-card w-12 h-16 md:w-16 md:h-20 rounded-xl flex items-center justify-center text-xl md:text-3xl font-bold text-gray-800">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="text-[10px] md:text-sm mt-2 text-gray-600 font-sans font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
