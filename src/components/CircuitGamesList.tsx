
import React from 'react';
import { GameType } from '@/lib/games';

interface CircuitGamesListProps {
  games: GameType[];
}

const CircuitGamesList: React.FC<CircuitGamesListProps> = ({ games }) => {
  return (
    <ul className="space-y-4 text-left">
      {games.map((game) => (
        <li key={game.id} className="p-4 bg-secondary rounded-lg flex items-center gap-4">
          <div>
            <h3 className="font-medium">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CircuitGamesList;
