
import React, { useState, useEffect } from 'react';
import { games } from '@/lib/games';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a slight delay before showing content for a smoother entrance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className={cn(
            "text-center mb-12 opacity-0", 
            isLoaded && "animate-fade-in-slow"
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Play Something <span className="text-primary">New</span> Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover a curated collection of daily games to challenge your mind and brighten your day.
            </p>
          </section>
          
          {/* Games Grid */}
          <section className={cn(
            "opacity-0",
            isLoaded && "animate-fade-in-slow",
            "animate-delay-[0.2s]"
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <GameCard key={game.id} game={game} delay={index} />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
