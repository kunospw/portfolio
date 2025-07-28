// src/components/AchievementPage.jsx
import React from 'react';

const AchievementPage = () => (
  <div className="h-full flex flex-col text-black">
    <div className="flex-1">
       <h3 className="text-sm font-bold">Achievement</h3>
    </div>
    <div className="flex items-end justify-between text-xs font-bold">
      <div>(LE)</div>
      <div>(RB)</div>
    </div>
  </div>
);

export default AchievementPage;