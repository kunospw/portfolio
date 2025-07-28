// src/components/StatsPage.jsx
import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaBolt, FaTrophy } from 'react-icons/fa';
import portraitImage from '../assets/potrait.png'; // Import your image

const StatsPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [healthPercentage, setHealthPercentage] = useState(75);

  const names = ['Dyah Puspo Rini', 'Dee'];

  // Typewriter effect for name
  useEffect(() => {
    const currentName = names[nameIndex];
    
    if (!isDeleting) {
      // Typing
      if (charIndex < currentName.length) {
        const timeout = setTimeout(() => {
          setDisplayName(currentName.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Wait before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Wait 2 seconds before deleting
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayName(currentName.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50); // Deleting speed (faster)
        return () => clearTimeout(timeout);
      } else {
        // Move to next name
        setIsDeleting(false);
        setNameIndex((nameIndex + 1) % names.length);
      }
    }
  }, [charIndex, isDeleting, nameIndex, names]);

  // Health bar animation
  useEffect(() => {
    const healthValues = [75, 85, 90, 60, 95, 70, 80];
    let healthIndex = 0;

    const interval = setInterval(() => {
      setHealthPercentage(healthValues[healthIndex]);
      healthIndex = (healthIndex + 1) % healthValues.length;
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col text-black text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Top section: Portrait and basic info */}
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          {/* Image Portrait */}
          <div className="w-44 h-44 border-2 border-black bg-gray-300 p-1 flex items-end justify-center mb-2">
            <img 
              src={portraitImage} 
              alt="Character Portrait" 
              className="w-full h-full object-cover object-bottom"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="p-1 w-full text-center border-2 border-black bg-[#f7fafd]">
            <div>Dreamwalker</div>
            <div>INTP 9w8</div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold mb-2 min-h-[24px] flex items-center">
            {displayName}
            <span className="animate-pulse ml-1">|</span>
          </h3>
          {/* Health Bar */}
          <div className="w-full h-4 border-2 border-black p-0.5 mb-3">
            <div 
              className="bg-red-500 h-full transition-all duration-1000 ease-in-out" 
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          <div className="font-bold text-sm">
            <div>Class: Web & Game Dev</div>
            <div className="flex space-x-4">
              <span>INT ▷ 8</span>
              <span>WIS ▷ 8</span>
              <span>TEC ▷ 9</span>
            </div>
            <div className="flex space-x-4">
              <span>DEX ▷ 7</span>
              <span>EXP ▷ 10</span>
              <span>CRE ▷ 10</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle section: Description */}
      <div className="mt-4 pt-3 border-t-2 border-black">
        <p className="leading-relaxed">
          Informatics student passionate about game and web development, aspiring to become a jack-of-all-trades, blending creativity and logic like a witchcraft spell. Staying authentic above all else, with a soft spot for cowboys and raccoons.
        </p>
      </div>

      {/* Bottom section: Current Quest */}
      <div className="mt-4 pt-3 border-t-2 border-black flex-1">
        <h4 className="text-sm font-bold mb-2 text-black flex items-center">
          CURRENT QUEST
        </h4>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <FaClipboardList className="text-black text-xl mt-1 flex-shrink-0" />
            <div>
              <div className="font-bold">Main Quest: Internship Hunt</div>
              <div className="text-xs">Seeking web/game development internship opportunities for 2025</div>
              <div className="text-xs text-gray-600">Progress: Applications sent ▓▓▓░░ 60%</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaBolt className="text-black text-xl mt-1 flex-shrink-0" />
            <div>
              <div className="font-bold">Side Quest: Skill Enhancement</div>
              <div className="text-xs">Completing KADA Bootcamp</div>
              <div className="text-xs text-gray-600">Progress: Capstone Project underway...</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FaTrophy className="text-black text-xl mt-1 flex-shrink-0" />
            <div>
              <div className="font-bold">Long-term Goal: Portfolio Expansion</div>
              <div className="text-xs">Building 3 new projects before graduation</div>
              <div className="text-xs text-gray-600">Current: 1/3 completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
