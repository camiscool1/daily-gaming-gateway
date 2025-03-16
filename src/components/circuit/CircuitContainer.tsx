import React, { useState } from 'react';
import { AlertCircle, Info } from 'lucide-react';
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
import CircuitInstructions from '@/components/CircuitInstructions';
import { Button } from '@/components/ui/button';

interface CircuitContainerProps {
  games: GameType[];
}

const CircuitContainer: React.FC<CircuitContainerProps> = ({ games }) => {
  const [showResults, setShowResults] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
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
      
      setShowResults(true);
    }
  });
  
  const toggleTimer = () => {
    if (!timerRunning) {
      if (!checkPopupBlocker()) {
        return;
      }
      
      startTimer();
      openAllGamesInTabs(games);
    } else {
      stopTimer();
    }
  };

  const handleSubmitResults = () => {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Today's Circuit</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={() => setInstructionsOpen(true)}
          >
            <Info className="h-4 w-4" />
            How It Works
          </Button>
        </div>
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

          <CircuitInstructions
            open={instructionsOpen}
            onOpenChange={setInstructionsOpen}
          />
        </div>
      </div>
      
      <PopupBlockerDialog 
        open={popupDialogOpen} 
        onOpenChange={setPopupDialogOpen} 
      />
    </div>
  );
};

export default CircuitContainer;
