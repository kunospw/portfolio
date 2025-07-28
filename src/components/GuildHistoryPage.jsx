// src/pages/GuildHistoryPage.jsx
import React, { useState } from 'react';

// Import your experience images
import Techx from '../assets/techx.jpg';
import TemuAlumni from '../assets/TemuAlumni.png';
import Magang from '../assets/Magang.png';
import WeBageLiber from '../assets/weBageLiber.png';

// Experience data
const experiences = [
  {
    id: 1,
    title: 'Decoration, Member, PUMA Informatics X PUMA Information System Tech Exploration 2024',
    duration: 'Jun 2024-Oct 2024',
    description: [
      'Worked collaboratively to create concept visual themes.',
      'Created custom event props needed to match the design direction.',
      'Assisted in venue and stage decoration for the Computer Science student event.',
    ],
    type: 'image',
    imageUrl: Techx,
  },
  {
    id: 2,
    title: 'Volunteer, Documentation Team, Social Project, Pulau Pramuka',
    duration: 'May 2024-Jun 2024',
    description: [
      'Designed banner and visual material for the exhibition.',
      'Edited recap videos and assisted in documentation during the event.',
      'Participated in mangrove planting activities on Pulau Pramuka as part of a group project environmental initiative.',
    ],
    type: 'video',
    embedUrl: 'https://www.youtube.com/embed/BLLQIHAuIlQ?si=EfuG7_SsRdqhIHTI',
  },
  {
    id: 3,
    title: 'Event Organizer, Person in Charge (PIC), PUMA Informatics Temu Alumni 2024',
    duration: 'Feb 2024 - May 2024',
    description: [
      'Curated the event theme and selected 2 alumni speakers aligned with the event\'s theme and goals.',
      'Designed the event rundown and managed venue setup and logistics.',
      'The event resulted in student access to a free Google Cloud bootcamp via Digitalent.',
    ],
    type: 'image',
    imageUrl: TemuAlumni,
  },
  {
    id: 4,
    title: 'Web Developer, Developer Team, WeBage Liber',
    duration: 'Sep 2022-Dec 2022',
    description: [
      'Developed a prototype school library website using HTML, CSS, and PHP.',
      'Built core page structures, styled front-end layout using Bootstrap, and implemented basic CRUD functions and form handling.',
      'Collaborated with school library staff to gather feedback and improve usability.',
    ],
    type: 'image',
    imageUrl: WeBageLiber,
  },
  {
    id: 5,
    title: 'Intern, Administrative Assistant, Teluk Pucung Sub-District Office',
    duration: 'Jan 2022 – Apr 2022',
    description: [
      'Organized and processed administrative documents for 30+ residents per day.',
      'Inputted and recapped PBB (Land and Building Tax) data from Excel into the government database system.',
      'Handled data entry for 4 RW, covering 40-120 RT and up to 1,600+ resident entries in total.',
    ],
    type: 'image',
    imageUrl: Magang,
  },
];

const GuildHistoryPage = () => {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);

  const goToNext = () => {
    setCurrentExperienceIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const goToPrevious = () => {
    setCurrentExperienceIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const currentExperience = experiences[currentExperienceIndex];

  return (
    <div className="w-full h-full p-4 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {experiences.length > 0 ? (
        <>
          {/* Carousel Navigation with LB/RB buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPrevious}
              className="px-3 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 text-xs hover:bg-gray-200 active:border-b-2"
              aria-label="Previous Experience"
            >
              LB
            </button>
            <h2 className="flex-grow text-sm text-gray-900 uppercase text-center mx-4">
              {currentExperience.title}
            </h2>
            <button
              onClick={goToNext}
              className="px-3 py-1 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg text-gray-800 text-xs hover:bg-gray-200 active:border-b-2"
              aria-label="Next Experience"
            >
              RB
            </button>
          </div>

          {/* Experience Display Area */}
          <div className="mb-4 text-center">
            {/* Logic to render IMAGE experiences */}
            {currentExperience.type === 'image' && currentExperience.imageUrl && (
              <div className="relative w-full mb-4" style={{ paddingTop: '56.25%' }}>
                <img
                  src={currentExperience.imageUrl}
                  alt={currentExperience.title}
                  className="absolute top-0 left-0 w-full h-full object-cover border border-gray-300"
                />
              </div>
            )}

            {/* Logic to render VIDEO experiences */}
            {currentExperience.type === 'video' && currentExperience.embedUrl && (
              <div className="relative w-full mb-4" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={currentExperience.embedUrl}
                  allowFullScreen
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="absolute top-0 left-0 border border-gray-300"
                  title={currentExperience.title}
                ></iframe>
              </div>
            )}

            <p className="text-blue-700 mb-2 text-xs">{currentExperience.duration}</p>
            <ul className="list-disc list-inside text-left space-y-1 text-xs">
              {currentExperience.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-center text-xs">No experience to display yet.</p>
      )}
    </div>
  );
};

export default GuildHistoryPage;