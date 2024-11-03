import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchResultsChannel = ({
    results,
    limit = 6,
    hide_redirect = false,
}) => {
    const pfpDomain = import.meta.env.VITE_PFP_DOMAIN;

    if (results == null || results.length === 0) return;

    return (
        <>
            <div className="py-4 px-2 flex flex-wrap justify-center gap-4">
                {results.slice(0, limit).map((channel) => (
                    <Link
                        key={channel.channel_id}
                        to={`/channel/${channel.channel_id}`}
                        className="flex flex-col items-center p-4 border-gray-400 hover:bg-gray-700 hover:rounded-lg transition-colors duration-200 w-72"
                    >
                        <img
                            src={`${pfpDomain}/${channel.channel_id}_pfp.jpg`}
                            alt={channel.channel_name}
                            className="w-24 h-24 rounded-full mb-2"
                        />
                        <span className="text-md font-medium text-white text-center">
                            {channel.channel_name}
                        </span>
                    </Link>
                ))}
            </div>
            {!hide_redirect && results.length > 6 && (
                <div className="text-center">
                    <a
                        href={"/channels?q=" + query}
                        className="text-white hover:scale-105 underline px-4 py-2 bg-accent rounded-md inline-block transition-transform duration-200"
                    >
                        Show more channels
                    </a>
                </div>
            )}
        </>
    );
};

SearchResultsChannel.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            channel_id: PropTypes.string,
            channel_name: PropTypes.string,
        }),
    ),
    limit: PropTypes.number,
};

export default SearchResultsChannel;
