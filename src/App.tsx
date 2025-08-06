import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import AdminLogin from './components/AdminLogin';
import ManufacturerDashboard from './components/dashboards/ManufacturerDashboard';
import SellerDashboard from './components/dashboards/SellerDashboard';
import BuyerDashboard from './components/dashboards/BuyerDashboard';
import TransporterDashboard from './components/dashboards/TransporterDashboard';
import DonorDashboard from './components/dashboards/DonorDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import Profile from './components/Profile';
import NotificationsPanel from './components/NotificationsPanel';
import MessagingPanel from './components/MessagingPanel';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import './App.css';
import ProductBrowser from './components/dashboards/ProductBrowser';

function AppContent() {
  const { user } = useUser();

  const getDashboardRoute = () => {
    if (!user) return '/';
    
    switch (user.userType) {
      case 'manufacturer':
        return <ManufacturerDashboard />;
      case 'seller':
        return <SellerDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'transporter':
        return <TransporterDashboard />;
      case 'donor':
        return <DonorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Navigate to="/" />;
    }
  };

  // ProtectedRoute: only allow correct userType
  const ProtectedRoute: React.FC<{ user: any, allowed: string, children: React.ReactNode }> = ({ user, allowed, children }) => {
    if (!user) return <Navigate to="/" />;
    if (user.userType !== allowed) return <Navigate to="/dashboard" />;
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductBrowser />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/onboarding" element={user ? <Navigate to={`/${user.userType}`} /> : <Onboarding />} />
        <Route path="/dashboard" element={user ? getDashboardRoute() : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/manufacturer" element={<ProtectedRoute user={user} allowed="manufacturer"><ManufacturerDashboard /></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute user={user} allowed="seller"><SellerDashboard /></ProtectedRoute>} />
        <Route path="/buyer" element={<ProtectedRoute user={user} allowed="buyer"><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/transporter" element={<ProtectedRoute user={user} allowed="transporter"><TransporterDashboard /></ProtectedRoute>} />
        <Route path="/donor" element={<ProtectedRoute user={user} allowed="donor"><DonorDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute user={user} allowed="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;