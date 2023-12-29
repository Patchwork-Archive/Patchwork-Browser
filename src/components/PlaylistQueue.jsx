import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const PlaylistQueue = ({ playlist, currentSongIndex }) => {
    const itemRefs = useRef([]);

    useEffect(() => {
        if (currentSongIndex > 4 && itemRefs.current[currentSongIndex]) {
            itemRefs.current[currentSongIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentSongIndex]);
    return (
        <div className="text-center text-white overflow-auto max-h-64"> 
            <ul>
                {playlist.map((song, index) => (
                    <li
                        key={index}
                        ref={(el) => itemRefs.current[index] = el}
                        className={`p-2 ${index === currentSongIndex ? 'inline-block text-black bg-white' : ''}`}
                    >
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