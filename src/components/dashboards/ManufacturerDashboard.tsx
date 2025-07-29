import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Package, Truck, DollarSign, Bell, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductManager from './ProductManager';
import SellerOrderList from './SellerOrderList';
import NotificationsPanel from '../NotificationsPanel';
import MessagingPanel from '../MessagingPanel';

const ManufacturerDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const [view, setView] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manufacturer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
            <button className="btn-secondary" onClick={() => navigate('/profile')}>Profile</button>
            <button className="btn-warning" onClick={logout}>Logout</button>
            <button
              className="bg-white rounded-full shadow-lg p-2 hover:bg-blue-50 transition ml-2"
              onClick={() => setShowMessaging(true)}
              aria-label="Show messages"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="bg-white rounded-full shadow-lg p-2 hover:bg-blue-50 transition"
              onClick={() => setShowNotifications(true)}
              aria-label="Show notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Monthly Sales</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Manufacturer Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary" onClick={() => setView('products')}>Manage Products</button>
            <button className="btn-secondary" onClick={() => setView('orders')}>View Orders</button>
            {view !== 'dashboard' && (
              <button className="btn-secondary" onClick={() => setView('dashboard')}>Back to Dashboard</button>
            )}
          </div>
        </div>
        {view === 'products' && <ProductManager />}
        {view === 'orders' && <SellerOrderList />}
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        {showMessaging && <MessagingPanel onClose={() => setShowMessaging(false)} />}
      </div>
    </div>
  );
};

export default ManufacturerDashboard;