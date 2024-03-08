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
    console.log(event.data);
    if (JSON.stringify(event.data) == JSON.stringify({}) || !event.data) return;
    const radio_data = JSON.parse(event.data);
    if (!radio_data) return;
    const curr_song_data = radio_data.connect.data[0].pub.data.np.now_playing.song;
    console.log(curr_song_data.title);
    setCurrentSong(curr_song_data);
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
