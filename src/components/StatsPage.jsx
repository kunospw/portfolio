// src/components/StatsPage.jsx
import React from 'react';
import portraitImage from '../assets/potrait.png'; // Import your image

const StatsPage = () => (
  <div className="h-full flex flex-col text-black text-xs">
    {/* Top section: Portrait and basic info */}
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col items-center">
        {/* Image Portrait */}
        <div className="w-44 h-44 border-2 border-black bg-blue-900 p-1 flex items-end justify-center mb-2" style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}>
          <img 
            src={portraitImage} 
            alt="Character Portrait" 
            className="w-full h-full object-cover object-bottom"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="p-1 w-full text-center border-2 border-black bg-[#f7fafd]" style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}>
          <div>Dreamwalker</div>
          <div>INTP 9w8</div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold mb-2">Dyah Puspo Rini</h3>
        {/* Health Bar */}
        <div className="w-full h-4 border-2 border-black p-0.5 mb-3" style={{ borderColor: '#a7b5ba #f7fafd #f7fafd #a7b5ba' }}>
            <div className="bg-red-500 h-full" style={{ width: '75%' }}></div>
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
    
    {/* Bottom section: Description */}
    <div className="mt-4 pt-3 border-t-2 border-[#a7b5ba] flex-1">
      <p className="leading-relaxed">
        Informatics student passionate about game and web development, aspiring to become a jack-of-all-trades, blending creativity and logic like a witchcraft spell. Staying authentic above all else, with a soft spot for cowboys and raccoons.
      </p>
    </div>
  </div>
);

export default StatsPage;