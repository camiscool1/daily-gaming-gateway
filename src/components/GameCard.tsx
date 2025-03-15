
import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Game } from '@/lib/games';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  delay: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, delay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(game.url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      linkRef.current?.click();
    }
  };

  return (
    <div 
      className={cn(
        "game-card group",
        "opacity-0",
      )}
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animation: 'fade-in 0.5s ease-out forwards',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play ${game.title}`}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="game-card-thumbnail animate-pulse bg-muted" />
        )}
        <img
          src={game.thumbnailUrl}
          alt={`${game.title} thumbnail`}
          className={cn(
            "game-card-thumbnail group-hover:scale-[1.03]",
            !imageLoaded && "opacity-0",
            imageLoaded && "opacity-100 transition-opacity duration-500"
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div 
          className={cn(
            "absolute inset-0 bg-primary/0 flex items-center justify-center transition-all duration-300",
            isHovering && "bg-primary/10"
          )}
        >
          <div 
            className={cn(
              "transform scale-0 opacity-0 bg-white rounded-full p-2 shadow-lg transition-all duration-300",
              isHovering && "scale-100 opacity-100"
            )}
          >
            <ExternalLink className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
      <div className="game-card-content">
        <div className="flex items-start justify-between mb-2">
          <h3 className="game-card-title">{game.title}</h3>
          <span className="game-card-category">{game.category}</span>
        </div>
        <p className="text-sm text-muted-foreground">{game.description}</p>
        <a 
          ref={linkRef}
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
