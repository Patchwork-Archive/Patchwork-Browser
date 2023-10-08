import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadTags from "./HeadTags";
import { CaptionsRenderer } from "react-srv3";
import VideoControls from "./VideoControls";
import SubtitleDropdown from "./SubtitleDropdown";

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
  const videoRef = useRef(null);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
  };

  const handleSubtitleSelect = useCallback((subtitle) => {
    setSelectedSubtitle(subtitle);
  }, []);

  useEffect(() => {
    if (videoId) {
      fetch("https://archive.pinapelz.moe/api/database/video_data/" + videoId)
        .then((response) => response.json())
        .then((data) => setVideoData(data))
        .catch((error) => console.error(error));
    }
  }, [videoId]);

  useEffect(() => {
    console.log("VideoPlayer re-rendered");
  });

  useEffect(() => {
    console.log("Selected subtitle changed to " + selectedSubtitle);
    if (selectedSubtitle) {
      fetch(
        `https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/captions/${videoId}/${videoId}.${selectedSubtitle}.srv3`
      )
        .then((res) => res.text())
        .then((text) => {
          console.log("Changing captions to " + selectedSubtitle);
          setCaptionsText(text);
        });
    }
  }, [selectedSubtitle, videoId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
                />
                {showCaptions && (
                  <CaptionsRenderer
                    className="absolute"
                    srv3={captionsText}
                    currentTime={currentTime}
                  />
                )}
              </div>
            </div>
            <div className="video-controls w-full mt-1">
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
                to={`/channel/${videoData.channel_id}`}
                style={{ display: "inline-block" }}
              >
                <p className="mt-2 text-lg font-semibold">
                  {videoData.channel}
                </p>
              </Link>
            </span>

            {videoData._type ? null : (
              <p className="text-gray-500 text-base mt-2">
                This video is missing an info.json. The data you see is from the
                fallback database
              </p>
            )}
            {videoData.subtitles && (
              <div className="flex items-center mt-2">
                <SubtitleDropdown
                  subtitles={videoData.subtitles}
                  onSelect={handleSubtitleSelect}
                />
                <button
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={toggleCaptions}
                >
                  {showCaptions ? "Hide Captions" : "Show Captions"}
                </button>
              </div>
            )}
            <p className="text-white text-lg mt-2">
              Published on: {formatDate(videoData.upload_date)}
            </p>
            <h2 className="text-white font-bold mt-4 text-lg">Description</h2>
            <div className="text-white mt-2">
              {isExpanded ? (
                <React.Fragment>
                  {videoData.description.split(/\n|\\n/).map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  <button
                    onClick={toggleExpand}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-3"
                  >
                    Collapse
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {videoData.description
                    .split(/\n|\\n/)
                    .slice(0, 4)
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  {videoData.description.split(/\n|\\n/).length > 4 && (
                    <button
                      onClick={toggleExpand}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-3"
                    >
                      {isExpanded ? "Collapse" : "Expand Description"}
                    </button>
                  )}
                </React.Fragment>
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
