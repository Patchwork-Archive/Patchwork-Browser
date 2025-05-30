import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SubtitleDropdown = ({ subtitles, onSelect }) => {
    let defaultSubtitle;
    for (const subtitleKey in subtitles) {
        if (subtitleKey !== "live_chat") {
            defaultSubtitle = subtitleKey;
            break;
        }
    }

    const [selectedSubtitle, setSelectedSubtitle] = useState(
        () => defaultSubtitle,
    );

    useEffect(() => {
        onSelect(defaultSubtitle);
    }, [onSelect, defaultSubtitle]);

    const handleChange = (event) => {
        setSelectedSubtitle(event.target.value);
        onSelect(event.target.value);
    };

    return (
        <>
            <p className="text-white mt-1 mb-1 font-bold mr-2">Captions</p>
            <select
                className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedSubtitle}
                onChange={handleChange}
            >
                {Object.keys(subtitles).map(
                    (key) =>
                        key !== "live_chat" && (
                            <option key={key} value={key}>
                                {subtitles[key][0].name}
                            </option>
                        ),
                )}
            </select>
        </>
    );
};

SubtitleDropdown.displayName = "SubtitleDropdown";

SubtitleDropdown.propTypes = {
    subtitles: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
};

export default SubtitleDropdown;
