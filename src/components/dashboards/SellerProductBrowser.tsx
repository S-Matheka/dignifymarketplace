import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Sun, Heart, Sparkles, Package, HeartPulse } from 'lucide-react';

const mockProducts = [
  { 
    id: 'p1', 
    name: 'Water Filter System', 
    price: 25, 
    stock: 10,
    icon: Droplets,
    description: 'High-quality water filtration system for clean drinking water',
    category: 'Water',
    wholesalePrice: 20
  },
  { 
    id: 'p2', 
    name: 'Solar Lamp', 
    price: 15, 
    stock: 5,
    icon: Sun,
    description: 'Portable solar-powered LED lamp for lighting',
    category: 'Energy',
    wholesalePrice: 12
  },
  { 
    id: 'p3', 
    name: 'Sanitary Pads (Pack)', 
    price: 3, 
    stock: 50,
    icon: Heart,
    description: 'Pack of 10 sanitary pads for menstrual hygiene',
    category: 'Hygiene',
    wholesalePrice: 2.5
  },
  { 
    id: 'p4', 
    name: 'Soap Bar', 
    price: 1, 
    stock: 100,
    icon: Sparkles,
    description: 'Natural soap bar for personal hygiene',
    category: 'Hygiene',
    wholesalePrice: 0.8
  },
  { 
    id: 'p5', 
    name: 'Water Container (20L)', 
    price: 8, 
    stock: 25,
    icon: Package,
    description: 'Large water storage container with handle',
    category: 'Water',
    wholesalePrice: 6.5
  },
  { 
    id: 'p6', 
    name: 'First Aid Kit', 
    price: 12, 
    stock: 15,
    icon: HeartPulse,
    description: 'Complete first aid kit with essential medical supplies',
    category: 'Health',
    wholesalePrice: 10
  }
];

const SellerProductBrowser: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bulkOrderModal, setBulkOrderModal] = useState<{ show: boolean; product: any; quantity: number }>({
    show: false,
    product: null,
    quantity: 1
  });

  const categories = ['All', 'Water', 'Hygiene', 'Energy', 'Health'];

  const placeBulkOrder = (product: any) => {
    setBulkOrderModal({ show: true, product, quantity: 1 });
  };

  const confirmBulkOrder = () => {
    // Mock bulk order placement
    alert(`Bulk order placed for ${bulkOrderModal.quantity} units of ${bulkOrderModal.product.name}`);
    setBulkOrderModal({ show: false, product: null, quantity: 1 });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="btn-secondary flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Browse Products for Bulk Orders</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const IconComponent = product.icon;
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                    <IconComponent className="w-24 h-24 text-green-600" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Wholesale
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Retail Price:</span>
                      <span className="text-lg font-semibold text-gray-900">KES {product.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Wholesale Price:</span>
                      <span className="text-lg font-bold text-green-600">KES {product.wholesalePrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Stock:</span>
                      <span className="font-medium text-gray-900">{product.stock}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-3 px-4 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white hover:shadow-md transition-all duration-200"
                    onClick={() => placeBulkOrder(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Place Bulk Order'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
        
        {/* Info Box */}
        <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-green-600 text-2xl">💼</div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Seller Information</h4>
              <p className="text-green-700 text-sm">
                As a seller/agent, you can place bulk orders at wholesale prices. These products will be delivered to your pickup point 
                where you can sell them to your local community. You earn commissions on each sale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Order Modal */}
      {bulkOrderModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Place Bulk Order</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{bulkOrderModal.product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{bulkOrderModal.product.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Wholesale Price:</span>
                  <span className="font-semibold text-green-600">KES {bulkOrderModal.product.wholesalePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Stock:</span>
                  <span>{bulkOrderModal.product.stock}</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={bulkOrderModal.product.stock}
                  value={bulkOrderModal.quantity}
                  onChange={(e) => setBulkOrderModal(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="bg-gray-50 p-3 rounded mb-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    KES {(bulkOrderModal.product.wholesalePrice * bulkOrderModal.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className="btn-secondary flex-1" 
                onClick={() => setBulkOrderModal({ show: false, product: null, quantity: 1 })}
              >
                Cancel
              </button>
              <button 
                className="btn-primary flex-1" 
                onClick={confirmBulkOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductBrowser; 