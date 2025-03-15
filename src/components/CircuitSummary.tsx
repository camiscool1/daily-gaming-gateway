
import React from 'react';
import { Check, X, Timer, Trophy } from 'lucide-react';
import { GameType } from '@/lib/games';
import { GameResults } from './CircuitResults';

interface CircuitSummaryProps {
  show: boolean;
  formattedTime: string;
  games: GameType[];
  results: GameResults;
}

const CircuitSummary: React.FC<CircuitSummaryProps> = ({
  show,
  formattedTime,
  games,
  results
}) => {
  if (!show) return null;

  const completedCount = Object.values(results).filter(r => r === 'completed').length;
  const completionRate = (completedCount / games.length) * 100;

  return (
    <div className="animate-fade-in space-y-6 mt-8 bg-card border rounded-lg p-6">
      <div className="flex flex-col items-center mb-4">
        <Trophy className="w-12 h-12 text-primary mb-2" />
        <h3 className="text-2xl font-bold">Circuit Complete!</h3>
        <div className="text-lg font-mono font-semibold mt-2">
          {formattedTime}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-lg">Your Results</h4>
        
        <div className="flex justify-center gap-2">
          {games.map((game) => {
            const isCompleted = results[game.id] === 'completed';
            return (
              <div
                key={game.id}
                className={`relative flex items-center justify-center rounded-full p-2 ${
                  isCompleted ? 'bg-green-100' : 'bg-red-100'
                }`}
                title={`${game.title}: ${isCompleted ? 'Completed' : 'Failed'}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <div className="text-lg font-semibold">
            {completedCount} of {games.length} Games Completed
          </div>
          <div className="text-sm text-muted-foreground">
            {completionRate}% Completion Rate
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSummary;
