import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function RadioPlayer() {
    const [video, setVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(() => {
        const storedVolume = localStorage.getItem("volume");
        return storedVolume ? parseFloat(storedVolume) : 0.5;
    });
    const [progress, setProgress] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchVideo = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://archive.pinapelz.moe/api/random_video"
                );
                const data = await response.json();
                setVideo(data);
            } catch (error) {
                console.error("Failed to fetch video:", error);
            }
            setIsLoading(false);
        };

        if (!video) {
            fetchVideo();
        }

        const handleVideoEnd = () => {
            fetchVideo();
            setVideoCount(videoCount + 1);
        };
        if (videoRef.current) {
            videoRef.current.addEventListener("ended", handleVideoEnd);
            videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("ended", handleVideoEnd);
                videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            }
        };
    }, [video, videoCount]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
        localStorage.setItem("volume", volume);
    }, [volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            }
        };
    }, [volume]);

    const handlePlayPauseClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkipClick = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://archive.pinapelz.moe/api/random_video"
            );
            const data = await response.json();
            setVideo(data);
            setIsPlaying(true);
        } catch (error) {
            console.error("Failed to fetch video:", error);
        }
        setIsLoading(false);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress =
                (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-900">
            {isLoading ? (
                <div className="text-white text-2xl">Loading...</div>
            ) : (
                video && (
                    <div className="flex flex-col items-center space-y-6">
                        <div className={`w-96 h-96 bg-center bg-cover rounded-full mb-8 ${isPlaying ? 'animate-spin' : ''}`} 
                            style={{ backgroundImage: `url(https://content.pinapelz.com/file/vtuber-rabbit-hole-archive/VTuber+Covers+Archive/thumbnails/${video.video_id}.jpg)` }}>
                        </div>

                        {/* Song Info */}
                        <Link to={`/watch?v=${video.video_id}`} className="text-white text-xl hover:underline">
                            {video.title}
                        </Link>

                        {/* Player Controls */}
                        <div className="flex space-x-4">
                            <button onClick={handlePlayPauseClick} className="text-white py-1 px-4 rounded bg-gray-800 hover:bg-gray-700">
                                {isPlaying ? "Pause" : "Play"}
                            </button>
                            <button onClick={handleSkipClick} className="text-white py-1 px-4 rounded bg-gray-800 hover:bg-gray-700">Skip</button>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center space-x-4">
                            <label htmlFor="volume-slider" className="text-white">Volume:</label>
                            <input
                                id="volume-slider"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-32"
                            />
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center space-x-4 w-64">
                            <label htmlFor="progress-bar" className="text-white">Progress:</label>
                            <progress id="progress-bar" value={progress} max="100" className="w-full"/>
                        </div>

                        <div className="text-white text-md">
                            Finished listening to {videoCount} songs
                        </div>

                        {/* Audio section */}
                        <audio key={video.video_id} ref={videoRef} autoPlay onEnded={handleSkipClick}>
                            <source src={`https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${video.video_id}.webm`} type="audio/webm" />
                        </audio>
                    </div>
                )
            )}
        </div>
    );
}

export default RadioPlayer;