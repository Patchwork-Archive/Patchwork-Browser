import { useState, useEffect } from "react";
import ServerStatusCard from "../components/ServerStatusCard";
import WorkerGrid from "../components/WorkerGrid";
import HeadTags from "../components/HeadTags";

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
      <HeadTags 
        title="Patchwork Archive - Status" 
        description="Preserving Cultured Rhythm For the Future"
        image="https://patchwork.moekyun.me/favicon.png"
        url="/status"
        />
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
