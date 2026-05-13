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

    const isNumericChannel = typeof channelID === "string" && /^\d+$/.test(channelID);

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
            {isNumericChannel && (
                <div className="max-w-(--breakpoint-xl) mx-auto px-4 mt-6">
                    <div
                        role="alert"
                        className="rounded-md bg-red-50 p-4 ring-1 ring-red-200"
                    >
                        <div className="flex">
                            <div className="shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4zM10 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Bilibili channels are not fully supported
                                </h3>
                                <div className="mt-1 text-sm text-red-700">
                                    This channel appears to be a numeric Bilibili ID. The
                                    viewer cannot display some channel-specific metadata
                                    (profile info, avatars, etc.). Videos are still shown
                                    below.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isNumericChannel && (
                <ChannelCard
                    apiUrl={
                        import.meta.env.VITE_API_DOMAIN +
                        `/api/channel_name?channel_id=${channelID}`
                    }
                    channelID={`${channelID}`}
                />
            )}
            <div className="max-w-(--breakpoint-xl) mx-auto px-4 mt-8">
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
