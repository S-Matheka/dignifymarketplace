import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Droplets, Sun, Heart, Sparkles, Package, HeartPulse, ShoppingCart, UserPlus } from 'lucide-react';

const ProductBrowser: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // If user is not authenticated, show login/create account prompt
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

  const mockProducts = [
    {
      id: 1,
      name: 'Water Filter System',
      description: 'High-quality water filtration for clean drinking water',
      price: 2500,
      category: 'Water',
      stock: 15,
      icon: Droplets
    },
    {
      id: 2,
      name: 'Solar Lamp',
      description: 'Portable solar-powered LED lamp for lighting',
      price: 1500,
      category: 'Energy',
      stock: 25,
      icon: Sun
    },
    {
      id: 3,
      name: 'Sanitary Pads (Pack)',
      description: 'Pack of 10 sanitary pads for menstrual hygiene',
      price: 300,
      category: 'Hygiene',
      stock: 50,
      icon: Heart
    },
    {
      id: 4,
      name: 'Soap Bar',
      description: 'Natural soap bar for personal hygiene',
      price: 100,
      category: 'Hygiene',
      stock: 100,
      icon: Sparkles
    },
    {
      id: 5,
      name: 'First Aid Kit',
      description: 'Basic first aid supplies for emergencies',
      price: 800,
      category: 'Health',
      stock: 20,
      icon: HeartPulse
    },
    {
      id: 6,
      name: 'Water Storage Container',
      description: '20L water storage container with tap',
      price: 1200,
      category: 'Water',
      stock: 30,
      icon: Package
    }
  ];

  const categories = ['all', 'Water', 'Energy', 'Hygiene', 'Health'];

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const addToCart = (product: any) => {
    // Mock add to cart functionality
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Products</h1>
            <p className="text-gray-600">Find essential products for your community</p>
          </div>
          <button 
            onClick={() => navigate('/buyer')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const IconComponent = product.icon;
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                    <IconComponent className="w-24 h-24 text-purple-600" />
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">KES {product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {product.stock} units available
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">No products match the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBrowser; 