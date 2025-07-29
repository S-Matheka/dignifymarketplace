import React, { useState } from 'react';
import { 
  Factory, 
  Users, 
  ShoppingCart, 
  Truck, 
  Heart,
  ArrowRight
} from 'lucide-react';

interface UserTypeSelectionProps {
  data: any;
  onComplete: (data: any) => void;
  onPrevious: () => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ data, onComplete }) => {
  const [selectedType, setSelectedType] = useState(data.userType || '');

  const userTypes = [
    {
      id: 'buyer',
      title: 'Buyer/Community Member',
      description: 'Shop essential products with flexible payment options and group ordering',
      icon: <ShoppingCart className="w-8 h-8" />,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      selectedColor: 'bg-blue-100 border-blue-500'
    },
    {
      id: 'seller',
      title: 'Seller/Agent',
      description: 'Earn commissions by serving your local community as a pickup point',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      selectedColor: 'bg-green-100 border-green-500'
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer/Supplier',
      description: 'List products, manage inventory, and reach more customers',
      icon: <Factory className="w-8 h-8" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      selectedColor: 'bg-purple-100 border-purple-500'
    },
    {
      id: 'transporter',
      title: 'Transporter',
      description: 'Earn by delivering products in your area with flexible scheduling',
      icon: <Truck className="w-8 h-8" />,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      selectedColor: 'bg-orange-100 border-orange-500'
    },
    {
      id: 'donor',
      title: 'Donor/Supporter',
      description: 'Support communities by funding essential products and kits',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      selectedColor: 'bg-red-100 border-red-500'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      onComplete({ userType: selectedType });
    }
  };

  return (
    <div className="slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
        <p className="text-lg text-gray-600">Select how you'd like to participate in the Dignify Marketplace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {userTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedType === type.id ? type.selectedColor : type.color
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                selectedType === type.id ? 'bg-white shadow-md' : 'bg-white bg-opacity-50'
              }`}>
                <div className={`${
                  selectedType === type.id ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  {type.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`btn-primary flex items-center ${
            !selectedType ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;