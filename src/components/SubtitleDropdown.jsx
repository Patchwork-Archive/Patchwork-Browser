import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SubtitleDropdown = ({ subtitles, onSelect }) => {
  const defaultSubtitle = Object.keys(subtitles)[0]; // Default to the first available subtitle
  const [selectedSubtitle, setSelectedSubtitle] = useState(defaultSubtitle);

  useEffect(() => {
    onSelect(defaultSubtitle);
  }, [onSelect, defaultSubtitle]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSubtitle(selectedValue);
    onSelect(selectedValue);
  };

  if (!subtitles || Object.keys(subtitles).length === 0) {
    return null;
  }

  console.log(subtitles);

  return (
    <>
    <p className="text-white mt-1 mb-1 font-bold">Captions</p>
    <select
        className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedSubtitle}
        onChange={handleChange}
    >
        <option value="" disabled>
            Select a subtitle
        </option>
        {Object.keys(subtitles).map((key) => (
            key !== "live_chat" && (
                <option key={key} value={subtitles[key]}>
                    {key}
                </option>
            )
        ))}
    </select>
    </>
  );
};

SubtitleDropdown.propTypes = {
  subtitles: PropTypes.object,
  onSelect: PropTypes.func.isRequired
};

export default SubtitleDropdown;
