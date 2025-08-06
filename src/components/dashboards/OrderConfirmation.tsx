import React from 'react';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderConfirmation: React.FC<{ orderId?: string; onViewOrder?: () => void; onContinueShopping?: () => void }> = ({ orderId = 'o3', onViewOrder, onContinueShopping }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Order Placed Successfully!</h2>
      <a href="#" className="text-blue-600 font-semibold text-lg block mb-2">Order #{orderId}</a>
      <p className="text-gray-700 mb-6">Thank you for your order. We've received your order and will begin processing it soon. You will receive an email confirmation shortly.</p>
      <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left max-w-lg mx-auto">
        <div className="flex items-start gap-3 mb-2">
          <Package className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">Order Processing</div>
            <div className="text-gray-600 text-sm">Your order is being prepared for shipment or pickup</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Home className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">Delivery Information</div>
            <div className="text-gray-600 text-sm">You can track your order status in the Orders section</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <button
          className="flex-1 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg py-3 text-lg hover:bg-blue-50 transition"
          onClick={onViewOrder}
        >
          View Order
        </button>
        <button
          className="flex-1 bg-blue-600 text-white font-semibold rounded-lg py-3 text-lg hover:bg-blue-700 transition"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;