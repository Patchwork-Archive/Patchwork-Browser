import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadTags from "./HeadTags";
import { CaptionsRenderer } from 'react-srv3';
import VideoControls from "./VideoControls";

const CaptionPlayer = ({ videoId }) => {
  const videoCDNUrl = `https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${
    videoId ?? ""
  }.webm`;

  const [videoData, setVideoData] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captionsText, setCaptionsText] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoId) {
      fetch("https://archive.pinapelz.moe/api/database/video_data/" + videoId)
        .then((response) => response.json())
        .then((data) => setVideoData(data))
        .catch((error) => console.error(error));
    }
  }, [videoId]);

  useEffect(() => {
    fetch("https://content.archive.ragtag.moe/gd:1JyggqHXMSkUrSxfjGBGhipFW-noE0EcQ/zHD5MCUezVo/zHD5MCUezVo.en.srv3")
      .then((res) => res.text())
      .then(setCaptionsText);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
            <div
              className="video-container w-full"
              style={{ position: 'relative', width: 1196, height: 673 }}
            >
              <video
                ref={videoRef} 
                className="absolute w-full h-full"
                src={videoCDNUrl}
                poster={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              />
            <CaptionsRenderer srv3={captionsText} currentTime={currentTime} />
            <VideoControls videoRef={videoRef} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold mt-16 text-white">
              {videoData.title}
            </h1>
            <Link to={`/channel/${videoData.channel_id}`}>
              <p className="hover:underline text-white mt-2 text-lg font-semibold">
                {videoData.channel}
              </p>
            </Link>
            <p className="text-white text-lg mt-2">
              Published on: {formatDate(videoData.upload_date)}
            </p>
            {videoData._type ? null : (
              <p className="text-gray-500 text-base mt-2">
                This video is missing an info.json. The data you see is from the
                fallback database
              </p>
            )}
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

CaptionPlayer.propTypes = {
  videoId: PropTypes.string,
};

export default CaptionPlayer;