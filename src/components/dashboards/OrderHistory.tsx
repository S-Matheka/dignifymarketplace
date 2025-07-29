import React from 'react';

const mockOrders = [
  { id: 'o1', date: '2024-06-01', total: 53, status: 'Delivered' },
  { id: 'o2', date: '2024-05-20', total: 15, status: 'Shipped' },
  { id: 'o3', date: '2024-05-10', total: 8, status: 'Cancelled' },
];

const OrderHistory: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Order History</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map(order => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{order.id}</td>
              <td>{order.date}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory; 