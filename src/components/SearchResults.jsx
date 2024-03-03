import PropTypes from "prop-types";

const thumbnailDomain =
  "https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails";

const SearchResults = ({ results }) => {
  return (
    <div className="p-4 mx-12">
      <div className="-m-2">
        {!Array.isArray(results) || results.length === 0 ? (
          <p className="text-white text-xl justify-center flex font-bold">
            No results for this query
          </p>
        ) : (
          results.map((video) => (
            <div
              key={video.id}
              className="flex flex-col sm:flex-row p-2 mb-4 border-gray-400 hover:bg-gray-700 hover:rounded-lg transition-colors duration-200"
              style={{ width: "calc(100% - 1rem)" }}
            >
              <div className="flex-shrink-0">
                <a href={"/watch?v=" + video.video_id}>
                  <img
                    src={thumbnailDomain + "/" + video.video_id + ".jpg"}
                    alt={video.title}
                    className="w-full sm:w-96 object-cover rounded-md"
                  />
                </a>
              </div>
              <div className="ml-4 flex-grow">
                <a href={"/watch?v=" + video.video_id}>
                  <h3 className="text-xl font-bold text-white hover:underline">
                    {video.title}
                  </h3>
                </a>
                <a
                  className="hover:underline"
                  href={"/channel/" + video.channel_id}
                >
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
  results: PropTypes.arrayOf(
    PropTypes.shape({
      channel_id: PropTypes.string,
      channel_name: PropTypes.string,
      description: PropTypes.string,
      title: PropTypes.string,
      upload_date: PropTypes.string,
      video_id: PropTypes.string,
    })
  ),
};

export default SearchResults;
