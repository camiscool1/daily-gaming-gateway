
import React from 'react';
import { Check, X, Timer, Trophy, Copy, X as CloseIcon, Share2 } from 'lucide-react';
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

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
  
  const completedCount = Object.values(results).filter(r => r === 'completed').length;
  const completionRate = (completedCount / games.length) * 100;
  
  const generateShareableText = () => {
    const date = new Date().toLocaleDateString();
    return `Daily Circuit (${date}): ${completedCount}/${games.length} games completed in ${formattedTime}! Check out my results at: ${window.location.href}`;
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-primary" />
            Circuit Complete!
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="text-lg font-mono font-semibold mt-2">
              {formattedTime}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <h4 className="font-semibold text-lg text-center">Your Results</h4>
          
          <div className="flex justify-center gap-3">
            {games.map((game) => {
              const isCompleted = results[game.id] === 'completed';
              return (
                <div
                  key={game.id}
                  className={`relative flex items-center justify-center rounded-full p-2 ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                  title={`${game.title}: ${isCompleted ? 'Completed' : 'Failed'}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 dark:text-red-500" />
                  )}
                  <div className="absolute -bottom-6 text-xs whitespace-nowrap overflow-hidden max-w-12 text-ellipsis text-center">
                    {game.title.split(' ')[0]}
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
          
          <div className="flex justify-center mt-6 gap-3">
            <Button onClick={copyToClipboard} variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              Copy Result
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-72">
                <div className="space-y-2">
                  <h4 className="font-medium">Share your results</h4>
                  <p className="text-sm text-muted-foreground">
                    Copy this text to share your Daily Circuit results with friends.
                  </p>
                  <div className="bg-muted p-2 rounded-md text-xs">
                    {generateShareableText()}
                  </div>
                  <Button size="sm" onClick={copyToClipboard} className="w-full gap-2 mt-2">
                    <Copy className="w-3 h-3" />
                    Copy to clipboard
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircuitSummary;
