import React, { useState, useEffect } from 'react';

// Enhanced skill node component with more interactive features
const SkillNode = ({ name, isCore, level, index, branchIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Stagger unlock animations based on position
    const unlockDelay = (branchIndex * 200) + (index * 150);
    const timer = setTimeout(() => setIsUnlocked(true), unlockDelay);
    return () => clearTimeout(timer);
  }, [index, branchIndex]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-yellow-500 border-yellow-700';
      case 'Advanced': return 'bg-blue-500 border-blue-700';
      case 'Intermediate': return 'bg-green-500 border-green-700';
      case 'Beginner': return 'bg-gray-400 border-gray-600';
      default: return 'bg-gray-400 border-gray-600';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Expert': return '⭐';
      case 'Advanced': return '💎';
      case 'Intermediate': return '🔷';
      case 'Beginner': return '🔸';
      default: return '❓';
    }
  };

  return (
    <div 
      className={`relative flex items-center justify-center w-24 h-16 m-2 rounded-md shadow-sm cursor-pointer transition-all duration-300 text-black font-bold group ${
        isCore 
          ? 'bg-[#cdd8dd] border-2 border-t-[#a7b5ba] border-l-[#a7b5ba] border-r-[#f7fafd] border-b-[#f7fafd]' 
          : 'bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba]'
      } ${isUnlocked ? 'animate-achievement-unlock' : 'opacity-0'} ${isHovered ? 'animate-skill-hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${(branchIndex * 0.2) + (index * 0.15)}s` }}
    >
      <div className="text-center p-1 relative z-10">
        <h4 className={`text-xs transition-all duration-300 ${
          isHovered ? 'animate-text-glitch' : ''
        }`}>
          {isHovered ? level : name}
        </h4>
        {isHovered && (
          <div className="text-xs mt-1 animate-cursor-blink">
            {getLevelIcon(level)}
          </div>
        )}
      </div>
      
      {/* Skill level indicator with enhanced styling */}
      {!isHovered && (
        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs animate-retro-pulse ${getLevelColor(level)}`}>
          <span className="text-white font-bold" style={{ fontSize: '8px' }}>
            {getLevelIcon(level)}
          </span>
        </div>
      )}

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-md transition-opacity duration-300 pointer-events-none ${
        level === 'Expert' ? 'bg-yellow-400' :
        level === 'Advanced' ? 'bg-blue-400' :
        level === 'Intermediate' ? 'bg-green-400' :
        'bg-gray-400'
      } ${isHovered ? 'opacity-20' : 'opacity-0'}`}></div>

      {/* Connection lines enhancement */}
      {isCore && (
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-red-500 rounded-full animate-retro-pulse" style={{ animationDelay: '2s' }}></div>
      )}
    </div>
  );
};

// Enhanced skill branch component
const SkillBranch = ({ title, skills, branchIndex }) => {
  const [branchVisible, setBranchVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBranchVisible(true), branchIndex * 300);
    return () => clearTimeout(timer);
  }, [branchIndex]);

  const getBranchIcon = (title) => {
    switch (title) {
      case 'Web Development': return '🌐';
      case 'Game Development': return '🎮';
      case 'Backend & Data': return '🗄️';
      case 'Software & Tools': return '🔧';
      default: return '📊';
    }
  };

  const getTotalXP = (skills) => {
    const xpValues = { Expert: 300, Advanced: 200, Intermediate: 100, Beginner: 50 };
    return skills.reduce((total, skill) => total + (xpValues[skill.level] || 0), 0);
  };

  return (
    <div className={`flex flex-col items-center mb-4 p-2 bg-[#cdd8dd] rounded-lg border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba] group ${
      branchVisible ? 'animate-window-open' : 'opacity-0'
    }`}>
      {/* Enhanced branch header */}
      <div className="text-center mb-3 group-hover:animate-text-glitch">
        <div className="text-lg animate-icon-bounce" style={{ animationDelay: `${branchIndex * 0.5}s` }}>
          {getBranchIcon(title)}
        </div>
        <h3 className="text-xs font-bold text-black uppercase tracking-wider">
          {title}
        </h3>
        <div className="text-xs text-gray-600 mt-1">
          <span className="animate-cursor-blink">XP: {getTotalXP(skills)}</span>
        </div>
      </div>

      {/* Skill tree visualization */}
      <div className="relative flex flex-col items-center">
        {skills.map((skill, index) => (
          <React.Fragment key={skill.name}>
            {/* Enhanced connecting line */}
            {index > 0 && (
              <div className="relative">
                <div className="w-0.5 h-6 bg-[#a7b5ba] animate-progress-load" style={{ animationDelay: `${(branchIndex * 0.5) + (index * 0.2)}s` }}></div>
                {/* Connection node */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 rounded-full animate-retro-pulse" style={{ animationDelay: `${(branchIndex * 0.5) + (index * 0.2) + 0.5}s` }}></div>
              </div>
            )}
            <SkillNode {...skill} index={index} branchIndex={branchIndex} />
          </React.Fragment>
        ))}
      </div>

      {/* Branch completion indicator */}
      <div className="mt-2 text-center animate-pixel-fade-in" style={{ animationDelay: `${(branchIndex + 1) * 0.8}s` }}>
        <div className="text-xs">
          <span className="inline-block w-16 h-1 bg-gray-300 border border-gray-500 mr-1 align-middle">
            <span 
              className="block h-full bg-blue-500 animate-progress-load" 
              style={{ 
                width: `${(skills.filter(s => s.level !== 'Beginner').length / skills.length) * 100}%`,
                animationDelay: `${(branchIndex + 2) * 0.5}s`
              }}
            ></span>
          </span>
          <span className="text-gray-600">Progress</span>
        </div>
      </div>
    </div>
  );
};

// Main Enhanced Skill Tree Page Component
const SkillTreePage = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const pageTimer = setTimeout(() => setPageLoaded(true), 200);
    const statsTimer = setTimeout(() => setStatsVisible(true), 2000);
    return () => {
      clearTimeout(pageTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  // Enhanced data structure with more detailed skill information
  const skillPaths = {
    web: {
      title: 'Web Development',
      skills: [
        { name: 'HTML', isCore: true, level: 'Advanced' },
        { name: 'CSS', isCore: true, level: 'Advanced' },
        { name: 'JavaScript', isCore: true, level: 'Intermediate' },
        { name: 'React', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Intermediate' },
        { name: 'Bootstrap', level: 'Intermediate' },
      ],
    },
    game: {
      title: 'Game Development',
      skills: [
        { name: 'C#', isCore: true, level: 'Intermediate' },
        { name: 'Unity', level: 'Intermediate' },
        { name: 'Blender', level: 'Beginner' },
      ],
    },
    backend: {
      title: 'Backend & Data',
      skills: [
        { name: 'SQL', isCore: true, level: 'Advanced' },
        { name: 'MySQL', level: 'Advanced' },
        { name: 'SQLite', level: 'Intermediate' },
        { name: 'Firebase', level: 'Beginner' },
        { name: 'REST API', level: 'Intermediate' },
      ],
    },
    software: {
      title: 'Software & Tools',
      skills: [
        { name: 'Git', isCore: true, level: 'Intermediate' },
        { name: 'Java', level: 'Intermediate' },
        { name: 'Android Studio', level: 'Beginner' },
        { name: 'Adobe Suite', level: 'Intermediate' },
      ]
    }
  };

  const getTotalSkills = () => {
    return Object.values(skillPaths).reduce((total, path) => total + path.skills.length, 0);
  };

  const getTotalXP = () => {
    const xpValues = { Expert: 300, Advanced: 200, Intermediate: 100, Beginner: 50 };
    return Object.values(skillPaths).reduce((total, path) => 
      total + path.skills.reduce((pathTotal, skill) => pathTotal + (xpValues[skill.level] || 0), 0), 0
    );
  };

  return (
    <div className={`w-full h-full p-2 text-xs ${pageLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Enhanced Header Section */}
      <div className="text-center mb-4 animate-carousel-slide" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-lg font-bold animate-text-glitch">
          🌟 Skill Tree System 🌟
        </h2>
        {statsVisible && (
          <div className="flex justify-center space-x-4 mt-2 text-xs animate-pixel-fade-in">
            <div className="bg-[#f7fafd] border border-[#a7b5ba] px-2 py-1 rounded">
              <span className="animate-cursor-blink">Skills: {getTotalSkills()}</span>
            </div>
            <div className="bg-[#f7fafd] border border-[#a7b5ba] px-2 py-1 rounded">
              <span className="text-blue-600 animate-retro-pulse">Total XP: {getTotalXP()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Skill Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SkillBranch 
          title={skillPaths.web.title} 
          skills={skillPaths.web.skills} 
          branchIndex={0}
        />
        <SkillBranch 
          title={skillPaths.game.title} 
          skills={skillPaths.game.skills} 
          branchIndex={1}
        />
        <SkillBranch 
          title={skillPaths.backend.title} 
          skills={skillPaths.backend.skills} 
          branchIndex={2}
        />
        <SkillBranch 
          title={skillPaths.software.title} 
          skills={skillPaths.software.skills} 
          branchIndex={3}
        />
      </div>

      {/* Enhanced Legend */}
      {statsVisible && (
        <div className="mt-4 p-3 bg-[#f7fafd] border-2 border-[#a7b5ba] rounded-lg animate-pixel-fade-in" style={{ animationDelay: '3s' }}>
          <h4 className="font-bold mb-2 text-center animate-text-glitch">Skill Level Legend</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <span className="animate-retro-pulse">⭐</span>
              <span>Expert (300 XP)</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="animate-retro-pulse" style={{ animationDelay: '0.2s' }}>💎</span>
              <span>Advanced (200 XP)</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="animate-retro-pulse" style={{ animationDelay: '0.4s' }}>🔷</span>
              <span>Intermediate (100 XP)</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="animate-retro-pulse" style={{ animationDelay: '0.6s' }}>🔸</span>
              <span>Beginner (50 XP)</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-red-500 animate-icon-bounce">🔴</span>
            <span className="ml-1">Core Skills</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTreePage;