import React, { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';

// Data for achievements based on the user's CV
const achievements = [
  {
    id: 1,
    title: 'ITB GIMJAM 2025',
    description: 'Nominated Favorite Game for the game Raturu: Homefever.',
    date: '2025',
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
    title: 'TOEIC Mastery',
    description: 'Achieved a score of 865.',
    date: '2022',
    tier: 'Gold',
  },
  {
    id: 4,
    title: 'TOEIC Preparation',
    description: 'Completed a 20-hour preparation course with WELTS.',
    date: '2022',
    tier: 'Silver',
  },
];

// Enhanced component for displaying a single achievement with unlock animation
const AchievementCard = ({ title, description, date, tier, isNew = false }) => {
  const [isUnlocked, setIsUnlocked] = useState(!isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsUnlocked(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <div className={`bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] p-2 rounded-lg mb-3 flex items-center shadow-sm pixel-button group ${isNew && !isUnlocked ? 'animate-achievement-unlock' : 'animate-pixel-fade-in'
      }`}>
      <div className={`w-12 h-12 mr-3 flex items-center justify-center rounded-md border-2 text-white font-bold transition-all duration-300 ${tier === 'Gold'
        ? 'bg-yellow-500 border-yellow-700 group-hover:bg-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-300'
        : 'bg-gray-500 border-gray-700 group-hover:bg-gray-400 group-hover:shadow-lg group-hover:shadow-gray-300'
        } ${isUnlocked ? 'animate-icon-bounce' : ''}`}>
        {tier === 'Gold' ?
          <Trophy size={24} className="animate-skill-hover" /> :
          <Medal size={24} className="animate-skill-hover" />
        }
      </div>
      <div className="flex-grow">
        <h4 className={`font-bold text-black text-xs uppercase group-hover:animate-text-glitch ${tier === 'Gold' ? 'text-yellow-700' : 'text-gray-700'
          }`}>
          {title}
        </h4>
        <p className="text-xs text-black mt-1 group-hover:text-gray-700 transition-colors">
          {description}
        </p>
        <p className="text-xs text-gray-600 mt-1 animate-cursor-blink" style={{ animationDelay: '2s' }}>
          {date}
        </p>
      </div>
      {/* Achievement glow effect */}
      {tier === 'Gold' && (
        <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  );
};

const AchievementPage = () => {
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Check if navigation should be enabled (more than 10 achievements)
  const isNavigationEnabled = achievements.length > 10;

  const goToNext = () => {
    if (!isNavigationEnabled || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentAchievementIndex((prevIndex) => (prevIndex + 1) % achievements.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToPrevious = () => {
    if (!isNavigationEnabled || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentAchievementIndex((prevIndex) =>
        prevIndex === 0 ? achievements.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  const currentAchievement = achievements[currentAchievementIndex];

  return (
    <div className={`h-full flex flex-col text-black p-3 ${pageVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {achievements.length > 0 ? (
        <>
          {/* Enhanced Carousel Navigation with animated buttons */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={goToPrevious}
              className={`px-3 py-1 border-2 rounded-lg text-xs pixel-button transition-all duration-200 ${isNavigationEnabled && !isTransitioning
                ? 'bg-gray-300 border-gray-500 border-b-4 text-gray-800 hover:bg-gray-200 active:border-b-2 cursor-pointer animate-icon-bounce'
                : 'bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              aria-label="Previous Achievement"
              disabled={!isNavigationEnabled || isTransitioning}
            >
              LB
            </button>
            <h3 className="flex-grow text-sm font-bold text-black uppercase tracking-wider text-center mx-4 animate-text-glitch">
              {isNavigationEnabled ? `Achievement ${currentAchievementIndex + 1} of ${achievements.length}` : 'Achievements'}
            </h3>
            <button
              onClick={goToNext}
              className={`px-3 py-1 border-2 rounded-lg text-xs pixel-button transition-all duration-200 ${isNavigationEnabled && !isTransitioning
                ? 'bg-gray-300 border-gray-500 border-b-4 text-gray-800 hover:bg-gray-200 active:border-b-2 cursor-pointer animate-icon-bounce'
                : 'bg-gray-200 border-gray-400 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              aria-label="Next Achievement"
              disabled={!isNavigationEnabled || isTransitioning}
              style={{ animationDelay: '0.2s' }}
            >
              RB
            </button>
          </div>

          {/* Enhanced Achievement Display Area */}
          <div className="flex-1 overflow-y-auto">
            {isNavigationEnabled ? (
              <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <AchievementCard {...currentAchievement} isNew={false} />
                <div className="text-center mt-3 animate-pixel-fade-in" style={{ animationDelay: '0.5s' }}>
                  <span className="text-xs text-gray-600 animate-cursor-blink">
                    Viewing: {currentAchievement.title}
                  </span>
                  {/* Achievement stats */}
                  <div className="mt-2 text-xs">
                    <span className="inline-block w-16 h-1 bg-gray-300 border border-gray-500 mr-2 align-middle">
                      <span
                        className="block h-full bg-blue-500 animate-progress-load"
                        style={{ width: `${((currentAchievementIndex + 1) / achievements.length) * 100}%` }}
                      ></span>
                    </span>
                    Progress: {Math.round(((currentAchievementIndex + 1) / achievements.length) * 100)}%
                  </div>
                </div>
              </div>
            ) : (
              // Enhanced display for all achievements with staggered animations
              <div>
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="animate-carousel-slide"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AchievementCard {...achievement} />
                  </div>
                ))}
                {/* Achievement summary */}
                <div className="text-center mt-4 p-3 bg-[#f7fafd] border-2 border-[#a7b5ba] rounded-lg animate-pixel-fade-in" style={{ animationDelay: '1s' }}>
                  <div className="text-xs">
                    <div className="font-bold animate-text-glitch">Achievement Summary</div>
                    <div className="mt-1">
                      Gold: {achievements.filter(a => a.tier === 'Gold').length} •
                      Silver: {achievements.filter(a => a.tier === 'Silver').length}
                    </div>
                    <div className="mt-1">
                      Total Unlocked: {achievements.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-pixel-fade-in">
            <div className="pixel-spinner mx-auto mb-4"></div>
            <p className="text-xs animate-cursor-blink">No achievements to display yet.</p>
            <p className="text-xs mt-2 text-gray-600">Complete quests to unlock achievements!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementPage;