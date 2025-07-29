import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Users, Settings, Bell, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import ProductApproval from './ProductApproval';
import DonationTracking from './DonationTracking';
import NotificationsPanel from '../NotificationsPanel';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const [showUserMgmt, setShowUserMgmt] = useState(false);
  const [showProductApproval, setShowProductApproval] = useState(false);
  const [showDonationTracking, setShowDonationTracking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
            <button className="btn-secondary" onClick={() => navigate('/profile')}>Profile</button>
            <button className="btn-warning" onClick={logout}>Logout</button>
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
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-900">KES 2.1M</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              className="btn-primary flex items-center justify-center space-x-2" 
              onClick={() => setShowUserMgmt(true)}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </button>
            <button 
              className="btn-secondary flex items-center justify-center space-x-2" 
              onClick={() => setShowProductApproval(true)}
            >
              <Package className="w-4 h-4" />
              <span>Product Approval</span>
            </button>
            <button 
              className="btn-secondary flex items-center justify-center space-x-2" 
              onClick={() => setShowDonationTracking(true)}
            >
              <Heart className="w-4 h-4" />
              <span>Donation Tracking</span>
            </button>
            <button className="btn-secondary">View Reports</button>
          </div>
        </div>

        {showUserMgmt && <UserManagement onClose={() => setShowUserMgmt(false)} />}
        {showProductApproval && <ProductApproval onClose={() => setShowProductApproval(false)} />}
        {showDonationTracking && <DonationTracking onClose={() => setShowDonationTracking(false)} />}
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      </div>
    </div>
  );
};

export default AdminDashboard;