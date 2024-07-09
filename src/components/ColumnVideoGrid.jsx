import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const thumbnailDomain = import.meta.env.VITE_THUMBNAIL_DOMAIN;

const ColumnVideoGrid = ({ apiUrl, titleText, currentVideoId = "" }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        if (currentVideoId) {
          setVideos((prev) => prev.filter((video) => video.video_id !== currentVideoId));
        }
        setIsLoading(false);
      });
  }, [apiUrl, currentVideoId]);

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-xl md:text-2xl text-white font-bold mb-3">
        {titleText}
      </h2>
      <div className="-m-2">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="video-row p-2 flex flex-col lg:flex-row"
            >
              <div className="flex-shrink-0 mb-2 lg:mb-0">
                <div className="w-full lg:w-72 h-40 lg:h-44 bg-gray-300" />
              </div>
              <div className="ml-0 lg:ml-4">
                <div>
                  <h3 className="text-base lg:text-lg font-medium text-white">
                    Loading...
                  </h3>
                  <p className="text-sm lg:text-base text-gray-500">
                    Loading...
                  </p>
                </div>
              </div>
            </div>
          ))
          : videos.map((video) => (
            <div
              key={video.id}
              className="video-row p-2 flex flex-col lg:flex-row hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className="flex-shrink-0 mb-2 lg:mb-0">
                <a href={"/watch?v=" + video.video_id}>
                  <img
                    src={thumbnailDomain + "/" + video.video_id + ".jpg"}
                    alt={video.title}
                    className="w-full lg:w-72 object-cover rounded-md"
                  />
                </a>
              </div>
              <div className="ml-0 lg:ml-4">
                <div>
                  <a href={"/watch?v=" + video.video_id}>
                    <h3 className="text-base lg:text-lg font-medium text-white hover:underline">
                      {video.title}
                    </h3>
                  </a>
                  <a href={"/channel/" + video.channel_id}>
                    <p className="text-sm lg:text-base text-white hover:underline">
                      {video.channel_name + " - " + video.upload_date}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

ColumnVideoGrid.propTypes = {
  apiUrl: PropTypes.string,
  titleText: PropTypes.string,
  currentVideoId: PropTypes.string
};

export default ColumnVideoGrid;
