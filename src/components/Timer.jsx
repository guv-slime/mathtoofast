import { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer font-expose text-4xl absolute -rotate-3 z-10 text-black w-64 text-center p-4 left-1/2 -translate-x-1/2">
      Time Left: {timeLeft}s
    </div>
  );
}

export default Timer;
