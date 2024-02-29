import RadioPlayer from "../components/RadioPlayer";
import HeadTags from "../components/HeadTags";

function RadioPage() {
  return (
    <>
      <HeadTags 
        title="Patchwork Archive - Playlist" 
        description="Preserving rhythm, one video at a time"
        url="/playlist"
        />
      <div className="mt-4 text-lg">
        <RadioPlayer />
      </div>
    </>
  );
}
export default RadioPage;
