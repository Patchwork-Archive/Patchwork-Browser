import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ColumnVideoGrid from "../components/ColumnVideoGrid";
import { Helmet } from "react-helmet";

const VideoPage = () => {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoIdParam = searchParams.get("v");
    setVideoId(videoIdParam);
  }, []);

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Patchwork Archive" />
        <meta property="og:video:height" content="720" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:type" content="video.other" />
        <meta property="og:video:type" content="text/html" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="{{domain}}/watch?v={{video_id}}" />
      </Helmet>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full mt-2 md:w-2/3 p-4">
          <VideoPlayer videoId={videoId} />
        </div>
        <div className="w-full md:w-1/3">
          <ColumnVideoGrid
            apiUrl="https://archive.pinapelz.moe/api/discover_videos"
            titleText="Discover"
          />
        </div>
      </div>
    </>
  );
};

export default VideoPage;
