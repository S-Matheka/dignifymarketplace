import React from 'react';

const userTypes = [
  { id: 'manufacturer', label: 'Manufacturer', description: 'Produce and supply products' },
  { id: 'seller', label: 'Seller/Agent', description: 'Sell products to local communities' },
  { id: 'buyer', label: 'Buyer', description: 'Purchase products for personal use' },
  { id: 'transporter', label: 'Transporter', description: 'Deliver products to customers' },
  { id: 'donor', label: 'Donor', description: 'Support communities through donations' },
];

const UserTypeSelection: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const handleSelection = (userType: string) => {
    onNext({ userType });
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
        <p className="text-lg text-gray-600">Select the role that best describes how you'll use the platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleSelection(type.id)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 cursor-pointer border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">
                  {type.id === 'manufacturer' && '🏭'}
                  {type.id === 'seller' && '🏪'}
                  {type.id === 'buyer' && '🛒'}
                  {type.id === 'transporter' && '🚚'}
                  {type.id === 'donor' && '❤️'}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.label}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelection; 