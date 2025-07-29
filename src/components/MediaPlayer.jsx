// src/components/MediaPlayer.jsx
import React from 'react';
import MusicPlayerPage from './MusicPlayerPage';

const MediaPlayer = ({ onClose, onDragStart }) => {
  return (
    <div className="w-96 h-100 pixel-window-frame animate-window-open">
      <div className="pixel-content-area flex flex-col scanlines">
        {/* Title bar with glitch effect */}
        <div
          className="flex items-center justify-between p-4 border-b-2 border-[#a7b5ba] cursor-move bg-gradient-to-r from-[#cdd8dd] to-[#d4e0e4] hover:animate-text-glitch"
          onMouseDown={onDragStart}
        >
          <h2 className="text-lg font-bold text-black select-none" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Media Player
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-[#cdd8dd] hover:bg-red-400 cursor-pointer pixel-button animate-icon-bounce transition-all duration-200"
            style={{ 
              borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba',
              animationDelay: '0.5s'
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>
        
        {/* Content area with fade-in animation */}
        <div className="flex-1 overflow-y-auto animate-pixel-fade-in" style={{ animationDelay: '0.2s' }}>
          <MusicPlayerPage />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;