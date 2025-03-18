import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { List, Timer, ExternalLink, Check, Trophy, ArrowLeftRight, X } from 'lucide-react';

interface CircuitInstructionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CircuitInstructions: React.FC<CircuitInstructionsProps> = ({ 
  open, 
  onOpenChange 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <List className="h-5 w-5" />
            How the Daily Circuit Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          <p className="text-sm text-muted-foreground text-center">
            Complete all games in the fastest time possible and compare your results with friends!
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-base">Start the Timer</h3>
                <p className="text-sm text-muted-foreground">
                  Click the "Start Timer" button to begin. This will automatically open each game in a new tab.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-base">Play the Games</h3>
                <p className="text-sm text-muted-foreground">
                  Each game will open in a separate tab. Complete the games one by one at your own pace.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-base">Return to Circuit</h3>
                <p className="text-sm text-muted-foreground">
                  After completing the games, return to the Daily Circuit tab and click the "Stop Timer" button.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-base">Complete the Survey</h3>
                <p className="text-sm text-muted-foreground">
                  Mark which games you successfully completed in the results section.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-base">Share Your Results</h3>
                <p className="text-sm text-muted-foreground">
                  View your final time and completion rate, then copy your results to share them with friends.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium text-center">
              💡 New games are selected every day at midnight. Come back daily for a fresh circuit!
            </p>
          </div>
          
          <div className="flex justify-center pt-2">
            <DialogClose asChild>
              <Button>Got it!</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircuitInstructions;
