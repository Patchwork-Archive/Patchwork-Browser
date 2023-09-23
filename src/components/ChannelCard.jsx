import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

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
            <Helmet>
                <meta name="title" content={`${channelData} - Patchwork Archive`} />
                <meta name="description" content="Preserving rhythm, one video at a time" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.location.origin}/channel/${channelData}`}/>
                <meta property="og:title" content={`${channelData} - Patchwork Archive`} />
                <meta property="og:image" content={`${window.location.origin}/favicon.png`} />
                <meta property="og:description" content="Preserving rhythm, one video at a time" />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content={`${window.location.origin}/channel/${channelData}`} />
                <meta property="twitter:title" content={`${channelData} - Patchwork Archive`} />
                <meta property="twitter:description" content="Preserving rhythm, one video at a time" />
                <meta property="twitter:creator" content="@pinapelz" />
            </Helmet>
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