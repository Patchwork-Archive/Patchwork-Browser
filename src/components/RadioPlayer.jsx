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
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [elapsedTimeStr, setElapsedTimeStr] = useState(" 00:00:00");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const resyncStream = () => {
    if (!audioRef) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef) return;
    audioRef.current.volume = volume;
    if (volume == 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef) return;
    const handleTimeUpdate = () => {
      setElapsedTimeStr(
        new Date(audioRef.current.currentTime * 1000)
          .toISOString()
          .slice(11, 19)
      );
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_RADIO_WSS);
    socket.onopen = () => {
      console.log("WebSocket is connected.");
      socket.send(
        JSON.stringify({
          subs: {
            [`station:${import.meta.env.VITE_RADIO_NAME}`]: {},
            "global:time": {},
          },
        })
      );
    };
    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      if (Object.keys(jsonData).length === 0) return;
      if ("connect" in jsonData) {
        console.log("WebSocket connected to radio server.");
        const initialData = jsonData.connect.data ?? [];
        setCurrentSong(initialData[0].pub.data.np.now_playing.song);
      } else if ("channel" in jsonData && jsonData.channel != "global:time") {
        console.log("WebSocket received channel song data.");
        const updatedNowPlayingData = jsonData.pub.data.np;
        setCurrentSong(updatedNowPlayingData.now_playing.song);
      } else {
        // Must be a global:time message for syncing. We'll stub for now
        console.log("Sync message received");
      }
    };
    socket.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
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
          show={Boolean(currentSong)}
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
                  {currentSong ? currentSong.title : "Loading..."}
                </p>
                <p className="text-xl font-light mt-4 text-purple-200">
                  {currentSong ? currentSong.artist : "Loading..."}
                </p>
                <p className="text-sm font-light text-purple-200">
                  Listened for:{elapsedTimeStr}
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
