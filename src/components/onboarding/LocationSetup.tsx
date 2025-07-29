import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Navigation } from 'lucide-react';

interface LocationSetupProps {
  data: any;
  onComplete: (data: any) => void;
  onPrevious: () => void;
}

const LocationSetup: React.FC<LocationSetupProps> = ({ data, onComplete, onPrevious }) => {
  const [locationData, setLocationData] = useState({
    address: data.location?.address || '',
    coordinates: data.location?.coordinates || null,
    useGPS: false
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleGPSLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Mock reverse geocoding - in production, use a real service
        const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        setLocationData({
          address: mockAddress,
          coordinates: { lat: latitude, lng: longitude },
          useGPS: true
        });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter your address manually.');
        setIsLocating(false);
      }
    );
  };

  const handleAddressChange = (address: string) => {
    setLocationData(prev => ({
      ...prev,
      address,
      useGPS: false
    }));
  };

  const handleContinue = () => {
    if (locationData.address) {
      onComplete({ 
        location: {
          address: locationData.address,
          coordinates: locationData.coordinates || { lat: 0, lng: 0 }
        }
      });
    }
  };

  return (
    <div className="slide-up max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Location Setup</h2>
        <p className="text-lg text-gray-600">Help us serve you better by sharing your location</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center mb-4">
            <Navigation className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Use GPS Location</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Allow us to automatically detect your location for accurate delivery
          </p>
          <button
            onClick={handleGPSLocation}
            disabled={isLocating}
            className={`w-full btn-primary ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLocating ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner w-5 h-5 mr-2"></div>
                Detecting Location...
              </div>
            ) : (
              'Use My Current Location'
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">OR</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Manual Address Entry
          </label>
          <textarea
            value={locationData.address}
            onChange={(e) => handleAddressChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={3}
            placeholder="Enter your full address including city, postal code..."
          />
        </div>

        {locationData.address && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center text-green-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-medium">Location Set:</span>
            </div>
            <p className="text-green-600 mt-1">{locationData.address}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleContinue}
          disabled={!locationData.address}
          className={`btn-primary flex items-center ${
            !locationData.address ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LocationSetup;