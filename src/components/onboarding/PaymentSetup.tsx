import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard, Wallet, Heart } from 'lucide-react';

interface PaymentSetupProps {
  data: any;
  onComplete: (data: any) => void;
  onPrevious: () => void;
}

const PaymentSetup: React.FC<PaymentSetupProps> = ({ data, onComplete, onPrevious }) => {
  const [selectedMethods, setSelectedMethods] = useState<string[]>(data.paymentMethods || []);

  const paymentMethods = [
    {
      id: 'mpesa',
      title: 'M-PESA',
      description: 'Pay instantly with your M-PESA mobile money',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200',
      selectedColor: 'bg-green-100 border-green-500'
    },
    {
      id: 'card',
      title: 'Credit/Debit Card',
      description: 'Secure card payments with international support',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200',
      selectedColor: 'bg-blue-100 border-blue-500'
    },
    {
      id: 'lipa-pole-pole',
      title: 'Lipa Pole Pole',
      description: 'Save now, pay later with flexible weekly/monthly plans',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200',
      selectedColor: 'bg-purple-100 border-purple-500'
    },
    {
      id: 'donor-wallet',
      title: 'Donor Wallet',
      description: 'Receive subsidized products from community donors',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-50 border-red-200',
      selectedColor: 'bg-red-100 border-red-500'
    }
  ];

  const togglePaymentMethod = (methodId: string) => {
    setSelectedMethods(prev => {
      if (prev.includes(methodId)) {
        return prev.filter(id => id !== methodId);
      } else {
        return [...prev, methodId];
      }
    });
  };

  const handleComplete = () => {
    onComplete({ paymentMethods: selectedMethods });
  };

  return (
    <div className="slide-up max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Setup</h2>
        <p className="text-lg text-gray-600">Choose your preferred payment methods</p>
      </div>

      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => togglePaymentMethod(method.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedMethods.includes(method.id) ? method.selectedColor : method.color
            }`}
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                selectedMethods.includes(method.id) ? 'bg-white shadow-md' : 'bg-white bg-opacity-50'
              }`}>
                <div className={`${
                  selectedMethods.includes(method.id) ? 'text-gray-700' : 'text-gray-600'
                }`}>
                  {method.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethods.includes(method.id) 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'border-gray-300'
              }`}>
                {selectedMethods.includes(method.id) && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMethods.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-8">
          <h4 className="font-medium text-blue-900 mb-2">Selected Payment Methods:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedMethods.map(methodId => {
              const method = paymentMethods.find(m => m.id === methodId);
              return (
                <span key={methodId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {method?.title}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleComplete}
          disabled={selectedMethods.length === 0}
          className={`btn-primary flex items-center ${
            selectedMethods.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Complete Setup
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSetup;