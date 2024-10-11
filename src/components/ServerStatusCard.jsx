import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
    faSquareCheck,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="rounded-lg mb-16 mx-4 px-4">
            <div className="flex justify-center items-center gap-2 mb-4">
                <h1 className="text-white text-2xl font-bold">
                    Backend Server and Database:
                </h1>
                {error ? (
                    <FontAwesomeIcon
                        icon={faSquareXmark}
                        className="text-red-500 text-3xl"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-green-500 text-3xl"
                    />
                )}
            </div>
            <p className="text-white text-xl text-center">
                {error
                    ? "We're currently experiencing technical difficulties. Please check back later."
                    : "All systems are functioning normally."}
            </p>
        </div>
    );
}

ServerStatusCard.propTypes = {
    apiUrl: PropTypes.string,
};

export default ServerStatusCard;
