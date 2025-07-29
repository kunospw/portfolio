import React, { useState, useEffect } from 'react';

// NOTE: Please add your cropped raccoon image to 'src/assets/raccoon.png'
import raccoonLogo from '../assets/raccoon.png'; 

const SplashScreen = ({ onStart }) => {
  const [showRaccoon, setShowRaccoon] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Stagger the animations for a more dramatic effect
    const raccoonTimer = setTimeout(() => setShowRaccoon(true), 800);
    const buttonTimer = setTimeout(() => setShowButton(true), 1500);

    return () => {
      clearTimeout(raccoonTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="w-[700px] h-[500px] pixel-window-frame opening">
      <div className="pixel-content-area flex flex-col items-center justify-center text-center text-black relative overflow-hidden scanlines" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        <div className="absolute top-16 animate-pixel-fade-in">
          <p className="text-2xl animate-text-glitch">Welcome to</p>
          <h1 className="text-6xl my-4 animate-achievement-unlock" style={{ animationDelay: '0.3s' }}>
            Dee's World
          </h1>
          {showButton && (
            <div className="animate-pixel-fade-in" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={onStart}
                className="text-sm tracking-widest animate-retro-pulse hover:text-blue-600 cursor-pointer transition-colors duration-200 bg-transparent border-none p-2 rounded pixel-button"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ^ Press Space to start ^
              </button>
              <p className="text-xs mt-2 text-gray-600 animate-cursor-blink">
                (or click here on mobile)
              </p>
            </div>
          )}
        </div>
        {showRaccoon && (
          <div className="absolute -bottom-1 animate-icon-bounce" style={{ animationDelay: '1s' }}>
            <img 
              src={raccoonLogo} 
              alt="A pixel art raccoon peeking over the bottom of the screen" 
              className="h-40 pixel-art"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;