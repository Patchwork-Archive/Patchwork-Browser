import { useState, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Announcement from "../components/Announcement";
import VideoGrid from "../components/VideoGrid";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import HeadTags from "../components/HeadTags";
import ChannelCardGridMini from "../components/ChannelCardGridMini";

function LandingPage() {
    const [storageUsed, setStorageUsed] = useState(0);
    const [numberOfVideos, setNumberOfVideos] = useState(0);
    const [numberOfChannels, setNumberOfChannels] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [lastArchivedDate, setLastArchivedDate] = useState("");
    const discoverAPIUrl =
        import.meta.env.VITE_QUERY_RANDOM_FROM_DB == "true"
            ? import.meta.env.VITE_API_DOMAIN + "/api/discover_videos"
            : import.meta.env.VITE_STATIC_RANDOM_VIDEO_URL;
    const mainRef = useRef(null);

    useHotkeys("alt+p", () => focusMainContent());

    const focusMainContent = () => {
        if (mainRef.current) {
            mainRef.current.focus();
        }
    };

    useEffect(() => {
        fetch(import.meta.env.VITE_API_DOMAIN + "/api/storage/status")
            .then((response) => response.json())
            .then((data) => {
                setStorageUsed(data.storage_size);
                setNumberOfVideos(data.number_of_files);
                setNumberOfChannels(data.number_of_channels);
                setLastArchivedDate(data.most_recent_archived_video_date);
                if (data.units == "MB") {
                    setStorageUsed((data.storage_size / 1024).toFixed(2));
                }
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <HeadTags
                title="Patchwork Archive"
                description="Preserving rhythm, one video at a time"
                url="playlist"
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <Announcement />
            <div className="max-w-screen-xl mx-auto px-4 mt-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 mt-16 text-white">
                        Welcome to the VTuber Music Archives
                    </h1>
                    {isLoading ? (
                        <h2 className="text-xl text-gray-400">
                            Now loading the archives...
                        </h2>
                    ) : (
                        <h2 className="text-xl text-gray-400">
                            We've archived {numberOfVideos.toLocaleString()}{" "}
                            videos across {numberOfChannels.toLocaleString()}{" "}
                            channels taking up {storageUsed} GB of storage
                            space.
                        </h2>
                    )}
                    {lastArchivedDate != "" ? (
                        <h2 className="text-lg text-gray-400">
                            Last archival round occured on {lastArchivedDate}{" "}
                            PST
                        </h2>
                    ) : null}
                </div>
                <a href="https://github.com/Patchwork-Archive">
                    <div class="flex justify-center">
                        <div class="flex items-center justify-center bg-purple-700 text-white px-4 py-4 rounded-md shadow-md hover:bg-purple-800 w-full sm:w-3/4 md:w-1/2 max-w-md">
                            <img
                                src="logo.webp"
                                alt="Patchwork Icon"
                                class="w-10 h-10 sm:w-12 sm:h-12 mr-4 rounded-lg"
                            />
                            <span class="font-bold text-lg sm:text-2xl">
                                Patchwork Archive
                            </span>
                        </div>
                    </div>
                </a>
                <main tabIndex="-1" ref={mainRef}>
                    <VideoGrid
                        apiUrl={
                            import.meta.env.VITE_API_DOMAIN +
                            "/api/daily_featured_videos"
                        }
                        titleText="Daily Featured Songs"
                    />
                    <VideoGrid
                        apiUrl={discoverAPIUrl}
                        titleText="Discover Music"
                    />
                    <Divider className="my-4" />
                    <VideoGrid
                        apiUrl={
                            import.meta.env.VITE_API_DOMAIN + "/api/popular"
                        }
                        titleText="Popular Videos"
                    />
                    <ChannelCardGridMini
                        apiUrl={
                            import.meta.env.VITE_API_DOMAIN +
                            "/api/discover_channels"
                        }
                        titleText="Discover VTubers"
                    />
                    <VideoGrid
                        apiUrl={
                            import.meta.env.VITE_API_DOMAIN +
                            "/api/recently_archived"
                        }
                        titleText="Recently Archived"
                    />
                    <p className="text-gray-400 text-m mb-8">
                        The dates of the videos shown here are not indicative of
                        when archival last occured as videos may be processed
                        non-chronologically
                    </p>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default LandingPage;
