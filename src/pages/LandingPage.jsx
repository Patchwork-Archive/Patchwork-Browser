import { useState, useEffect } from "react";
import HeadTags from "../components/HeadTags";
import Announcement from "../components/Announcement";
import VideoGrid from "../components/VideoGrid";

function LandingPage() {
  const [storageUsed, setStorageUsed] = useState(0);
  const [numberOfVideos, setNumberOfVideos] = useState(0);
  const [announcementMessage, setAnnouncementMessage] = useState("");

  useEffect(() => {
    fetch("https://archive.pinapelz.moe/api/storage/status")
      .then((response) => response.json())
      .then((data) => {
        setStorageUsed(data.storage_size);
        setNumberOfVideos(data.number_of_files);
      })
      .catch((error) => console.error(error));

    fetch("https://api.lanyard.rest/v1/users/246787839570739211")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.kv && data.data.kv.patchworkAnnouncement) {
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
        description="Preserving Cultured Rhythm For the Future"
        image="https://patchwork.moekyun.me/favicon.png"
        url=""
      />
      {announcementMessage ? (
        <Announcement message={announcementMessage} />
      ) : null}
      <main className="max-w-screen-xl mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 mt-16 text-white">
            Welcome
          </h2>
          <p className="text-xl text-gray-400">
            We have {numberOfVideos} videos archived taking up {storageUsed}GB of storage space.
          </p>
        </div>
        <VideoGrid
          apiUrl="https://archive.pinapelz.moe/api/daily_featured_videos"
          titleText="Daily Featured"
        />
        <VideoGrid
          apiUrl="https://archive.pinapelz.moe/api/discover_videos"
          titleText="Discover"
        />
      </main>
    </>
  );
}

export default LandingPage;