
import { useToast } from '@/hooks/use-toast';
import { GameType } from '@/lib/games';

export function useGameWindows() {
  const { toast } = useToast();

  const openAllGamesInTabs = (games: GameType[]) => {
    // Open all daily games in separate tabs
    let allOpened = true;
    
    games.forEach((game, index) => {
      // Add a small delay between each window.open to avoid triggering popup blockers
      setTimeout(() => {
        const gameWindow = window.open(game.url, '_blank', 'noopener,noreferrer');
        if (!gameWindow) {
          allOpened = false;
        }
      }, index * 300);
    });
    
    // Show success message
    toast({
      title: "Games Opened",
      description: "All games should now be opening in new tabs. The timer has started!",
    });

    return allOpened;
  };

  return { openAllGamesInTabs };
}
