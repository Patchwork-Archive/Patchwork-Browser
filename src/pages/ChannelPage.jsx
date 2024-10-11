import { useParams } from "react-router-dom";
import PageSwitcher from "../components/PageSwitcher";
import ChannelCard from "../components/ChannelCard";
import ChannelPageGrid from "../components/ChannelPageGrid";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function ChannelPage() {
    const queryParams = new URLSearchParams(window.location.search);
    const [channelPageData, setChannelPageData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [numPages, setNumPages] = useState(0);
    let page = parseInt(queryParams.get("page"));
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    const { channelID } = useParams();

    useEffect(() => {
        fetch(
            import.meta.env.VITE_API_DOMAIN +
                `/api/channel/${channelID}?page=${page}`,
        )
            .then((response) => response.json())
            .then((data) => {
                setChannelPageData(data.results);
                setNumPages(data.pages);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [page, channelID]);
    return (
        <>
            <ChannelCard
                apiUrl={
                    import.meta.env.VITE_API_DOMAIN +
                    `/api/channel_name?channel_id=${channelID}`
                }
                channelID={`${channelID}`}
            />
            <div className="max-w-screen-xl mx-auto px-4 mt-8">
                <ChannelPageGrid
                    isLoading={isLoading}
                    videos={channelPageData}
                />
            </div>
            <PageSwitcher currentPage={page} maxPage={numPages} />
            <Footer />
        </>
    );
}

export default ChannelPage;
