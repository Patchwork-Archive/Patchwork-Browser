import { Link } from "react-router-dom";
import HeadTags from "../components/HeadTags";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <HeadTags
        title="Patchwork Archive"
        description="Preserving rhythm, one video at a time"
        image="https://files.pinapelz.com/android-chrome-192x192.png"
        url=""
      />
      <meta name="prerender-status-code" content="404"></meta>
      <h1 className="text-4xl font-bold mb-8">404 - Not Found!</h1>
      <Link to="/" className="bg-accent text-white font-bold py-2 px-4 rounded">
        Go back to home page
      </Link>
    </div>
  );
}

export default NotFoundPage;
