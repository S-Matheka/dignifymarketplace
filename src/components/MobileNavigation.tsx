import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Home, ShoppingCart, User, Menu, Bell, MessageCircle } from 'lucide-react';

interface MobileNavigationProps {
  onShowNotifications?: () => void;
  onShowMessaging?: () => void;
  onShowMenu?: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  onShowNotifications,
  onShowMessaging,
  onShowMenu
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
      <div className="flex items-center justify-around py-2">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            isActive('/') ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>

        {user && (
          <button
            onClick={() => navigate('/products')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/products') ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Products</span>
          </button>
        )}

        {user && (
          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/profile') ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        )}

        {onShowMessaging && (
          <button
            onClick={onShowMessaging}
            className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Messages</span>
          </button>
        )}

        {onShowNotifications && (
          <button
            onClick={onShowNotifications}
            className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
        )}

        {onShowMenu && (
          <button
            onClick={onShowMenu}
            className="flex flex-col items-center p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs mt-1">Menu</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation; 