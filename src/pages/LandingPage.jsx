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
  const [isLoading, setIsLoading] = useState(true);
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
        if (data.units == "MB"){
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
      <Announcement signpostURL={import.meta.env.VITE_KV_DOMAIN + "/api/announcement/get/patchwork"} />
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
              We have {numberOfVideos.toLocaleString()} videos archived taking
              up {storageUsed} GB of storage space.
            </h2>
          )}
        </div>
        <main tabIndex="-1" ref={mainRef}>
          <VideoGrid
            apiUrl={
              import.meta.env.VITE_API_DOMAIN + "/api/daily_featured_videos"
            }
            titleText="Daily Featured Songs"
          />
          <VideoGrid apiUrl={discoverAPIUrl} titleText="Discover Music" />
          <Divider className="my-4" />
          <ChannelCardGridMini
            apiUrl={import.meta.env.VITE_API_DOMAIN + "/api/discover_channels"}
            titleText="Discover VTubers"
          />
          <VideoGrid
            apiUrl={import.meta.env.VITE_API_DOMAIN + "/api/recently_archived"}
            titleText="Recently Archived"
          />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
