import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import UserTypeSelection from './onboarding/UserTypeSelection';
import RegistrationForm from './onboarding/RegistrationForm';
import LocationSetup from './onboarding/LocationSetup';
import PaymentSetup from './onboarding/PaymentSetup';
import { ArrowLeft, Check } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    userType: '',
    personalInfo: {},
    location: {},
    paymentMethods: []
  });

  // Only show payment step for buyer (not donor)
  const steps = [
    { number: 1, title: 'Choose Role', component: UserTypeSelection },
    { number: 2, title: 'Personal Info', component: RegistrationForm },
    { number: 3, title: 'Location', component: LocationSetup },
    ...(onboardingData.userType === 'buyer'
      ? [{ number: 4, title: 'Payment', component: PaymentSetup }]
      : [])
  ];

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...onboardingData, ...stepData };
    setOnboardingData(updatedData);

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const newUser = {
        id: Date.now().toString(),
        name: updatedData.personalInfo.name,
        email: updatedData.personalInfo.email,
        phone: updatedData.personalInfo.phone,
        userType: updatedData.userType,
        location: updatedData.location,
        paymentMethods: updatedData.paymentMethods,
        isVerified: false,
        createdAt: new Date()
      };
      setUser(newUser);
      // Redirect to role-specific dashboard
      navigate(`/${updatedData.userType}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentComponent = () => {
    const currentStepData = steps[currentStep - 1];
    const Component = currentStepData.component;
    return (
      <Component
        data={onboardingData}
        onComplete={handleStepComplete}
        onPrevious={handlePrevious}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep > step.number
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-4 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-lg ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-24 h-1 mx-6 rounded ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Component */}
        <div className="bg-white rounded-2xl shadow-xl p-8 fade-in">
          {getCurrentComponent()}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;