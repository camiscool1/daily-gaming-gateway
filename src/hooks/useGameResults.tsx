
import { useState, useEffect } from 'react';
import { GameType } from '@/lib/games';
import { GameResults } from '@/components/CircuitResults';

export function useGameResults(games: GameType[]) {
  const [gameResults, setGameResults] = useState<GameResults>({});
  const [allResultsSelected, setAllResultsSelected] = useState(false);
  
  // Initialize results when games change
  useEffect(() => {
    if (games.length > 0) {
      const initialResults: GameResults = {};
      games.forEach(game => {
        initialResults[game.id] = undefined;
      });
      setGameResults(initialResults);
    }
  }, [games]);
  
  // Check if all results are selected whenever gameResults changes
  useEffect(() => {
    if (Object.keys(gameResults).length === 0 || games.length === 0) {
      setAllResultsSelected(false);
      return;
    }
    
    // Explicitly check that every game has either 'completed' or 'failed'
    const allSelected = games.every(game => 
      gameResults[game.id] === 'completed' || gameResults[game.id] === 'failed'
    );
    
    console.log("Checking results for all games:", games.map(game => game.id));
    console.log("Current results:", gameResults);
    console.log("All selected:", allSelected);
    
    setAllResultsSelected(allSelected);
  }, [gameResults, games]);

  const handleResultChange = (gameId: string, result: GameResults[string]) => {
    console.log(`Setting result for ${gameId} to ${result}`);
    
    setGameResults(prev => {
      const newResults = {
        ...prev,
        [gameId]: result
      };
      
      return newResults;
    });
  };

  // Add a utility function to check if all results are selected
  const areAllResultsSelected = (): boolean => {
    if (Object.keys(gameResults).length === 0 || games.length === 0) {
      return false;
    }
    
    return games.every(game => 
      gameResults[game.id] === 'completed' || gameResults[game.id] === 'failed'
    );
  };

  return {
    gameResults,
    setGameResults,
    allResultsSelected,
    areAllResultsSelected,
    handleResultChange
  };
}
