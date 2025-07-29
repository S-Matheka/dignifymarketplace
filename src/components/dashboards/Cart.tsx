import React, { useState } from 'react';
import { Droplets, Heart } from 'lucide-react';

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

const Cart: React.FC = () => {
  const [cart, setCart] = useState(mockCart);
  const [checkedOut, setCheckedOut] = useState(false);

  const updateQty = (id: string, qty: number) => {
    setCart(c => c.map(item => item.id === id ? { ...item, qty } : item));
  };
  const remove = (id: string) => {
    setCart(c => c.filter(item => item.id !== id));
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    setCheckedOut(true);
    setCart([]);
  };

  if (checkedOut) return (
    <div className="mt-8 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h3>
        <p className="text-green-700">Thank you for your order. You will receive a confirmation shortly.</p>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Your Cart</h3>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-gray-600">KES {item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min={1} 
                      value={item.qty} 
                      onChange={e => updateQty(item.id, Number(e.target.value))} 
                      className="w-16 border rounded px-2 py-1 text-center" 
                    />
                    <span className="text-gray-500">×</span>
                    <span className="font-semibold">KES {item.price * item.qty}</span>
                  </div>
                  <button 
                    className="btn-warning text-sm px-3 py-1" 
                    onClick={() => remove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">KES {total}</span>
            </div>
          </div>
          <button className="btn-primary text-lg px-8 py-3" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart; 