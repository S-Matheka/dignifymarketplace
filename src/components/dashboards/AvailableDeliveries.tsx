import React, { useState } from 'react';

const mockJobs = [
  { id: 'j1', pickup: 'Warehouse A', dropoff: 'Community Center', status: 'Available' },
  { id: 'j2', pickup: 'Supplier B', dropoff: 'School', status: 'Available' },
];

const AvailableDeliveries: React.FC = () => {
  const [jobs, setJobs] = useState(mockJobs);

  const acceptJob = (id: string) => {
    setJobs(jobs => jobs.map(j => j.id === id ? { ...j, status: 'Accepted' } : j));
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Available Deliveries</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Pickup</th>
            <th>Dropoff</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{job.pickup}</td>
              <td>{job.dropoff}</td>
              <td>{job.status}</td>
              <td>
                {job.status === 'Available' && (
                  <button className="btn-primary" onClick={() => acceptJob(job.id)}>Accept</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.every(j => j.status !== 'Available') && <div className="text-green-600">No available jobs. All accepted!</div>}
    </div>
  );
};

export default AvailableDeliveries; 