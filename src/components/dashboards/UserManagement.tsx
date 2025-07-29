import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  isVerified: boolean;
  isBanned: boolean;
  joinDate: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@email.com', userType: 'buyer', isVerified: true, isBanned: false, joinDate: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@email.com', userType: 'seller', isVerified: false, isBanned: false, joinDate: '2024-02-03' },
  { id: '3', name: 'Carol Davis', email: 'carol@email.com', userType: 'donor', isVerified: true, isBanned: true, joinDate: '2024-01-28' },
  { id: '4', name: 'Dave Wilson', email: 'dave@email.com', userType: 'manufacturer', isVerified: false, isBanned: false, joinDate: '2024-02-10' },
  { id: '5', name: 'Emma Brown', email: 'emma@email.com', userType: 'transporter', isVerified: true, isBanned: false, joinDate: '2024-01-20' },
  { id: '6', name: 'Frank Miller', email: 'frank@email.com', userType: 'buyer', isVerified: false, isBanned: false, joinDate: '2024-02-15' },
];

const UserManagement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const handleVerify = (id: string) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, isVerified: true } : u));
  };

  const handleBan = (id: string) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, isBanned: !u.isBanned } : u));
  };

  const handleRemove = (id: string) => {
    setUsers(users => users.filter(u => u.id !== id));
  };

  const getStatusBadge = (user: User) => {
    if (user.isBanned) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Banned</span>;
    } else if (user.isVerified) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Verified</span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const getRoleBadge = (userType: string) => {
    const roleColors = {
      buyer: 'bg-blue-100 text-blue-800',
      seller: 'bg-purple-100 text-purple-800',
      manufacturer: 'bg-indigo-100 text-indigo-800',
      transporter: 'bg-orange-100 text-orange-800',
      donor: 'bg-pink-100 text-pink-800',
      admin: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[userType as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'}`}>
        {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'verified' && user.isVerified && !user.isBanned) ||
                         (statusFilter === 'pending' && !user.isVerified && !user.isBanned) ||
                         (statusFilter === 'banned' && user.isBanned);
    const matchesRole = roleFilter === 'all' || user.userType === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: users.length,
    verified: users.filter(u => u.isVerified && !u.isBanned).length,
    pending: users.filter(u => !u.isVerified && !u.isBanned).length,
    banned: users.filter(u => u.isBanned).length
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <p className="text-sm text-gray-600">Manage platform users and permissions</p>
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
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{stats.banned}</div>
            <div className="text-sm text-gray-600">Banned</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="transporter">Transporter</option>
                <option value="donor">Donor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.userType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {!user.isVerified && !user.isBanned && (
                        <button
                          onClick={() => handleVerify(user.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleBan(user.id)}
                        className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${
                          user.isBanned 
                            ? 'text-white bg-green-600 hover:bg-green-700' 
                            : 'text-white bg-orange-600 hover:bg-orange-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                      >
                        {user.isBanned ? 'Unban' : 'Ban'}
                      </button>
                      <button
                        onClick={() => handleRemove(user.id)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 