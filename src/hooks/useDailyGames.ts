
import { useState, useEffect, useCallback } from 'react';
import { games, GameType } from '@/lib/games';

export function useDailyGames(numberOfGames: number = 4) {
  const [dailyGames, setDailyGames] = useState<GameType[]>([]);

  // Function to get a deterministic random set of games based on a seed
  const getRandomGames = useCallback((seed: string, count: number) => {
    // Use the seed string for randomization
    const seededRandom = (min: number, max: number, seedStr: string) => {
      const seedNum = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const x = Math.sin(seedNum) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };
    
    // Create a copy of games array to avoid mutating the original
    const gamesCopy = [...games];
    const selectedGames = [];
    
    // Select random games
    for (let i = 0; i < count; i++) {
      if (gamesCopy.length === 0) break;
      
      const randomIndex = seededRandom(0, gamesCopy.length - 1, `${seed}-${i}`);
      selectedGames.push(gamesCopy.splice(randomIndex, 1)[0]);
    }
    
    return selectedGames;
  }, []);

  // Get today's games based on current date
  const getTodaysGames = useCallback(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return getRandomGames(dateString, numberOfGames);
  }, [getRandomGames, numberOfGames]);

  // Function to reset games with a different set
  const resetGames = useCallback(() => {
    // Use timestamp as seed to get a different set of games
    const timestamp = new Date().getTime().toString();
    const newGames = getRandomGames(timestamp, numberOfGames);
    setDailyGames(newGames);
  }, [getRandomGames, numberOfGames]);

  useEffect(() => {
    setDailyGames(getTodaysGames());
  }, [getTodaysGames]);

  return {
    dailyGames,
    resetGames
  };
}
