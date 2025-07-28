// src/components/SplashScreen.jsx
import React from 'react';

// NOTE: Please add your cropped raccoon image to 'src/assets/raccoon.png'
// You can get this image from the 'image_a0796c.png' file you uploaded.
import raccoonLogo from '../assets/raccoon.png'; 

const SplashScreen = () => {
  return (
    <div className="w-[700px] h-[500px] pixel-window-frame">
      <div className="pixel-content-area flex flex-col items-center justify-center text-center text-black relative overflow-hidden" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        <div className="absolute top-16">
          <p className="text-2xl">Welcome to</p>
          <h1 className="text-6xl my-4">Dee's World</h1>
          <p className="text-sm tracking-widest animate-pulse">^ Press Space to start ^</p>
        </div>
        <div className="absolute -bottom-1">
          <img src={raccoonLogo} alt="A pixel art raccoon peeking over the bottom of the screen" className="h-40" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;