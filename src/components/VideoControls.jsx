import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const VideoControls = ({ videoRef, isPlaying, onPlayStateChange }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs == 0) {
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    // Not that I expect to have any music videos over 1 hour, but just in case
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const updateProgress = () => {
      const newProgress =
        (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
      setCurrentTime(videoRef.current?.currentTime || 0);
      setProgress(newProgress || 0);
    };

    const currentVideoRef = videoRef.current;
    currentVideoRef?.addEventListener("timeupdate", updateProgress);
    return () =>
      currentVideoRef?.removeEventListener("timeupdate", updateProgress);
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
    const videoContainer = videoRef.current?.parentElement;
    if (!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.target.blur();
  };

return (
  <div className="video-controls bg-gray-700 bg-opacity-75 p-1 rounded space-x-2 md:space-x-4 flex items-center">
    <button
      onClick={handlePlayPause}
      className="p-1 md:p-2 rounded-full hover:bg-gray-600 transition"
    >
      <FontAwesomeIcon
        icon={isPlaying ? faPause : faPlay}
        className="text-white text-base md:text-lg"
        size="lg"
      />
    </button>
    <div className="text-white ml-1 md:ml-3 text-xs md:text-sm">
      {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}
    </div>
    <div className="relative flex-grow mx-2 md:mx-4 flex items-center">
      <input
        type="range"
        value={progress}
        onChange={handleProgressChange}
        onWheel={handleWheel}
        className="w-full cursor-pointer slider-thumb bg-red-500"
        title=""
      />
    </div>

    <button
      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
      className="p-1 md:p-2 rounded-full hover:bg-gray-600 transition relative"
    >
      <FontAwesomeIcon
        icon={volume > 0 ? faVolumeUp : faVolumeMute}
        className="text-white text-base md:text-lg"
        size="lg"
      />
      {showVolumeSlider && (
        <div className="absolute mb-7 bottom-8 left-1/2 transform -translate-x-1/2 w-16 md:w-20">
          <input
            type="range"
            value={volume}
            onChange={handleVolumeChange}
            min="0"
            max="1"
            step="0.01"
            className="w-full cursor-pointer slider-thumb mb-4"
            title=""
            style={{ transform: "rotate(270deg)" }}
          />
        </div>
      )}
    </button>

    <button
      onClick={toggleFullscreen}
      className="p-1 md:p-2 rounded-full hover:bg-gray-600 transition"
    >
      <FontAwesomeIcon
        icon={document.fullscreenElement === videoRef.current?.parentElement ? faCompress : faExpand}
        className="text-white text-base md:text-lg"
        size="lg"
      />
    </button>
  </div>
);
};

VideoControls.propTypes = {
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isPlaying: PropTypes.bool.isRequired,
  onPlayStateChange: PropTypes.func.isRequired,
};

export default VideoControls;
