
import React from 'react';
import { Check, X, Timer, Trophy, Copy, X as CloseIcon, Calendar } from 'lucide-react';
import { GameType } from '@/lib/games';
import { GameResults } from './CircuitResults';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface CircuitSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formattedTime: string;
  games: GameType[];
  results: GameResults;
}

const CircuitSummary: React.FC<CircuitSummaryProps> = ({
  open,
  onOpenChange,
  formattedTime,
  games,
  results
}) => {
  const { toast } = useToast();
  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');
  
  const completedCount = Object.values(results).filter(r => r === 'completed').length;
  const completionRate = (completedCount / games.length) * 100;
  
  const generateShareableText = () => {
    return `Daily Circuit (${formattedDate}): ${completedCount}/${games.length} games completed in ${formattedTime}! See if you can beat my time, play at: ${window.location.origin}/daily-circuit`;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateShareableText())
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Share your results with friends",
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
        });
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-primary" />
            Circuit Complete!
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm mt-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>
            <div className="text-lg font-mono font-semibold mt-2">
              {formattedTime}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <h4 className="font-semibold text-lg text-center">Your Results</h4>
          
          <div className="flex justify-center gap-6 mb-8">
            {games.map((game) => {
              const isCompleted = results[game.id] === 'completed';
              return (
                <div
                  key={game.id}
                  className="flex flex-col items-center"
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-green-600 dark:text-green-500" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 dark:text-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-center w-20 overflow-hidden text-ellipsis">
                    {game.title}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <div className="text-lg font-semibold">
              {completedCount} of {games.length} Games Completed
            </div>
            <div className="text-sm text-muted-foreground">
              {completionRate.toFixed(0)}% Completion Rate
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button onClick={copyToClipboard} variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              Copy Result
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircuitSummary;
