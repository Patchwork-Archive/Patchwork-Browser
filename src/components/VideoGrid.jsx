import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const thumbnailDomain =
  "https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails";

const VideoGrid = ({ apiUrl = "", titleText = "" }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white mb-3 font-bold">{titleText}</h1>
        <div className="flex flex-wrap -m-2">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="video-item p-2 w-full md:w-1/2 lg:w-1/3 flex-grow"
                >
                  <div className="rounded overflow-hidden h-full">
                    <div
                      className="w-full object-cover rounded-t-lg bg-gray-200"
                      style={{ height: "200px" }}
                    />
                    <div className="p-3">
                      <div className="title-container">
                        <div
                          className="text-white text-lg font-bold mb-2 m-0 bg-gray-200"
                          style={{ height: "20px" }}
                        />
                      </div>
                      <div
                        className="text-base text-gray-400 m-0 bg-gray-200"
                        style={{ height: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : videos.map((video) => (
                <div
                  key={video.id}
                  className="video-item p-2 w-full md:w-1/2 lg:w-1/3 flex-grow transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="rounded overflow-hidden h-full">
                    <a href={"/watch?v=" + video.video_id}>
                      <img
                        src={thumbnailDomain + "/" + video.video_id + ".jpg"}
                        alt={video.title}
                        className="w-full object-cover rounded-t-lg transition-brightness duration-300 hover:brightness-90"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "placeholder.jpg";
                        }}
                      />
                    </a>
                    <div className="p-3">
                      <div className="title-container">
                        <a
                          href={"/watch?v=" + video.video_id}
                          className="transition-colors duration-300 hover:text-gray-300"
                        >
                          <h2 className="text-white text-lg font-bold mb-2 m-0 hover:underline">
                            {video.title}
                          </h2>
                        </a>
                      </div>
                      <a
                        href={"/channel/" + video.channel_id}
                        className="transition-colors duration-300 hover:text-gray-300"
                      >
                        <p className="text-base text-gray-400 m-0 hover:underline">
                          {video.channel_name + " - " + video.upload_date}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

VideoGrid.propTypes = {
  apiUrl: PropTypes.string,
  titleText: PropTypes.string,
};

export default VideoGrid;
