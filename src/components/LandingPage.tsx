import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-lg sm:text-xl font-bold">D</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Dignify Marketplace</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              {user ? (
                <button 
                  onClick={() => navigate(`/${user.userType}`)}
                  className="btn-primary text-sm sm:text-base"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="btn-primary text-sm sm:text-base"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4">
              {user ? (
                <button 
                  onClick={() => {
                    navigate(`/${user.userType}`);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary text-center"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/onboarding');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary text-center"
                >
                  Get Started
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-center">
            Welcome to Dignify Marketplace
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 text-center leading-relaxed">
  Connecting the WASH ecosystem for sustainable access to<br className="hidden sm:inline" />
  water, sanitation, and hygiene products
</p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/onboarding')}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px]"
            >
              Join the Marketplace
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🏭</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Manufacturers</h3>
            <p className="text-sm sm:text-base text-gray-600">List products and reach more customers through our platform</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🏪</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Sellers/Agents</h3>
            <p className="text-sm sm:text-base text-gray-600">Earn commissions by serving your local community</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🛒</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Buyers</h3>
            <p className="text-sm sm:text-base text-gray-600">Access essential products with flexible payment options</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">❤️</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Donors</h3>
            <p className="text-sm sm:text-base text-gray-600">Support communities through targeted donations</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Choose Your Role</h3>
              <p className="text-sm sm:text-base text-gray-600">Select how you want to participate in the marketplace</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Complete Setup</h3>
              <p className="text-sm sm:text-base text-gray-600">Provide your details and location information</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Start Trading</h3>
              <p className="text-sm sm:text-base text-gray-600">Begin buying, selling, or donating immediately</p>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-12 sm:mt-20 bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">10,000+</div>
              <div className="text-sm sm:text-base text-gray-600">Families Served</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">KES 50M+</div>
              <div className="text-sm sm:text-base text-gray-600">Total Transactions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Active Sellers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">25+</div>
              <div className="text-sm sm:text-base text-gray-600">Communities Reached</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-lg sm:text-xl font-bold">D</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Dignify Marketplace</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 px-4">
              Empowering communities through sustainable commerce and meaningful connections.
            </p>
            <div className="text-xs sm:text-sm text-gray-400">
            © 2025 Dignify Marketplace. A product by Empower Her Initiative. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;