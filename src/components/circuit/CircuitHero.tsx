
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CircuitHero: React.FC = () => {
  return (
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
    </section>
  );
};

export default CircuitHero;
