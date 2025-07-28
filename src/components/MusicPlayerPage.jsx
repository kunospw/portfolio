import React, { useState, useRef, useEffect } from 'react';
import songs from '../assets/songs';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const MusicPlayerPage = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInfo, setTimeInfo] = useState({ currentTime: 0, duration: 0 });
  const audioRef = useRef(new Audio(songs[currentSongIndex].url));
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].url;

    const setAudioData = () => {
      setTimeInfo({ duration: audio.duration, currentTime: audio.currentTime });
    };

    const setAudioTime = () => {
      setTimeInfo(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentSongIndex, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const handleProgressClick = (e) => {
    if (progressBarRef.current) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const newTime = (clickX / progressBarWidth) * timeInfo.duration;

        if (isFinite(newTime)) {
            audioRef.current.currentTime = newTime;
            setTimeInfo(prev => ({ ...prev, currentTime: newTime }));
        }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentSong = songs[currentSongIndex];
  const progressPercentage = timeInfo.duration ? (timeInfo.currentTime / timeInfo.duration) * 100 : 0;

  return (
    <div className="w-full h-full p-4 text-xs flex flex-col items-center justify-center text-black" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold mb-2">{currentSong.title}</h2>
        <p className="mb-4">{currentSong.artist}</p>
      </div>

      {/* Progress Bar and Time */}
      <div className="w-full mb-4">
        {/* Styled Pixel Progress Bar */}
        <div
          ref={progressBarRef}
          className="h-6 w-full bg-[#c0c0c0] border-2 cursor-pointer"
          style={{ borderColor: '#808080 #ffffff #ffffff #808080' }}
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(timeInfo.currentTime)}</span>
          <span>{formatTime(timeInfo.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        <button onClick={handlePrev} className="text-2xl hover:text-gray-500">
          <FaBackward />
        </button>
        <button onClick={handlePlayPause} className="text-4xl hover:text-gray-500">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext} className="text-2xl hover:text-gray-500">
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayerPage;