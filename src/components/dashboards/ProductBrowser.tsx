import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Droplets, Sun, Heart, Sparkles, Package, HeartPulse, ShoppingCart, UserPlus, Shield, Flame } from 'lucide-react';

const categories = [
  { key: 'Water', label: 'Water', icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { key: 'Sanitation', label: 'Sanitation', icon: <Shield className="w-6 h-6 text-green-500" /> },
  { key: 'Hygiene', label: 'Hygiene', icon: <Sparkles className="w-6 h-6 text-yellow-500" /> },
  { key: 'Energy', label: 'Energy', icon: <Flame className="w-6 h-6 text-orange-500" /> },
];

const featuredKits = [
  {
    id: 'kit1',
    name: 'Family Hygiene Kit',
    description: 'Complete hygiene kit for a family of 5, including soap, ...',
    price: 2200,
    oldPrice: 2500,
    discount: 12,
    badge: 'Kit',
  },
  {
    id: 'kit2',
    name: 'School WASH Package',
    description: 'WASH essentials for schools, supporting up to 50 students.',
    price: 8500,
    oldPrice: null,
    discount: null,
    badge: 'Kit',
  },
];

const ProductBrowser: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Our Products</h2>
            <p className="text-gray-600 mb-6">
              To browse and purchase products, you need to create an account or sign in to your existing account.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </button>
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full btn-secondary"
              >
                Sign In
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Join thousands of users already benefiting from our marketplace
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Good Afternoon, John</h1>
        <p className="text-gray-600 mb-1">Find WASH products for your needs</p>
        <a href="#" className="text-blue-600 text-sm mb-4 block">Browse and purchase WASH products for your needs</a>
        <div className="flex gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full py-2 px-4">
            <ShoppingCart className="w-5 h-5" /> View Cart
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold rounded-full py-2 px-4">
            <Heart className="w-5 h-5" /> Wishlist
          </button>
        </div>
        <div className="mb-6">
          <div className="rounded-xl bg-gray-100 flex items-center px-4 py-3">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              className="bg-transparent outline-none flex-1 text-base"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2">Categories</h2>
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex flex-col items-center rounded-xl px-4 py-3 min-w-[80px] border transition-all ${selectedCategory === cat.key ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
            >
              {cat.icon}
              <span className="text-xs font-semibold mt-2 text-gray-700">{cat.label}</span>
            </button>
          ))}
        </div>
        <h2 className="text-lg font-bold mb-2">Featured Kits</h2>
        <div className="flex flex-col gap-4">
          {featuredKits.map(kit => (
            <div key={kit.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                {kit.discount && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1">{kit.discount}% OFF</span>
                )}
                {kit.badge && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded px-2 py-1 flex items-center gap-1">
                    <Package className="w-4 h-4" /> {kit.badge}
                  </span>
                )}
              </div>
              <div className="font-bold text-base mb-1">{kit.name}</div>
              <div className="text-gray-600 text-sm mb-1">{kit.description}</div>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-gray-900">KSh {kit.price.toLocaleString()}</span>
                {kit.oldPrice && (
                  <span className="text-gray-400 line-through text-base">KSh {kit.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBrowser; 