
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GameType } from '@/lib/games';
import { GameResults } from '@/components/CircuitResults';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useCircuitTimer } from '@/hooks/useCircuitTimer';
import PopupBlockerDialog from '@/components/PopupBlockerDialog';
import CircuitGamesList from '@/components/CircuitGamesList';
import CircuitControls from '@/components/CircuitControls';
import CircuitResults from '@/components/CircuitResults';
import CircuitSummary from '@/components/CircuitSummary';

interface CircuitContainerProps {
  games: GameType[];
}

const CircuitContainer: React.FC<CircuitContainerProps> = ({ games }) => {
  const [popupDialogOpen, setPopupDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [gameResults, setGameResults] = useState<GameResults>({});
  const { toast } = useToast();
  
  const { 
    timerRunning, 
    elapsedTime, 
    formatTime, 
    startTimer, 
    stopTimer 
  } = useCircuitTimer({
    onTimerStop: (elapsed) => {
      toast({
        title: "Circuit Complete!",
        description: `Your time: ${formatTime(elapsed)}`,
      });
      
      // Initialize results when timer stops
      const initialResults: GameResults = {};
      games.forEach(game => {
        initialResults[game.id] = undefined;
      });
      setGameResults(initialResults);
      
      // Show results section
      setShowResults(true);
    }
  });
  
  const toggleTimer = () => {
    if (!timerRunning) {
      // Start the timer
      startTimer();
      openAllGamesInTabs();
    } else {
      // Stop the timer
      stopTimer();
    }
  };
  
  const openAllGamesInTabs = () => {
    // First, try to open a test popup to check if popups are allowed
    const testPopup = window.open('about:blank', '_blank');
    
    if (!testPopup || testPopup.closed || typeof testPopup.closed === 'undefined') {
      // Popup was blocked
      toast({
        title: "Popup Blocker Detected",
        description: "We couldn't open all games because popups are blocked. Please allow popups for this site.",
        variant: "destructive",
      });
      
      // Show the popup help dialog
      setPopupDialogOpen(true);
      
      // Don't start the timer if we can't open games
      stopTimer();
      return;
    }
    
    // Close the test popup if it was successfully opened
    testPopup.close();
    
    // Open all daily games in separate tabs
    let allOpened = true;
    
    games.forEach((game, index) => {
      // Add a small delay between each window.open to avoid triggering popup blockers
      setTimeout(() => {
        const gameWindow = window.open(game.url, '_blank', 'noopener,noreferrer');
        if (!gameWindow) {
          allOpened = false;
        }
      }, index * 300);
    });
    
    // Show success message
    toast({
      title: "Games Opened",
      description: "All games should now be opening in new tabs. The timer has started!",
    });
  };

  const handleResultChange = (gameId: string, result: GameResults[string]) => {
    setGameResults(prev => ({
      ...prev,
      [gameId]: result
    }));
  };

  const handleSubmitResults = () => {
    setSummaryOpen(true);
  };

  // Check if all game results have been selected
  const allResultsSelected = games.every(game => 
    gameResults[game.id] === 'completed' || gameResults[game.id] === 'failed'
  );

  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      <div className="p-6 bg-card rounded-xl border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Today's Circuit</h2>
        <p className="text-muted-foreground mb-6">
          These games were randomly selected for today. A new set will be available tomorrow!
        </p>
        
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This feature requires popup windows to be enabled in your browser.
            If games don't open, please allow popups for this site.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-6">
          <CircuitGamesList games={games} />
          
          <CircuitControls
            timerRunning={timerRunning}
            elapsedTime={elapsedTime}
            formattedTime={formatTime(elapsedTime)}
            onToggleTimer={toggleTimer}
          />

          <CircuitResults 
            isOpen={showResults}
            elapsedTime={elapsedTime}
            formattedTime={formatTime(elapsedTime)}
            games={games}
            results={gameResults}
            onResultChange={handleResultChange}
            onSubmit={handleSubmitResults}
            allResultsSelected={allResultsSelected}
          />

          <CircuitSummary
            open={summaryOpen}
            onOpenChange={setSummaryOpen}
            formattedTime={formatTime(elapsedTime)}
            games={games}
            results={gameResults}
          />
        </div>
      </div>
      
      {/* Popup Help Dialog */}
      <PopupBlockerDialog 
        open={popupDialogOpen} 
        onOpenChange={setPopupDialogOpen} 
      />
    </div>
  );
};

export default CircuitContainer;
