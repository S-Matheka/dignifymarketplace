import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Heart, Truck, Wallet, Bell, User, LogOut, Droplets, Shield, Sparkles, Flame, Package, X, CreditCard, Home, CalendarClock } from 'lucide-react';
import NotificationsPanel from '../NotificationsPanel';
import MessagingPanel from '../MessagingPanel';
import MobileNavigation from '../MobileNavigation';
import OrderConfirmation from './OrderConfirmation';

const categories = [
  { key: 'Water', label: 'Water', icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { key: 'Sanitation', label: 'Sanitation', icon: <Shield className="w-6 h-6 text-green-500" /> },
  { key: 'Hygiene', label: 'Hygiene', icon: <Sparkles className="w-6 h-6 text-yellow-500" /> },
  { key: 'Energy', label: 'Energy', icon: <Flame className="w-6 h-6 text-orange-500" /> },
];

const featuredKits = [
  {
    id: 'kit1',
    name: 'Family Hygiene Kit',
    description: 'Complete hygiene kit for a family of 5, including soap, ...',
    price: 2200,
    oldPrice: 2500,
    discount: 12,
    badge: 'Kit',
    category: 'Hygiene',
  },
  {
    id: 'kit2',
    name: 'School WASH Package',
    description: 'WASH essentials for schools, supporting up to 50 students.',
    price: 8500,
    oldPrice: null,
    discount: null,
    badge: 'Kit',
    category: 'Sanitation',
  },
];

const allProducts = [
  ...featuredKits,
  {
    id: 'p1',
    name: 'Water Filter System',
    description: 'High-quality water filtration for clean drinking water',
    price: 2500,
    category: 'Water',
  },
  {
    id: 'p2',
    name: 'Solar Lamp',
    description: 'Portable solar-powered LED lamp for lighting',
    price: 1500,
    category: 'Energy',
  },
  {
    id: 'p3',
    name: 'Sanitary Pads (Pack)',
    description: 'Pack of 10 sanitary pads for menstrual hygiene',
    price: 300,
    category: 'Hygiene',
  },
  {
    id: 'p4',
    name: 'Soap Bar',
    description: 'Natural soap bar for personal hygiene',
    price: 100,
    category: 'Hygiene',
  },
  {
    id: 'p5',
    name: 'First Aid Kit',
    description: 'Basic first aid supplies for emergencies',
    price: 800,
    category: 'Sanitation',
  },
  {
    id: 'p6',
    name: 'Water Storage Container',
    description: '20L water storage container with tap',
    price: 1200,
    category: 'Water',
  },
  {
    id: 'p7',
    name: 'Handwashing Station',
    description: 'Portable handwashing station for schools and clinics',
    price: 3500,
    category: 'Sanitation',
  },
  {
    id: 'p8',
    name: 'Rechargeable Torch',
    description: 'Long-lasting rechargeable torch for home use',
    price: 900,
    category: 'Energy',
  },
];

const deliveryOptions = [
  { key: 'pickup', label: 'Pickup at Store', icon: <Home className="w-5 h-5 mr-2" /> },
  { key: 'delivery', label: 'Home Delivery', icon: <Truck className="w-5 h-5 mr-2" /> },
];
const paymentOptions = [
  { key: 'mpesa', label: 'M-Pesa', icon: <CreditCard className="w-5 h-5 mr-2" /> },
  { key: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5 mr-2" /> },
  { key: 'lipa', label: 'Lipa Pole Pole', icon: <CalendarClock className="w-5 h-5 mr-2 text-purple-600" /> },
];

const BuyerDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; product?: string }>({ open: false });
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('mpesa');

  // Get first name from user.name
  const firstName = user?.name?.split(' ')[0] || '';

  // Filter products by category and search
  const filteredProducts = allProducts.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    (search.trim() === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add to cart handler with toast
  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, description: product.description });
    setToast({ open: true, product: product.name });
    setTimeout(() => setToast({ open: false }), 2500);
  };

  // Cart modal
  const CartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" onClick={() => setShowCart(false)}>
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Your cart is empty.</div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-gray-600 text-sm">{item.description}</div>
                    <div className="text-gray-700 font-bold">KSh {item.price.toLocaleString()}</div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                  <button className="ml-2 text-red-500 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-2xl font-bold text-blue-600">KSh {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => setShowCart(false)}>Continue Shopping</button>
              <button className="btn-primary flex-1" onClick={() => { setShowCart(false); setShowCheckout(true); }}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Checkout modal
  const CheckoutModal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = delivery === 'delivery' ? 5 : 0;
    const total = subtotal + deliveryFee;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
          <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" onClick={() => setShowCheckout(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          {/* Cart Items */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Cart Items</h3>
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-3 mb-2">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-gray-600 text-sm">{item.description}</div>
                  <div className="text-gray-700 font-bold">KSh {item.price.toLocaleString()}</div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1 text-center"
                />
                <button className="ml-2 text-red-500 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          {/* Delivery Options */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Delivery Options</h3>
            <div className="flex flex-col gap-3">
              {deliveryOptions.map(opt => (
                <label key={opt.key} className={`flex items-center rounded-xl border px-4 py-3 cursor-pointer transition-all ${delivery === opt.key ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value={opt.key}
                    checked={delivery === opt.key}
                    onChange={() => setDelivery(opt.key)}
                    className="mr-3 accent-blue-600"
                  />
                  {opt.icon}
                  <span className="font-medium text-gray-800">{opt.label}</span>
                  {opt.key === 'delivery' && <span className="ml-auto text-xs text-gray-500">KES 5</span>}
                </label>
              ))}
            </div>
          </div>
          {/* Payment Options */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Payment Options</h3>
            <div className="flex flex-col gap-3">
              {paymentOptions.map(opt => (
                <label key={opt.key} className={`flex items-center rounded-xl border px-4 py-3 cursor-pointer transition-all ${payment === opt.key ? 'bg-green-50 border-green-400' : 'bg-white border-gray-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.key}
                    checked={payment === opt.key}
                    onChange={() => setPayment(opt.key)}
                    className="mr-3 accent-green-600"
                  />
                  {opt.icon}
                  <span className="font-medium text-gray-800">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Order Summary */}
          <div className="mb-6 bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">KES {subtotal}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Delivery</span>
              <span className="font-semibold">KES {deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2 mt-2">
              <span className="text-gray-900 font-bold">Total</span>
              <span className="text-xl font-bold text-blue-600">KES {total}</span>
            </div>
          </div>
          <button className="btn-primary w-full py-3" onClick={() => { setShowCheckout(false); setShowOrderConfirmation(true); clearCart(); }}>
            Place Order
          </button>
        </div>
      </div>
    );
  };

  // Order confirmation modal
  const OrderConfirmationModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
        <OrderConfirmation
          orderId={"o3"}
          onViewOrder={() => setShowOrderConfirmation(false)}
          onContinueShopping={() => setShowOrderConfirmation(false)}
        />
      </div>
    </div>
  );

  // Toast for add to cart
  const AddToCartToast = () => toast.open ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 animate-fade-in">
      <span>{toast.product} added to cart.</span>
      <button className="underline font-semibold" onClick={() => { setToast({ open: false }); setShowCart(true); }}>View Cart</button>
      <button className="ml-2" onClick={() => setToast({ open: false })}><X className="w-4 h-4" /></button>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
      {/* Main Website Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white text-xl font-bold">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Dignify Marketplace</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowNotifications(true)} className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <User className="w-6 h-6 text-gray-700" />
            </button>
            <button onClick={logout} className="p-2 rounded-full hover:bg-red-50 focus:outline-none">
              <LogOut className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-4">
        {/* Greeting and subtitle above KPI cards */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-left">Good Afternoon{firstName ? `, ${firstName}` : ''}</h1>
          <p className="text-gray-600 mb-1 text-left">Find WASH products for your needs</p>
          <a href="#" className="text-blue-600 text-sm mb-4 block text-left">Browse and purchase WASH products for your needs</a>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Wallet Balance</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">KES 12,550</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Wishlist Items</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Active Deliveries</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart/Wishlist Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-semibold rounded-full py-2 px-4" onClick={() => setShowCart(true)}>
            <ShoppingCart className="w-5 h-5" /> View Cart
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold rounded-full py-2 px-4" onClick={() => alert('Wishlist feature coming soon!')}>
            <Heart className="w-5 h-5" /> Wishlist
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="rounded-xl bg-gray-100 flex items-center px-4 py-3">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              className="bg-transparent outline-none flex-1 text-base"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2 text-left">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              key="all"
              onClick={() => setSelectedCategory('all')}
              className={`flex flex-col items-center rounded-xl px-4 py-3 min-w-[80px] border transition-all ${selectedCategory === 'all' ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
            >
              <span className="text-lg font-bold text-gray-700">All</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex flex-col items-center rounded-xl px-4 py-3 min-w-[80px] border transition-all ${selectedCategory === cat.key ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'}`}
              >
                {cat.icon}
                <span className="text-xs font-semibold mt-2 text-gray-700">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Kits as grid */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2 text-left">Featured Kits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredKits.map(kit => (
              <div key={kit.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  {kit.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded px-2 py-1">{kit.discount}% OFF</span>
                  )}
                  {kit.badge && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded px-2 py-1 flex items-center gap-1">
                      <Package className="w-4 h-4" /> {kit.badge}
                    </span>
                  )}
                </div>
                <div className="font-bold text-base mb-1">{kit.name}</div>
                <div className="text-gray-600 text-sm mb-1">{kit.description}</div>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-bold text-gray-900">KSh {kit.price.toLocaleString()}</span>
                  {kit.oldPrice && (
                    <span className="text-gray-400 line-through text-base">KSh {kit.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  className="btn-primary mt-2 w-full"
                  onClick={() => handleAddToCart(kit)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-12">
          <h2 className="text-lg font-bold mb-4 text-left">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
                <div className="font-bold text-base mb-1">{product.name}</div>
                <div className="text-gray-600 text-sm mb-1">{product.description}</div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">KSh {product.price.toLocaleString()}</span>
                </div>
                <button
                  className="btn-primary mt-auto"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">No products found in this category.</div>
            )}
          </div>
        </div>

        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        {showMessaging && <MessagingPanel onClose={() => setShowMessaging(false)} />}
        {showCart && <CartModal />}
        {showCheckout && <CheckoutModal />}
        {showOrderConfirmation && <OrderConfirmationModal />}
        <AddToCartToast />
      </div>
      {/* Mobile Navigation */}
      <MobileNavigation
        onShowNotifications={() => setShowNotifications(true)}
        onShowMessaging={() => setShowMessaging(true)}
      />
    </div>
  );
};

export default BuyerDashboard;