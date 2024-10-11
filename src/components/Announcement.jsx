import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Announcement({ signpostURL }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(signpostURL)
            .then((response) => response.json())
            .then((data) => {
                // If the announcement exists and its not empty
                if (data && data.content !== "") {
                    setContent(data.content);
                }
            })
            .catch((error) => console.error(error));
    }, []);

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

Announcement.propTypes = {
    signpostURL: PropTypes.string.isRequired,
};

export default Announcement;
