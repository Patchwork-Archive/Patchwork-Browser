import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const pfpDomain = import.meta.env.VITE_PFP_DOMAIN;

const ChannelCardGridMini = ({ apiUrl = "", titleText = "" }) => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setChannels(Array.isArray(data) ? data : []);
        setIsLoading(false);
      });
  }, [apiUrl]);
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-white mb-3 font-bold">{titleText}</h1>
        <div className="flex flex-wrap -m-2">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="channel-item p-2 w-full md:w-1/2 lg:w-1/6 flex-grow"
                >
                  <div className="rounded overflow-hidden h-full">
                    <div
                      className="w-full object-cover rounded-t-lg bg-gray-200"
                      style={{
                        height: "150px",
                        width: "150px",
                        margin: "0 auto",
                      }}
                    />
                    <div className="p-3">
                      <div className="title-container">
                        <div
                          className="text-white text-lg font-bold mb-2 m-0 bg-gray-200"
                          style={{ height: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : channels.map((channel) => (
                <div
                  key={channel.id}
                  className="channel-item p-2 w-full md:w-1/2 lg:w-1/6 flex-grow transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                  <div className="rounded overflow-hidden h-full ">
                    <a href={"/channel/" + channel.channel_id}>
                      <img
                        src={pfpDomain + "/" + channel.channel_id + "_pfp.jpg"}
                        alt={channel.channel_name}
                        className="w-full object-cover rounded-t-lg transition-brightness duration-300 hover:brightness-90"
                        style={{
                          height: "140px",
                          width: "140px",
                          margin: "0 auto",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            import.meta.env.VITE_PROFILE_PICTURE_PLACEHOLDER;
                        }}
                      />
                    </a>
                    <div>
                      <div className="title-container">
                        <a
                          href={"/channel/" + channel.channel_id}
                          className="transition-colors duration-300 hover:text-gray-300"
                        >
                          <h2 className="text-white text-lg font-bold mb-2 m-0 hover:underline text-center">
                            {channel.channel_name}
                          </h2>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

ChannelCardGridMini.propTypes = {
  apiUrl: PropTypes.string,
  titleText: PropTypes.string,
};

export default ChannelCardGridMini;
