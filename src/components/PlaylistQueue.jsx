import PropTypes from 'prop-types';

const PlaylistQueue = ({ playlist, currentSongIndex }) => {
    return (
        <div className="text-center text-white"> 
            <ul>
                {playlist.map((song, index) => (
                    <li key={index} className={`p-2 ${index === currentSongIndex ? 'inline-block text-black bg-white' : ''}`}>
                        <span>{song.title}</span> - <span>{song.artist}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
PlaylistQueue.propTypes = {
    playlist: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired
        })
    ).isRequired,
    currentSongIndex: PropTypes.number.isRequired
};

export default PlaylistQueue;
