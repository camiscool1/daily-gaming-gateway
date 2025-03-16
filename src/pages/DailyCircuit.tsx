
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CircuitHero from '@/components/circuit/CircuitHero';
import CircuitContainer from '@/components/circuit/CircuitContainer';
import { useDailyGames } from '@/hooks/useDailyGames';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const DailyCircuit = () => {
  const { dailyGames, resetGames } = useDailyGames(4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <CircuitHero />
          
          {/* Developer mode button to reset games */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetGames}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Games
            </Button>
          </div>
          
          <CircuitContainer games={dailyGames} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyCircuit;
