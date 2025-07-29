import React, { useState, useRef, useEffect } from 'react';
import songs from '../assets/songs';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from 'react-icons/fa';

const MusicPlayerPage = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInfo, setTimeInfo] = useState({ currentTime: 0, duration: 0 });
  const [audioError, setAudioError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(new Audio(songs[currentSongIndex].url));
  const progressBarRef = useRef(null);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].url;

    const setAudioData = () => {
      setTimeInfo({ duration: audio.duration, currentTime: audio.currentTime });
      setAudioError(false);
    };

    const setAudioTime = () => {
      setTimeInfo(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleError = () => {
      setAudioError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('error', handleError);

    if (isPlaying && !audioError) {
      audio.play().catch(() => setAudioError(true));
    }

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSongIndex, isPlaying]);

  const handlePlayPause = () => {
    if (!audioError) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    if (progressBarRef.current && !audioError) {
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
    <div className="w-full h-full p-4 text-xs flex flex-col items-center justify-center text-black relative" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      
      {/* Error Display */}
      {audioError && (
        <div className="absolute top-2 left-2 right-2 p-2 bg-red-100 border-2 border-red-500 rounded text-center animate-notification-slide">
          <p className="text-red-800 text-xs animate-text-glitch">⚠️ Audio Error</p>
          <p className="text-red-600 text-xs">File not found: {currentSong.url}</p>
        </div>
      )}

      {/* Song Info with Animations */}
      <div className={`text-center mb-4 transition-all duration-500 ${isLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
        <h2 className={`text-sm font-bold mb-2 transition-all duration-300 ${isPlaying ? 'animate-text-glitch' : ''}`}>
          {currentSong.title}
        </h2>
        <p className="mb-2 text-gray-600 animate-cursor-blink" style={{ animationDelay: '1s' }}>
          {currentSong.artist}
        </p>
      </div>

      {/* Progress Bar and Time with Enhanced Styling */}
      <div className={`w-full mb-4 transition-all duration-500 ${isLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
        {/* Retro Progress Bar */}
        <div
          ref={progressBarRef}
          className="h-6 w-full bg-[#c0c0c0] border-2 cursor-pointer pixel-button hover:brightness-110 transition-all duration-200"
          style={{ borderColor: '#808080 #ffffff #ffffff #808080' }}
          onClick={handleProgressClick}
        >
          <div
            className={`h-full transition-all duration-200 ${
              isPlaying ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-progress-load' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Time Display */}
        <div className="flex justify-between text-xs mt-1">
          <span className="animate-cursor-blink">{formatTime(timeInfo.currentTime)}</span>
          <span className="text-gray-600">{formatTime(timeInfo.duration)}</span>
        </div>
      </div>

      {/* Enhanced Control Buttons */}
      <div className={`flex items-center space-x-4 mb-4 transition-all duration-500 ${isLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
        <button 
          onClick={handlePrev} 
          className="p-3 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg hover:bg-gray-200 pixel-button transition-all duration-200 disabled:opacity-50"
          disabled={audioError}
        >
          <FaBackward className="text-sm" />
        </button>
        
        <button 
          onClick={handlePlayPause} 
          className={`p-4 border-2 border-b-4 rounded-lg pixel-button transition-all duration-200 ${
            audioError 
              ? 'bg-gray-300 border-gray-500 cursor-not-allowed' 
              : isPlaying 
                ? 'bg-red-500 border-red-700 hover:bg-red-400 animate-retro-pulse' 
                : 'bg-green-500 border-green-700 hover:bg-green-400 animate-achievement-unlock'
          }`}
          disabled={audioError}
          style={{ animationDelay: isPlaying ? '0s' : '0.3s' }}
        >
          {isPlaying ? (
            <FaPause className="text-white text-lg" />
          ) : (
            <FaPlay className="text-white text-lg" />
          )}
        </button>
        
        <button 
          onClick={handleNext} 
          className="p-3 bg-gray-300 border-2 border-b-4 border-gray-500 rounded-lg hover:bg-gray-200 pixel-button transition-all duration-200 disabled:opacity-50"
          disabled={audioError}
        >
          <FaForward className="text-sm" />
        </button>
      </div>

      {/* Track Info with Animations */}
      <div className={`text-center transition-all duration-500 ${isLoaded ? 'animate-pixel-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
        <p className="text-xs text-gray-600 mb-2">
          Track {currentSongIndex + 1} of {songs.length}
        </p>
        
        {/* Track Indicators */}
        <div className="flex justify-center space-x-1">
          {songs.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSongIndex 
                  ? 'bg-blue-500 animate-retro-pulse' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* Volume Indicator */}
        <div className="mt-3 flex items-center justify-center space-x-2">
          <FaVolumeUp className="text-gray-600 animate-icon-bounce" style={{ animationDelay: '2s' }} />
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((bar) => (
              <div
                key={bar}
                className={`w-1 h-3 bg-gray-400 transition-all duration-300 ${
                  isPlaying ? 'animate-health-pulse' : ''
                }`}
                style={{ 
                  animationDelay: `${bar * 0.1}s`,
                  height: `${bar * 3 + 6}px`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#d4e0e4] bg-opacity-90">
          <div className="flex items-center space-x-2">
            <div className="pixel-spinner"></div>
            <span className="text-xs animate-cursor-blink">Loading Player...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayerPage;