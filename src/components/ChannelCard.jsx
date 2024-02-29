import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeadTags from "../components/HeadTags";

const ChannelCard = ({ apiUrl, channelID }) => {
  const [channelData, setChannelData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            setChannelData(data.channel_name || data.uploader);
            setIsLoading(false);
        });
}, [apiUrl]);

  return (
    <div className="flex justify-center rounded mt-8">
      <div className="bg-accent p-4 rounded">
        <HeadTags
          title={`Patchwork Archive - ${channelData}`}
          description="Preserving rhythm, one video at a time"
          image="https://files.pinapelz.com/android-chrome-192x192.png"
          url={`channel/${channelID}`}
        />
        {isLoading ? (
          <h1 className="text-white text-xl font-bold">Loading...</h1>
        ) : (
          <h1 className="text-white text-xl font-bold">{channelData}</h1>
        )}
      </div>
    </div>
  );
};

ChannelCard.propTypes = {
  apiUrl: PropTypes.string,
  channelID: PropTypes.string,
};

export default ChannelCard;
