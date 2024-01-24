import { useState, useEffect } from "react";
import ServerStatusCard from "../components/ServerStatusCard";
import WorkerGrid from "../components/WorkerGrid";
import HeadTags from "../components/HeadTags";
import Footer from "../components/Footer";

function StatusPage() {
  const [timeLeft, setTimeLeft] = useState(15);
  const [workers, setWorkers] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
      setRefreshCounter(prevCounter => prevCounter + 1); 
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [workers]);

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
    fetch("https://patchwork-backend.vercel.app/api/status")
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
      <ServerStatusCard apiUrl="https://patchwork-backend.vercel.app/api/status" />
      <h1 className="text-white text-3xl justify-center flex font-bold">
        Workers
      </h1>
      <div className="justify-center flex">
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
