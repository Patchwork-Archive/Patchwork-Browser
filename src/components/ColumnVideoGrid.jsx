import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const thumbnailDomain =
    "https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails";

const ColumnVideoGrid = ({ apiUrl = "", titleText = "" }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setVideos(data));
    }, [apiUrl]);

    return (
        <div className="p-2 md:p-4">
            <h2 className="text-xl md:text-2xl text-white font-bold mb-3">{titleText}</h2>
            <div className="-m-2">
                {videos.map((video) => (
                    <div key={video.id} className="video-row p-2 flex flex-col md:flex-row hover:bg-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
                        <div className="flex-shrink-0 mb-2 md:mb-0">
                            <a href={"/watch?v=" + video.video_id}>
                                <img
                                    src={thumbnailDomain + "/" + video.video_id + ".jpg"}
                                    alt={video.title}
                                    className="w-full md:w-72 object-cover rounded-md"
                                />
                            </a>
                        </div>
                        <div className="ml-0 md:ml-4">
                            <div>
                                <a href={"/watch?v=" + video.video_id}>
                                    <h3 className="text-base md:text-lg font-medium text-white hover:underline">
                                        {video.title}
                                    </h3>
                                </a>
                                <p className="text-sm md:text-base text-white">
                                    {video.channel_name + " - " + video.upload_date}
                                </p>
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
};

export default ColumnVideoGrid;
