
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GameType } from '@/lib/games';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useCircuitTimer } from '@/hooks/useCircuitTimer';
import { usePopupBlocker } from '@/hooks/usePopupBlocker';
import { useGameResults } from '@/hooks/useGameResults';
import { useGameWindows } from '@/hooks/useGameWindows';

import PopupBlockerDialog from '@/components/PopupBlockerDialog';
import CircuitGamesList from '@/components/CircuitGamesList';
import CircuitControls from '@/components/CircuitControls';
import CircuitResults from '@/components/CircuitResults';
import CircuitSummary from '@/components/CircuitSummary';

interface CircuitContainerProps {
  games: GameType[];
}

const CircuitContainer: React.FC<CircuitContainerProps> = ({ games }) => {
  const [showResults, setShowResults] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { toast } = useToast();
  
  const { popupDialogOpen, setPopupDialogOpen, checkPopupBlocker } = usePopupBlocker();
  const { gameResults, allResultsSelected, handleResultChange, areAllResultsSelected } = useGameResults(games);
  const { openAllGamesInTabs } = useGameWindows();
  
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
      
      // Show results section
      setShowResults(true);
    }
  });
  
  const toggleTimer = () => {
    if (!timerRunning) {
      // Check if popups are allowed
      if (!checkPopupBlocker()) {
        return;
      }
      
      // Start the timer
      startTimer();
      openAllGamesInTabs(games);
    } else {
      // Stop the timer
      stopTimer();
    }
  };

  const handleSubmitResults = () => {
    // Use both the hook state and a direct check
    const canShowSummary = allResultsSelected || areAllResultsSelected();
    
    console.log("Submit results - allResultsSelected:", allResultsSelected);
    console.log("Submit results - areAllResultsSelected():", areAllResultsSelected());
    console.log("Submit results - canShowSummary:", canShowSummary);
    
    if (canShowSummary) {
      setSummaryOpen(true);
    } else {
      toast({
        title: "Please complete all results",
        description: "Please select a result for each game before submitting.",
        variant: "destructive"
      });
    }
  };

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
