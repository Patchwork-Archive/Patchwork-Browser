import VideoGrid from "../components/VideoGrid";
import Divider from "../components/Divider";

function LandingPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 mt-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 mt-16 text-white">
          Welcome to the VTuber Music Archives
        </h2>
        <p className="text-xl text-gray-400">
          We have 0 videos archived taking up 10GB of storage space.
        </p>
      </div>
    <VideoGrid apiUrl="https://archive.pinapelz.moe/api/daily_featured_videos" titleText="Daily Featured"/>
    <VideoGrid apiUrl="https://archive.pinapelz.moe/api/discover_videos" titleText="Discover"/> 
    <Divider className="my-4" />
    <VideoGrid apiUrl="https://archive.pinapelz.moe/api/recently_archived" titleText="Recently Archived"/>   
    </main>
  );
}
export default LandingPage;
