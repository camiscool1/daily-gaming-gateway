
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useCircuitTimer } from '@/hooks/useCircuitTimer';
import PopupBlockerDialog from '@/components/PopupBlockerDialog';
import CircuitGamesList from '@/components/CircuitGamesList';
import CircuitControls from '@/components/CircuitControls';
import { useDailyGames } from '@/hooks/useDailyGames';

const DailyCircuit = () => {
  const [popupDialogOpen, setPopupDialogOpen] = useState(false);
  const { toast } = useToast();
  const dailyGames = useDailyGames(4);
  
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
    
    dailyGames.forEach((game, index) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12 animate-fade-in-slow">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
              The Daily <span className="text-primary">Circuit</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              A curated sequence of daily games to exercise different parts of your brain.
            </p>
            
            <div className="flex justify-center mb-10">
              <Link to="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to all games
                </Button>
              </Link>
            </div>
            
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
                  <CircuitGamesList games={dailyGames} />
                  
                  <CircuitControls
                    timerRunning={timerRunning}
                    elapsedTime={elapsedTime}
                    formattedTime={formatTime(elapsedTime)}
                    onToggleTimer={toggleTimer}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Popup Help Dialog */}
      <PopupBlockerDialog 
        open={popupDialogOpen} 
        onOpenChange={setPopupDialogOpen} 
      />
      
      <Footer />
    </div>
  );
};

export default DailyCircuit;
