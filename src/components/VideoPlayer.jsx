import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadTags from "./HeadTags";
import { CaptionsRenderer } from "react-srv3";
import VideoControls from "./VideoControls";
import SubtitleDropdown from "./SubtitleDropdown";
import Linkify  from "react-linkify";
import { useHotkeys } from "react-hotkeys-hook";


const VideoPlayer = ({ videoId }) => {
  const videoCDNUrl = `https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${
    videoId ?? ""
  }.webm`;

  const [videoData, setVideoData] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captionsText, setCaptionsText] = useState("");
  const [selectedSubtitle, setSelectedSubtitle] = useState("");
  const [showCaptions, setShowCaptions] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [currentBufferingMessage, setCurrentBufferingMessage] = useState("");
  const videoRef = useRef(null);
  const vidControlRef = useRef(null);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
  };

  const handleSubtitleSelect = useCallback((subtitle) => {
    setSelectedSubtitle(subtitle);
  }, []);

  useHotkeys('alt+p', () => focusVideoControls());

  const focusVideoControls = () => {
    if (vidControlRef.current) {
      vidControlRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (videoRef.current) {
        switch (event.key) {
          case "ArrowRight":
            videoRef.current.currentTime += 5;
            break;
          case "ArrowLeft":
            videoRef.current.currentTime -= 5;
            break;
          case " ":
            if (event.target.tagName.toLowerCase() !== 'input') {
              event.preventDefault();
              handleVideoClick();
            }
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (videoId) {
      fetch("https://patchwork-backend.vercel.app/api/database/video_data/" + videoId)
        .then((response) => response.json())
        .then((data) => {
          setVideoData(data);
          if (data.error) {
            setNotFound(true);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [videoId, videoData.error]);

  useEffect(() => {
    const bufferingMessages = [
      "Buffering...",
      "Let me cook...",
      "Guru Guru...",
      "Digging through the archives...",
      "Searching for the secrets of the universe...",
    ];
    if (isBuffering) {
      const randomMessage =
        bufferingMessages[Math.floor(Math.random() * bufferingMessages.length)];
      setCurrentBufferingMessage(randomMessage);
    }
  }, [isBuffering]);

  useEffect(() => {
    if (selectedSubtitle) {
      fetch(
        `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/captions/${videoId}/${videoId}.${selectedSubtitle}.srv3`
      )
        .then((res) => res.text())
        .then((text) => {
          setCaptionsText(text);
        });
    }
  }, [selectedSubtitle, videoId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
  };

  const formatDate = (rawDate) => {
    try {
      const parsedDate = new Date(
        `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`
      );
      const dateString = parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      if (dateString === "Invalid Date") {
        return rawDate;
      } else {
        return parsedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch (error) {
      return rawDate;
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const downloadVideo = () => {
    const a = document.createElement("a");
    a.href = videoCDNUrl;
    a.download = videoId + ".webm";
    a.click();
  }

  const handleWatchOnYouTube = () => {
    const a = document.createElement("a");
    a.href = `https://www.youtube.com/watch?v=${videoId}`;
    a.target = "_blank";
    a.click();
  }

  const handleOpenWithVLC = () => {
    const a = document.createElement("a");
    a.href = `vlc://${videoCDNUrl}`;
    a.click();
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center p-4 md:p-6 rounded-lg">
        <HeadTags
          title="Video not found"
          description="Video not found"
          image={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`}
          url={`/watch?v=${videoId}`}
        />
        <h1 className="text-white text-lg font-bold py-4">Video not found</h1>
        <p className="text-white text-lg py-4">
          Uh oh... Seems like we don&apos;t have this video archived. Sorry!
        </p>
        <a href={`https://www.youtube.com/watch?v=${videoId}`} className="text-white text-lg bg-red-500 px-2 rounded-lg">
          Check YouTube?
        </a>
        <a href={`https://bilibili.com/video/${videoId}`} className="text-white text-lg bg-blue-500 px-2 rounded-lg mt-2">
          Check BiliBili
        </a>
        <a href="/" className="text-white text-lg bg-gray-500 px-2 rounded-lg mt-2">
          Go back home
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 md:p-6 rounded-lg">
        {videoData ? (
          <div className="w-full">
            <HeadTags
              title={videoData.title}
              description={videoData.channel}
              image={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`}
              url={`/watch?v=${videoId}`}
            />
            <div className="video-container w-full relative">
              <div
                className="video-wrapper w-full h-[calc(9/16*100vw)] md:h-[calc(9/16*60vw)]"
                style={{ position: "relative" }}
                onClick={handleVideoClick}
              >
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  src={videoCDNUrl}
                  poster={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`}
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                  onClick={handleVideoClick}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
                />
                {!isPlaying && (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <p className="text-2xl text-white mb-4">Playback paused</p>
                    {/* <img src="" alt="Animated GIF" width={200} />  TODO  find cool gif here*/}
                  </div>
                )}

                {isBuffering && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-50 p-3 rounded-full shadow-xl flex items-center space-x-3">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span className="text-white font-medium">
                      {currentBufferingMessage}
                    </span>
                  </div>
                )}

                {showCaptions && (
                  <CaptionsRenderer
                    className="absolute"
                    srv3={captionsText}
                    currentTime={currentTime}
                  />
                )}
              </div>
            </div>
            <div className="video-controls w-full mt-1" tabIndex="-1" ref={vidControlRef}>
              <VideoControls
                videoRef={videoRef}
                isPlaying={isPlaying}
                onPlayStateChange={handlePlayStateChange}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mt-4 text-white">
              {videoData.title}
            </h1>
            <span className="hover:underline text-white">
              <Link
                to={`/channel/${videoData.channel_id || videoData.uploader_id}`}
                style={{ display: "inline-block" }}
              >
                <p className="mt-2 text-lg font-semibold">
                  {videoData.channel || videoData.uploader}
                </p>
              </Link>
            </span>
            {videoData._type ? null : (
              <p className="text-gray-500 text-base mt-2">
                This video is missing an info.json. The data you see is from the
                fallback database.
              </p>
            )}
            {videoData.subtitles && (
              <div className="flex flex-col sm:flex-row items-left mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                <SubtitleDropdown
                  subtitles={videoData.subtitles}
                  onSelect={handleSubtitleSelect}
                />
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-left mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                            <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={toggleCaptions}
                >
                  {showCaptions ? "Hide Captions" : "Show Captions"}
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={downloadVideo}
                >
                  Download Video
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  onClick={handleWatchOnYouTube}
                >
                  Watch on YouTube
                </button>
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded"
                  onClick={handleOpenWithVLC}
                >
                  Open with VLC
                </button>
            </div>
            <p className="text-white text-lg mt-2">
              Published on: {formatDate(videoData.upload_date)}
            </p>
            <h1 className="text-white font-bold mt-4 text-lg">Description</h1>
            <div className="text-white mt-2">
              {isExpanded ? (
                <Linkify 
                  options={{ 
                    className: 'hover:underline text-light-blue-500'
                  }}
                >
                    {videoData.description.split(/\n|\\n/).map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                    <button
                      onClick={toggleExpand}
                      className="bg-gray-600 hover:underline text-white font-bold py-1 px-4 rounded mt-3"
                    >
                      Collapse ↥
                    </button>
                </Linkify>
              ) : (
                <Linkify 
                  options={{ 
                    className: 'hover:underline text-light-blue-500'
                  }}
                >
                  {videoData.description
                    .split(/\n|\\n/)
                    .slice(0, 4)
                    .map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                  {videoData.description.split(/\n|\\n/).length > 4 && (
                    <button
                      onClick={toggleExpand}
                      className="hover:underline bg-gray-600 text-white font-bold font-lg py-1 px-4 rounded mt-3"
                    >
                      {isExpanded ? "Collapse ↥" : "Expand ↴"}
                    </button>
                  )}
                </Linkify>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white text-lg font-bold py-4">Loading video...</p>
        )}
      </div>
    </>
  );
};

VideoPlayer.propTypes = {
  videoId: PropTypes.string,
};

export default VideoPlayer;
