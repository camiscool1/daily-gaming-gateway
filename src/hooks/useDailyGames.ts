
import { useState, useEffect } from 'react';
import { games, GameType } from '@/lib/games';

export function useDailyGames(numberOfGames: number = 4) {
  const [dailyGames, setDailyGames] = useState<GameType[]>([]);

  useEffect(() => {
    // Function to get a deterministic random set of games based on the current date
    const getRandomGamesForToday = () => {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      
      // Use the date string as a seed for randomization
      const seededRandom = (min: number, max: number, seed: string) => {
        const seedNum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const x = Math.sin(seedNum) * 10000;
        return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
      };
      
      // Create a copy of games array to avoid mutating the original
      const gamesCopy = [...games];
      const selectedGames = [];
      
      // Select random games
      for (let i = 0; i < numberOfGames; i++) {
        if (gamesCopy.length === 0) break;
        
        const randomIndex = seededRandom(0, gamesCopy.length - 1, `${dateString}-${i}`);
        selectedGames.push(gamesCopy.splice(randomIndex, 1)[0]);
      }
      
      return selectedGames;
    };
    
    setDailyGames(getRandomGamesForToday());
  }, [numberOfGames]);

  return dailyGames;
}
