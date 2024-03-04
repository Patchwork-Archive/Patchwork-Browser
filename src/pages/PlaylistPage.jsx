import PlaylistPlayer from "../components/PlaylistPlayer";
import HeadTags from "../components/HeadTags";

function PlaylistPage() {
  return (
    <>
      <HeadTags 
        title="Patchwork Archive - Playlist" 
        description="Preserving rhythm, one video at a time"
        url="/playlist"
        />
      <div className="mt-4 text-lg">
        <PlaylistPlayer />
      </div>
    </>
  );
}
export default PlaylistPage;
