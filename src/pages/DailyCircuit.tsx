
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, AlertCircle, Timer, TimerOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { games } from '@/lib/games';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const DailyCircuit = () => {
  const [dailyGames, setDailyGames] = useState<typeof games>([]);
  const [popupDialogOpen, setPopupDialogOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStartTime, setTimerStartTime] = useState(0);
  const { toast } = useToast();

  // Timer effect - runs when timerRunning changes
  useEffect(() => {
    let timerInterval: number | undefined;
    
    if (timerRunning) {
      // Start the timer
      timerInterval = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - timerStartTime;
        setElapsedTime(elapsed);
      }, 100); // Update every 100ms for smoother display
    } else {
      // Timer is stopped
      clearInterval(timerInterval);
    }
    
    // Clean up on unmount or when timerRunning changes
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerRunning, timerStartTime]);

  // Format time as mm:ss.ms
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Get only 2 digits
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Function to get a deterministic random set of games based on the current date
    const getRandomGamesForToday = () => {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      
      // Use the date string as a seed for randomization
      const seededRandom = (min: number, max: number, seed: string) => {
        const seedNum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const x = Math.sin(seedNum) * 10000;
        return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
      };
      
      // Create a copy of games array to avoid mutating the original
      const gamesCopy = [...games];
      const selectedGames = [];
      
      // Select 4 random games
      for (let i = 0; i < 4; i++) {
        if (gamesCopy.length === 0) break;
        
        const randomIndex = seededRandom(0, gamesCopy.length - 1, `${dateString}-${i}`);
        selectedGames.push(gamesCopy.splice(randomIndex, 1)[0]);
      }
      
      return selectedGames;
    };
    
    setDailyGames(getRandomGamesForToday());
  }, []);
  
  const toggleTimer = () => {
    if (!timerRunning) {
      // Start the timer
      setTimerStartTime(Date.now());
      setTimerRunning(true);
      openAllGamesInTabs();
    } else {
      // Stop the timer
      setTimerRunning(false);
      
      // Show elapsed time in toast
      toast({
        title: "Circuit Complete!",
        description: `Your time: ${formatTime(elapsedTime)}`,
      });
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
      setTimerRunning(false);
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
                
                {timerRunning && (
                  <div className="mb-6">
                    <div className="text-3xl font-mono text-center mb-2">
                      {formatTime(elapsedTime)}
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                )}
                
                <div className="space-y-6">
                  <ul className="space-y-4 text-left">
                    {dailyGames.map((game) => (
                      <li key={game.id} className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                        <div>
                          <h3 className="font-medium">{game.title}</h3>
                          <p className="text-sm text-muted-foreground">{game.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 flex justify-center">
                    <Button 
                      size="lg" 
                      className={`gap-2 text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300 ${timerRunning ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                      onClick={toggleTimer}
                    >
                      {timerRunning ? (
                        <>
                          <TimerOff className="w-5 h-5" />
                          Stop Timer
                        </>
                      ) : (
                        <>
                          <Timer className="w-5 h-5" />
                          Open All Games
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Popup Help Dialog */}
      <Dialog open={popupDialogOpen} onOpenChange={setPopupDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Popups to Use the Circuit</DialogTitle>
            <DialogDescription>
              To open all games in the circuit, you need to allow popups for this site. Follow these instructions for your browser:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium mb-1">Google Chrome</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Look for the popup blocked icon <span className="px-1 py-0.5 bg-gray-100 rounded">🚫</span> in the address bar</li>
                <li>Click on it and select "Always allow popups from this site"</li>
                <li>Click "Done" and try again</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Firefox</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click on the popup notification at the top of the page</li>
                <li>Select "Preferences" and choose "Allow popups for this site"</li>
                <li>Try again</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Safari</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to Safari &gt; Preferences &gt; Websites &gt; Pop-up Windows</li>
                <li>Find this website and set it to "Allow"</li>
                <li>Reload the page and try again</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Edge</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click on the popup notification in the address bar</li>
                <li>Select "Always allow popups from this site"</li>
                <li>Try again</li>
              </ol>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button onClick={() => setPopupDialogOpen(false)}>
              I'll Enable Popups
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default DailyCircuit;
