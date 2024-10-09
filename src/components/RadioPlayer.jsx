import PropType from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Transition } from "@headlessui/react";

import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeOff,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RadioPlayer({ radioUrl, m3uAPIUrl, plsAPIUrl }) {
  const [currentSongTitle, setCurrentSongTitle] = useState(
    "Patchwork Archive - Radio",
  );
  const [currentSongArtist, setCurrentSongArtist] = useState(
    "Preserving rhythm, one video at a time.",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [elapsedTimeStr, setElapsedTimeStr] = useState(" 00:00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [listenerCount, setListenerCount] = useState(0);
  const audioRef = useRef(null);

  const resyncStream = () => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    if (volume == 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    const handleTimeUpdate = () => {
      setElapsedTimeStr(
        new Date(audioRef.current.currentTime * 1000)
          .toISOString()
          .slice(11, 19),
      );
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSongTitle,
        artist: currentSongArtist,
        album: import.meta.env.VITE_RADIO_NAME,
        artwork: [
          {
            src: import.meta.env.VITE_DEFAULT_OG_IMAGE,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
      });
    }
  }, [currentSongTitle, currentSongArtist, isPlaying]);

  useEffect(() => {
    const fetchSongData = () => {
      fetch(import.meta.env.VITE_RADIO_API)
        .then((res) => res.json())
        .then((data) => {
          setCurrentSongTitle(data.now_playing.song.title);
          setCurrentSongArtist(data.now_playing.song.artist);
          setListenerCount(Number(data.listeners.total));
        });
    };
    fetchSongData();
    const cooldown = setInterval(fetchSongData, 15000);
    return () => clearInterval(cooldown);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-tr animate-gradient-x from-indigo-500 via-purple-500 to-purple-500 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 transition-all duration-500 ease-in-out transform w-full max-w-4xl">
        <div className="flex items-center justify-center bg-white p-3 rounded-full shadow-lg hover:animate-spin">
          <img
            src={import.meta.env.VITE_DEFAULT_OG_IMAGE}
            alt="Radio Icon"
            className="w-32 h-32 object-cover rounded-full transition-all duration-500 ease-in-out transform"
          />
        </div>
        <Transition
          show={true}
          enter="transition-opacity duration-750 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-750 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {() => (
            <div className="flex flex-col items-center">
              <div className="text-white text-center mt-4">
                <p className="text-2xl font-semibold mt-2">
                  {currentSongTitle ? currentSongTitle : "Loading..."}
                </p>
                <p className="text-xl font-light mt-4 text-purple-200">
                  {currentSongArtist ? currentSongArtist : "Loading..."}
                </p>
                <p className="text-sm font-light text-purple-200">
                  Listened for: {elapsedTimeStr}
                </p>
                <p className="text-sm font-light text-purple-200">
                  Listeners: {listenerCount}
                </p>
              </div>
            </div>
          )}
        </Transition>

        <div className="flex space-x-4">
          <button
            className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-12 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} className="text-3xl" />
            ) : (
              <FontAwesomeIcon icon={faPlay} className="text-3xl" />
            )}
          </button>
          <button
            className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-12 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            onClick={resyncStream}
          >
            <FontAwesomeIcon icon={faRotate} className="text-3xl" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <FontAwesomeIcon
            icon={isMuted ? faVolumeOff : faVolumeHigh}
            className="text-2xl text-white"
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          {radioUrl && (
            <audio
              ref={audioRef}
              autoPlay={isPlaying}
              className="w-full opacity-0 h-0"
              src={radioUrl}
            />
          )}
        </div>
        <div className="text-white text-center">
          {m3uAPIUrl ? (
            <button
              className=" hover:underline text-white font-bold mx-2 rounded"
              onClick={() => (window.location.href = m3uAPIUrl)}
            >
              Download M3U
            </button>
          ) : null}
          {plsAPIUrl ? (
            <button
              className="hover:underline text-white font-bold  mx-2 rounded"
              onClick={() => (window.location.href = plsAPIUrl)}
            >
              Download PLS
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

RadioPlayer.propTypes = {
  radioUrl: PropType.string.isRequired,
  m3uAPIUrl: PropType.string,
  plsAPIUrl: PropType.string,
};

export default RadioPlayer;
