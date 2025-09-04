import { useState, useEffect } from "react";
import HeadTags from "../components/HeadTags";
import SearchResultsChannel from "../components/SearchResultsChannel";

function ChannelListPage() {
    const [channels, setChannels] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchChanged, setSearchChanged] = useState(false);
    const [currentSearch, setCurrentSearch] = useState("");
    const searchParams = new URLSearchParams(window.location.search);
    const channelQuery = searchParams.get("q");
    const searchAPI =
        import.meta.env.VITE_API_DOMAIN + "/api/search/channel?q=";
    const pfpDomain = import.meta.env.VITE_PFP_DOMAIN;

    const fetchChannels = (query) => {
        setLoading(true);
        setSearchChanged(false);
        fetch(searchAPI + query)
            .then((response) => response.json())
            .then((data) => {
                setChannels(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchChannels(channelQuery);
    }, [channelQuery]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setSearchChanged(true);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchChannels(search);
        setSearch("");
        setCurrentSearch(search);
    };
    const filteredChannels = channels.filter(
        (channel) =>
            channel.channel_name.toLowerCase().includes(search.toLowerCase()) ||
            channel.description.toLowerCase().includes(search.toLowerCase()),
    );
    return (
        <div className="w-full text-white">
            <HeadTags
                title="Channels - Patchwork Archive"
                description="Preserving rhythm, one video at a time"
                url=""
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col justify-center w-1/2 mx-auto"
            >
                <input
                    type="text"
                    placeholder="Filter channels... Hit enter to create a new search query!"
                    value={search}
                    onChange={handleSearchChange}
                    className="mb-4 p-2 mt-4 mx-4 rounded-md text-black bg-white"
                />
                {search && searchChanged && (
                    <button
                        type="submit"
                        className="mb-4 p-2 mx-4 rounded-md bg-accent hover:bg-accent-dark"
                    >
                        Search
                    </button>
                )}
            </form>
            {currentSearch && (
                <p className="font-semibold text-center">
                    Showing results for {currentSearch}
                </p>
            )}
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    Loading...
                </div>
            ) : (
                <SearchResultsChannel
                    results={filteredChannels}
                    limit={100}
                    hide_redirect={true}
                />
            )}
        </div>
    );
}

export default ChannelListPage;
