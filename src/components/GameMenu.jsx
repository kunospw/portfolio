import React, { useState, useEffect } from 'react';

const GameMenu = ({ menuItems, onMenuItemClick, selectedMenuItem, onClose, onDragStart }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setMenuVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-80 h-auto pixel-window-frame ${menuVisible ? 'opening' : ''}`}>
      <div className="pixel-content-area p-5">
        {/* Enhanced Title bar with glitch effect */}
        <div 
          className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#a7b5ba] cursor-move group"
          onMouseDown={onDragStart}
        >
          <h2 className="text-lg font-bold text-black select-none animate-text-glitch group-hover:animate-none">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-[#cdd8dd] hover:bg-gray-400 cursor-pointer pixel-button animate-retro-pulse"
            style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>

        {/* Enhanced Menu content with staggered animations */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const isSelected = selectedMenuItem === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center w-full text-left p-3 transition-all rounded-sm cursor-pointer pixel-button animate-carousel-slide ${
                  isSelected 
                    ? 'bg-black text-white border-2 border-blue-500' 
                    : isHovered 
                      ? 'bg-blue-200 text-black animate-skill-hover' 
                      : 'hover:bg-blue-200 text-black'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  filter: isSelected ? 'brightness(1.1)' : 'brightness(1)'
                }}
              >
                <span className={`w-8 text-lg flex items-center transition-transform ${
                  isHovered ? 'animate-icon-bounce' : ''
                }`}>
                  {item.icon}
                </span>
                <span className={`text-base font-bold ml-2 ${
                  isSelected ? 'animate-text-glitch' : ''
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameMenu;