import { useState, useEffect } from "react";
import PlaylistQueue from "./PlaylistQueue";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlaylistPlayer() {
  const [playlistData, setPlaylistData] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [playlistSet, setPlaylistSet] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    title: "No song playing",
    artist: "Nobody",
    thumbnailurl: "",
  });

  useEffect(() => {
    if (playlistData !== "") {
      const playlistArray = playlistData.split(",");
      const playlistPromises = playlistArray.map((song) => {
        return fetch(`https://archive.pinapelz.moe/api/video/${song}`)
          .then((response) => response.json())
          .then((data) => {
            const songObject = {
              title: data.title,
              artist: data.channel_name,
              video_id: data.video_id,
              thumbnailurl: `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${data.video_id}.jpg`,
            };
            return songObject;
          });
      });

      Promise.all(playlistPromises).then((playlistObject) => {
        console.log(playlistObject);
        setPlaylist(playlistObject);
        setCurrentSong(playlistObject[0]);
        setCurrentSongIndex(0);
      });
    } else {
      fetch("https://archive.pinapelz.moe/api/random_video")
        .then((response) => response.json())
        .then((data) => {
          const songObject = {
            title: data.title,
            artist: data.channel_name,
            video_id: data.video_id,
            thumbnailurl: `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${data.video_id}.jpg`,
          };
          setCurrentSong(songObject);
          setCurrentSongIndex(0);
        });
    }
  }, [playlistData]);

  return (
    <>
      <div className="mb-8">
        <div className="text-center text-white">
          <img
            src={currentSong.thumbnailurl}
            alt={currentSong.title}
            className="w-1/3 mx-auto rounded-lg mb-2 hover:underline"
          />
          <h1 className="font-bold mt-2">
            <a href={`/watch?v=${currentSong.video_id}`}>{currentSong.title}</a>
          </h1>
          <h2>{currentSong.artist}</h2>
        </div>
      </div>
      {!playlistSet ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-lg text-center mb-2">
            Playing random songs
          </h1>
            <img src="https://files.pinapelz.com/3x.gif" alt="annylebronjam emote gif (picture an anime fox girl headbanging)" style={{ width: "auto", height: "80%" }} />
        </div>
      ) : (
        <>
          <h1 className="text-white font-bold text-lg text-center mb-2">
            Playing from your playlist
          </h1>
          <PlaylistQueue
            playlist={playlist}
            currentSongIndex={currentSongIndex}
          />
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 mt-4 text-lg mb-4 z-10">
        <div className="text-center mt-4">
          <textarea
            value={playlistData}
            onChange={(e) => {
              if (e.target.value === "") {
                setPlaylistSet(false);
                setPlaylistData(e.target.value);
              } else {
                setPlaylistData(e.target.value);
                setPlaylistSet(true);
              }
            }}
            placeholder="Enter comma seperated video ID as playlist data (ex. fYZBrmQQIPE,b0v0pzJ5-NI,alVYdx95sng)"
            style={{ width: "50%", resize: "none" }}
            className="rounded-lg"
          ></textarea>
        </div>
        <AudioPlayer
          autoPlay
          showSkipControls
          src={`https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${currentSong.video_id}.webm`}
          onClickNext={() => {
            if (playlistSet) {
              if (currentSongIndex < playlist.length - 1) {
                setCurrentSongIndex(currentSongIndex + 1);
                setCurrentSong(playlist[currentSongIndex + 1]);
              }
            } else {
              fetch("https://archive.pinapelz.moe/api/random_video")
                .then((response) => response.json())
                .then((data) => {
                  const songObject = {
                    title: data.title,
                    artist: data.channel_name,
                    video_id: data.video_id,
                    thumbnailurl: `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${data.video_id}.jpg`,
                  };
                  setCurrentSong(songObject);
                  setCurrentSongIndex(0);
                });
            }
          }}
          onClickPrevious={() => {
            if (playlistSet) {
              if (currentSongIndex > 0) {
                setCurrentSongIndex(currentSongIndex - 1);
                setCurrentSong(playlist[currentSongIndex - 1]);
              }
            } else {
              fetch("https://archive.pinapelz.moe/api/random_video")
                .then((response) => response.json())
                .then((data) => {
                  const songObject = {
                    title: data.title,
                    artist: data.channel_name,
                    video_id: data.video_id,
                    thumbnailurl: `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${data.video_id}.jpg`,
                  };
                  setCurrentSong(songObject);
                  setCurrentSongIndex(0);
                });
            }
          }}
          onEnded={() => {
            if (playlistSet) {
              if (currentSongIndex < playlist.length - 1) {
                setCurrentSongIndex(currentSongIndex + 1);
                setCurrentSong(playlist[currentSongIndex + 1]);
              }
            } else {
              fetch("https://archive.pinapelz.moe/api/random_video")
                .then((response) => response.json())
                .then((data) => {
                  const songObject = {
                    title: data.title,
                    artist: data.channel_name,
                    video_id: data.video_id,
                    thumbnailurl: `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${data.video_id}.jpg`,
                  };
                  setCurrentSong(songObject);
                  setCurrentSongIndex(0);
                });
            }
          }}
        ></AudioPlayer>
      </div>
    </>
  );
}
export default PlaylistPlayer;
