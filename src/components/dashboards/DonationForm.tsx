import React, { useState } from 'react';

const kitOptions = [
  { id: 'hygiene', label: 'Hygiene Kit' },
  { id: 'water', label: 'Water Kit' },
  { id: 'menstrual', label: 'Menstrual Kit' },
  { id: 'school', label: 'School WASH Pack' },
];

const currencyOptions = [
  { code: 'KES', symbol: 'KES', name: 'Kenyan Shillings' },
  { code: 'USD', symbol: '$', name: 'US Dollars' },
  { code: 'EUR', symbol: '€', name: 'Euros' },
  { code: 'GBP', symbol: '£', name: 'British Pounds' },
];

const DonationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [kit, setKit] = useState('hygiene');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('KES');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  const selectedCurrency = currencyOptions.find(c => c.code === currency);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
        {success ? (
          <div className="text-green-600 font-bold text-center py-8">Thank you for your donation! (Mock only)</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Kit Type</label>
              <select className="w-full border rounded px-3 py-2" value={kit} onChange={e => setKit(e.target.value)}>
                {kitOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select className="w-full border rounded px-3 py-2" value={currency} onChange={e => setCurrency(e.target.value)}>
                {currencyOptions.map(opt => (
                  <option key={opt.code} value={opt.code}>{opt.symbol} {opt.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount ({selectedCurrency?.symbol})</label>
              <input 
                className="w-full border rounded px-3 py-2" 
                type="number" 
                min={1} 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                placeholder={`Enter amount in ${selectedCurrency?.name}`}
                required 
              />
            </div>
            <button className="btn-primary w-full" type="submit">Donate {selectedCurrency?.symbol}{amount || '0'}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DonationForm; 