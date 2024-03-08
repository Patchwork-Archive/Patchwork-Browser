import PropType from "prop-types";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

function RadioPlayer({ radioUrl }) {
  const [currentSong, setCurrentSong] = useState(null);

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
    <div className="bg-gradient-to-tr animate-gradient-x from-indigo-500 via-purple-500 to-purple-500 p-5 rounded-xl shadow-xl flex flex-col items-center gap-3 transition-all duration-500 ease-in-out transform hover:scale-105">
      <Transition
        show={Boolean(currentSong)}
        enter="transition-opacity duration-750"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-750"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">Now Playing:</h2>
          <p className="text-md mt-2">
            {currentSong?.title}<br/>{currentSong?.artist}
          </p>
          </div>
      </Transition>
      <audio
        controls
        autoPlay
        className="w-full rounded-lg shadow-inner"
        src={radioUrl}
      />
    </div>
  );
}

RadioPlayer.propTypes = {
  radioUrl: PropType.string.isRequired,
};

export default RadioPlayer;
