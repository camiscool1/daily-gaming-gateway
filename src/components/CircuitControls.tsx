import React from 'react';
import { Button } from '@/components/ui/button';
import { Timer, TimerOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CircuitControlsProps {
  timerRunning: boolean;
  elapsedTime: number;
  formattedTime: string;
  onToggleTimer: () => void;
}

const CircuitControls: React.FC<CircuitControlsProps> = ({
  timerRunning,
  elapsedTime,
  formattedTime,
  onToggleTimer
}) => {
  return (
    <div className="space-y-6">
      {timerRunning && (
        <div className="mb-6">
          <div className="text-3xl font-mono text-center mb-2">
            {formattedTime}
          </div>
          <Progress value={100} className="h-2" />
        </div>
      )}
      
      <div className="pt-4 flex justify-center">
        <Button 
          size="lg" 
          className={`gap-2 text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300 ${timerRunning ? 'bg-destructive hover:bg-destructive/90' : ''}`}
          onClick={onToggleTimer}
        >
          {timerRunning ? (
            <>
              <TimerOff className="w-5 h-5" />
              Stop Timer
            </>
          ) : (
            <>
              <Timer className="w-5 h-5" />
              Start Timer
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CircuitControls;
