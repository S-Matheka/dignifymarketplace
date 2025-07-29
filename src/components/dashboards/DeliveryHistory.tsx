import React from 'react';

const mockHistory = [
  { id: 'h1', pickup: 'Warehouse A', dropoff: 'Community Center', date: '2024-06-01', status: 'Delivered' },
  { id: 'h2', pickup: 'Supplier B', dropoff: 'School', date: '2024-05-28', status: 'Delivered' },
];

const DeliveryHistory: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Delivery History</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Pickup</th>
            <th>Dropoff</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockHistory.map(job => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{job.pickup}</td>
              <td>{job.dropoff}</td>
              <td>{job.date}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryHistory; 