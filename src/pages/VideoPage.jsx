import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ColumnVideoGrid from "../components/ColumnVideoGrid";
import Footer from "../components/Footer";

const VideoPage = () => {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoIdParam = searchParams.get("v");
    setVideoId(videoIdParam);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
      <div className="w-full mt-2 md:w-2/3 p-4 flex-shrink-0">
          <VideoPlayer videoId={videoId} />
        </div>
        <div className="w-full md:w-1/3">
          <ColumnVideoGrid
            apiUrl="https://patchwork-backend.vercel.app/api/discover_videos"
            titleText="Discover"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoPage;
