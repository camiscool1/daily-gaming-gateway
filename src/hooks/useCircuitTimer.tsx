
import { useState, useEffect } from 'react';

export interface UseCircuitTimerProps {
  onTimerStop?: (elapsedMs: number) => void;
}

export function useCircuitTimer({ onTimerStop }: UseCircuitTimerProps = {}) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStartTime, setTimerStartTime] = useState(0);

  // Timer effect - runs when timerRunning changes
  useEffect(() => {
    let timerInterval: number | undefined;
    
    if (timerRunning) {
      // Start the timer
      timerInterval = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - timerStartTime;
        setElapsedTime(elapsed);
      }, 100); // Update every 100ms for smoother display
    } else {
      // Timer is stopped
      clearInterval(timerInterval);
      if (timerStartTime > 0 && onTimerStop) {
        onTimerStop(elapsedTime);
      }
    }
    
    // Clean up on unmount or when timerRunning changes
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerRunning, timerStartTime, elapsedTime, onTimerStop]);

  const startTimer = () => {
    setTimerStartTime(Date.now());
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  // Format time as mm:ss.ms
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Get only 2 digits
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return {
    timerRunning,
    elapsedTime,
    formatTime,
    startTimer,
    stopTimer
  };
}
