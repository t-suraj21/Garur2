import React, { useState, useEffect } from 'react';
import { User, Mail, Book, Award, Calendar, MapPin, Phone, Edit3, Camera, Share2, Heart, MessageCircle, BookOpen, Trophy, Target, Users, TrendingUp, Star, LogOut } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigateToHome = () => {
    // Navigation logic - replace with your routing solution
    console.log('Navigate to home');
  };

  const openEditModal = () => {
    setEditFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      location: userData?.location || '',
      class: userData?.class || '',
      bio: userData?.bio || 'Passionate student dedicated to academic excellence and continuous learning.'
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update userData with new information
      setUserData(prev => ({
        ...prev,
        ...editFormData
      }));
      
      // Uncomment and modify this section for actual API integration
      /*
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      */
      
      closeEditModal();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Uncomment and modify this section for actual API integration
      /*
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      */
      
      // Clear local storage and redirect
      // localStorage.removeItem('token');
      // localStorage.removeItem('userData');
      
      // For demo purposes, just show alert
      alert('Logged out successfully!');
      console.log('User logged out - redirect to login page');
      
      // Replace with your actual navigation logic
      // window.location.href = '/login';
      
    } catch (err) {
      setError('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulated data for demo - replace with your API call
        const simulatedData = {
          name: "Alex Johnson",
          email: "alex.johnson@student.edu",
          phone: "+1 (555) 123-4567",
          location: "New York, NY",
          class: "12",
          completedTests: 45,
          readBooks: 28,
          createdAt: "2024-01-15T08:00:00Z",
          lastLogin: new Date().toISOString()
        };
        
        // Uncomment and modify this section for actual API integration
        /*
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle no token case
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
        */
        
        // For demo purposes, using simulated data
        setTimeout(() => {
          setUserData({
            ...simulatedData,
            bio: "Passionate student dedicated to academic excellence and continuous learning. Always eager to explore new subjects and challenge myself with advanced concepts."
          });
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const achievements = [
    { title: "Top Performer", icon: Trophy, count: userData?.completedTests || 0 },
    { title: "Book Lover", icon: BookOpen, count: userData?.readBooks || 0 },
    { title: "Active Learner", icon: Target, count: Math.floor((userData?.completedTests || 0) * 1.5) },
    { title: "Knowledge Seeker", icon: Star, count: Math.floor((userData?.readBooks || 0) * 2) }
  ];

  const recentActivity = [
    { action: "Completed Math Test", time: "2 hours ago", score: "95%" },
    { action: "Read 'Advanced Physics'", time: "1 day ago", progress: "100%" },
    { action: "Joined Study Group", time: "3 days ago", members: "12 members" },
    { action: "Earned 'Quick Learner' Badge", time: "1 week ago", achievement: "🏆" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all"
            >
              ← Back to Home
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-purple-400 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={openEditModal}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white/5 rounded-3xl p-8 mb-8 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-all shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{userData?.name || 'Student Name'}</h1>
                <p className="text-xl text-purple-300 mb-4">Student • Class {userData?.class || 'X'}</p>
                
                {/* Stats */}
                <div className="flex justify-center md:justify-start space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData?.completedTests || 0}</div>
                    <div className="text-sm text-gray-300">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData?.readBooks || 0}</div>
                    <div className="text-sm text-gray-300">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{Math.floor((userData?.completedTests || 0) * 0.8 + (userData?.readBooks || 0) * 1.2)}</div>
                    <div className="text-sm text-gray-300">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.8</div>
                    <div className="text-sm text-gray-300">Rating</div>
                  </div>
                </div>

                {/* Contact Info Pills */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">{userData?.email || 'Not provided'}</span>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">{userData?.location || 'Location'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center md:justify-start space-x-4">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all">
                    Follow
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg border border-purple-500/30 transition-all">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white/5 rounded-2xl p-2 mb-8 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex space-x-2">
              {['overview', 'activity', 'achievements', 'connections'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-xl transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-400" />
                    <span>About</span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {userData?.bio || "Passionate student dedicated to academic excellence and continuous learning. Always eager to explore new subjects and challenge myself with advanced concepts."}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Member since {new Date(userData?.createdAt).toLocaleDateString()}.
                  </p>
                </div>

                {/* Academic Progress */}
                <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <span>Academic Progress</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Mathematics</span>
                        <span className="text-purple-400">92%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Science</span>
                        <span className="text-purple-400">88%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '88%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Literature</span>
                        <span className="text-purple-400">95%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Account Status</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Streak</span>
                      <span className="text-orange-400 font-semibold">15 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Rank</span>
                      <span className="text-purple-400 font-semibold">#12</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">{userData?.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">Last Login: {new Date(userData?.lastLogin || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-purple-800/20">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                    <div className="text-purple-400 font-semibold">
                      {activity.score || activity.progress || activity.members || activity.achievement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-3xl font-bold text-purple-400 mb-1">{achievement.count}</p>
                    <p className="text-gray-400 text-sm">Earned</p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Study Connections</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-purple-800/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Student {i}</p>
                      <p className="text-gray-400 text-sm">Class {10 + i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-purple-800/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <button 
                onClick={closeEditModal}
                className="text-gray-400 hover:text-white transition-all text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-6">
              {/* Profile Picture Section */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button 
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Camera className="w-4 h-4" />
                  <span>Change Photo</span>
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={editFormData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="" className="bg-slate-800">Select Class</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <option key={num} value={num} className="bg-slate-800">Class {num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editFormData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-red-800/30">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Logout</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to logout? You'll need to sign in again to access your profile.
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={cancelLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={isLoggingOut}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Yes, Logout</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;