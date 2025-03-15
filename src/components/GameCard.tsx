
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Game } from '@/lib/games';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  delay: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, delay }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(game.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group opacity-0 game-card"
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animation: 'fade-in 0.5s ease-out forwards',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="button"
      aria-label={`Play ${game.title}`}
      tabIndex={0}
    >
      <div className="relative overflow-hidden">
        {/* Background color as fallback */}
        <div className="absolute inset-0 bg-secondary/50"></div>
        
        {/* Image */}
        <img
          src={game.thumbnailUrl}
          alt={`${game.title} thumbnail`}
          className="game-card-thumbnail group-hover:scale-[1.03] transition-all duration-500"
          loading="lazy"
        />
        
        {/* Game title overlay on thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h3 className="text-xl font-bold text-white px-3 py-1 text-center">
            {game.title}
          </h3>
        </div>
        
        {/* Hover effect */}
        <div 
          className={cn(
            "absolute inset-0 bg-primary/0 flex items-center justify-center transition-all duration-300",
            isHovering && "bg-primary/20"
          )}
        >
          {isHovering && (
            <div className="bg-card rounded-full p-2 shadow-lg">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </div>
      <div className="game-card-content">
        <div className="flex items-start justify-between mb-2">
          <h3 className="game-card-title">{game.title}</h3>
          {/* Category tag removed as requested */}
        </div>
        <p className="text-sm text-muted-foreground">{game.description}</p>
        <a 
          href={game.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          onClick={handleClick}
          aria-label={`Play ${game.title}`}
        >
          <span className="sr-only">Open {game.title}</span>
        </a>
      </div>
    </div>
  );
};

export default GameCard;
