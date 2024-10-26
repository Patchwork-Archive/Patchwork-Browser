function Announcement() {
    const content = import.meta.env.VITE_ANNOUNCEMENT;

    if (content) {
        return (
            <div className="bg-yellow-200 p-4 text-yellow-800">
                <p>{content}</p>
            </div>
        );
    } else {
        return null;
    }
}

export default Announcement;
