
import React, { useState, useEffect } from 'react';
import { games } from '@/lib/games';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract unique categories
  const categories = Array.from(new Set(games.map(game => game.category))).sort();

  // Filter games based on search and category
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? game.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

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
      
      <main className="flex-1 pt-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className={cn(
            "text-center mb-16 opacity-0", 
            isLoaded && "animate-fade-in-slow"
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Play Something <span className="text-primary">New</span> Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover a curated collection of daily games to challenge your mind and brighten your day.
            </p>
          </section>
          
          {/* Search and Filter */}
          <section className={cn(
            "mb-12 opacity-0",
            isLoaded && "animate-fade-in-slow",
            "animate-delay-[0.2s]"
          )}>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full py-2 pl-10 pr-4 bg-muted/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <button
                  className={cn(
                    "px-4 py-2 text-sm rounded-full transition-all",
                    activeCategory === null 
                      ? "bg-primary text-white" 
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  )}
                  onClick={() => setActiveCategory(null)}
                >
                  All Games
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={cn(
                      "px-4 py-2 text-sm rounded-full transition-all",
                      activeCategory === category 
                        ? "bg-primary text-white" 
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    )}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Games Grid */}
          <section className={cn(
            "opacity-0",
            isLoaded && "animate-fade-in-slow",
            "animate-delay-[0.4s]"
          )}>
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <GameCard key={game.id} game={game} delay={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium mb-4">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
