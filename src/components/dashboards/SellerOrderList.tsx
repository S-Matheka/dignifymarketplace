import React from 'react';

const mockOrders = [
  { id: 'o1', buyer: 'Alice', product: 'Water Filter', qty: 2, status: 'Pending' },
  { id: 'o2', buyer: 'Bob', product: 'Solar Lamp', qty: 1, status: 'Shipped' },
];

const SellerOrderList: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Orders</h3>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map(order => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{order.id}</td>
              <td>{order.buyer}</td>
              <td>{order.product}</td>
              <td>{order.qty}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrderList; 