import { useState, useEffect } from "react";
import ServerStatusCard from "../components/ServerStatusCard";
import WorkerGrid from "../components/WorkerGrid";
import HeadTags from "../components/HeadTags";
import Footer from "../components/Footer";

function StatusPage() {
  const refreshTimeSeconds = import.meta.env.VITE_STATUS_REFRESH || 60;
  const [timeLeft, setTimeLeft] = useState(refreshTimeSeconds);
  const [workers, setWorkers] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
      setRefreshCounter((prevCounter) => prevCounter + 1);
    }, refreshTimeSeconds*1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [workers, refreshTimeSeconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(15);
    }
  }, [timeLeft]);

  const refreshData = () => {
    fetch(import.meta.env.VITE_API_DOMAIN + "/api/status")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorkers(data.workers);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  };

  return (
    <>
      <HeadTags
        title="Patchwork Archive - Status"
        description="Preserving rhythm, one video at a time"
        url="status"
        image={import.meta.env.VITE_OG_IMAGE_DYNA}
      />
      <div className="flex justify-center items-center w-50 py-8 px-2">
        <div className="flex flex-col justify-center items-center w-50 py-4 px-2">
          <h1 className="text-white text-3xl font-bold mb-4">
            Patchwork Archive Server Status
          </h1>
          <img
            src={import.meta.env.VITE_DEFAULT_OG_IMAGE}
            alt="Patchwork Archive Logo"
            className="w-1/4 h-1/4 rounded-full mt-2"
          />
        </div>
      </div>
      <ServerStatusCard
        apiUrl={import.meta.env.VITE_API_DOMAIN + "/api/status"}
      />
      <h1 className="text-white text-3xl mb-1 justify-center flex font-bold">
        Worker Status
      </h1>
      <h2 className="text-white text-m justify-center flex text-center px-1">
        Workers are the servers that process the videos. <br />
        They are responsible for downloading, processing, and uploading the
        videos
      </h2>
      <div>
        <WorkerGrid key={refreshCounter} workers={workers} /> {}
      </div>
      <h1 className="text-white mt-2 justify-center flex">
        Time left until refresh: {timeLeft} seconds
      </h1>
      <Footer />
    </>
  );
}

export default StatusPage;
