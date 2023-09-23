import { useParams, useEffect } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import PageSwitcher from "../components/PageSwitcher";
import ChannelCard from "../components/ChannelCard";

function ChannelPage() {
  const queryParams = new URLSearchParams(window.location.search);
  let page = parseInt(queryParams.get("page"));
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  const { channelID } = useParams();

  useEffect(() => {
    const helmetElements = document.querySelectorAll("[data-react-helmet]");
    helmetElements.forEach((el) => {
      el.removeAttribute("data-react-helmet");
    });
  }, []);

  return (
    <>
      <ChannelCard
        apiUrl={`https://archive.pinapelz.moe/api/channel_name?channel_id=${channelID}`}
      />
      <div className="max-w-screen-xl mx-auto px-4 mt-8">
        <VideoGrid
          apiUrl={`https://archive.pinapelz.moe/api/channel/${channelID}?page=${page}`}
        />
      </div>
      <PageSwitcher />
    </>
  );
}

export default ChannelPage;
