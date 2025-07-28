// src/components/QuestLogPage.jsx
import React from 'react';

const QuestLogPage = () => (
  <div className="h-full flex flex-col text-black">
    <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-sm font-bold mb-4">Game_name</h3>
        <div className="text-xs">Game_desc</div>
    </div>
    <div className="flex items-end justify-between text-xs font-bold">
        <div>(LE)</div>
        <div>(RB)</div>
    </div>
  </div>
);

export default QuestLogPage;