// src/pages/QuestLogPage.jsx
import React, { useState } from 'react';

// Import your project images
import Hanoman from '../assets/Hanoman.png';
import Faeza from '../assets/Webapp1.png';
import Foxie from '../assets/Foxie.png';
import Design from '../assets/Design.png';

// Project data
const projects = [
  {
    id: 1,
    name: 'Hanoman Adventure',
    type: 'game',
    imageUrl: Hanoman,
    embedUrl: 'https://itch.io/embed-upload/14241671?color=bababa',
    description: 'Story of hanoman in a pixel-art platformer game developed in Unity.',
  },
  {
    id: 2,
    name: 'Blessed Are the Peacemakers',
    type: 'game',
    imageUrl: 'https://via.placeholder.com/640x360/ffb6c1/000000?text=Mobile+App+1',
    embedUrl: 'https://itch.io/embed-upload/14252047?color=333333',
    description: 'Follow the story of Avery Ross, a woman who seeks justice for a crime she did not commit.',
  },
  {
    id: 3,
    name: 'Faeza Store Web App',
    type: 'web',
    imageUrl: Faeza,
    url: 'https://reseller-shop-project.vercel.app/',
    description: 'A form-based e-commerce site with an admin dashboard for product management using React.',
  },
  {
    id: 4,
    name: 'Foxie Website',
    type: 'web',
    imageUrl: Foxie,
    url: 'https://foxie-app.vercel.app/',
    description: 'A student productivity platform.',
  },
  {
    id: 5,
    name: 'Informatics Instagram Post Design',
    type: 'web',
    imageUrl: Design,
    url: 'https://www.instagram.com/informatics_presuniv/',
    description: 'Design for Informatics Instagram Post.',
  },
];

const QuestLogPage = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const goToNext = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const goToPrevious = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <div className="w-full h-full p-4 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {projects.length > 0 ? (
        <>
          {/* Carousel Navigation with LB/RB buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPrevious}
              className="px-5 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 font-bold text-sm hover:bg-gray-200 active:border-b-2"
              aria-label="Previous Project"
            >
              LB
            </button>
            <h2 className="flex-grow text-lg font-bold text-gray-900 uppercase text-center mx-4">
              {currentProject.name}
            </h2>
            <button
              onClick={goToNext}
              className="px-5 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 font-bold text-sm hover:bg-gray-200 active:border-b-2"
              aria-label="Next Project"
            >
              RB
            </button>
          </div>

          {/* Project Display Area */}
          <div className="mb-4">
            {/* Logic to render WEB projects */}
            {currentProject.type === 'web' && (
              <div>
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full block">
                    <img
                      src={currentProject.imageUrl}
                      alt={currentProject.name}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                <p className="mt-2 text-justify">{currentProject.description}</p>
                <p className="mt-2">
                  <a href={currentProject.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                    Visit Website
                  </a>
                </p>
              </div>
            )}

            {/* Logic to render GAME projects */}
            {currentProject.type === 'game' && (
              <div>
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={currentProject.embedUrl}
                    allowFullScreen
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="absolute top-0 left-0"
                    title={currentProject.name}
                  ></iframe>
                </div>
                <p className="mt-2 text-justify">{currentProject.description}</p>
                 <p className="mt-2">
                   You can play the game directly above! Go fullscreen if the resulution doesnt fit your screen.
                 </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">No projects to display yet. Add some!</p>
      )}
    </div>
  );
};

export default QuestLogPage;