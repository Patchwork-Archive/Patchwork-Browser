import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faExpand, faCompress, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const VideoControls = ({ videoRef, isPlaying, onPlayStateChange }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const newProgress = (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
      setProgress(newProgress || 0);
    };

    const currentVideoRef = videoRef.current;
    currentVideoRef?.addEventListener("timeupdate", updateProgress);
    return () => currentVideoRef?.removeEventListener("timeupdate", updateProgress);
  }, [videoRef]);

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    onPlayStateChange(!videoRef.current?.paused);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current?.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const vol = e.target.value;
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setVolume(vol);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-controls bg-gray-700 bg-opacity-75 p-1 rounded space-x-4 flex items-center">
      <button 
        onClick={handlePlayPause}
        className="p-2 rounded-full hover:bg-gray-600 transition"
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-white" size="lg" />
      </button>

      <div className="relative flex-grow mx-4 flex items-center">
        <input 
          type="range"
          value={progress}
          onChange={handleProgressChange}
          className="w-full cursor-pointer slider-thumb bg-red-500"
          title=""
        />
      </div>

      <button 
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        className="p-2 rounded-full hover:bg-gray-600 transition relative"
      >
        <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} className="text-white" size="lg" />
        {showVolumeSlider && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20">
            <input 
              type="range" 
              value={volume} 
              onChange={handleVolumeChange}
              min="0" max="1" 
              step="0.01" 
              className="w-full cursor-pointer slider-thumb mb-4"
              title=""
            />
          </div>
        )}
      </button>

      <button 
        onClick={toggleFullscreen}
        className="p-2 rounded-full hover:bg-gray-600 transition"
      >
        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="text-white" size="lg" />
      </button>
    </div>
  );
};

VideoControls.propTypes = {
  videoRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  isPlaying: PropTypes.bool.isRequired,
  onPlayStateChange: PropTypes.func.isRequired
};

export default VideoControls;