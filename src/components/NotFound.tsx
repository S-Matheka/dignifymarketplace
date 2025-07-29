import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFound; 