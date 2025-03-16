
import { useState, useEffect } from 'react';
import { games, GameType } from '@/lib/games';

export function useDailyGames(numberOfGames: number = 4) {
  const [dailyGames, setDailyGames] = useState<GameType[]>([]);

  useEffect(() => {
    // Function to get a deterministic random set of games based on the current date
    const getRandomGamesForToday = () => {
      const today = new Date();
      // Use UTC date to ensure global consistency regardless of time zone
      const dateString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
      
      // Use the date string as a seed for randomization
      const seededRandom = (seed: string) => {
        // Create a more consistent hash from the seed string
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
          const char = seed.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }
        // Normalize to [0, 1] range
        return Math.abs(hash) / 2147483647;
      };
      
      // Create a copy of games array to avoid mutating the original
      const gamesCopy = [...games];
      const selectedGames = [];
      
      // Select random games using a consistent algorithm
      for (let i = 0; i < numberOfGames && gamesCopy.length > 0; i++) {
        const seed = `${dateString}-${i}`;
        const random = seededRandom(seed);
        const index = Math.floor(random * gamesCopy.length);
        selectedGames.push(gamesCopy.splice(index, 1)[0]);
      }
      
      return selectedGames;
    };
    
    setDailyGames(getRandomGamesForToday());
  }, [numberOfGames]);

  return dailyGames;
}
