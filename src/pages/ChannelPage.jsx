import { useParams } from "react-router-dom";
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
    return (
        <>
        <ChannelCard apiUrl={`https://patchwork-backend.vercel.app/api/channel_name?channel_id=${channelID}`} channelID={`${channelID}`} />
        <div className="max-w-screen-xl mx-auto px-4 mt-8">
        <VideoGrid apiUrl={`https://patchwork-backend.vercel.app/api/channel/${channelID}?page=${page}`} />
        </div>
        <PageSwitcher/>
            
        </>
    );
}

export default ChannelPage;