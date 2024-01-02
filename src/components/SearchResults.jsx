import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const thumbnailDomain =
    "https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails";

const SearchResults = ({ apiUrl, pageNumber }) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(apiUrl + "&" + "page=" + pageNumber)
            .then((response) => {
                setIsLoading(false);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setResults(data))
            .catch((error) => setError(error));
    }, [apiUrl, pageNumber]);

    if (error) {
        return <div className="text-white">Error: {error.message}</div>;
    }

    if (isLoading) {
        return (
            <div className="text-white text-xl justify-center flex animate-pulse">
                Loading Search Results. Guru Guru...
            </div>
        );
    }

    return (
        <div className="p-4 mx-12">
            <div className="-m-2">
                {!Array.isArray(results) || results.length === 0 ? (
                    <p className="text-white text-xl justify-center flex">No results on this page</p>
                ) : (
                    results.map((video) => (
                        <div
                            key={video.id}
                            className="p-2 flex mb-4 border-gray-400"
                            style={{ width: "calc(100% - 1rem)" }}
                        >
                            <div className="flex-shrink-0">
                                <a href={"/watch?v=" + video.video_id}>
                                    <img
                                        src={thumbnailDomain + "/" + video.video_id + ".jpg"}
                                        alt={video.title}
                                        className="w-96 object-cover rounded-md"
                                    />
                                </a>
                            </div>
                            <div className="ml-4 flex-grow">
                                <a href={"/watch?v=" + video.video_id}>
                                    <h3 className="text-xl font-bold text-white hover:underline">
                                        {video.title}
                                    </h3>
                                </a>
                                <a className="hover:underline" href={"/channel/" + video.channel_id}>
                                <p className="hover:underline text-lg text-white">
                                    <span className="font-medium ">{video.channel_name}</span> -{" "}
                                    {video.upload_date}
                                </p>
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

SearchResults.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    pageNumber: PropTypes.string,
};

export default SearchResults;