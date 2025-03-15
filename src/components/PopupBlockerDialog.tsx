
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PopupBlockerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopupBlockerDialog: React.FC<PopupBlockerDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enable Popups to Use the Circuit</DialogTitle>
          <DialogDescription>
            To open all games in the circuit, you need to allow popups for this site. Follow these instructions for your browser:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium mb-1">Google Chrome</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Look for the popup blocked icon <span className="px-1 py-0.5 bg-gray-100 rounded">🚫</span> in the address bar</li>
              <li>Click on it and select "Always allow popups from this site"</li>
              <li>Click "Done" and try again</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Firefox</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on the popup notification at the top of the page</li>
              <li>Select "Preferences" and choose "Allow popups for this site"</li>
              <li>Try again</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Safari</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to Safari &gt; Preferences &gt; Websites &gt; Pop-up Windows</li>
              <li>Find this website and set it to "Allow"</li>
              <li>Reload the page and try again</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Edge</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on the popup notification in the address bar</li>
              <li>Select "Always allow popups from this site"</li>
              <li>Try again</li>
            </ol>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <Button onClick={() => onOpenChange(false)}>
            I'll Enable Popups
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupBlockerDialog;
