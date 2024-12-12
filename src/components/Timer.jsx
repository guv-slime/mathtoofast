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
    <div className="timer font-expose text-4xl absolute -rotate-12 z-10 text-white bg-black/80 w-64 text-center p-4">
      Time Left: {timeLeft}s
    </div>
  );
}

export default Timer;
