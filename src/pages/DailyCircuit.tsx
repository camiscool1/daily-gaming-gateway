
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DailyCircuit = () => {
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
                  Complete these games in order for the best experience:
                </p>
                
                <ol className="space-y-4 text-left">
                  <li className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                    <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center">1</div>
                    <div>
                      <h3 className="font-medium">Wordle</h3>
                      <p className="text-sm text-muted-foreground">Start with a word challenge</p>
                    </div>
                    <div className="ml-auto">
                      <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">
                        <Button size="sm">Play</Button>
                      </a>
                    </div>
                  </li>
                  
                  <li className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                    <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center">2</div>
                    <div>
                      <h3 className="font-medium">Connections</h3>
                      <p className="text-sm text-muted-foreground">Find patterns and groupings</p>
                    </div>
                    <div className="ml-auto">
                      <a href="https://www.nytimes.com/games/connections" target="_blank" rel="noopener noreferrer">
                        <Button size="sm">Play</Button>
                      </a>
                    </div>
                  </li>
                  
                  <li className="p-4 bg-secondary rounded-lg flex items-center gap-4">
                    <div className="bg-primary/10 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center">3</div>
                    <div>
                      <h3 className="font-medium">Globle</h3>
                      <p className="text-sm text-muted-foreground">Test your geography knowledge</p>
                    </div>
                    <div className="ml-auto">
                      <a href="https://globle-game.com/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm">Play</Button>
                      </a>
                    </div>
                  </li>
                </ol>
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
