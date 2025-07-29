// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import GameMenu from '../components/GameMenu';
import MainPanel from '../components/MainPanel';
import SplashScreen from '../components/SplashScreen';
import Taskbar from '../components/Taskbar';
import MediaPlayer from '../components/MediaPlayer';
import raccoonLogo from '../assets/raccoon.png'; // Add this import
import {
  FiTrendingUp,
  FiBookOpen,
  FiShield,
  FiGitMerge,
  FiAward
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

// SummonMeNotification Component
const SummonMeNotification = ({ onSummon, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textPhase, setTextPhase] = useState(0);

  const texts = [
    "A wild Dee appears!",
    "Dee wants to connect!",
    "Will you answer the call?"
  ];

  useEffect(() => {
    // Trigger slide-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Cycle through different texts
    const textTimer = setInterval(() => {
      setTextPhase(prev => (prev + 1) % texts.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className={`fixed bottom-20 right-4 w-64 pixel-window-frame z-50 ${
      isVisible ? 'animate-notification-slide animate-retro-pulse' : 'translate-x-full opacity-0'
    }`}>
      <div className="pixel-content-area p-2 scanlines">
        <div className="flex items-center justify-between pb-1 mb-1 border-b-2 border-[#a7b5ba]">
          <h2 className="text-sm font-bold text-black select-none animate-text-glitch">
            System Alert!
          </h2>
          <button
            onClick={onClose}
            className="w-4 h-4 border-2 border-black flex items-center justify-center text-black font-bold text-sm bg-[#cdd8dd] hover:bg-gray-400 cursor-pointer pixel-button animate-icon-bounce"
            style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}
          >
            ×
          </button>
        </div>
        <div className="text-center">
          <div className="mb-2 h-8 flex items-center justify-center">
            <p className="text-xs animate-carousel-slide">
              {texts[textPhase]}
            </p>
          </div>
          <div className="mb-2">
            <div className="w-12 h-12 mx-auto animate-icon-bounce">
              <img 
                src={raccoonLogo} 
                alt="Raccoon" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <button
            onClick={onSummon}
            className="px-3 py-1 bg-green-500 border-2 border-b-4 border-green-700 rounded-lg text-white text-xs hover:bg-green-400 active:border-b-2 pixel-button animate-achievement-unlock font-bold"
            style={{ animationDelay: '0.5s' }}
          >
            Summon me!
          </button>
          <div className="mt-2">
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i === textPhase ? 'bg-blue-500 animate-retro-pulse' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ContactForm Component
const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    const subject = `Portfolio Contact from ${name}`;
    
    // Create mailto link
    const mailtoLink = `mailto:dyahrini908@gmail.com?` +
                       `subject=${encodeURIComponent(subject)}&` +
                       `body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Clear form fields after submission attempt
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Show success message and close
    alert("Opening your email client! Please send the email to complete your summoning.");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with proper opacity */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative w-96 pixel-window-frame">
        <div className="pixel-content-area p-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#a7b5ba]">
            <h2 className="text-lg font-bold text-black select-none">Hire Me / Post a Bounty</h2>
            <button
              onClick={onClose}
              className="w-6 h-6 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-[#cdd8dd] hover:bg-gray-400 cursor-pointer"
              style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label htmlFor="name" className="block mb-1 font-bold">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border-2 border-black" 
                style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba', backgroundColor: '#f7fafd' }} 
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border-2 border-black" 
                style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba', backgroundColor: '#f7fafd' }}
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-bold">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows="4" 
                value={formData.message}
                onChange={handleInputChange}
                required 
                className="w-full p-2 border-2 border-black" 
                style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba', backgroundColor: '#f7fafd' }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 border-2 border-b-4 border-blue-700 rounded-lg text-white font-bold hover:bg-blue-400 active:border-b-2"
            >
              Send Summoning Signal
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-xs text-black mb-2">Or seek me elsewhere</p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/kunospw" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/dyahpusporini/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/lemmerrison/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function GameMenuSystem() {
  const [appLaunched, setAppLaunched] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMainPanelOpen, setIsMainPanelOpen] = useState(false);
  const [isMediaPlayerOpen, setIsMediaPlayerOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('stats');
  const [menuPosition, setMenuPosition] = useState({ x: -400, y: -350 });
  const [mainPanelPosition, setMainPanelPosition] = useState({ x: -100, y: -350 });
  const [mediaPlayerPosition, setMediaPlayerPosition] = useState({ x: 200, y: -100 });
  const [isDragging, setIsDragging] = useState({ menu: false, panel: false, mediaPlayer: false });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isContactFormVisible, setContactFormVisible] = useState(false);
  const [iconsLoaded, setIconsLoaded] = useState(false); // ADD THIS MISSING STATE

  const handleGameStart = () => {
    setGameStarted(true);
    setIsMenuOpen(true);
    setIsMainPanelOpen(true);
  };

  // ADD THIS MISSING USEEFFECT FOR ICON LOADING
  useEffect(() => {
    const timer = setTimeout(() => setIconsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && appLaunched && !gameStarted) {
        handleGameStart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [appLaunched, gameStarted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!isNotificationVisible) {
        setNotificationVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isNotificationVisible]);

  const menuItems = [
    { name: 'Stats', id: 'stats', icon: <FiTrendingUp /> },
    { name: 'Quest Log', id: 'questlog', icon: <FiBookOpen /> },
    { name: 'Guild History', id: 'guild', icon: <FiShield /> },
    { name: 'Skill Tree', id: 'skilltree', icon: <FiGitMerge /> },
    { name: 'Achievement', id: 'achievement', icon: <FiAward /> }
  ];

  const handleMenuItemClick = (itemId) => {
    setSelectedMenuItem(itemId);
    if (!isMainPanelOpen) {
      setIsMainPanelOpen(true);
    }
  };

  const handleAppLaunch = () => {
    if (!appLaunched) {
      setAppLaunched(true);
    } else if (gameStarted && !isMenuOpen && !isMainPanelOpen) {
      setIsMenuOpen(true);
      setIsMainPanelOpen(true);
    }
  };

  const handleMediaPlayerLaunch = () => {
    setIsMediaPlayerOpen(true);
  };

  const handleAppClose = () => {
    setAppLaunched(false);
    setGameStarted(false);
    setIsMenuOpen(false);
    setIsMainPanelOpen(false);
  };

  // Drag handlers
  const handleMouseDown = (e, type) => {
    setIsDragging({ ...isDragging, [type]: true });
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      if (isDragging.menu) {
        setMenuPosition({
          x: e.clientX - centerX - dragOffset.x,
          y: e.clientY - centerY - dragOffset.y
        });
      }
      if (isDragging.panel) {
        setMainPanelPosition({
          x: e.clientX - centerX - dragOffset.x,
          y: e.clientY - centerY - dragOffset.y
        });
      }
      if (isDragging.mediaPlayer) {
        setMediaPlayerPosition({
          x: e.clientX - centerX - dragOffset.x,
          y: e.clientY - centerY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging({ menu: false, panel: false, mediaPlayer: false });
    };

    if (isDragging.menu || isDragging.panel || isDragging.mediaPlayer) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const selectedTitle = menuItems.find(item => item.id === selectedMenuItem)?.name || 'Menu';

  const handleNotificationClose = () => {
    setNotificationVisible(false);
    setTimeout(() => setNotificationVisible(true), 5000);
  };

  const isDesktopIconClickable = !appLaunched || (gameStarted && !isMenuOpen && !isMainPanelOpen);

  // UPDATED DESKTOP ICONS WITH PROPER ANIMATION CONTROL
  const DesktopIcons = () => (
    <div className="fixed bottom-16 left-4 z-10 flex flex-col-reverse space-y-4 space-y-reverse">
      {/* Dee's World Icon */}
      <div
        className={`flex flex-col items-center group desktop-icon ${
          isDesktopIconClickable ? 'cursor-pointer' : 'cursor-default opacity-70'
        } ${iconsLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`}
        onDoubleClick={isDesktopIconClickable ? handleAppLaunch : undefined}
        style={{ animationDelay: '0.2s' }}
      >
        <div className={`w-16 h-16 bg-[#c0c0c0] border-2 border-[#ffffff] flex items-center justify-center mb-2 p-2 pixel-button transition-all duration-300 ${
          isDesktopIconClickable ? 'group-hover:animate-icon-bounce group-hover:bg-blue-100' : ''
        }`} style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
          <img 
            src={raccoonLogo} 
            alt="Dee's World" 
            className="w-full h-full object-contain animate-retro-pulse"
          />
        </div>
        <span className={`text-sm text-black bg-[#c0c0c0] px-1 transition-all duration-200 ${
          isDesktopIconClickable ? 'group-hover:bg-blue-500 group-hover:text-white group-hover:animate-text-glitch' : ''
        }`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Dee's World
        </span>
      </div>

      {/* Media Player Icon */}
      <div
        className={`flex flex-col items-center group desktop-icon cursor-pointer ${
          iconsLoaded ? 'animate-pixel-fade-in' : 'opacity-0'
        }`}
        onDoubleClick={handleMediaPlayerLaunch}
        style={{ animationDelay: '0.4s' }}
      >
        <div className="w-16 h-16 bg-[#c0c0c0] border-2 border-[#ffffff] flex items-center justify-center text-4xl mb-2 pixel-button group-hover:animate-icon-bounce group-hover:bg-purple-100 transition-all duration-300" 
             style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
          <span className="animate-retro-pulse" style={{ animationDelay: '0.5s' }}>🎵</span>
        </div>
        <span className="text-sm text-black bg-[#c0c0c0] px-1 group-hover:bg-blue-500 group-hover:text-white group-hover:animate-text-glitch transition-all duration-200" 
              style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Media Player
        </span>
      </div>

      {/* CV Download Icon */}
      <a 
        href="/Dyah_Puspo_Rini_CV.pdf" 
        download="DyahPuspoRini_CV.pdf" 
        className={`flex flex-col items-center group desktop-icon cursor-pointer ${
          iconsLoaded ? 'animate-pixel-fade-in' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.6s' }}
      >
        <div className="w-16 h-16 bg-[#c0c0c0] border-2 border-[#ffffff] flex items-center justify-center text-4xl mb-2 pixel-button group-hover:animate-icon-bounce group-hover:bg-yellow-100 transition-all duration-300" 
             style={{ borderColor: '#ffffff #808080 #808080 #ffffff' }}>
          <span className="animate-retro-pulse" style={{ animationDelay: '1s' }}>📁</span>
        </div>
        <span className="text-sm text-black bg-[#c0c0c0] px-1 group-hover:bg-blue-500 group-hover:text-white group-hover:animate-text-glitch transition-all duration-200" 
              style={{ fontFamily: "'Press Start 2P', monospace" }}>
          Dee's CV
        </span>
      </a>

      {/* Loading indicator when icons are loading */}
      {!iconsLoaded && (
        <div className="flex items-center justify-center">
          <div className="pixel-spinner"></div>
          <span className="text-xs ml-2 animate-cursor-blink" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            Loading...
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-16" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <DesktopIcons />

      {appLaunched && (
        <>
          {!gameStarted ? (
            <SplashScreen onStart={handleGameStart} />
          ) : (
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
                    onDragStart={(e) => handleMouseDown(e, 'menu')}
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
                    onDragStart={(e) => handleMouseDown(e, 'panel')}
                    onSummon={() => setContactFormVisible(true)}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}

      {isMediaPlayerOpen && (
        <div
          className="absolute"
          style={{ transform: `translate(${mediaPlayerPosition.x}px, ${mediaPlayerPosition.y}px)` }}
        >
          <MediaPlayer
            onClose={() => setIsMediaPlayerOpen(false)}
            onDragStart={(e) => handleMouseDown(e, 'mediaPlayer')}
          />
        </div>
      )}

      {isNotificationVisible && <SummonMeNotification onSummon={() => setContactFormVisible(true)} onClose={handleNotificationClose} />}
      {isContactFormVisible && <ContactForm onClose={() => setContactFormVisible(false)} />}

      <Taskbar
        appLaunched={appLaunched}
        gameStarted={gameStarted}
        isMenuOpen={isMenuOpen}
        isMainPanelOpen={isMainPanelOpen}
        isMediaPlayerOpen={isMediaPlayerOpen}
        onAppClose={handleAppClose}
        onMediaPlayerClose={() => setIsMediaPlayerOpen(false)}
      />
    </div>
  );
}