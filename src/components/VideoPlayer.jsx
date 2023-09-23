import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const VideoPlayer = ({ videoId = "" }) => {
  const videoCDNUrl = `https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${videoId}.webm`;
  const [videoData, setVideoData] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch(
      "https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/metadata/" +
        videoId +
        ".info.json"
    )
      .then((response) => response.json())
      .then((data) => setVideoData(data))
      .catch((error) => console.error(error));
  }, [videoId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 md:p-6 rounded-lg">
        {videoData ? (
          <div className="w-full">
            <Helmet>
              <title>{videoData.title} - Patchwork Archive</title>
              <meta name="title" content={`${videoData.title}`} />
              <meta name="description" content={`${videoData.channel}`} />
              <meta property="og:url" content={`/watch?v=${videoId}`} />
              <meta property="og:title" content={`${videoData.title}`} />
              <meta property="og:description" content={`${videoData.channel}`} />
              <meta property="og:image" content={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`} />
              <meta property="og:video:url" content={`${videoCDNUrl}`} />
              <meta property="twitter:url" content={`/watch?v=${videoId}`} />
              <meta property="twitter:title" content={`${videoData.title}`} />
              <meta property="twitter:description" content={`${videoData.channel}`} />
              <meta property="twitter:image" content={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`} />
            </Helmet>
            <video
              className="w-full rounded-lg shadow-md"
              src={videoCDNUrl}
              controls
              poster={`https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${videoId}.jpg`}
            />
            <h1 className="text-xl md:text-2xl font-bold mt-4 text-white">
              {videoData.title}
            </h1>
            <Link to={`/channel/${videoData.channel_id}`}>
              <p className="hover:underline text-white mt-2 text-lg font-semibold">
                {videoData.channel}
              </p>
            </Link>
            <p className="text-white text-lg mt-2">
              Published on:{" "}
              {new Date(
                `${videoData.upload_date.slice(
                  0,
                  4
                )}-${videoData.upload_date.slice(
                  4,
                  6
                )}-${videoData.upload_date.slice(6, 8)}`
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h2 className="text-white font-bold mt-4 text-lg">Description</h2>
            <div className="text-white mt-2">
              {isExpanded ? (
                <React.Fragment>
                  {videoData.description.split("\n").map((line, index) => (
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
                    .split("\n")
                    .slice(0, 4)
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  {videoData.description.split("\n").length > 4 && (
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
