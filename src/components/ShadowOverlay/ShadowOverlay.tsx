import React from 'react';

interface ShadowOverlayProps {
  children: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ShadowOverlay: React.FC<ShadowOverlayProps> = ({
  children,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  overlayOpacity = 1,
}) => {
  return (
    <div className="relative z-[-1]">
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-100" 
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      {children}
    </div>
  );
};

export default ShadowOverlay;