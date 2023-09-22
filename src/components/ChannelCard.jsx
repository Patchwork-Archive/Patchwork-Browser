import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ChannelCard = ({ apiUrl }) => {
    const [channelData, setChannelData] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setChannelData(data.channel_name));
    }, [apiUrl]);

    console.log(apiUrl);

    return (
        <div className="flex justify-center rounded mt-8">
            <div className="bg-accent p-4 rounded">
                <h1 className="text-white text-xl font-bold">{channelData}</h1>
            </div>
        </div>
    );
};

ChannelCard.propTypes = {
    apiUrl: PropTypes.string,
};

export default ChannelCard;