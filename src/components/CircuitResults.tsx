
import React from 'react';
import { Check, X, Timer } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GameType } from '@/lib/games';

export type GameResult = 'completed' | 'failed' | undefined;

export interface GameResults {
  [gameId: string]: GameResult;
}

interface CircuitResultsProps {
  isOpen: boolean;
  elapsedTime: number;
  formattedTime: string;
  games: GameType[];
  results: GameResults;
  onResultChange: (gameId: string, result: GameResult) => void;
  onSubmit: () => void;
  allResultsSelected: boolean;
}

const CircuitResults: React.FC<CircuitResultsProps> = ({
  isOpen,
  elapsedTime,
  formattedTime,
  games,
  results,
  onResultChange,
  onSubmit,
  allResultsSelected
}) => {
  const completedCount = Object.values(results).filter(r => r === 'completed').length;

  // Create a local check for all results
  const hasAllResults = games.every(game => 
    results[game.id] === 'completed' || results[game.id] === 'failed'
  );

  // Use either the prop or our local check (belt and suspenders approach)
  const isSubmitEnabled = allResultsSelected || hasAllResults;

  // Debug logs
  console.log('CircuitResults - allResultsSelected (prop):', allResultsSelected);
  console.log('CircuitResults - hasAllResults (local):', hasAllResults);
  console.log('CircuitResults - isSubmitEnabled:', isSubmitEnabled);
  console.log('CircuitResults - Current results:', results);
  console.log('CircuitResults - Games:', games.map(g => g.id));

  return (
    <Collapsible open={isOpen} className="w-full mt-6">
      <CollapsibleContent className="animate-fade-in space-y-6 pt-4 pb-2">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-1">Your Circuit Results</h3>
          <div className="flex items-center justify-center text-lg gap-2">
            <Timer className="w-5 h-5 text-primary" />
            <span className="font-mono font-semibold">{formattedTime}</span>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h4 className="text-xl font-semibold mb-4">How did you do?</h4>
          <p className="text-muted-foreground mb-6">
            Select whether you completed or failed each game in your circuit:
          </p>

          <div className="space-y-6">
            {games.map((game) => (
              <div key={game.id} className="pb-4 border-b last:border-0">
                <div className="font-medium mb-3">{game.title}</div>
                <RadioGroup
                  value={results[game.id]}
                  onValueChange={(value) => onResultChange(game.id, value as GameResult)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id={`completed-${game.id}`} />
                    <Label htmlFor={`completed-${game.id}`} className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-600" />
                      Completed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="failed" id={`failed-${game.id}`} />
                    <Label htmlFor={`failed-${game.id}`} className="flex items-center gap-1">
                      <X className="w-4 h-4 text-red-600" />
                      Failed
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={onSubmit} 
              disabled={!isSubmitEnabled}
              className="gap-2"
            >
              View Summary
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CircuitResults;
