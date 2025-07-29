// src/pages/SkillTreePage.jsx
import React, { useState } from 'react';

// A helper component for individual skill nodes with hover functionality
const SkillNode = ({ name, isCore, level }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex items-center justify-center w-24 h-16 m-2 rounded-md shadow-sm cursor-pointer transform hover:scale-105 transition-transform duration-200 text-black font-bold ${
        isCore 
          ? 'bg-[#cdd8dd] border-2 border-t-[#a7b5ba] border-l-[#a7b5ba] border-r-[#f7fafd] border-b-[#f7fafd]' 
          : 'bg-[#cdd8dd] border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center p-1">
        <h4 className="text-xs">
          {isHovered ? level : name}
        </h4>
      </div>
      
      {/* Optional: Add a small indicator for skill level */}
      {!isHovered && (
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
          level === 'Expert' ? 'bg-yellow-500' :
          level === 'Advanced' ? 'bg-blue-500' :
          level === 'Intermediate' ? 'bg-green-500' :
          'bg-gray-400'
        }`} />
      )}
    </div>
  );
};

// A component for each major skill category/branch
const SkillBranch = ({ title, skills }) => (
  <div className="flex flex-col items-center mb-4 p-2 bg-[#cdd8dd] rounded-lg border-2 border-t-[#f7fafd] border-l-[#f7fafd] border-r-[#a7b5ba] border-b-[#a7b5ba]">
    <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2">{title}</h3>
    <div className="relative flex flex-col items-center">
      {skills.map((skill, index) => (
        <React.Fragment key={skill.name}>
          {/* Render the connecting line for all but the first node */}
          {index > 0 && (
            <div className="w-0.5 h-6 bg-[#a7b5ba]" />
          )}
          <SkillNode {...skill} />
        </React.Fragment>
      ))}
    </div>
  </div>
);

// Main Skill Tree Page Component
const SkillTreePage = () => {
  // Updated data structure with skill levels
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

  return (
    <div className="w-full h-full p-2 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SkillBranch title={skillPaths.web.title} skills={skillPaths.web.skills} />
        <SkillBranch title={skillPaths.game.title} skills={skillPaths.game.skills} />
        <SkillBranch title={skillPaths.backend.title} skills={skillPaths.backend.skills} />
        <SkillBranch title={skillPaths.software.title} skills={skillPaths.software.skills} />
      </div>
    </div>
  );
};

export default SkillTreePage;
