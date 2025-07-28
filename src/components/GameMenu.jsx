// src/components/GameMenu.jsx
import React from 'react';

const GameMenu = ({ menuItems, onMenuItemClick, selectedMenuItem, onClose, onDragStart }) => {
  return (
    <div className="w-64 h-auto pixel-window-frame">
      <div className="pixel-content-area p-4 flex flex-col">
        {/* Title bar */}
        <div 
          className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#a7b5ba] cursor-move"
          onMouseDown={onDragStart}
        >
          <h2 className="text-base font-bold text-black select-none">Menu</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-[#cdd8dd] hover:bg-gray-400 cursor-pointer"
            style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>

        {/* Menu content */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isSelected = selectedMenuItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                onMouseDown={(e) => e.stopPropagation()}
                className={`flex items-center w-full text-left p-2 transition-all rounded-sm cursor-pointer ${
                  isSelected ? 'bg-black text-white' : 'hover:bg-blue-200 text-black'
                }`}
              >
                <span className="w-6 text-base flex items-center">{item.icon}</span>
                <span className="text-sm font-bold ml-1">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameMenu;