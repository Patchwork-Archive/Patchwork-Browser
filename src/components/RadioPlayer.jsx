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
        }
    }, []);

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
        <div className="min-h-screen w-screen mt-8 items-center justify-center">
            {isLoading ? (
                <div className="text-white text-center">Loading...</div>
            ) : (
                video && (
                    <div className="relative max-w-6xl mx-auto text-center">
                        <Link
                            to={`/watch?v=${video.video_id}`}
                            className="rounded-lg p-2 mb-4 inline-block"
                        >
                            <h1 className="hover:underline text-2xl font-bold text-white justify-center flex">
                                {video.title}
                            </h1>
                        </Link>
                        <div className="bg-gray-900 rounded-lg p-2 mb-2">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <button
                                    onClick={handlePlayPauseClick}
                                    className="text-white mb-2 sm:mb-0"
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <button onClick={handleSkipClick} className="text-white">
                                    Skip
                                </button>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label
                                    htmlFor="volume-slider"
                                    className="mr-2 text-white mb-2 sm:mb-0"
                                >
                                    Volume:
                                </label>
                                <input
                                    id="volume-slider"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label
                                    htmlFor="progress-bar"
                                    className="mr-2 text-white mb-2 sm:mb-0"
                                >
                                    Progress:
                                </label>
                                <progress id="progress-bar" value={progress} max="100" />
                            </div>
                            <div className="text-white text-center">
                                Finished listening to {videoCount} songs
                            </div>
                        </div>
                        {/* Video section */}
                        <div className="flex justify-center pb-5">
                            <video
                                key={video.video_id}
                                ref={videoRef}
                                className="w-full object-cover"
                                title={video.title}
                                autoPlay
                                onEnded={handleSkipClick}
                            >
                                <source
                                    src={`https://cdn.pinapelz.com/VTuber%20Covers%20Archive/${video.video_id}.webm`}
                                    type="video/webm"
                                />
                            </video>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default RadioPlayer;