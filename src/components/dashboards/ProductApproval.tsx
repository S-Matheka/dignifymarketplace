import React, { useState } from 'react';
import { Package, CheckCircle, XCircle, MessageSquare, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  adminComments?: string;
  image?: string;
}

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Water Filter System',
    description: 'High-quality water filtration system for clean drinking water',
    price: 2500,
    category: 'Water',
    manufacturer: 'CleanWater Co.',
    submittedBy: 'Dave Wilson',
    submittedDate: '2024-02-15',
    status: 'pending'
  },
  {
    id: 'p2',
    name: 'Solar Lamp',
    description: 'Portable solar-powered LED lamp for lighting',
    price: 1500,
    category: 'Energy',
    manufacturer: 'SolarTech Ltd.',
    submittedBy: 'Bob Smith',
    submittedDate: '2024-02-14',
    status: 'pending',
    adminComments: 'Price seems high for target market. Consider reducing to KES 1200.'
  },
  {
    id: 'p3',
    name: 'Sanitary Pads (Pack)',
    description: 'Pack of 10 sanitary pads for menstrual hygiene',
    price: 300,
    category: 'Hygiene',
    manufacturer: 'HealthFirst',
    submittedBy: 'Alice Johnson',
    submittedDate: '2024-02-13',
    status: 'approved'
  },
  {
    id: 'p4',
    name: 'Soap Bar',
    description: 'Natural soap bar for personal hygiene',
    price: 100,
    category: 'Hygiene',
    manufacturer: 'NaturalCare',
    submittedBy: 'Emma Brown',
    submittedDate: '2024-02-12',
    status: 'rejected',
    adminComments: 'Product description too vague. Please provide more details about ingredients and benefits.'
  }
];

const ProductApproval: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comment, setComment] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleApprove = (productId: string) => {
    setProducts(products => products.map(p => 
      p.id === productId ? { ...p, status: 'approved' as const } : p
    ));
  };

  const handleReject = (productId: string) => {
    if (!comment.trim()) {
      alert('Please add a comment explaining why the product is being rejected.');
      return;
    }
    setProducts(products => products.map(p => 
      p.id === productId ? { ...p, status: 'rejected' as const, adminComments: comment } : p
    ));
    setComment('');
  };

  const handleAddComment = (productId: string) => {
    if (!comment.trim()) return;
    setProducts(products => products.map(p => 
      p.id === productId ? { ...p, adminComments: comment } : p
    ));
    setComment('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
    }
  };

  const filteredProducts = products.filter(product => 
    statusFilter === 'all' || product.status === statusFilter
  );

  const stats = {
    total: products.length,
    pending: products.filter(p => p.status === 'pending').length,
    approved: products.filter(p => p.status === 'approved').length,
    rejected: products.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Approval</h2>
              <p className="text-sm text-gray-600">Review and approve products before they go live</p>
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
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="overflow-y-auto max-h-96">
          {filteredProducts.map(product => (
            <div key={product.id} className="border-b border-gray-200 p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    {getStatusBadge(product.status)}
                  </div>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="ml-1 text-gray-600">KES {product.price}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-1 text-gray-600">{product.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Manufacturer:</span>
                      <span className="ml-1 text-gray-600">{product.manufacturer}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Submitted:</span>
                      <span className="ml-1 text-gray-600">{new Date(product.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {product.adminComments && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Admin Comment:</p>
                          <p className="text-sm text-yellow-700">{product.adminComments}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  {product.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(product.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(product.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Comment Section */}
              {product.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment or feedback..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <button
                      onClick={() => handleAddComment(product.id)}
                      disabled={!comment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">No products match the current filter criteria.</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductApproval; 