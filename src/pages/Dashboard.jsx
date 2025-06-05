import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Award,
  BarChart2,
  CheckCircle,
  Book,
  ArrowLeft
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    chaptersCompleted: 0,
    totalChapters: 0,
    testsCompleted: 0,
    averageScore: 0,
    totalStudyTime: 0,
    rank: 0
  });

  const navigateToHome = () => {
    navigate('/home');
  };

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
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        
        // Calculate stats (this would come from your backend in a real app)
        setStats({
          chaptersCompleted: data.completedChapters || 0,
          totalChapters: data.totalChapters || 0,
          testsCompleted: data.completedTests || 0,
          averageScore: data.averageScore || 0,
          totalStudyTime: data.totalStudyTime || 0,
          rank: data.rank || 0
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
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

  const progressPercentage = (stats.chaptersCompleted / stats.totalChapters) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHome}
              className="text-white hover:text-purple-400 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-white">Performance Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Study Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Chapters Completed</span>
                <span className="text-white font-semibold">{stats.chaptersCompleted}/{stats.totalChapters}</span>
              </div>
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Completion Rate</span>
                <span className="text-white font-semibold">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Test Performance */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Test Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Tests Completed</span>
                <span className="text-white font-semibold">{stats.testsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Average Score</span>
                <span className="text-white font-semibold">{stats.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Rank</span>
                <span className="text-white font-semibold">#{stats.rank}</span>
              </div>
            </div>
          </div>

          {/* Study Stats */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Study Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Total Study Time</span>
                <span className="text-white font-semibold">{Math.floor(stats.totalStudyTime / 60)}h {stats.totalStudyTime % 60}m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Books Read</span>
                <span className="text-white font-semibold">{userData?.readBooks || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-300">Last Active</span>
                <span className="text-white font-semibold">{new Date(userData?.lastLogin).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="space-y-4">
              {/* This would be populated with actual activity data */}
              <div className="flex items-center gap-4 text-purple-300">
                <BookOpen className="w-5 h-5" />
                <span>Completed Chapter 5: Mathematics</span>
                <span className="ml-auto text-sm">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 text-purple-300">
                <Target className="w-5 h-5" />
                <span>Scored 85% in Science Test</span>
                <span className="ml-auto text-sm">Yesterday</span>
              </div>
              <div className="flex items-center gap-4 text-purple-300">
                <Book className="w-5 h-5" />
                <span>Started reading "Physics Fundamentals"</span>
                <span className="ml-auto text-sm">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 