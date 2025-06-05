import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Library from './pages/Library';
import Reader from './pages/Reader';
import TestPage from './pages/TestPage';
import Profile from './pages/Profile';
import Notebook from './pages/Notebook';
import Dashboard from './pages/Dashboard';
import { getAccessToken } from './utils/auth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (for login/register)
const PublicRoute = ({ children }) => {
  const token = getAccessToken();
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route path="/reader/book/:bookId" element={<Reader />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reader/:classId/:subject/:chapterId"
        element={
          <ProtectedRoute>
            <Reader />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test/:classId/:subject/:chapterId"
        element={
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notebook"
        element={
          <ProtectedRoute>
            <Notebook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
