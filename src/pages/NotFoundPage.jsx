import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <h1 className="text-4xl font-bold mb-8">404 - Not Found!</h1>
            <Link to="/" className="bg-accent text-white font-bold py-2 px-4 rounded">
                Go back to home page
            </Link>
        </div>
    );
}

export default NotFoundPage;