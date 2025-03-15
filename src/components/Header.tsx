
import React, { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "bg-primary rounded-xl p-2 transition-all",
            scrolled ? "bg-opacity-100" : "bg-opacity-90"
          )}>
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <h1 className={cn(
            "text-xl font-medium transition-all duration-300",
            scrolled ? "opacity-100" : "opacity-90"
          )}>
            Daily Games Hub
          </h1>
        </div>
        <div className="text-sm text-muted-foreground hidden md:block">
          <span>A curated collection of daily games</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
