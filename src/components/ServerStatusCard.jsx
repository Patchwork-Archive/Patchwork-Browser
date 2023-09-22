import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function ServerStatusCard({ apiUrl }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .catch((error) => setError(error));
    }, [apiUrl]);

    return (
        <div className="bg-accent border-2 border-white rounded-lg p-4 mb-16 mx-8 my-8">
            <h1 className="text-white text-3xl font-bold mt-8 mb-8 text-center">
                {error ? "Backend Server and Database Down!" : "Backend Server and Database Healthy"}
            </h1>
        </div>
    );
}

ServerStatusCard.propTypes = {
    apiUrl: PropTypes.string,
};

export default ServerStatusCard;