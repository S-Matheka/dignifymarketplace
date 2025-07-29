import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Heart, DollarSign, Bell, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DonationForm from './DonationForm';
import NotificationsPanel from '../NotificationsPanel';
import MessagingPanel from '../MessagingPanel';

const DonorDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const [showDonation, setShowDonation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
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
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">KES 45,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Lives Impacted</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Monthly Goal</p>
                <p className="text-2xl font-bold text-gray-900">KES 50,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Donor Actions</h2>
          <button className="btn-primary" onClick={() => setShowDonation(true)}>Make a Donation</button>
        </div>
        {showDonation && <DonationForm onClose={() => setShowDonation(false)} />}
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        {showMessaging && <MessagingPanel onClose={() => setShowMessaging(false)} />}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Options</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn-primary">Hygiene Kit</button>
            <button className="btn-secondary">Water Kit</button>
            <button className="btn-secondary">Menstrual Kit</button>
            <button className="btn-secondary">School WASH Pack</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;