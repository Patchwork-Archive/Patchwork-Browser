// VideoPlayer.jsx
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadTags from "./HeadTags";
import { CaptionsRenderer } from "react-srv3";
import VideoControls from "./VideoControls";
import SubtitleDropdown from "./SubtitleDropdown";
import Linkify from "react-linkify";
import { useHotkeys } from "react-hotkeys-hook";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/player.css";

const VideoPlayer = ({ videoId }) => {
  const videoWebMUrl =
    import.meta.env.VITE_CDN_DOMAIN + `/${videoId ?? ""}.webm`;
  const videoMP4Url = import.meta.env.VITE_CDN_DOMAIN + `/${videoId ?? ""}.mp4`;
  const [videoData, setVideoData] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [aliases, setAliases] = useState([]);
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
  const [pfpUrl, setPfpUrl] = useState("");
  const [downloadMenuSelection, setDownloadMenuSelection] = useState("video");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const hideControlsTimeout = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      if (isFullscreen) {
        setControlsVisible(true);
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
        hideControlsTimeout.current = setTimeout(() => {
          setControlsVisible(false);
        }, 2000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [isFullscreen]);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
  };

  const handleSubtitleSelect = useCallback((subtitle) => {
    setSelectedSubtitle(subtitle);
  }, []);

  const handleDownloadOptionSelect = (option) => {
    setDownloadMenuSelection(option);
  };

  const handleOpenWithVLC = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      alert(
        "Sorry, this feature is mainly for mobile devices. Please Download the video instead if you're having trouble playing it.",
      );
      return;
    }
    const a = document.createElement("a");
    a.href = `vlc://${import.meta.env.VITE_CDN_DOMAIN + "/" + videoId + "." + videoData.file_ext}`; // Default to WebM for VLC
    a.click();
  };

  useHotkeys("alt+p", () => focusVideoControls());

  const focusVideoControls = () => {
    if (vidControlRef.current) {
      vidControlRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement &&
        (activeElement.tagName.toLowerCase() === "input" ||
          activeElement.tagName.toLowerCase() === "textarea" ||
          activeElement.isContentEditable);
      if (isInputFocused) return;
      if (videoRef.current) {
        switch (event.key) {
          case "ArrowRight":
            videoRef.current.currentTime += 5;
            break;
          case "ArrowLeft":
            videoRef.current.currentTime -= 5;
            break;
          case " ":
            if (event.target.tagName.toLowerCase() !== "input") {
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
    if (!videoId) return; // Ensure videoId exists before making a request
    fetch(
      import.meta.env.VITE_API_DOMAIN + "/api/database/video_data/" + videoId,
    )
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data);
        setPfpUrl(
          import.meta.env.VITE_PFP_DOMAIN + "/" + data.channel_id + "_pfp.jpg",
        );
        if (data.error) {
          setNotFound(true);
        }
      })
      .catch((error) => console.error(error));
  }, [videoId]);

  useEffect(() => {
    if (!videoData.channel_id) return;
    fetch(
      import.meta.env.VITE_API_DOMAIN +
        "/api/channel_name?channel_id=" +
        videoData.channel_id,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.aliases.length > 0) {
          setAliases(data.aliases);
        }
      })
      .catch((error) => console.error(error));
  }, [videoData, videoId]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: videoData.title + " - On Patchwork Archive",
        artist: videoData.channel,
        artwork: [
          {
            src: import.meta.env.VITE_THUMBNAIL_DOMAIN + `/${videoId}.jpg`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        handleVideoClick();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        handleVideoClick();
      });
    }
  }, [videoData, isPlaying, videoId]);

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
        import.meta.env.VITE_CAPTIONS_DOMAIN +
          `/${videoId}/${videoId}.${selectedSubtitle}.srv3`,
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
        `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`,
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

  const handleVideoClick = useCallback((event) => {
    if (
      (isFullscreen && event.target.tagName === "svg") ||
      event.target.tagName === "path" ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "INPUT"
    ) {
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  });

  const handleDownloadButtonClick = () => {
    switch (downloadMenuSelection) {
      case "video":
        const videoLink = document.createElement("a");
        videoLink.href =
          import.meta.env.VITE_CDN_DOMAIN +
          "/" +
          videoId +
          "." +
          videoData.file_ext; // Default to WebM for download
        videoLink.target = "_blank";
        videoLink.click();
        break;
      case "thumbnail":
        const thumbnailLink = document.createElement("a");
        thumbnailLink.href =
          import.meta.env.VITE_THUMBNAIL_DOMAIN + `/${videoId}.jpg`;
        thumbnailLink.target = "_blank";
        thumbnailLink.click();
        break;
      case "subs":
        const subtitlesLink = document.createElement("a");
        subtitlesLink.href =
          import.meta.env.VITE_CAPTIONS_DOMAIN +
          `/${videoId}/${videoId}.${selectedSubtitle}.srv3`;
        console.log(
          import.meta.env.VITE_CAPTIONS_DOMAIN +
            `/${videoId}/${videoId}.${selectedSubtitle}.srv3`,
        );
        subtitlesLink.target = "_blank";
        subtitlesLink.click();
        break;
      case "info":
        const jsonLink = document.createElement("a");
        jsonLink.href =
          import.meta.env.VITE_API_DOMAIN +
          "/api/database/video_data/" +
          videoId;
        jsonLink.target = "_blank";
        jsonLink.click();
        break;
    }
  };

  const handleWatchOnYouTube = () => {
    const a = document.createElement("a");
    a.href = `https://www.youtube.com/watch?v=${videoId}`;
    a.target = "_blank";
    a.click();
  };

  if (notFound) {
    return (
      <div className="flex flex-col items-center p-4 md:p-6 rounded-lg">
        <HeadTags
          title="Video not found"
          description="Video not found"
          image={import.meta.env.VITE_THUMBNAIL_DOMAIN + `/${videoId}.jpg`}
          url={`/watch?v=${videoId}`}
        />
        <h1 className="text-white text-lg font-bold py-4">Video not found</h1>
        <p className="text-white text-lg py-4">
          Uh oh... Seems like we don&apos;t have this video archived. Sorry!
        </p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          className="text-white text-lg bg-red-500 px-2 rounded-lg"
        >
          Check YouTube?
        </a>
        <a
          href={`https://bilibili.com/video/${videoId}`}
          className="text-white text-lg bg-blue-500 px-2 rounded-lg mt-2"
        >
          Check BiliBili
        </a>
        <a
          href="/"
          className="text-white text-lg bg-gray-500 px-2 rounded-lg mt-2"
        >
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
              image={import.meta.env.VITE_THUMBNAIL_DOMAIN + `/${videoId}.jpg`}
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
                  poster={
                    import.meta.env.VITE_THUMBNAIL_DOMAIN + `/${videoId}.jpg`
                  }
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
                >
                  <source src={videoWebMUrl} type="video/webm" />
                  <source src={videoMP4Url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {!isPlaying && (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <p className="text-2xl text-white mb-4">Playback paused</p>
                    {/* <img src="" alt="Animated GIF" width={200} />  TODO  find cool gif here*/}
                  </div>
                )}

                {/* Captions */}
                {showCaptions && (
                  <CaptionsRenderer
                    className={`absolute top-0 left-0 w-full h-full pointer-events-none`} // Captions always stay on top
                    srv3={captionsText}
                    currentTime={currentTime}
                  />
                )}

                {/* Video Controls Fullscreen Ver */}
                {isFullscreen && controlsVisible && (
                  <div className="video-controls absolute bottom-0 left-0 w-full z-10">
                    {" "}
                    {/* Z-index ensures controls are below captions */}
                    <VideoControls
                      videoRef={videoRef}
                      isPlaying={isPlaying}
                      onPlayStateChange={handlePlayStateChange}
                      onClick={handleVideoClick}
                    />
                  </div>
                )}

                {/* Buffering Indicator */}
                {isBuffering && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-50 p-3 rounded-full shadow-xl flex items-center space-x-3">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span className="text-white font-medium">
                      {currentBufferingMessage}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="video-controls w-full mt-1"
              tabIndex="-1"
              ref={vidControlRef}
            >
              <VideoControls
                videoRef={videoRef}
                isPlaying={isPlaying}
                onPlayStateChange={handlePlayStateChange}
                onClick={handleVideoClick}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mt-4 text-white">
              {videoData.title}
            </h1>
            <span className="mt-2 text-white flex items-center">
              <Link
                to={`/channel/${videoData.channel_id || videoData.uploader_id}`}
                className="hover:underline"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={pfpUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <p className="ml-4 text-xl font-semibold">
                  {videoData.channel || videoData.uploader}
                </p>
              </Link>
            </span>
            {/* Aliases Section */}
            {aliases.length > 0 &&
              videoData &&
              aliases.filter(
                (alias) =>
                  alias !== videoData.channel && alias !== videoData.uploader,
              ).length > 0 && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-white">
                    Also Known As:
                  </h2>
                  <p className="text-white">
                    {aliases
                      .filter(
                        (alias) =>
                          alias !== videoData.channel &&
                          alias !== videoData.uploader,
                      )
                      .join(", ")}
                  </p>
                </div>
              )}
            {videoData._type ? null : (
              <p className="text-gray-500 text-base mt-2">
                This video is missing an info.json. The data you see is from the
                fallback database.
              </p>
            )}
            {videoData.subtitles && (
              <>
                <div className="flex flex-col sm:flex-row items-left mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                  <SubtitleDropdown
                    subtitles={videoData.subtitles}
                    onSelect={handleSubtitleSelect}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded mt-2"
                    onClick={toggleCaptions}
                  >
                    {showCaptions ? "Hide Captions" : "Show Captions"}
                  </button>
                </div>
              </>
            )}
            <div className="flex flex-col sm:flex-row items-left my-4 sm:space-y-0 sm:space-x-2">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-6  rounded"
                onClick={handleWatchOnYouTube}
              >
                Watch on YouTube
              </button>
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1 px-4 mt-2 rounded"
                onClick={handleOpenWithVLC}
              >
                Open with VLC
              </button>
              <Popup
                trigger={
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-6 mt-2 rounded"
                    onClick={handleDownloadButtonClick}
                  >
                    Download Options
                  </button>
                }
                position="bottom"
              >
                <div className="flex flex-col sm:flex-row">
                  <select
                    className="text-black text-sm rounded p-2"
                    onChange={(e) => handleDownloadOptionSelect(e.target.value)}
                  >
                    <option value="video">Video</option>
                    <option value="thumbnail">Thumbnail</option>
                    {videoData._type && <option value="info">JSON</option>}
                    {videoData.subtitles && (
                      <option value="subs">Subtitle</option>
                    )}
                  </select>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded"
                    onClick={handleDownloadButtonClick}
                  >
                    Download
                  </button>
                </div>
              </Popup>
            </div>
            <p className="text-white text-lg mt-2">
              Published on: {formatDate(videoData.upload_date)}
            </p>
            <h1 className="text-white font-bold mt-4 text-lg">Description</h1>
            <div className="text-white mt-2">
              {isExpanded ? (
                <Linkify
                  options={{
                    className: "hover:underline text-light-blue-500",
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
                    className: "hover:underline text-light-blue-500",
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
