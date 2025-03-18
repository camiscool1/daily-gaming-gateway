import React, { useEffect } from 'react';

// Add TypeScript declarations for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ adSlot, adFormat = 'auto', style }) => {
  useEffect(() => {
    try {
      // Push the ad only if AdSense is loaded
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
    }
  }, []);

  return (
    <div className="ad-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR_AD_CLIENT_ID" // Replace with your AdSense client ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit; 