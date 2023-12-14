import { useState, useEffect } from 'react';

const WorkerGrid = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetch('https://patchwork-backend.vercel.app/api/status')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWorkers(data.workers);
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 p-5 md:p-10">
            {workers.map((worker, index) => (
                <div key={index} className="bg-accent p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-semibold mb-2 text-white">{worker.name}</h2>
                    <p className="text-white">{worker.status}</p>
                    <p className="text-sm text-white mt-2">Last Update: {worker.timestamp}</p>
                </div>
            ))}
        </div>
    );
}

export default WorkerGrid;