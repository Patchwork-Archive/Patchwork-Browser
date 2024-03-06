import PlaylistPlayer from "../components/PlaylistPlayer";
import HeadTags from "../components/HeadTags";

function PlaylistPage() {
  const playlistData = new URLSearchParams(window.location.search).get("pl");
  return (
    <>
      <HeadTags 
        title="Patchwork Archive - Playlist" 
        description="Preserving rhythm, one video at a time"
        url="/playlist"
        />
      <div className="mt-4 text-lg">
        <PlaylistPlayer playlistData={playlistData}/>
      </div>
    </>
  );
}
export default PlaylistPage;
