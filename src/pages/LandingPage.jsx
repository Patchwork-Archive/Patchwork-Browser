import { useState, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import HeadTags from "../components/HeadTags";
import Announcement from "../components/Announcement";
import VideoGrid from "../components/VideoGrid";
import Divider from "../components/Divider";
import Footer from "../components/Footer";

function LandingPage() {
  const [storageUsed, setStorageUsed] = useState(0);
  const [numberOfVideos, setNumberOfVideos] = useState(0);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const discoverAPIUrl = import.meta.env.VITE_QUERY_RANDOM_FROM_DB 
  ? import.meta.env.VITE_STATIC_RANDOM_VIDEO_URL
  : "https://patchwork-backend.vercel.app/api/discover_videos";
  const mainRef = useRef(null);

  useHotkeys('alt+p', () => focusMainContent());

  const focusMainContent = () => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  };

  useEffect(() => {
    fetch("https://patchwork-backend.vercel.app/api/storage/status")
      .then((response) => response.json())
      .then((data) => {
        setStorageUsed(data.storage_size);
        setNumberOfVideos(data.number_of_files);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));

    fetch("https://api.lanyard.rest/v1/users/246787839570739211")
      .then((response) => response.json())
      .then((data) => {
        if (
          data.success &&
          data.data.kv &&
          data.data.kv.patchworkAnnouncement
        ) {
          const message = data.data.kv.patchworkAnnouncement;
          if (message !== "None") {
            setAnnouncementMessage(message);
          }
        }
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
      <HeadTags
        title="Patchwork Archive"
        description="Preserving rhythm, one video at a time"
        image="https://patchwork.moekyun.me/favicon.png"
        url=""
      />
      {announcementMessage ? (
        <Announcement message={announcementMessage} />
      ) : null}
      <div className="max-w-screen-xl mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 mt-16 text-white">
            Welcome to the VTuber Music Archives
          </h1>
          {isLoading ? (
            <h2 className="text-xl text-gray-400">Now loading the archives...</h2>
          ) : (
            <h2 className="text-xl text-gray-400">
              We have {numberOfVideos.toLocaleString()} videos archived taking
              up {storageUsed}GB of storage space.
            </h2>
          )}
        </div>
        <main tabIndex="-1" ref={mainRef}>
        <VideoGrid
          apiUrl="https://patchwork-backend.vercel.app/api/daily_featured_videos"
          titleText="Daily Featured"
        />
        <VideoGrid
          apiUrl={discoverAPIUrl}
          titleText="Discover"
        />
        <Divider className="my-4" />
        <VideoGrid
          apiUrl="https://patchwork-backend.vercel.app/api/recently_archived"
          titleText="Recently Archived"
        />
      </main>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
