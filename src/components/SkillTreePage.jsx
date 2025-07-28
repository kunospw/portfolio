// src/components/SkillTreePage.jsx
import React from 'react';

const SkillTreePage = () => (
  <div className="h-full flex flex-col">
    <div className="relative flex-1 flex items-center justify-center">
      {/* Hexagons are tricky, so this is a CSS approximation for the nodes */}
      <div className="grid grid-cols-3 gap-12 text-center">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="w-12 h-12 bg-gray-400 border-2 border-gray-600" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
          </div>
        ))}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{top: '10px', left: '10px'}}>
          <line x1="33%" y1="33%" x2="50%" y2="50%" stroke="#6b7280" strokeWidth="2"/>
          <line x1="50%" y1="33%" x2="50%" y2="50%" stroke="#6b7280" strokeWidth="2"/>
          <line x1="67%" y1="33%" x2="50%" y2="50%" stroke="#6b7280" strokeWidth="2"/>
          <line x1="50%" y1="50%" x2="33%" y2="67%" stroke="#6b7280" strokeWidth="2"/>
          <line x1="50%" y1="50%" x2="67%" y2="67%" stroke="#6b7280" strokeWidth="2"/>
      </svg>
    </div>
    <div className="flex items-end justify-between text-xs font-bold text-black">
      <div>(LE)</div>
      <div>(RB)</div>
    </div>
  </div>
);

export default SkillTreePage;