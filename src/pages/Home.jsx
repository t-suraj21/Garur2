import React, { useEffect, useState, useRef } from 'react';
import {
  Volume2,
  Mic,
  Book,
  FileText,
  Headphones,
  Keyboard,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const navigate = useNavigate();

  // Simulate voice synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    speakText(
      'Welcome to Blind Edu. An accessible learning platform for visually impaired students. Press Tab to navigate or say Library to begin.'
    );
  }, []);

  useEffect(() => {
    if (command.toLowerCase() === 'library') {
      navigateToLibrary();
    }
  }, [command]);

  const handleVoiceCommand = () => {
    setIsListening(true);
    speakText('Listening for your command');

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      const fakeCommand = 'library';
      setCommand(fakeCommand);
      speakText(`Command received: ${fakeCommand}`);
    }, 3000);
  };

  const navigateToLibrary = () => {
    speakText('Navigating to Library');
    navigate('/library');
  };

  const navigateToTests = () => {
    speakText('Navigating to Tests');
    navigate('/tests');
  };

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
      title: 'Voice Tests',
      description: 'Take interactive tests using voice commands',
      icon: FileText,
      action: navigateToTests,
      shortcut: 'Alt + T'
    },
    {
      id: 'voice',
      title: 'Voice Assistant',
      description: isListening ? 'Listening for commands...' : 'Activate voice navigation',
      icon: Mic,
      action: handleVoiceCommand,
      shortcut: 'Alt + V',
      isActive: isListening
    }
  ];

  const features = [
    {
      icon: Volume2,
      title: 'Advanced Text-to-Speech',
      description: 'High-quality voice synthesis with adjustable speed and tone'
    },
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
        onFocus={() => speakText('Skip to main content')}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Garur</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors focus:ring-2 focus:ring-purple-400 focus:outline-none"
                onClick={() => speakText('Settings menu')}
                aria-label="Settings"
              >
                <Volume2 className="w-5 h-5 text-purple-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Voice-First Learning Platform</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Learn Without
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Limits</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience education through advanced voice technology, spatial audio, and intuitive navigation designed
            specifically for blind and visually impaired learners.
          </p>

          {isListening && (
            <div className="inline-flex items-center space-x-3 bg-blue-600/20 px-6 py-3 rounded-full mb-8">
              <div className="flex space-x-1">
                <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-blue-300 font-medium">Listening for your command...</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className={`group relative p-8 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50 ${
                  action.isActive
                    ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
                onClick={action.action}
                onFocus={() => speakText(`${action.title}. ${action.description}`)}
                aria-label={`${action.title}. ${action.description}. Keyboard shortcut: ${action.shortcut}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`p-4 rounded-xl transition-colors ${
                      action.isActive ? 'bg-blue-500/30' : 'bg-purple-600/20 group-hover:bg-purple-500/30'
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${action.isActive ? 'text-blue-300' : 'text-purple-300'}`}
                    />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400"
                  tabIndex="0"
                  onFocus={() => speakText(`${feature.title}. ${feature.description}`)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Tab</kbd>
              <span>Navigate elements</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>
              <span>Activate buttons</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Alt + V</kbd>
              <span>Voice command</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Alt + L</kbd>
              <span>Open library</span>
            </div>
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>System Ready</span>
            </div>
            {command && (
              <div className="flex items-center space-x-2">
                <span>Last command:</span>
                <span className="text-purple-400 font-medium">{command}</span>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">Press F1 for help • Alt + H for shortcuts</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
