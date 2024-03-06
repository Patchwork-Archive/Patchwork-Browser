import { useState, useEffect } from "react";

const WorkerGrid = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="p-4 md:p-8 text-white">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-white sm:rounded-lg">
              <table className="min-w-full divide-y divide-white">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white">
                  {workers.map((worker, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{worker.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{worker.status}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {worker.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerGrid;