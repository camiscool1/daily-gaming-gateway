
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function usePopupBlocker() {
  const [popupDialogOpen, setPopupDialogOpen] = useState(false);
  const { toast } = useToast();

  const checkPopupBlocker = (): boolean => {
    // Try to open a test popup to check if popups are allowed
    const testPopup = window.open('about:blank', '_blank');
    
    if (!testPopup || testPopup.closed || typeof testPopup.closed === 'undefined') {
      // Popup was blocked
      toast({
        title: "Popup Blocker Detected",
        description: "We couldn't open all games because popups are blocked. Please allow popups for this site.",
        variant: "destructive",
      });
      
      // Show the popup help dialog
      setPopupDialogOpen(true);
      return false;
    }
    
    // Close the test popup if it was successfully opened
    testPopup.close();
    return true;
  };

  return {
    popupDialogOpen,
    setPopupDialogOpen,
    checkPopupBlocker
  };
}
