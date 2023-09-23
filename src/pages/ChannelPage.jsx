import { useParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import PageSwitcher from "../components/PageSwitcher";
import ChannelCard from "../components/ChannelCard";
import { Helmet } from "react-helmet";

function ChannelPage() {
  const queryParams = new URLSearchParams(window.location.search);
  let page = parseInt(queryParams.get("page"));
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  const { channelID } = useParams();
  return (
    <>
      <Helmet>
        <title>Patchwork Archive</title>
        <meta
          name="title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          name="description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:title" content="Patchwork Archive" />
        <meta property="og:image" content="/favicon.png" />
        <meta
          property="og:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="/" />
        <meta
          property="twitter:title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          property="twitter:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:creator" content="@pinapelz" />
      </Helmet>
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
