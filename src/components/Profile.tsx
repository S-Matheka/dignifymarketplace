import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [infoSuccess, setInfoSuccess] = useState('');

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser({ name: form.name, email: form.email, phone: form.phone });
    setEditMode(false);
    setInfoSuccess('Profile updated!');
    setTimeout(() => setInfoSuccess(''), 2000);
  };

  const handlePasswordChange = () => {
    setPwError('');
    setPwSuccess('');
    if (passwords.new.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPwError('Passwords do not match.');
      return;
    }
    // Mock: always "succeeds"
    setPwSuccess('Password changed!');
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPwSuccess(''), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <button 
          className="btn-secondary mb-4" 
          onClick={() => navigate(`/${user.userType}`)}
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
        {editMode ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <button className="btn-primary mr-2" onClick={handleSave}>Save</button>
            <button className="btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
            {infoSuccess && <p className="text-green-600 mt-2">{infoSuccess}</p>}
          </>
        ) : (
          <>
            <div className="mb-2"><span className="font-medium">Name:</span> {user.name}</div>
            <div className="mb-2"><span className="font-medium">Email:</span> {user.email}</div>
            <div className="mb-2"><span className="font-medium">Phone:</span> {user.phone}</div>
            <button className="btn-secondary mt-4" onClick={() => setEditMode(true)}>Edit Info</button>
            {infoSuccess && <p className="text-green-600 mt-2">{infoSuccess}</p>}
          </>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full border px-3 py-2 rounded" />
        </div>
        <button className="btn-primary" onClick={handlePasswordChange}>Change Password</button>
        {pwError && <p className="text-red-600 mt-2">{pwError}</p>}
        {pwSuccess && <p className="text-green-600 mt-2">{pwSuccess}</p>}
      </div>
    </div>
  );
};

export default Profile; 