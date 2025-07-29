import React, { useState, useEffect } from 'react';

// Import your experience images
import Techx from '../assets/techx.jpg';
import TemuAlumni from '../assets/TemuAlumni.png';
import Magang from '../assets/Magang.png';
import WeBageLiber from '../assets/WeBageLiber.png';

// Enhanced experience data with additional metadata
const experiences = [
  {
    id: 1,
    title: 'Decoration, Member, PUMA Informatics X PUMA Information System Tech Exploration 2024',
    shortTitle: 'Tech Exploration 2024',
    duration: 'Jun 2024-Oct 2024',
    description: [
      'Worked collaboratively to create concept visual themes.',
      'Created custom event props needed to match the design direction.',
      'Assisted in venue and stage decoration for the Computer Science student event.',
    ],
    type: 'image',
    imageUrl: Techx,
    guild: 'PUMA Informatics',
    role: 'Decorator',
    xp: 800,
    difficulty: 'Medium',
    tags: ['Design', 'Teamwork', 'Event Management'],
  },
  {
    id: 2,
    title: 'Volunteer, Documentation Team, Social Project, Pulau Pramuka',
    shortTitle: 'Pulau Pramuka Social Project',
    duration: 'May 2024-Jun 2024',
    description: [
      'Designed banner and visual material for the exhibition.',
      'Edited recap videos and assisted in documentation during the event.',
      'Participated in mangrove planting activities on Pulau Pramuka as part of a group project environmental initiative.',
    ],
    type: 'video',
    embedUrl: 'https://www.youtube.com/embed/BLLQIHAuIlQ?si=EfuG7_SsRdqhIHTI',
    guild: 'Social Project',
    role: 'Documentation Lead',
    xp: 1000,
    difficulty: 'Hard',
    tags: ['Environment', 'Documentation', 'Video Editing'],
  },
  {
    id: 3,
    title: 'Event Organizer, Person in Charge (PIC), PUMA Informatics Temu Alumni 2024',
    shortTitle: 'Temu Alumni 2024',
    duration: 'Feb 2024 - May 2024',
    description: [
      'Curated the event theme and selected 2 alumni speakers aligned with the event\'s theme and goals.',
      'Designed the event rundown and managed venue setup and logistics.',
      'The event resulted in student access to a free Google Cloud bootcamp via Digitalent.',
    ],
    type: 'image',
    imageUrl: TemuAlumni,
    guild: 'PUMA Informatics',
    role: 'Event Organizer',
    xp: 1200,
    difficulty: 'Hard',
    tags: ['Leadership', 'Event Planning', 'Networking'],
  },
  {
    id: 4,
    title: 'Web Developer, Developer Team, WeBage Liber',
    shortTitle: 'WeBage Liber Development',
    duration: 'Sep 2022-Dec 2022',
    description: [
      'Developed a prototype school library website using HTML, CSS, and PHP.',
      'Built core page structures, styled front-end layout using Bootstrap, and implemented basic CRUD functions and form handling.',
      'Collaborated with school library staff to gather feedback and improve usability.',
    ],
    type: 'image',
    imageUrl: WeBageLiber,
    guild: 'CharBage',
    role: 'Web Developer',
    xp: 900,
    difficulty: 'Medium',
    tags: ['Web Development', 'PHP', 'Bootstrap'],
  },
  {
    id: 5,
    title: 'Intern, Administrative Assistant, Teluk Pucung Sub-District Office',
    shortTitle: 'Government Internship',
    duration: 'Jan 2022 – Apr 2022',
    description: [
      'Organized and processed administrative documents for 30+ residents per day.',
      'Inputted and recapped PBB (Land and Building Tax) data from Excel into the government database system.',
      'Handled data entry for 4 RW, covering 40-120 RT and up to 1,600+ resident entries in total.',
    ],
    type: 'image',
    imageUrl: Magang,
    guild: 'Government Office',
    role: 'Administrative Assistant',
    xp: 700,
    difficulty: 'Easy',
    tags: ['Administration', 'Data Entry', 'Government'],
  },
];

const GuildHistoryPage = () => {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [questUnlocked, setQuestUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageVisible(true), 200);
    const questTimer = setTimeout(() => setQuestUnlocked(true), 800);
    return () => {
      clearTimeout(timer);
      clearTimeout(questTimer);
    };
  }, []);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentExperienceIndex((prevIndex) => (prevIndex + 1) % experiences.length);
      setIsTransitioning(false);
    }, 200);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentExperienceIndex((prevIndex) =>
        prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 200);
  };

  const currentExperience = experiences[currentExperienceIndex];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Event Organizer': return '👑';
      case 'Web Developer': return '💻';
      case 'Documentation Lead': return '📹';
      case 'Decorator': return '🎨';
      case 'Administrative Assistant': return '📋';
      default: return '⚡';
    }
  };

  const getTotalXP = () => {
    return experiences.reduce((total, exp) => total + exp.xp, 0);
  };

  return (
    <div className={`w-full h-full p-4 text-xs ${pageVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {experiences.length > 0 ? (
        <>
          {/* Enhanced Header with Guild Stats */}
          <div className="text-center mb-4 animate-carousel-slide" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-bold animate-text-glitch">
              🏛️ Guild History Chronicles 🏛️
            </h2>
            <div className="flex justify-center space-x-3 mt-2 text-xs">
              <div className="bg-[#f7fafd] border border-[#a7b5ba] px-2 py-1 rounded animate-pixel-fade-in" style={{ animationDelay: '1s' }}>
                <span className="animate-cursor-blink">Missions: {experiences.length}</span>
              </div>
              <div className="bg-[#f7fafd] border border-[#a7b5ba] px-2 py-1 rounded animate-pixel-fade-in" style={{ animationDelay: '1.2s' }}>
                <span className="text-blue-600 animate-retro-pulse">Total XP: {getTotalXP()}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Carousel Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPrevious}
              className="px-3 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 text-xs hover:bg-gray-200 active:border-b-2 pixel-button animate-icon-bounce transition-all duration-200"
              aria-label="Previous Experience"
              disabled={isTransitioning}
              style={{ animationDelay: '0.2s' }}
            >
              LB
            </button>
            <div className="flex-grow text-center mx-4">
              <h3 className="text-sm text-gray-900 uppercase animate-text-glitch">
                {currentExperience.shortTitle}
              </h3>
              <div className="flex justify-center items-center space-x-2 mt-1">
                <span className="animate-achievement-unlock" style={{ animationDelay: '0.5s' }}>
                  {getRoleIcon(currentExperience.role)}
                </span>
                <span className={`text-xs px-1 rounded ${getDifficultyColor(currentExperience.difficulty)} animate-retro-pulse`}>
                  {currentExperience.difficulty}
                </span>
                <span className="text-xs text-blue-600 animate-cursor-blink">
                  {currentExperience.xp} XP
                </span>
              </div>
            </div>
            <button
              onClick={goToNext}
              className="px-3 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 text-xs hover:bg-gray-200 active:border-b-2 pixel-button animate-icon-bounce transition-all duration-200"
              aria-label="Next Experience"
              disabled={isTransitioning}
              style={{ animationDelay: '0.4s' }}
            >
              RB
            </button>
          </div>

          {/* Enhanced Experience Display Area */}
          <div className={`mb-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            {/* Logic to render IMAGE experiences */}
            {currentExperience.type === 'image' && currentExperience.imageUrl && (
              <div className={questUnlocked ? 'animate-pixel-fade-in' : 'opacity-0'}>
                <div className="relative w-full mb-4 group" style={{ paddingTop: '56.25%' }}>
                  <img
                    src={currentExperience.imageUrl}
                    alt={currentExperience.title}
                    className="absolute top-0 left-0 w-full h-full object-cover border-2 border-gray-300 group-hover:border-blue-500 transition-all duration-300 group-hover:animate-skill-hover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Image overlay effect */}
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {/* Guild badge overlay */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                    🏛️ {currentExperience.guild}
                  </div>
                </div>
              </div>
            )}

            {/* Logic to render VIDEO experiences */}
            {currentExperience.type === 'video' && currentExperience.embedUrl && (
              <div className={questUnlocked ? 'animate-pixel-fade-in' : 'opacity-0'}>
                <div className="relative w-full mb-4 group" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={currentExperience.embedUrl}
                    allowFullScreen
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="absolute top-0 left-0 border-2 border-gray-300 group-hover:border-green-500 transition-all duration-300 group-hover:animate-skill-hover"
                    title={currentExperience.title}
                    style={{ imageRendering: 'pixelated' }}
                  ></iframe>
                  {/* Video overlay effect */}
                  <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                  {/* Guild badge overlay */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                    🏛️ {currentExperience.guild}
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Mission Details Panel */}
            <div className="bg-[#f7fafd] border-2 border-[#a7b5ba] p-3 rounded-lg mb-3 animate-carousel-slide" style={{ animationDelay: '0.5s' }}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-black flex items-center">
                  <span className="animate-icon-bounce mr-2">{getRoleIcon(currentExperience.role)}</span>
                  <span className="animate-text-glitch">Mission Report</span>
                </h4>
                <div className="text-xs text-blue-700 animate-cursor-blink">
                  {currentExperience.duration}
                </div>
              </div>
              
              {/* Mission objectives */}
              <div className="mb-3">
                <h5 className="text-xs font-bold mb-1">Mission Objectives:</h5>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {currentExperience.description.map((item, idx) => (
                    <li key={idx} className="animate-carousel-slide" style={{ animationDelay: `${0.7 + (idx * 0.1)}s` }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mission tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {currentExperience.tags.map((tag, idx) => (
                  <span 
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded border animate-pixel-fade-in" 
                    style={{ animationDelay: `${1 + (idx * 0.1)}s` }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced Guild Status Panel */}
            <div className="bg-[#cdd8dd] border-2 border-[#a7b5ba] p-3 rounded-lg animate-carousel-slide" style={{ animationDelay: '0.7s' }}>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold">Guild:</span>
                  <div className="animate-text-glitch">{currentExperience.guild}</div>
                </div>
                <div>
                  <span className="font-bold">Role:</span>
                  <div className="flex items-center">
                    <span className="mr-1 animate-retro-pulse">{getRoleIcon(currentExperience.role)}</span>
                    {currentExperience.role}
                  </div>
                </div>
                <div>
                  <span className="font-bold">Mission Difficulty:</span>
                  <div className={`${getDifficultyColor(currentExperience.difficulty)} px-1 rounded`}>
                    {currentExperience.difficulty}
                  </div>
                </div>
                <div>
                  <span className="font-bold">XP Earned:</span>
                  <div className="text-blue-600 animate-retro-pulse">{currentExperience.xp} XP</div>
                </div>
              </div>

              {/* Mission completion bar */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">Mission Status:</span>
                  <span className="text-xs text-green-600 animate-achievement-unlock">COMPLETED ✓</span>
                </div>
                <div className="w-full h-2 bg-gray-300 border border-gray-500">
                  <div className="h-full bg-green-500 animate-progress-load" style={{ width: '100%', animationDelay: '1.5s' }}></div>
                </div>
              </div>
            </div>

            {/* Navigation and Progress Indicator */}
            <div className="text-center mt-4 animate-pixel-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="flex justify-center space-x-1 mb-2">
                {experiences.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 border border-gray-500 transition-all duration-300 ${
                      index === currentExperienceIndex 
                        ? 'bg-blue-500 animate-retro-pulse' 
                        : index < currentExperienceIndex
                          ? 'bg-green-500'
                          : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{ imageRendering: 'pixelated' }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-600 animate-cursor-blink">
                Guild Mission {currentExperienceIndex + 1} of {experiences.length}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                <span className="inline-block w-20 h-1 bg-gray-300 border border-gray-500 mr-2 align-middle">
                  <span 
                    className="block h-full bg-blue-500 animate-progress-load" 
                    style={{ 
                      width: `${((currentExperienceIndex + 1) / experiences.length) * 100}%`,
                      animationDelay: '2s'
                    }}
                  ></span>
                </span>
                Chronicle Progress: {Math.round(((currentExperienceIndex + 1) / experiences.length) * 100)}%
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-pixel-fade-in">
            <div className="pixel-spinner mx-auto mb-4"></div>
            <p className="text-center animate-cursor-blink">No guild history to display yet.</p>
            <p className="text-xs mt-2 text-gray-600">Complete missions to build your guild reputation!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildHistoryPage;