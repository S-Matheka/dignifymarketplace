import React, { useState } from 'react';
import { Heart, DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  kitType: string;
  donationDate: string;
  status: 'completed' | 'pending' | 'failed';
  impact: string;
  anonymous: boolean;
}

const mockDonations: Donation[] = [
  {
    id: 'd1',
    donorName: 'Sarah Johnson',
    donorEmail: 'sarah@email.com',
    amount: 5000,
    currency: 'KES',
    kitType: 'Hygiene Kit',
    donationDate: '2024-02-15',
    status: 'completed',
    impact: '10 families received hygiene supplies',
    anonymous: false
  },
  {
    id: 'd2',
    donorName: 'Anonymous',
    donorEmail: 'anonymous@email.com',
    amount: 2500,
    currency: 'USD',
    kitType: 'Water Kit',
    donationDate: '2024-02-14',
    status: 'completed',
    impact: '5 water filters installed',
    anonymous: true
  },
  {
    id: 'd3',
    donorName: 'Michael Chen',
    donorEmail: 'michael@email.com',
    amount: 15000,
    currency: 'KES',
    kitType: 'School WASH Pack',
    donationDate: '2024-02-13',
    status: 'completed',
    impact: '30 students received school supplies',
    anonymous: false
  },
  {
    id: 'd4',
    donorName: 'Emma Wilson',
    donorEmail: 'emma@email.com',
    amount: 100,
    currency: 'EUR',
    kitType: 'Menstrual Kit',
    donationDate: '2024-02-12',
    status: 'pending',
    impact: 'Processing...',
    anonymous: false
  },
  {
    id: 'd5',
    donorName: 'David Brown',
    donorEmail: 'david@email.com',
    amount: 7500,
    currency: 'GBP',
    kitType: 'Energy Kit',
    donationDate: '2024-02-11',
    status: 'completed',
    impact: '15 solar lamps distributed',
    anonymous: false
  }
];

const DonationTracking: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'failed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Failed</span>;
      default:
        return null;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'KES': 'KES',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return symbols[currency] || currency;
  };

  const filteredDonations = donations.filter(donation => {
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    const matchesCurrency = currencyFilter === 'all' || donation.currency === currencyFilter;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const donationDate = new Date(donation.donationDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - donationDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateRange) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesStatus && matchesCurrency && matchesDate;
  });

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalDonors = new Set(filteredDonations.map(d => d.donorEmail)).size;
  const completedDonations = filteredDonations.filter(d => d.status === 'completed').length;

  const stats = {
    total: donations.length,
    totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
    completed: donations.filter(d => d.status === 'completed').length,
    uniqueDonors: new Set(donations.map(d => d.donorEmail)).size
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Donation Tracking</h2>
              <p className="text-sm text-gray-600">Monitor donations and donor impact</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Donations</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">KES {stats.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Amount</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.uniqueDonors}</div>
            <div className="text-sm text-gray-600">Unique Donors</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="all">All Currencies</option>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Donations List */}
        <div className="overflow-y-auto max-h-96">
          {filteredDonations.map(donation => (
            <div key={donation.id} className="border-b border-gray-200 p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {donation.anonymous ? 'Anonymous Donor' : donation.donorName}
                    </h3>
                    {getStatusBadge(donation.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium text-gray-700">Amount:</span>
                      <span className="ml-1 text-gray-600">
                        {getCurrencySymbol(donation.currency)} {donation.amount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Kit Type:</span>
                      <span className="ml-1 text-gray-600">{donation.kitType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="ml-1 text-gray-600">
                        {new Date(donation.donationDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-1 text-gray-600">{donation.donorEmail}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Impact:</p>
                        <p className="text-sm text-blue-700">{donation.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
            <p className="mt-1 text-sm text-gray-500">No donations match the current filter criteria.</p>
          </div>
        )}

        {/* Summary */}
        {filteredDonations.length > 0 && (
          <div className="px-6 py-4 bg-green-50 border-t border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-sm font-medium text-green-800">Filtered Total:</span>
                  <span className="ml-2 text-lg font-bold text-green-600">
                    {getCurrencySymbol('KES')} {totalAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-green-800">Donors:</span>
                  <span className="ml-2 text-lg font-bold text-green-600">{totalDonors}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-green-800">Completed:</span>
                  <span className="ml-2 text-lg font-bold text-green-600">{completedDonations}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredDonations.length} of {donations.length} donations
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationTracking; 