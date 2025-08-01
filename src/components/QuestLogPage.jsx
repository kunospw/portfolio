import React, { useState, useEffect } from 'react';

// Import your project images
import Hanoman from '../assets/Hanoman.png';
import Faeza from '../assets/Webapp1.png';
import Foxie from '../assets/Foxie.png';
import Design from '../assets/Design.png';
import Raturu from '../assets/Raturu.png';


// Updated project data with video support
const projects = [
  {
    id: 1,
    name: 'Hanoman Adventure',
    type: 'game',
    imageUrl: Hanoman,
    embedUrl: 'https://itch.io/embed-upload/14241671?color=bababa',
    description: 'Story of hanoman in a pixel-art platformer game developed in Unity for a commission project collaboration.',
    status: 'completed',
    difficulty: 'Medium',
    xp: 1500,
  },
  {
    id: 2,
    name: 'Blessed Are the Peacemakers',
    type: 'game',
    imageUrl: 'https://via.placeholder.com/640x360/ffb6c1/000000?text=Mobile+App+1',
    embedUrl: 'https://itch.io/embed-upload/14252047?color=333333',
    description: 'Follow the story of Avery Ross, a woman who seeks justice for a crime she did not commit. pixel-art game developed in Unity for academic project.',
    status: 'completed',
    difficulty: 'Medium',
    xp: 1200,
  },
  {
    id: 3,
    name: 'Raturu: Homefever',
    type: 'game',
    imageUrl: Raturu,
    url: 'https://baraaaa.itch.io/raturu-home-fever',
    description: 'RATURU : Home Fever, you step into the feverish dreams of a young child battling a high fever. Made for GIMJAM ITB 2025.',
    status: 'completed',
    difficulty: 'Medium',
    xp: 1200,
  },
  {
    id: 4,
    name: 'Faeza Store Web App',
    type: 'web',
    imageUrl: Faeza,
    url: 'https://reseller-shop-project.vercel.app/',
    description: 'A form-based e-commerce site with an admin dashboard for product management using React and Firebase.',
    status: 'completed',
    difficulty: 'Medium',
    xp: 1000,
  },
  {
    id: 5,
    name: 'Foxie Website',
    type: 'web',
    imageUrl: Foxie,
    url: 'https://foxie-app.vercel.app/',
    description: 'A student productivity platform.',
    status: 'completed',
    difficulty: 'Easy',
    xp: 800,
  },
  {
    id: 6,
    name: 'Informatics Instagram Post Design',
    type: 'web',
    imageUrl: Design,
    url: 'https://www.instagram.com/informatics_presuniv/',
    description: 'Design for Informatics Instagram Post.',
    status: 'completed',
    difficulty: 'Easy',
    xp: 600,
  },
  // NEW: Video Animation Project
  {
    id: 7,
    name: 'Ancient Egypt Animation',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/bOSITPwlA9A?si=0q9DxMctK2g4wbAf', // YouTube embed URL
    url: 'https://youtu.be/bOSITPwlA9A', // External link
    description: 'An animation of ancient Egypt inspired by Moonknight.',
    status: 'completed',
    difficulty: 'Hard',
    xp: 900,
  },
];

const QuestLogPage = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
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
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setIsTransitioning(false);
    }, 200);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProjectIndex((prevIndex) =>
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 200);
  };

  const currentProject = projects[currentProjectIndex];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyStars = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '*';
      case 'Medium': return '**';
      case 'Hard': return '***';
      default: return '*';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'COMPLETE';
      case 'in-progress': return 'IN PROGRESS';
      case 'locked': return 'LOCKED';
      default: return 'UNKNOWN';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'game': return 'text-green-600';
      case 'web': return 'text-blue-600';
      case 'video': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'game': return 'GAME';
      case 'web': return 'WEB';
      case 'video': return 'VIDEO';
      default: return 'PROJECT';
    }
  };

  const isYouTubeUrl = (url) => {
    return url && url.includes('youtube.com/embed');
  };

  return (
    <div className={`w-full h-full p-4 text-xs ${pageVisible ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {projects.length > 0 ? (
        <>
          {/* Enhanced Carousel Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPrevious}
              className="px-5 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 font-bold text-sm hover:bg-gray-200 active:border-b-2 pixel-button animate-icon-bounce transition-all duration-200"
              aria-label="Previous Project"
              disabled={isTransitioning}
              style={{ animationDelay: '0.2s' }}
            >
              LB
            </button>
            <div className="flex-grow text-center mx-4">
              <h2 className="text-lg font-bold text-gray-900 uppercase animate-text-glitch">
                {currentProject.name}
              </h2>
              <div className="flex justify-center items-center space-x-2 mt-1">
                <span className={`text-xs font-bold ${getTypeColor(currentProject.type)} animate-retro-pulse`}>
                  {getTypeBadge(currentProject.type)}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="animate-achievement-unlock" style={{ animationDelay: '0.5s' }}>
                  {getDifficultyStars(currentProject.difficulty)}
                </span>
                <span className={`text-xs ${getDifficultyColor(currentProject.difficulty)} animate-retro-pulse`}>
                  {currentProject.difficulty}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-blue-600 animate-cursor-blink">
                  {currentProject.xp} XP
                </span>
                <span className="text-xs animate-achievement-unlock" style={{ animationDelay: '1s' }}>
                  {getStatusIcon(currentProject.status)}
                </span>
              </div>
            </div>
            <button
              onClick={goToNext}
              className="px-5 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 font-bold text-sm hover:bg-gray-200 active:border-b-2 pixel-button animate-icon-bounce transition-all duration-200"
              aria-label="Next Project"
              disabled={isTransitioning}
              style={{ animationDelay: '0.4s' }}
            >
              RB
            </button>
          </div>

          {/* Enhanced Project Display Area */}
          <div className={`mb-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            
            {/* Logic to render VIDEO projects */}
            {currentProject.type === 'video' && (
              <div className={questUnlocked ? 'animate-pixel-fade-in' : 'opacity-0'}>
                {/* Check if video has embed URL or just external link */}
                {currentProject.videoUrl ? (
                  isYouTubeUrl(currentProject.videoUrl) ? (
                    // YouTube embedded video
                    <div className="relative w-full mb-4 border-2 border-gray-400 group" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        src={currentProject.videoUrl}
                        allowFullScreen
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="absolute top-0 left-0 group-hover:animate-skill-hover transition-transform duration-300"
                        title={currentProject.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                      {/* Video overlay */}
                      <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                      {/* Video badge */}
                      <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    // Direct video file
                    <div className="relative w-full mb-4 border-2 border-gray-400 group" style={{ paddingTop: '56.25%' }}>
                      <video
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:animate-skill-hover transition-transform duration-300"
                        style={{ imageRendering: 'pixelated' }}
                      >
                        <source src={currentProject.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Video overlay */}
                      <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                      {/* Video badge */}
                      <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                        VIDEO
                      </div>
                    </div>
                  )
                ) : (
                  // Image thumbnail with external link
                  <div className="relative w-full mb-4 group" style={{ paddingTop: '56.25%' }}>
                    <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full block">
                      <img
                        src={currentProject.imageUrl}
                        alt={currentProject.name}
                        className="w-full h-full object-cover border-2 border-gray-400 group-hover:border-purple-500 transition-all duration-300 group-hover:animate-skill-hover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      {/* Video overlay effect */}
                      <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-4 group-hover:animate-icon-bounce">
                          <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      {/* Click indicator overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold animate-icon-bounce mt-16">
                          Watch Video
                        </div>
                      </div>
                      {/* Video badge */}
                      <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                        VIDEO
                      </div>
                    </a>
                  </div>
                )}

                {/* Video Quest Details */}
                <div className="bg-[#f7fafd] border-2 border-[#a7b5ba] p-3 rounded-lg mb-3 animate-carousel-slide" style={{ animationDelay: '0.3s' }}>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <span className="animate-icon-bounce mr-2">{getDifficultyStars(currentProject.difficulty)}</span>
                    <span className="animate-text-glitch">Animation Quest:</span>
                  </h4>
                  <p className="text-justify leading-relaxed">{currentProject.description}</p>
                </div>

                {/* Video Controls */}
                <div className="bg-[#cdd8dd] border-2 border-[#a7b5ba] p-3 rounded-lg animate-carousel-slide" style={{ animationDelay: '0.5s' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold">Video Status:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-purple-600 animate-retro-pulse">AVAILABLE</span>
                      <span className="animate-achievement-unlock">COMPLETE</span>
                    </div>
                  </div>
                  {currentProject.videoUrl ? (
                    <p className="text-xs animate-cursor-blink">
                      You can watch the video directly above! Click fullscreen for better viewing experience.
                    </p>
                  ) : (
                    <p className="text-xs animate-cursor-blink">
                      Click the thumbnail above to watch this video!
                    </p>
                  )}
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Quest Progress:</span>
                      <span className="text-xs text-purple-600">100%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-300 border border-gray-500">
                      <div className="h-full bg-purple-500 animate-progress-load" style={{ width: '100%', animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  {/* External link button for videos */}
                  {currentProject.url && (
                    <a 
                      href={currentProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 inline-block px-3 py-1 bg-purple-500 border-2 border-b-4 border-purple-700 rounded-lg text-white text-xs hover:bg-purple-400 active:border-b-2 pixel-button font-bold animate-achievement-unlock"
                      style={{ animationDelay: '1.2s' }}
                    >
                      Watch on Platform
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Logic to render WEB projects */}
            {currentProject.type === 'web' && (
              <div className={questUnlocked ? 'animate-pixel-fade-in' : 'opacity-0'}>
                <div className="relative w-full mb-4 group" style={{ paddingTop: '56.25%' }}>
                  <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full block">
                    <img
                      src={currentProject.imageUrl}
                      alt={currentProject.name}
                      className="w-full h-full object-cover border-2 border-gray-400 group-hover:border-blue-500 transition-all duration-300 group-hover:animate-skill-hover"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold animate-icon-bounce">
                        Click to Visit
                      </div>
                    </div>
                  </a>
                </div>
                
                <div className="bg-[#f7fafd] border-2 border-[#a7b5ba] p-3 rounded-lg mb-3 animate-carousel-slide" style={{ animationDelay: '0.3s' }}>
                  <h4 className="font-bold text-black mb-2 animate-text-glitch">Quest Details:</h4>
                  <p className="text-justify leading-relaxed">{currentProject.description}</p>
                </div>

                <div className="bg-[#cdd8dd] border-2 border-[#a7b5ba] p-3 rounded-lg animate-carousel-slide" style={{ animationDelay: '0.5s' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">Quest Reward:</span>
                    <span className="text-xs text-blue-600 animate-retro-pulse">{currentProject.xp} XP</span>
                  </div>
                  <a 
                    href={currentProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 inline-block px-3 py-1 bg-blue-500 border-2 border-b-4 border-blue-700 rounded-lg text-white text-xs hover:bg-blue-400 active:border-b-2 pixel-button font-bold animate-achievement-unlock"
                    style={{ animationDelay: '0.8s' }}
                  >
                    Visit Quest Site
                  </a>
                </div>
              </div>
            )}

            {/* Logic to render GAME projects */}
            {currentProject.type === 'game' && (
              <div className={questUnlocked ? 'animate-pixel-fade-in' : 'opacity-0'}>
                {currentProject.embedUrl ? (
                  <div className="relative w-full mb-4 border-2 border-gray-400 group" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src={currentProject.embedUrl}
                      allowFullScreen
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute top-0 left-0 group-hover:animate-skill-hover transition-transform duration-300"
                      title={currentProject.name}
                      style={{ imageRendering: 'pixelated' }}
                    ></iframe>
                    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="relative w-full mb-4 group" style={{ paddingTop: '56.25%' }}>
                    <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full block">
                      <img
                        src={currentProject.imageUrl}
                        alt={currentProject.name}
                        className="w-full h-full object-cover border-2 border-gray-400 group-hover:border-green-500 transition-all duration-300 group-hover:animate-skill-hover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold animate-icon-bounce">
                          Play on itch.io
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs animate-achievement-unlock" style={{ animationDelay: '0.8s' }}>
                        GAME
                      </div>
                    </a>
                  </div>
                )}

                <div className="bg-[#f7fafd] border-2 border-[#a7b5ba] p-3 rounded-lg mb-3 animate-carousel-slide" style={{ animationDelay: '0.3s' }}>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <span className="animate-icon-bounce mr-2">{getDifficultyStars(currentProject.difficulty)}</span>
                    <span className="animate-text-glitch">Game Quest:</span>
                  </h4>
                  <p className="text-justify leading-relaxed">{currentProject.description}</p>
                </div>

                <div className="bg-[#cdd8dd] border-2 border-[#a7b5ba] p-3 rounded-lg animate-carousel-slide" style={{ animationDelay: '0.5s' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold">Game Status:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 animate-retro-pulse">PLAYABLE</span>
                      <span className="animate-achievement-unlock">COMPLETE</span>
                    </div>
                  </div>
                  {currentProject.embedUrl ? (
                    <p className="text-xs animate-cursor-blink">
                      You can play the game directly above! Go fullscreen if the resolution doesn't fit your screen.
                    </p>
                  ) : (
                    <p className="text-xs animate-cursor-blink">
                      Click the image above to play this game on itch.io!
                    </p>
                  )}
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Quest Progress:</span>
                      <span className="text-xs text-green-600">100%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-300 border border-gray-500">
                      <div className="h-full bg-green-500 animate-progress-load" style={{ width: '100%', animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  {!currentProject.embedUrl && currentProject.url && (
                    <a 
                      href={currentProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 inline-block px-3 py-1 bg-green-500 border-2 border-b-4 border-green-700 rounded-lg text-white text-xs hover:bg-green-400 active:border-b-2 pixel-button font-bold animate-achievement-unlock"
                      style={{ animationDelay: '1.2s' }}
                    >
                      Play on itch.io
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quest Navigation Indicator */}
            <div className="text-center mt-4 animate-pixel-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex justify-center space-x-1 mb-2">
                {projects.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 border border-gray-500 transition-all duration-300 ${
                      index === currentProjectIndex 
                        ? 'bg-blue-500 animate-retro-pulse' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{ imageRendering: 'pixelated' }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 animate-cursor-blink">
                Quest {currentProjectIndex + 1} of {projects.length}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-pixel-fade-in">
            <div className="pixel-spinner mx-auto mb-4"></div>
            <p className="text-center animate-cursor-blink">No quests available yet.</p>
            <p className="text-xs mt-2 text-gray-600">Check back later for new adventures!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestLogPage;