import { useEffect, useState } from "react";

export const useTimer = (seconds, paused) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isTicking, setIsTicking] = useState(false);

  useEffect(() => {
    if (!isTicking || timeLeft === 0 || paused) return;

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [isTicking, timeLeft, paused]);

  const restart = () => {
    setTimeLeft(seconds);
    setIsTicking(true);
  };

  const isRunning = isTicking && timeLeft > 0;
  const isOver = isTicking && timeLeft === 0;

  return { timeLeft, isRunning, isOver, restart };
};
