import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ColumnVideoGrid from "../components/ColumnVideoGrid";
import Footer from "../components/Footer";

const VideoPage = () => {
  const [videoId, setVideoId] = useState("");
  const discoverAPIUrl =
    import.meta.env.VITE_QUERY_RANDOM_FROM_DB == "true"
      ? import.meta.env.VITE_API_DOMAIN + "/api/discover_videos"
      : import.meta.env.VITE_STATIC_RANDOM_VIDEO_URL;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoIdParam = searchParams.get("v");
    setVideoId(videoIdParam);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full mt-2 md:w-2/3 flex-shrink-0">
          <VideoPlayer videoId={videoId} />
        </div>
        <div className="w-full md:w-1/3">
          <ColumnVideoGrid
            apiUrl={discoverAPIUrl}
            titleText="Discover"
            currentVideoId={videoId}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoPage;
