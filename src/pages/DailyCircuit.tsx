
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CircuitHero from '@/components/circuit/CircuitHero';
import CircuitContainer from '@/components/circuit/CircuitContainer';
import { useDailyGames } from '@/hooks/useDailyGames';

const DailyCircuit = () => {
  const dailyGames = useDailyGames(4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <CircuitHero />
          <CircuitContainer games={dailyGames} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyCircuit;
