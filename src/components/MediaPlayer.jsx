// src/components/MediaPlayer.jsx
import React from 'react';
import MusicPlayerPage from './MusicPlayerPage';

const MediaPlayer = ({ onClose, onDragStart }) => {
  return (
    <div className="w-96 h-80 pixel-window-frame">
      <div className="pixel-content-area flex flex-col">
        {/* Title bar */}
        <div
          className="flex items-center justify-between p-4 border-b-2 border-[#a7b5ba] cursor-move"
          onMouseDown={onDragStart}
        >
          <h2 className="text-lg font-bold text-black select-none">Media Player</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-[#cdd8dd] hover:bg-gray-400 cursor-pointer"
            style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <MusicPlayerPage />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;