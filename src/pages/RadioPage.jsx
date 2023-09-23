import RadioPlayer from "../components/RadioPlayer";
import HeadTags from "../components/HeadTags";

function RadioPage() {
  return (
    <>
      <HeadTags 
        title="Patchwork Archive - Radio" 
        description="Preserving Cultured Rhythm For the Future"
        image="https://patchwork.moekyun.me/favicon.png"
        url="/radio"
        />
      <div className="mt-4 text-lg">
        <RadioPlayer />
      </div>
    </>
  );
}
export default RadioPage;
