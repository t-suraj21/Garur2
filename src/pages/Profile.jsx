import React from 'react';
import { User, Mail, Book, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

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
                <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
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
                  <span className="text-gray-300">user@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Class 10</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30">
              <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Completed 10 Tests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Read 5 Books</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 