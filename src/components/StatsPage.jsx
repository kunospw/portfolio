import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaBolt, FaTrophy, FaGraduationCap, FaCode, FaGamepad, FaCrown } from 'react-icons/fa';
import portraitImage from '../assets/potrait.png';

const StatsPage = ({ onSummon }) => {
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

          {/* NEW: Additional Info Cards */}
          <div className={`mt-4 grid grid-cols-2 gap-2 ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
            <div className="bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded pixel-button group hover:animate-skill-hover">
              <div className="flex items-center space-x-1">
                <FaGraduationCap className="text-blue-600 animate-icon-bounce" style={{ animationDelay: '2s' }} />
                <div>
                  <div className="font-bold text-xs group-hover:animate-text-glitch">Education</div>
                  <div className="text-xs">Informatics</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded pixel-button group hover:animate-skill-hover">
              <div className="flex items-center space-x-1">
                <FaCode className="text-green-600 animate-icon-bounce" style={{ animationDelay: '2.2s' }} />
                <div>
                  <div className="font-bold text-xs group-hover:animate-text-glitch">Focus</div>
                  <div className="text-xs">Web Dev</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded pixel-button group hover:animate-skill-hover">
              <div className="flex items-center space-x-1">
                <FaGamepad className="text-purple-600 animate-icon-bounce" style={{ animationDelay: '2.4s' }} />
                <div>
                  <div className="font-bold text-xs group-hover:animate-text-glitch">Hobby</div>
                  <div className="text-xs">Game Dev</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded pixel-button group hover:animate-skill-hover">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-600 text-sm animate-retro-pulse" style={{ animationDelay: '2.6s' }}>🦝</span>
                <div>
                  <div className="font-bold text-xs group-hover:animate-text-glitch">Spirit Animal</div>
                  <div className="text-xs">Raccoon</div>
                </div>
              </div>
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

      {/* NEW: Character Buffs/Status Effects */}
      <div className={`mt-4 pt-3 border-t-2 border-black ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '2.8s' }}>
        <h4 className="text-sm font-bold mb-2 text-black flex items-center animate-achievement-unlock" style={{ animationDelay: '3s' }}>
          ACTIVE BUFFS
        </h4>
        <div className="flex flex-wrap gap-2">
          <div className="bg-blue-500 border-2 border-blue-700 px-2 py-1 rounded text-white text-xs animate-retro-pulse" style={{ animationDelay: '3.2s' }}>
            ✨ Creative Focus +10
          </div>
          <div className="bg-green-500 border-2 border-green-700 px-2 py-1 rounded text-white text-xs animate-retro-pulse" style={{ animationDelay: '3.4s' }}>
            🚀 Learning Boost +15
          </div>
          <div className="bg-purple-500 border-2 border-purple-700 px-2 py-1 rounded text-white text-xs animate-retro-pulse" style={{ animationDelay: '3.6s' }}>
            🎯 Goal Oriented +12
          </div>
          <div className="bg-yellow-500 border-2 border-yellow-700 px-2 py-1 rounded text-white text-xs animate-retro-pulse" style={{ animationDelay: '3.8s' }}>
            🦝 Mischief Mode +20
          </div>
        </div>
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
        
        {/* NEW: Take the Bounty Button */}
        <div className={`mt-6 pt-4 border-t-2 border-dashed border-gray-400 text-center ${statsVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '4.2s' }}>
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-1 animate-text-glitch" style={{ animationDelay: '4.5s' }}>
              💰 BOUNTY AVAILABLE 💰
            </div>
            <div className="text-xs font-bold animate-carousel-slide" style={{ animationDelay: '4.7s' }}>
              Looking for a skilled adventurer to join your guild?
            </div>
          </div>
          <button
            onClick={onSummon}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 border-4 border-yellow-700 rounded-lg text-white font-bold text-sm hover:from-yellow-400 hover:to-orange-400 hover:scale-105 active:scale-95 transform transition-all duration-200 pixel-button animate-achievement-unlock shadow-lg group"
            style={{ 
              animationDelay: '5s',
              borderColor: '#b45309 #fbbf24 #fbbf24 #b45309',
              textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
            }}
          >
            <div className="flex items-center space-x-2">
              <FaCrown className="animate-icon-bounce group-hover:animate-retro-pulse" />
              <span className="group-hover:animate-text-glitch">TAKE THE BOUNTY</span>
              <FaCrown className="animate-icon-bounce group-hover:animate-retro-pulse" />
            </div>
            <div className="text-xs mt-1 opacity-90">
              Recruit Dee for your next quest!
            </div>
          </button>
          <div className="mt-2 text-xs text-gray-500 animate-cursor-blink" style={{ animationDelay: '5.5s' }}>
            Reward: Quality code & creative solutions
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;