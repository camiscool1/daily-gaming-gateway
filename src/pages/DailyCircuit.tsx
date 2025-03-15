
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { games } from '@/lib/games';
import { toast } from 'sonner';

const DailyCircuit = () => {
  const [dailyGames, setDailyGames] = useState<typeof games>([]);

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
  
  const openAllGamesInTabs = () => {
    // Open all daily games in separate tabs with a slight delay to avoid popup blockers
    let openedCount = 0;
    
    dailyGames.forEach((game, index) => {
      // Use setTimeout to stagger the opening of tabs
      setTimeout(() => {
        const newWindow = window.open(game.url, '_blank');
        
        if (newWindow) {
          openedCount++;
          console.log(`Opened game: ${game.title}`);
        } else {
          console.log(`Failed to open: ${game.title}`);
          toast.error("Popup blocker may be preventing games from opening. Please allow popups for this site.");
        }
        
        // If this is the last game, check if all opened successfully
        if (index === dailyGames.length - 1 && openedCount === dailyGames.length) {
          toast.success(`All ${dailyGames.length} games opened successfully!`);
        }
      }, index * 300); // 300ms delay between each window.open call
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
                
                <div className="space-y-6">
                  <ol className="space-y-4 text-left">
                    {dailyGames.map((game, index) => (
                      <li key={game.id} className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                        <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center">{index + 1}</div>
                        <div>
                          <h3 className="font-medium">{game.title}</h3>
                          <p className="text-sm text-muted-foreground">{game.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  
                  <div className="pt-4 flex justify-center">
                    <Button 
                      size="lg" 
                      className="gap-2 text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={openAllGamesInTabs}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Open All Games
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyCircuit;
