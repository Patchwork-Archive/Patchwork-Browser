import PlaylistPlayer from "../components/PlaylistPlayer";
import HeadTags from "../components/HeadTags";

function PlaylistPage() {
    const playlistData = new URLSearchParams(window.location.search).get("pl");
    return (
        <>
            <HeadTags
                title="Patchwork Archive - Playlist"
                description="Preserving rhythm, one video at a time"
                url="playlist"
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <div className="mt-4 text-lg">
                <PlaylistPlayer playlistData={playlistData} />
            </div>
        </>
    );
}
export default PlaylistPage;
