import { Link } from "react-router-dom";
import HeadTags from "../components/HeadTags";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <HeadTags
        title="Patchwork Archive"
        description="Preserving Cultured Rhythm For the Future"
        image="https://patchwork.moekyun.me/favicon.png"
        url=""
      />
      <h1 className="text-4xl font-bold mb-8">404 - Not Found!</h1>
      <Link to="/" className="bg-accent text-white font-bold py-2 px-4 rounded">
        Go back to home page
      </Link>
    </div>
  );
}

export default NotFoundPage;
