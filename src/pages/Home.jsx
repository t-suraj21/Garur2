import React from 'react';
import {
  Book,
  FileText,
  Headphones,
  Keyboard,
  ArrowRight,
  User,
  NotebookPen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const navigateToLibrary = () => navigate('/library');
  const navigateToTests = () => navigate('/test/class1/math/chapter1');
  const navigateToProfile = () => navigate('/profile');
  const navigateToNotebook = () => navigate('/notebook');
  const navigateToDashboard = () => navigate('/dashboard');


  const quickActions = [
    {
      id: 'library',
      title: 'Digital Library',
      description: 'Access thousands of audiobooks and study materials',
      icon: Book,
      action: navigateToLibrary,
      shortcut: 'Alt + L'
    },
    {
      id: 'tests',
      title: 'Tests',
      description: 'Take interactive tests',
      icon: FileText,
      action: navigateToTests,
      shortcut: 'Alt + T'
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Make Your Notes',
      icon: FileText,
      action: navigateToNotebook,
      shortcut: 'Alt + N'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View Your Progress',
      icon: FileText,
      action: navigateToDashboard,
      shortcut: 'Alt + D'
    }
  ];

  const features = [
    {
      icon: Headphones,
      title: 'Immersive Audio',
      description: 'Spatial audio positioning for better content navigation'
    },
    {
      icon: Keyboard,
      title: 'Keyboard Shortcuts',
      description: 'Comprehensive keyboard navigation for power users'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Garur</h1>
            </div>

            {/* Top Navigation */}
            <nav className="flex items-center space-x-6 text-sm font-medium text-white">
              <button onClick={navigateToProfile} className="hover:text-purple-400 transition-all flex items-center gap-1">
                <User className="w-4 h-4" /> Profile
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Accessible Learning Platform</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Learn Without
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Limits</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience education through intuitive navigation designed specifically for blind and visually impaired learners.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className="group relative p-8 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                onClick={action.action}
                aria-label={`${action.title}. ${action.description}. Keyboard shortcut: ${action.shortcut}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-xl transition-colors bg-purple-600/20 group-hover:bg-purple-500/30">
                    <IconComponent className="w-8 h-8 text-purple-300" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{action.description}</p>
                    <div className="inline-flex items-center text-xs text-purple-400 bg-purple-600/10 px-3 py-1 rounded-full">
                      <Keyboard className="w-3 h-3 mr-1" />
                      {action.shortcut}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Designed for Accessibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400"
                  tabIndex="0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                      <IconComponent className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Instructions */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Navigation Help</h3>
          <p className="text-gray-300 mb-6">
            Use Tab to navigate through the interface. Press Enter to activate buttons and links.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Keyboard Shortcuts</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Alt + L: Go to Library</li>
                <li>Alt + T: Go to Tests</li>
                <li>Tab: Navigate elements</li>
                <li>Enter: Activate element</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Keyboard Navigation</li>
                <li>Screen Reader Support</li>
                <li>High Contrast Mode</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Garur</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering education through accessible learning solutions for everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={navigateToLibrary} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Digital Library
                  </button>
                </li>
                <li>
                  <button onClick={navigateToTests} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Tests
                  </button>
                </li>
                <li>
                  <button onClick={navigateToNotebook} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Notebook
                  </button>
                </li>
                <li>
                  <button onClick={navigateToDashboard} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/documentation" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:support@garur.com" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    support@garur.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-purple-800/30">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Garur. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
