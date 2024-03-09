import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/playlist-player.css";
import toast, { Toaster } from 'react-hot-toast';

function PlaylistPlayer({ playlistData }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [newVideo, setNewVideo] = useState("");
  const [currTitle, setCurrTitle] = useState("Patchwork Playlist");
  const [currChannelName, setCurrChannelName] = useState("Create a playlist of content archived on Patchwork! Enqueue videos by providing their URLs or IDs");
  const [currVideoID, setCurrVideoID] = useState("Unknown");
  const [currChannelId, setCurrChannelId] = useState("Unknown");

  useEffect(() => {
    if (currVideoID === "Unknown") return;
    fetch(import.meta.env.VITE_API_DOMAIN+'/api/video/'+currVideoID)
      .then(response => response.json())
      .then(data => {
      setCurrTitle(data.title);
      setCurrChannelName(data.channel_name);
      setCurrChannelId(data.channel_id);
      })
      .catch(error => {
      console.error('Failed to fetch video data:', error);
      });
  }, [currVideoID]);

  useEffect(() => {
    if (playlistData) {
      const videos = playlistData.split(",").map(videoId => import.meta.env.VITE_CDN_DOMAIN+`/${videoId}.webm`);
      setPlaylist(videos);
      setCurrentVideoIndex(0);
      const firstVideoUrlMatch = videos[0].match(/\/([a-zA-Z0-9_-]+)\.webm$/);
      const firstVideoId = firstVideoUrlMatch ? firstVideoUrlMatch[1] : 'Unknown';
      setCurrVideoID(firstVideoId);
      console.log("First video ID: ", firstVideoId);
      
    }
  }, [playlistData]);

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index);
    const videoUrlMatch = playlist[index].match(/\/([a-zA-Z0-9_-]+)\.webm$/);
    const videoId = videoUrlMatch ? videoUrlMatch[1] : 'Unknown';
    setCurrVideoID(videoId);
  };

  const handleAddVideo = () => {
    if (!newVideo) return;
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
    toast.error('Removed song from playlist!');
    setPlaylist(updatedPlaylist);
    if (videoIndex <= currentVideoIndex && updatedPlaylist.length) {
      setCurrentVideoIndex(currentVideoIndex > 0 ? currentVideoIndex - 1 : 0);
      if(currentVideoIndex - 1 >= 0) {
      const videoUrlMatch = playlist[currentVideoIndex-1].match(/\/([a-zA-Z0-9_-]+)\.webm$/);
      const videoId = videoUrlMatch ? videoUrlMatch[1] : 'Unknown';
      console.log("New video ID: ", videoId);
      setCurrVideoID(videoId);
      }
    }
  };

  const handleVideoEnd = () => {
    const nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < playlist.length) {
      setCurrentVideoIndex(nextVideoIndex);
      const videoUrlMatch = playlist[nextVideoIndex].match(/\/([a-zA-Z0-9_-]+)\.webm$/);
      const videoId = videoUrlMatch ? videoUrlMatch[1] : 'Unknown';
      setCurrVideoID(videoId);

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
      toast.success('Added random song to playlist!');
      setPlaylist([...playlist, videoUrl]);
      if (playlist.length === 0) {
        setCurrVideoID(videoId);
      }
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
  <Toaster
  position="bottom-center"
   />
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
    <a href={"/watch?v="+currVideoID}>  <h1 className="text-2xl font-bold text-white mb-3 hover:underline">{currTitle}</h1>
    </a>
  <a href={"/channel/"+currChannelId}><p className="text-white text-xl mb-4 hover:underline">
    {currChannelName}
  </p>
  </a>
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