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
  ArrowLeft,
  Users
} from 'lucide-react';
import { getAccessToken, refreshAccessToken } from '../utils/auth';

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
        const token = getAccessToken();
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

        if (response.status === 401) {
          // Token expired, try to refresh
          const newToken = await refreshAccessToken();
          // Retry the request with new token
          const retryResponse = await fetch('http://localhost:5001/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${newToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (!retryResponse.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await retryResponse.json();
          setUserData(data);
          
          // Calculate stats
          setStats({
            chaptersCompleted: data.completedChapters || 0,
            totalChapters: data.totalChapters || 0,
            testsCompleted: data.completedTests || 0,
            averageScore: data.averageScore || 0,
            totalStudyTime: data.totalStudyTime || 0,
            rank: data.rank || 0
          });
        } else if (!response.ok) {
          throw new Error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setUserData(data);
          
          // Calculate stats
          setStats({
            chaptersCompleted: data.completedChapters || 0,
            totalChapters: data.totalChapters || 0,
            testsCompleted: data.completedTests || 0,
            averageScore: data.averageScore || 0,
            totalStudyTime: data.totalStudyTime || 0,
            rank: data.rank || 0
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
        if (err.message === 'Failed to fetch user data') {
          navigate('/login');
        }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Chapters Completed</p>
                <p className="text-2xl font-bold text-white">{stats.chaptersCompleted}/{stats.totalChapters}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tests Completed</p>
                <p className="text-2xl font-bold text-white">{stats.testsCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Study Time</p>
                <p className="text-2xl font-bold text-white">{Math.floor(stats.totalStudyTime / 60)}h {stats.totalStudyTime % 60}m</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Current Rank</p>
                <p className="text-2xl font-bold text-white">#{stats.rank}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Study Groups</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 rounded-xl p-6 border border-purple-800/30 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {userData?.studyHistory?.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.chapterName}</p>
                    <p className="text-gray-400 text-sm">{activity.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">{activity.timeSpent} minutes</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(activity.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 