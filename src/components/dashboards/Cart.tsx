import React, { useState } from 'react';
import { Droplets, Heart, Truck, CreditCard, Home } from 'lucide-react';
import OrderConfirmation from './OrderConfirmation';

const mockCart = [
  { 
    id: 'p1', 
    name: 'Water Filter System', 
    price: 25, 
    qty: 1,
    icon: Droplets
  },
  { 
    id: 'p3', 
    name: 'Sanitary Pads (Pack)', 
    price: 3, 
    qty: 2,
    icon: Heart
  },
];

const deliveryOptions = [
  { key: 'pickup', label: 'Pickup at Store', icon: <Home className="w-5 h-5 mr-2" /> },
  { key: 'delivery', label: 'Home Delivery', icon: <Truck className="w-5 h-5 mr-2" /> },
];

const paymentOptions = [
  { key: 'mpesa', label: 'M-Pesa', icon: <CreditCard className="w-5 h-5 mr-2" /> },
  { key: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5 mr-2" /> },
];

const Cart: React.FC = () => {
  const [cart, setCart] = useState(mockCart);
  const [checkedOut, setCheckedOut] = useState(false);
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('mpesa');

  const updateQty = (id: string, qty: number) => {
    setCart(c => c.map(item => item.id === id ? { ...item, qty } : item));
  };
  const remove = (id: string) => {
    setCart(c => c.filter(item => item.id !== id));
  };
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = delivery === 'delivery' ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setCheckedOut(true);
    setCart([]);
  };

  if (checkedOut) return (
    <OrderConfirmation
      orderId="o3"
      onViewOrder={() => {}}
      onContinueShopping={() => {}}
    />
  );

  return (
    <div className="mt-8 max-w-xl mx-auto px-2 sm:px-0">
      {/* Cart Items */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Cart Items</h3>
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-gray-600 text-sm">KES {item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min={1} 
                      value={item.qty} 
                      onChange={e => updateQty(item.id, Number(e.target.value))} 
                      className="w-14 border rounded px-2 py-1 text-center" 
                    />
                    <span className="text-gray-500">×</span>
                    <span className="font-semibold">KES {item.price * item.qty}</span>
                  </div>
                  <button 
                    className="btn-warning text-xs px-3 py-1 ml-2" 
                    onClick={() => remove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delivery Options */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Delivery Options</h3>
        <div className="flex flex-col gap-3">
          {deliveryOptions.map(opt => (
            <label key={opt.key} className={`flex items-center rounded-xl border px-4 py-3 cursor-pointer transition-all ${delivery === opt.key ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}>
              <input
                type="radio"
                name="delivery"
                value={opt.key}
                checked={delivery === opt.key}
                onChange={() => setDelivery(opt.key)}
                className="mr-3 accent-blue-600"
              />
              {opt.icon}
              <span className="font-medium text-gray-800">{opt.label}</span>
              {opt.key === 'delivery' && <span className="ml-auto text-xs text-gray-500">KES 5</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Payment Options</h3>
        <div className="flex flex-col gap-3">
          {paymentOptions.map(opt => (
            <label key={opt.key} className={`flex items-center rounded-xl border px-4 py-3 cursor-pointer transition-all ${payment === opt.key ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'}`}>
              <input
                type="radio"
                name="payment"
                value={opt.key}
                checked={payment === opt.key}
                onChange={() => setPayment(opt.key)}
                className="mr-3 accent-green-600"
              />
              {opt.icon}
              <span className="font-medium text-gray-800">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6 bg-gray-50 rounded-xl p-4">
        <h3 className="text-lg font-bold mb-3">Order Summary</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold">KES {subtotal}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Delivery</span>
          <span className="font-semibold">KES {deliveryFee}</span>
        </div>
        <div className="flex justify-between items-center border-t pt-2 mt-2">
          <span className="text-gray-900 font-bold">Total</span>
          <span className="text-xl font-bold text-blue-600">KES {total}</span>
        </div>
      </div>

      <button className="btn-primary text-lg w-full py-3" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Cart; 