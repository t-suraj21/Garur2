import React, { useState, useEffect } from 'react';
import { User, Mail, Book, Award, Calendar, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigateToHome = () => navigate('/home');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5001/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-purple-800/30">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{userData?.name || 'User Profile'}</h1>
                <p className="text-gray-300">Student</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30">
              <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{userData?.email || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{userData?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{userData?.location || 'Not provided'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Member since {new Date(userData?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30">
              <h2 className="text-xl font-semibold text-white mb-4">Academic Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Class {userData?.class || 'Not specified'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Completed {userData?.completedTests || 0} Tests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Read {userData?.readBooks || 0} Books</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-purple-800/30">
            <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Account Status</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last Login</span>
                <span className="text-gray-300">{new Date(userData?.lastLogin || Date.now()).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 