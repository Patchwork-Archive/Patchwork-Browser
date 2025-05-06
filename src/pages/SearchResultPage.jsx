import { useLocation } from "react-router-dom";
import SearchResultsVideo from "../components/SearchResultsVideo";
import SearchResultsChannel from "../components/SearchResultsChannel";
import PageSwitcher from "../components/PageSwitcher";
import Footer from "../components/Footer";
import HeadTags from "../components/HeadTags";
import { useEffect, useState } from "react";

function SearchResultPage() {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");
    const page = new URLSearchParams(search).get("page") || 1;
    const [videoSearchResultData, setVideoSearchResultData] = useState({});
    const [channelSearchResultData, setChannelSearchResultData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [numResults, setNumResults] = useState(0);

    useEffect(() => {
        fetch(
            import.meta.env.VITE_API_DOMAIN +
                `/api/search/results?q=${query}&page=${page}`,
        )
            .then((response) => {
                setIsLoading(false);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setVideoSearchResultData(data);
                setNumResults(data.results.length);
            })
            .catch((error) => setError(error));
    }, [page, query]);

    useEffect(() => {
        if (page != 1) return;
        fetch(
            import.meta.env.VITE_API_DOMAIN + "/api/search/channel?q=" + query,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setChannelSearchResultData(data);
            })
            .catch((error) => setError(error));
    }, [page]);

    if (error) {
        return (
            <p className="text-white text-xl justify-center flex">
                Error: {error.message}
            </p>
        );
    }

    return (
        <>
            <HeadTags
                title={query + " - Patchwork Archive"}
                description="Preserving rhythm, one video at a time"
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <a href="/channels" className="hover:underline text-xl text-white mb-2 mt-6 flex justify-center">
              Looking for a channel? Try the dedicated Channel Searcher!
            </a>
            <h1 className="text-2xl text-white font-bold mb-2 mt-6 flex justify-center">
                Showing results for
            </h1>
            <i className="text-lg text-white flex justify-center">{query}</i>
            {!isLoading && channelSearchResultData && page == 1 ? (
                <>
                    <SearchResultsChannel
                        results={channelSearchResultData.results}
                        query={query}
                    />
                </>
            ) : null}
            {isLoading ? (
                <p className="text-white text-xl justify-center flex">
                    Loading...
                </p>
            ) : (
                <SearchResultsVideo results={videoSearchResultData.results} />
            )}
            {isLoading || numResults == 0 ? (
                <></>
            ) : (
                <PageSwitcher
                    currentPage={page}
                    maxPage={videoSearchResultData.pages}
                />
            )}
            <Footer />
        </>
    );
}

export default SearchResultPage;
