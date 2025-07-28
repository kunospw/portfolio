// src/components/MainPanel.jsx
import React from 'react';
import StatsPage from './StatsPage';
import QuestLogPage from './QuestLogPage';
import GuildHistoryPage from './GuildHistoryPage';
import SkillTreePage from './SkillTreePage';
import AchievementPage from './AchievementPage';

const MainPanel = ({ selectedMenuItem, title, onClose, onDragStart }) => {
  const renderPage = () => {
    switch (selectedMenuItem) {
      case 'stats':
        return <StatsPage />;
      case 'questlog':
        return <QuestLogPage />;
      case 'guild':
        return <GuildHistoryPage />;
      case 'skilltree':
        return <SkillTreePage />;
      case 'achievement':
        return <AchievementPage />;
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-black text-xs font-bold p-4 text-center">
              Select a menu item to view content
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-[800px] h-[700px] pixel-window-frame">
       <div className="pixel-content-area flex flex-col">
          {/* Title bar */}
          <div 
            className="flex items-center justify-between p-4 border-b-2 border-[#a7b5ba] cursor-move"
            onMouseDown={onDragStart}
          >
            <h2 className="text-lg font-bold text-black select-none">{title}</h2>
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
          <div className="flex-1 p-5 overflow-y-auto">
            {renderPage()}
          </div>
       </div>
    </div>
  );
};

export default MainPanel;