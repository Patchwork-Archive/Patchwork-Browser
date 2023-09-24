import { useEffect, useState } from "react";
import CaptionPlayer from "../components/CaptionPlayer";
import ColumnVideoGrid from "../components/ColumnVideoGrid";

const CaptionVideoPage = () => {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoIdParam = searchParams.get("v");
    setVideoId(videoIdParam);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full mt-2 md:w-2/3 p-4">
          <CaptionPlayer videoId={videoId} />
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

export default CaptionVideoPage;
