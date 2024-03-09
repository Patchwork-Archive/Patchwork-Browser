import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/playlist-player.css";

function PlaylistPlayer({ playlistData }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [newVideo, setNewVideo] = useState("");

  useEffect(() => {
    if (playlistData) {
      const videos = playlistData.split(",").map(videoId => import.meta.env.VITE_CDN_DOMAIN+`/${videoId}.webm`);
      setPlaylist(videos);
      setCurrentVideoIndex(0);
    }
  }, [playlistData]);

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleAddVideo = () => {
    let videoId = newVideo;
    const urlMatch = newVideo.match(/watch\?v=([a-zA-Z0-9_-]+)/);
    if (urlMatch) {
      videoId = import.meta.env.VITE_CDN_DOMAIN+`/${urlMatch[1]}.webm`;
    } else {
      videoId = import.meta.env.VITE_CDN_DOMAIN+`/${newVideo}.webm`;
    }

    if (videoId) {
      setPlaylist([...playlist, videoId]);
      setNewVideo("");
    }
  };

  const handleRemoveVideo = (videoIndex) => {
    const updatedPlaylist = playlist.filter((_, index) => index !== videoIndex);
    setPlaylist(updatedPlaylist);
    if (videoIndex <= currentVideoIndex && updatedPlaylist.length) {
      setCurrentVideoIndex(currentVideoIndex > 0 ? currentVideoIndex - 1 : 0);
    }
  };

  const handleVideoEnd = () => {
    const nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < playlist.length) {
      setCurrentVideoIndex(nextVideoIndex);
    } else {
      setCurrentVideoIndex(0); 
    }
  };

  const handleAddRandomSong = () => {
    fetch(import.meta.env.VITE_API_DOMAIN+'/api/random_video')
      .then(response => response.json())
      .then(data => {
      const videoId = data.video_id;
      const videoUrl = import.meta.env.VITE_CDN_DOMAIN + `/${videoId}.webm`;
      setPlaylist([...playlist, videoUrl]);
      })
      .catch(error => {
      console.error('Failed to fetch random video:', error);
      });
  }

  const exportPlaylistToUrl = () => {
    const videoIds = playlist.map(videoUrl => {
      const match = videoUrl.match(/\/([a-zA-Z0-9_-]+)\.webm$/);
      return match ? match[1] : '';
    }).join(',');

    const url = `${window.location.origin}${window.location.pathname}?pl=${videoIds}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Playlist URL copied to clipboard!');
    }, () => {
      alert('Failed to copy URL');
    });
  };

return (
  <>
  <div className="container mx-auto flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4">
<div className="video-player-wrapper">
  <div className="video-player">
    <video controls autoPlay key={playlist[currentVideoIndex]} onEnded={handleVideoEnd}>
      <source src={playlist[currentVideoIndex]} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>
    <div className="playlist-sidebar w-full md:w-1/3 bg-gray-200 p-4" style={{ maxHeight: "600px" }}>
  <ul className="playlist-list overflow-auto max-h-96">
    {playlist.map((videoUrl, index) => {
      const videoIdMatch = videoUrl.match(/\/([a-zA-Z0-9_-]+)\.webm$/);
      const videoId = videoIdMatch ? videoIdMatch[1] : 'Unknown';
      return (
        <li key={index} className={`mb-2 flex justify-between items-center ${index === currentVideoIndex ? 'bg-blue-100' : ''}`}>
          <button
            className="text-left text-accent hover:text-blue-700 focus:outline-none"
            onClick={() => handleVideoChange(index)}
          >
            {videoId}
          </button>
          <button
            className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => handleRemoveVideo(index)}
          >
            Remove
          </button>
        </li>
      );
    })}
  </ul>
      <div className="add-video mt-4">
        <input
          type="text"
          value={newVideo}
          onChange={(e) => setNewVideo(e.target.value)}
          placeholder="Enter video URL or ID..."
          className="p-2 border rounded w-full"
        />
        <button
          className="mt-2 w-full bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded"
          onClick={handleAddVideo}
        >
          Add Video
        </button>
      </div>
      <div className="export-playlist mt-4">
        <button
          className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded"
          onClick={exportPlaylistToUrl}
        >
          Export Playlist
        </button>
      </div>
    </div>
  </div>
  <div className="px-12 info-box p-5 fixed md:px-48">
  <h1 className="text-3xl font-bold text-white mb-3">Patchwork Playlist</h1>
  <p className="text-white text-lg mb-4">
    Create a playlist of content archived on Patchwork!<br/>
    Add the video ID or URL to the playlist then export to share and save the direct URL to the playlist.
  </p>
  <p className="text-white text-lg mb-4">
    Need some ideas?
  </p>
  <button className="bg-accent hover:bg-accent-dark text-white font-bold p-4 rounded"
    onClick={handleAddRandomSong}
  >
    <p className="text-white">Add a random song!</p>
  </button>
</div>

  </>
);
}

PlaylistPlayer.propTypes = {
  playlistData: PropTypes.string,
};

export default PlaylistPlayer;