import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaBolt, FaTrophy } from 'react-icons/fa';
import portraitImage from '../assets/potrait.png';

const StatsPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [healthPercentage, setHealthPercentage] = useState(75);
  const [statsVisible, setStatsVisible] = useState(false);

  const names = ['Dyah Puspo Rini', 'Dee'];

  // Stagger component animations
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced typewriter effect
  useEffect(() => {
    const currentName = names[nameIndex];
    
    if (!isDeleting) {
      if (charIndex < currentName.length) {
        const timeout = setTimeout(() => {
          setDisplayName(currentName.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 120 + Math.random() * 80); // Variable typing speed for more realistic effect
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayName(currentName.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40 + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setNameIndex((nameIndex + 1) % names.length);
      }
    }
  }, [charIndex, isDeleting, nameIndex, names]);

  // Enhanced health bar animation with more variation
  useEffect(() => {
    const healthValues = [75, 85, 90, 60, 95, 70, 80, 88, 65, 92];
    let healthIndex = 0;

    const interval = setInterval(() => {
      setHealthPercentage(healthValues[healthIndex]);
      healthIndex = (healthIndex + 1) % healthValues.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`h-full flex flex-col text-black text-xs ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Top section: Portrait and basic info */}
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          {/* Enhanced Image Portrait with hover effect */}
          <div className="w-44 h-44 border-2 border-black bg-gray-300 p-1 flex items-end justify-center mb-2 pixel-button group overflow-hidden">
            <img 
              src={portraitImage} 
              alt="Character Portrait" 
              className="w-full h-full object-cover object-bottom transition-transform duration-300 group-hover:scale-110"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="p-1 w-full text-center border-2 border-black bg-[#f7fafd] animate-pixel-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="animate-text-glitch">Dreamwalker</div>
            <div>INTP 9w8</div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold mb-2 min-h-[24px] flex items-center">
            {displayName}
            <span className="animate-cursor-blink ml-1">|</span>
          </h3>
          {/* Enhanced Health Bar with glow effect */}
          <div className="w-full h-4 border-2 border-black p-0.5 mb-3 bg-gray-800">
            <div 
              className="animate-health-pulse h-full transition-all duration-1000 ease-in-out" 
              style={{ 
                width: `${healthPercentage}%`,
                backgroundColor: healthPercentage > 80 ? '#22c55e' : healthPercentage > 50 ? '#eab308' : '#ef4444'
              }}
            ></div>
          </div>
          <div className={`font-bold text-sm ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="animate-text-glitch" style={{ animationDelay: '2s' }}>Class: Web & Game Dev</div>
            <div className="flex space-x-4 animate-carousel-slide" style={{ animationDelay: '1s' }}>
              <span className="hover:text-blue-500 transition-colors">INT ▷ 8</span>
              <span className="hover:text-green-500 transition-colors">WIS ▷ 8</span>
              <span className="hover:text-purple-500 transition-colors">TEC ▷ 9</span>
            </div>
            <div className="flex space-x-4 animate-carousel-slide" style={{ animationDelay: '1.2s' }}>
              <span className="hover:text-red-500 transition-colors">DEX ▷ 7</span>
              <span className="hover:text-yellow-500 transition-colors">EXP ▷ 10</span>
              <span className="hover:text-pink-500 transition-colors">CRE ▷ 10</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle section: Description with typing effect */}
      <div className={`mt-4 pt-3 border-t-2 border-black ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
        <p className="leading-relaxed hover:animate-text-glitch transition-all duration-300">
          Informatics student passionate about game and web development, aspiring to become a jack-of-all-trades, blending creativity and logic like a witchcraft spell. Staying authentic above all else, with a soft spot for cowboys and raccoons.
        </p>
      </div>

      {/* Bottom section: Current Quest with staggered animations */}
      <div className={`mt-4 pt-3 border-t-2 border-black flex-1 ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '2s' }}>
        <h4 className="text-sm font-bold mb-2 text-black flex items-center animate-achievement-unlock" style={{ animationDelay: '2.2s' }}>
          CURRENT QUEST
        </h4>
        <div className="space-y-4">
          <div className={`flex items-start space-x-3 animate-carousel-slide`} style={{ animationDelay: '2.4s' }}>
            <FaClipboardList className="text-black text-xl mt-1 flex-shrink-0 animate-icon-bounce" style={{ animationDelay: '3s' }} />
            <div className="group">
              <div className="font-bold group-hover:text-blue-600 transition-colors">Main Quest: Internship Hunt</div>
              <div className="text-xs">Seeking web/game development internship opportunities for 2025</div>
              <div className="text-xs text-gray-600">
                Progress: Applications sent 
                <span className="inline-block w-16 h-2 bg-gray-300 border border-gray-500 ml-2 align-middle">
                  <span 
                    className="block h-full bg-blue-500 animate-progress-load" 
                    style={{ width: '60%', animationDelay: '3s' }}
                  ></span>
                </span>
                60%
              </div>
            </div>
          </div>
          <div className={`flex items-start space-x-3 animate-carousel-slide`} style={{ animationDelay: '2.6s' }}>
            <FaBolt className="text-black text-xl mt-1 flex-shrink-0 animate-icon-bounce" style={{ animationDelay: '3.2s' }} />
            <div className="group">
              <div className="font-bold group-hover:text-yellow-600 transition-colors">Side Quest: Skill Enhancement</div>
              <div className="text-xs">Completing KADA Bootcamp</div>
              <div className="text-xs text-gray-600">Progress: Capstone Project underway...</div>
            </div>
          </div>
          <div className={`flex items-start space-x-3 animate-carousel-slide`} style={{ animationDelay: '2.8s' }}>
            <FaTrophy className="text-black text-xl mt-1 flex-shrink-0 animate-icon-bounce" style={{ animationDelay: '3.4s' }} />
            <div className="group">
              <div className="font-bold group-hover:text-purple-600 transition-colors">Long-term Goal: Portfolio Expansion</div>
              <div className="text-xs">Building 3 new projects before graduation</div>
              <div className="text-xs text-gray-600">
                Current: 1/3 completed
                <span className="inline-block w-12 h-2 bg-gray-300 border border-gray-500 ml-2 align-middle">
                  <span 
                    className="block h-full bg-green-500 animate-progress-load" 
                    style={{ width: '33%', animationDelay: '4s' }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;