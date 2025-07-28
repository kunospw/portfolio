// src/components/GuildHistoryPage.jsx
import React from 'react';

const GuildHistoryPage = () => (
  <div className="h-full flex flex-col text-black">
    <div className="flex-1">
      <h3 className="text-sm font-bold mb-2">Activity</h3>
      <div className="text-xs">Activity desc</div>
    </div>
    <div className="flex items-end justify-between text-xs font-bold">
      <div>(LE)</div>
      <div>(RB)</div>
    </div>
  </div>
);

export default GuildHistoryPage;