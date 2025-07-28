// src/components/AchievementPage.jsx
import React, { useState } from 'react';
import { Trophy, Medal } from 'lucide-react';

// Data for achievements based on the user's CV
const achievements = [
  {
    id: 1,
    title: 'TOEIC Mastery',
    description: 'Achieved a score of 865, demonstrating advanced English proficiency.',
    date: '2023',
    tier: 'Gold',
  },
  {
    id: 2,
    title: 'Duolingo English Proficiency',
    description: 'Certified with a score of 120.',
    date: '2023',
    tier: 'Gold',
  },
  {
    id: 3,
    title: 'TOEIC Preparation',
    description: 'Completed a 20-hour preparation course with WELTS.',
    date: '2023',
    tier: 'Silver',
  },
];

// A component for displaying a single achievement in a "gamedev" style
const AchievementCard = ({ title, description, date, tier }) => (
  <div className="bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded-lg mb-3 flex items-center shadow-sm">
    <div className={`w-12 h-12 mr-3 flex items-center justify-center rounded-md border-2 text-white font-bold ${tier === 'Gold' ? 'bg-yellow-500 border-yellow-700' : 'bg-gray-500 border-gray-700'}`}>
      {tier === 'Gold' ? <Trophy size={24} /> : <Medal size={24} />}
    </div>
    <div className="flex-grow">
      <h4 className="font-bold text-black text-xs uppercase">{title}</h4>
      <p className="text-xs text-black mt-1">{description}</p>
      <p className="text-xs text-gray-600 mt-1">{date}</p>
    </div>
  </div>
);

const AchievementPage = () => {
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);

  // Check if navigation should be enabled (more than 10 achievements)
  const isNavigationEnabled = achievements.length > 10;

  const goToNext = () => {
    if (!isNavigationEnabled) return;
    setCurrentAchievementIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };

  const goToPrevious = () => {
    if (!isNavigationEnabled) return;
    setCurrentAchievementIndex((prevIndex) =>
      prevIndex === 0 ? achievements.length - 1 : prevIndex - 1
    );
  };

  const currentAchievement = achievements[currentAchievementIndex];

  return (
    <div className="h-full flex flex-col text-black p-3" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {achievements.length > 0 ? (
        <>
          {/* Carousel Navigation with LB/RB buttons */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={goToPrevious}
              className={`px-3 py-1 border-2 rounded-lg text-xs ${
                isNavigationEnabled 
                  ? 'bg-gray-300 border-gray-500 border-b-4 text-gray-800 hover:bg-gray-200 active:border-b-2 cursor-pointer' 
                  : 'bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              aria-label="Previous Achievement"
              disabled={!isNavigationEnabled}
            >
              LB
            </button>
            <h3 className="flex-grow text-sm font-bold text-black uppercase tracking-wider text-center mx-4">
              {isNavigationEnabled ? `Achievement ${currentAchievementIndex + 1} of ${achievements.length}` : 'Achievements'}
            </h3>
            <button
              onClick={goToNext}
              className={`px-3 py-1 border-2 rounded-lg text-xs ${
                isNavigationEnabled 
                  ? 'bg-gray-300 border-gray-500 border-b-4 text-gray-800 hover:bg-gray-200 active:border-b-2 cursor-pointer' 
                  : 'bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              aria-label="Next Achievement"
              disabled={!isNavigationEnabled}
            >
              RB
            </button>
          </div>

          {/* Achievement Display Area */}
          <div className="flex-1 overflow-y-auto">
            {isNavigationEnabled ? (
              <>
                <AchievementCard {...currentAchievement} />
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-600">
                    Viewing: {currentAchievement.title}
                  </span>
                </div>
              </>
            ) : (
              // Show all achievements if 10 or less exist
              <div>
                {achievements.map(achievement => (
                  <AchievementCard key={achievement.id} {...achievement} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-xs">No achievements to display yet.</p>
      )}
    </div>
  );
};

export default AchievementPage;
