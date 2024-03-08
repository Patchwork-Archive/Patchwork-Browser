import PropType from "prop-types";
import { useEffect, useState } from "react";

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
      }
      else{
        // Must be a global:time message for syncing. We'll stub for now
        console.log("Sync message received")
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
    <div>
      <audio controls autoPlay className="w-full" src={radioUrl} />
      {currentSong && (
        <div className="text-white">
          <h2>Now Playing:</h2>
          <p>
            {currentSong.artist} - {currentSong.title}
          </p>
        </div>
      )}
    </div>
  );
}

RadioPlayer.propTypes = {
  radioUrl: PropType.string.isRequired,
};

export default RadioPlayer;
