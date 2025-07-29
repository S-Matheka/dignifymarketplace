import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">Unauthorized</h1>
      <p className="text-xl mb-6">You do not have access to this page.</p>
      <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default Unauthorized; 