// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import GameMenu from '../components/GameMenu';
import MainPanel from '../components/MainPanel';
import SplashScreen from '../components/SplashScreen';
import Taskbar from '../components/Taskbar';
import {
  FiTrendingUp,
  FiBookOpen,
  FiShield,
  FiTarget,
  FiGitMerge,
  FiAward
} from 'react-icons/fi';

export default function GameMenuSystem() {
  const [appLaunched, setAppLaunched] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMainPanelOpen, setIsMainPanelOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('stats');
  const [menuPosition, setMenuPosition] = useState({ x: -330, y: -290 });
  const [mainPanelPosition, setMainPanelPosition] = useState({ x: -90, y: -290 });
  const [isDragging, setIsDragging] = useState({ menu: false, panel: false });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Effect to handle keyboard input for starting the game
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && appLaunched && !gameStarted) {
        setGameStarted(true);
        setIsMenuOpen(true);
        setIsMainPanelOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [appLaunched, gameStarted]);

  const menuItems = [
    { name: 'Stats', id: 'stats', icon: <FiTrendingUp /> },
    { name: 'Quest Log', id: 'questlog', icon: <FiBookOpen /> },
    { name: 'Guild History', id: 'guild', icon: <FiShield /> },
    { name: 'Training', id: 'training', icon: <FiTarget /> },
    { name: 'Skill Tree', id: 'skilltree', icon: <FiGitMerge /> },
    { name: 'Achievement', id: 'achievement', icon: <FiAward /> }
  ];

  const handleMenuItemClick = (itemId) => {
    setSelectedMenuItem(itemId);
    if (!isMainPanelOpen) {
      setIsMainPanelOpen(true);
    }
  };

  // App launch handler - modified to handle reopening panels
  const handleAppLaunch = () => {
    if (!appLaunched) {
      // First launch - show splash screen
      setAppLaunched(true);
    } else if (gameStarted && !isMenuOpen && !isMainPanelOpen) {
      // App is launched and game started but all panels closed - reopen them
      setIsMenuOpen(true);
      setIsMainPanelOpen(true);
    }
  };

  // App close handler
  const handleAppClose = () => {
    setAppLaunched(false);
    setGameStarted(false);
    setIsMenuOpen(false);
    setIsMainPanelOpen(false);
  };

  // Drag handlers for menu
  const handleMenuMouseDown = (e) => {
    setIsDragging({ ...isDragging, menu: true });
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Drag handlers for main panel
  const handleMainPanelMouseDown = (e) => {
    setIsDragging({ ...isDragging, panel: true });
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.menu) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMenuPosition({
          x: e.clientX - centerX - dragOffset.x,
          y: e.clientY - centerY - dragOffset.y
        });
      }
      if (isDragging.panel) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMainPanelPosition({
          x: e.clientX - centerX - dragOffset.x,
          y: e.clientY - centerY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging({ menu: false, panel: false });
    };

    if (isDragging.menu || isDragging.panel) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const selectedTitle = menuItems.find(item => item.id === selectedMenuItem)?.name || 'Menu';

  // Taskbar toggle handlers (only used when game is started)
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMainPanelToggle = () => {
    setIsMainPanelOpen(!isMainPanelOpen);
  };

  // Check if desktop icon should be clickable
  const isDesktopIconClickable = !appLaunched || (gameStarted && !isMenuOpen && !isMainPanelOpen);

  // Desktop icon component - only shows Dee's World
  const DesktopIcon = () => (
    <div className="fixed top-4 left-4 z-10">
      <div 
        className={`flex flex-col items-center group ${
          isDesktopIconClickable ? 'cursor-pointer' : 'cursor-default opacity-70'
        }`}
        onDoubleClick={isDesktopIconClickable ? handleAppLaunch : undefined}
      >
        <div className="w-12 h-12 bg-[#c0c0c0] border-2 border-[#ffffff] flex items-center justify-center text-2xl mb-1" style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
          🦝
        </div>
        <span className={`text-xs text-black bg-[#c0c0c0] px-1 ${
          isDesktopIconClickable ? 'group-hover:bg-blue-500 group-hover:text-white' : ''
        }`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Dee's World
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-16" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Desktop Icon - always visible */}
      <DesktopIcon />

      {/* App content - only shows when launched */}
      {appLaunched && (
        <>
          {!gameStarted ? (
            // Show the splash screen if the app is launched but game hasn't started
            <SplashScreen />
          ) : (
            // Show game interface when game is started
            <div className="relative w-0 h-0">
              {isMenuOpen && (
                <div 
                  className="absolute" 
                  style={{ transform: `translate(${menuPosition.x}px, ${menuPosition.y}px)` }}
                >
                  <GameMenu
                    menuItems={menuItems}
                    onMenuItemClick={handleMenuItemClick}
                    selectedMenuItem={selectedMenuItem}
                    onClose={() => setIsMenuOpen(false)}
                    onDragStart={handleMenuMouseDown}
                  />
                </div>
              )}

              {isMainPanelOpen && (
                <div 
                  className="absolute" 
                  style={{ transform: `translate(${mainPanelPosition.x}px, ${mainPanelPosition.y}px)` }}
                >
                  <MainPanel
                    selectedMenuItem={selectedMenuItem}
                    title={selectedTitle}
                    onClose={() => setIsMainPanelOpen(false)}
                    onDragStart={handleMainPanelMouseDown}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Taskbar - always visible */}
      <Taskbar
        appLaunched={appLaunched}
        gameStarted={gameStarted}
        isMenuOpen={isMenuOpen}
        isMainPanelOpen={isMainPanelOpen}
        selectedMenuItem={selectedMenuItem}
        menuItems={menuItems}
        onMenuToggle={handleMenuToggle}
        onMainPanelToggle={handleMainPanelToggle}
        onAppClose={handleAppClose}
      />
    </div>
  );
}