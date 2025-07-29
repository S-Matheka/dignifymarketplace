import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Bell, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Generate role-specific notifications
    const baseNotifications: Notification[] = [];
    
    if (user?.userType === 'admin') {
      baseNotifications.push(
        {
          id: '1',
          title: 'New Product Submission',
          message: 'Water Filter System by CleanWater Co. requires approval',
          timestamp: '2 minutes ago',
          isRead: false,
          type: 'info'
        },
        {
          id: '2',
          title: 'User Verification Required',
          message: '5 new users need verification',
          timestamp: '1 hour ago',
          isRead: false,
          type: 'warning'
        },
        {
          id: '3',
          title: 'Donation Received',
          message: 'KES 15,000 donation from Michael Chen for School WASH Pack',
          timestamp: '3 hours ago',
          isRead: true,
          type: 'success'
        },
        {
          id: '4',
          title: 'Platform Alert',
          message: 'System maintenance scheduled for tomorrow at 2 AM',
          timestamp: '1 day ago',
          isRead: true,
          type: 'info'
        }
      );
    } else if (user?.userType === 'buyer') {
      baseNotifications.push(
        {
          id: '1',
          title: 'Order Shipped',
          message: 'Your order #ORD-2024-001 has been shipped and is on its way',
          timestamp: '30 minutes ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '2',
          title: 'Payment Reminder',
          message: 'Your Lipa Pole Pole payment of KES 500 is due in 3 days',
          timestamp: '2 hours ago',
          isRead: false,
          type: 'warning'
        },
        {
          id: '3',
          title: 'New Products Available',
          message: 'New water filters and solar lamps are now in stock',
          timestamp: '1 day ago',
          isRead: true,
          type: 'info'
        },
        {
          id: '4',
          title: 'Group Order Opportunity',
          message: 'Join your neighbors for a 15% discount on bulk orders',
          timestamp: '2 days ago',
          isRead: true,
          type: 'info'
        }
      );
    } else if (user?.userType === 'seller') {
      baseNotifications.push(
        {
          id: '1',
          title: 'New Bulk Order',
          message: 'Order #BULK-2024-003: 50 water filters from local community',
          timestamp: '1 hour ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '2',
          title: 'Commission Earned',
          message: 'You earned KES 2,500 commission from last week\'s sales',
          timestamp: '3 hours ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '3',
          title: 'Low Stock Alert',
          message: 'Water filters running low. Consider restocking soon',
          timestamp: '1 day ago',
          isRead: true,
          type: 'warning'
        },
        {
          id: '4',
          title: 'Pickup Point Update',
          message: 'Your pickup point has been verified and is now active',
          timestamp: '2 days ago',
          isRead: true,
          type: 'info'
        }
      );
    } else if (user?.userType === 'manufacturer') {
      baseNotifications.push(
        {
          id: '1',
          title: 'Product Approved',
          message: 'Your Solar Lamp product has been approved and is now live',
          timestamp: '30 minutes ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '2',
          title: 'New Order Received',
          message: 'Order #MFG-2024-007: 100 sanitary pads for HealthFirst',
          timestamp: '2 hours ago',
          isRead: false,
          type: 'info'
        },
        {
          id: '3',
          title: 'Inventory Alert',
          message: 'Soap bars inventory is below minimum threshold',
          timestamp: '1 day ago',
          isRead: true,
          type: 'warning'
        },
        {
          id: '4',
          title: 'Quality Feedback',
          message: 'Admin feedback on your product pricing received',
          timestamp: '2 days ago',
          isRead: true,
          type: 'info'
        }
      );
    } else if (user?.userType === 'transporter') {
      baseNotifications.push(
        {
          id: '1',
          title: 'New Delivery Job',
          message: 'Delivery job #DEL-2024-015 available in your area',
          timestamp: '15 minutes ago',
          isRead: false,
          type: 'info'
        },
        {
          id: '2',
          title: 'Payment Received',
          message: 'KES 1,200 payment received for delivery #DEL-2024-012',
          timestamp: '1 hour ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '3',
          title: 'Route Update',
          message: 'New optimized delivery route available for tomorrow',
          timestamp: '1 day ago',
          isRead: true,
          type: 'info'
        },
        {
          id: '4',
          title: 'Performance Rating',
          message: 'You received a 5-star rating for your last delivery',
          timestamp: '2 days ago',
          isRead: true,
          type: 'success'
        }
      );
    } else if (user?.userType === 'donor') {
      baseNotifications.push(
        {
          id: '1',
          title: 'Donation Impact',
          message: 'Your KES 5,000 donation helped 10 families receive hygiene supplies',
          timestamp: '1 hour ago',
          isRead: false,
          type: 'success'
        },
        {
          id: '2',
          title: 'Tax Receipt',
          message: 'Your donation receipt for 2024 is ready for download',
          timestamp: '3 hours ago',
          isRead: false,
          type: 'info'
        },
        {
          id: '3',
          title: 'New Impact Report',
          message: 'Monthly impact report showing your donations\' reach is available',
          timestamp: '1 day ago',
          isRead: true,
          type: 'info'
        },
        {
          id: '4',
          title: 'Matching Opportunity',
          message: 'Your donation can be matched 2:1 this month',
          timestamp: '2 days ago',
          isRead: true,
          type: 'warning'
        }
      );
    }
    
    return baseNotifications;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600">{unreadCount} unread</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.isRead ? 'bg-gray-300' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${
                          notification.isRead ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={markAllAsRead}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Mark all as read
              </button>
              <span className="text-sm text-gray-600">
                {notifications.length} total
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel; 