import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeadTags from "../components/HeadTags";
import { BrowserView, MobileView } from "react-device-detect";

const ChannelCard = ({ apiUrl, channelID }) => {
  const [channelName, setChannelName] = useState("Loading...");
  const [channelDescription, setChannelDescription] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [dataExists, setDataExists] = useState(true);
  const channelBannerUrl =
    import.meta.env.VITE_BANNER_DOMAIN + "/" + channelID + "_banner.jpg";
  const profilePic =
    import.meta.env.VITE_PFP_DOMAIN + "/" + channelID + "_pfp.jpg";
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setChannelName("404 - Channel not found");
          setChannelDescription("Sorry we don't have an information about this channel");
          setIsLoading(false);
          setDataExists(false);
          return;
        }
        setChannelName(data.channel_name || data.uploader);
        setChannelDescription(data.description);
        setIsLoading(false);
      })
      .catch(() => {
        setChannelName("404 - Channel not found");
        setChannelDescription("Sorry we don't have an information about this channel");
        setIsLoading(false);
        setDataExists(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    const image = new Image();
    image.src = channelBannerUrl;
    image.onload = () => setIsBannerVisible(true);
    image.onerror = () => setIsBannerVisible(false);
  }, [channelBannerUrl]);

  const renderDescription = (description) => {
    return description.split("\n").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="channel-card">
      {isBannerVisible ? (
        <div
          className="banner-image"
          style={{
            backgroundImage: `url(${channelBannerUrl})`,
            height: "251px",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        <div className="mt-8" />
      )}
      <div
        className="flex justify-start items-start mt-4 ml-2 sm:ml-80"
        style={{ position: "relative" }}
      >
        {dataExists && (
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid white",
            }}
          />
        )}
        <div
          className="ml-8"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <HeadTags
            title={`${channelName} - Patchwork Archive`}
            description="Preserving rhythm, one video at a time"
            url={`channel/${channelID}`}
          />
          {isLoading ? (
            <h1 className="text-2xl sm:text-4x font-bold text-white">
              Loading...
            </h1>
          ) : (
            <h1 className="text-2xl sm:text-4xl font-bold text-white">
              {channelName}
            </h1>
          )}
          <div>
            {isLoading ? (
              <p className="text-white mt-2">Loading...</p>
            ) : (
              <div>
                <BrowserView>
                  <p
                    className={`text-white mt-2 ${
                      !descriptionExpanded ? "truncate" : ""
                    }`}
                    style={{
                      maxWidth: "1000px",
                      WebkitLineClamp: descriptionExpanded ? "none" : "3",
                      overflow: "hidden",
                    }}
                  >
                    {descriptionExpanded
                      ? renderDescription(channelDescription)
                      : channelDescription}
                  </p>
                </BrowserView>
                <MobileView>
                  {descriptionExpanded && (
                    <p
                      className="text-white mt-2"
                      style={{
                        maxWidth: "1000px",
                        overflow: "hidden",
                      }}
                    >
                      {renderDescription(channelDescription)}
                    </p>
                  )}
                </MobileView>
                { dataExists && (
                  <button
                    className="text-blue-500 mt-2"
                    onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                  >
                    {descriptionExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {!dataExists && (
        <div className="text-white mt-2 text-center">
          <img
            src="https://utfs.io/f/d011aa80-026f-4528-b43b-ac618a79b1db-qral5b.png"
            className="max-w-full h-auto content-center mx-auto"
            style={{ maxWidth: "50%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

ChannelCard.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  channelID: PropTypes.string.isRequired,
};

export default ChannelCard;
