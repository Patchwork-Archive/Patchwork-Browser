import { useState, useEffect } from "react";
import ServerStatusCard from "../components/ServerStatusCard";
import WorkerGrid from "../components/WorkerGrid";
import { Helmet } from "react-helmet";

function StatusPage() {
  const [timeLeft, setTimeLeft] = useState(15);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 15000);

    const timerId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(15);
    }
  }, [timeLeft]);

  const refreshData = () => {
    fetch("https://archive.pinapelz.moe/api/status")
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
      <Helmet>
        <title>Patchwork Archive</title>
        <meta
          name="title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          name="description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}`} />
        <meta property="og:title" content="Patchwork Archive" />
        <meta property="og:image" content={`${window.location.origin}/favicon.png`} />
        <meta
          property="og:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`${window.location.origin}`} />
        <meta
          property="twitter:title"
          content="Patchwork Archive - The VTuber Music Archives"
        />
        <meta
          property="twitter:description"
          content="Preserving rhythm, one video at a time"
        />
        <meta property="twitter:creator" content="@pinapelz" />
      </Helmet>
      <ServerStatusCard apiUrl="https://archive.pinapelz.moe/api/status" />
      <h1 className="text-white text-3xl justify-center flex font-bold">
        Workers
      </h1>
      <div className="justify-center flex">
        <WorkerGrid workers={workers} />
      </div>
      <p className="text-white mt-2 justify-center flex">
        Time left until refresh: {timeLeft} seconds
      </p>
    </>
  );
}

export default StatusPage;
