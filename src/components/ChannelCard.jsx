import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeadTags from "../components/HeadTags";

const ChannelCard = ({ apiUrl, channelID }) => {
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
                <HeadTags 
                title={`Patchwork Archive - ${channelData}`} 
                description="Preserving Cultured Rhythm For the Future"
                image="https://patchwork.moekyun.me/favicon.png"
                url={`channel/${channelID}`}
                />
                <h1 className="text-white text-xl font-bold">{channelData}</h1>
            </div>
        </div>
    );
};

ChannelCard.propTypes = {
    apiUrl: PropTypes.string,
    channelID: PropTypes.string,
};

export default ChannelCard;