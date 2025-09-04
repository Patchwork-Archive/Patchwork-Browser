import { Link } from "react-router-dom";
import HeadTags from "../components/HeadTags";

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <HeadTags
                title="Patchwork Archive"
                description="Preserving rhythm, one video at a time"
                url=""
                image={import.meta.env.VITE_OG_IMAGE_DYNA}
            />
            <meta name="prerender-status-code" content="404"></meta>
            <h1 className="text-4xl font-bold mb-8">404 - Not Found!</h1>
            <p className="text-lg text-center">I&apos;m gonna freak it</p>
            <img
                src="https://utfs.io/f/d011aa80-026f-4528-b43b-ac618a79b1db-qral5b.png"
                className="max-w-full h-auto"
                style={{ maxWidth: "50%", height: "auto" }}
            />
            <Link
                to="/"
                className="bg-accent text-white font-bold py-2 px-4 rounded-sm"
            >
                Go back to home page
            </Link>
        </div>
    );
}

export default NotFoundPage;
