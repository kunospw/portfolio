import React, { useState, useEffect } from 'react';

const Taskbar = ({ appLaunched, gameStarted, isMenuOpen, isMainPanelOpen, selectedMenuItem, menuItems, onMenuToggle, onMainPanelToggle, onAppClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Always show taskbar when app is launched (even on splash screen)
  if (!appLaunched) {
    return (
      // Empty taskbar with just Start button and clock when no app is launched
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-[#ffffff] flex items-center px-2 space-x-2 z-50" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        {/* Start button */}
        <button className="h-8 px-3 bg-[#c0c0c0] border-2 text-xs font-bold text-black hover:bg-[#d0d0d0]" style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
          Start
        </button>
        
        {/* Clock (right side) */}
        <div className="flex-1"></div>
        <div className="h-6 px-2 bg-[#c0c0c0] border border-[#808080] text-xs font-bold text-black flex items-center">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  }

  // Check if any panel is open to show app tab
  const shouldShowAppTab = gameStarted && (isMenuOpen || isMainPanelOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#c0c0c0] border-t-2 border-[#ffffff] flex items-center px-2 space-x-2 z-50" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Start button */}
      <button className="h-8 px-3 bg-[#c0c0c0] border-2 text-xs font-bold text-black hover:bg-[#d0d0d0]" style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
        Start
      </button>
      
      {/* App tabs - only show when panels are open */}
      {shouldShowAppTab && (
        <div className="flex space-x-1">
          {/* Dee's World app tab - only shows when panels are open */}
          <button
            onClick={onAppClose}
            className="h-8 px-3 border-2 text-xs font-bold flex items-center space-x-2 bg-[#ffffff] border-[#808080] border-b-[#ffffff]"
            style={{ borderColor: '#808080 #ffffff #ffffff #808080' }}
          >
            <span className="text-black">🦝</span>
            <span className="text-black">Dee's World</span>
          </button>
        </div>
      )}

      {/* Clock (right side) */}
      <div className="flex-1"></div>
      <div className="h-6 px-2 bg-[#c0c0c0] border border-[#808080] text-xs font-bold text-black flex items-center">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Taskbar;