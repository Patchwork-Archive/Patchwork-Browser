import VideoGrid from "../components/VideoGrid";
import Divider from "../components/Divider";
import { Helmet } from "react-helmet";

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Patchwork Archive</title>
        <meta
          name="title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          name="description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:title" content="Patchwork Archive" />
        <meta
          property="og:image"
          content={`${window.location.origin}/favicon.png`}
        />
        <meta
          property="og:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`${window.location.origin}`} />
        <meta
          property="twitter:title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          property="twitter:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:creator" content="@pinapelz" />
      </Helmet>
      <main className="max-w-screen-xl mx-auto px-4 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 mt-16 text-white">
            Welcome to the VTuber Music Archives
          </h2>
          <p className="text-xl text-gray-400">
            We have 0 videos archived taking up 10GB of storage space.
          </p>
        </div>
        <VideoGrid
          apiUrl="https://archive.pinapelz.moe/api/daily_featured_videos"
          titleText="Daily Featured"
        />
        <VideoGrid
          apiUrl="https://archive.pinapelz.moe/api/discover_videos"
          titleText="Discover"
        />
        <Divider className="my-4" />
        <VideoGrid
          apiUrl="https://archive.pinapelz.moe/api/recently_archived"
          titleText="Recently Archived"
        />
      </main>
    </>
  );
}
export default LandingPage;
