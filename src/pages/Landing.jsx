import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Volume2, 
  Mic, 
  Book, 
  FileText, 
  Headphones, 
  Keyboard, 
  ArrowRight, 
  Play,
  Users,
  Award,
  Shield,
  Star,
  ChevronDown,
  Menu,
  X,
  Eye,
  Heart,
  Zap
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate(); // Now we're actually using the navigate hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hasAnnounced, setHasAnnounced] = useState(false);

  // Simulate voice synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Navigation handler
  const handleNavigation = (path, message) => {
    speakText(message);
    // Simulate navigation - in a real app this would work with actual routes
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  useEffect(() => {
    if (!hasAnnounced) {
      speakText('Welcome to Blind Edu landing page. An accessible learning platform for visually impaired students. Press Tab to navigate or use voice commands.');
      setHasAnnounced(true);
    }
  }, [hasAnnounced]);

  const features = [
    {
      icon: Volume2,
      title: 'Advanced Voice Navigation',
      description: 'Navigate through content using natural voice commands with 99% accuracy recognition',
      highlight: 'AI-Powered'
    },
    {
      icon: Headphones,
      title: 'Immersive Audio Library',
      description: 'Access over 10,000 educational audiobooks with spatial audio positioning',
      highlight: '10K+ Books'
    },
    {
      icon: Mic,
      title: 'Interactive Voice Testing',
      description: 'Take comprehensive assessments using voice responses and real-time feedback',
      highlight: 'Real-time'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up in seconds with voice verification',
      icon: Users
    },
    {
      number: 2,
      title: 'Explore Content',
      description: 'Browse courses using voice commands',
      icon: Book
    },
    {
      number: 3,
      title: 'Start Learning',
      description: 'Engage with interactive audio content',
      icon: Play
    },
    {
      number: 4,
      title: 'Track Progress',
      description: 'Monitor achievements with voice reports',
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'University Student',
      content: 'Blind Edu transformed my learning experience. The voice navigation is incredibly intuitive.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Professional Learner',
      content: 'The audio quality and accessibility features are unmatched. Highly recommend!',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Educator',
      content: 'As an instructor, I love how this platform makes education truly inclusive.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Learners' },
    { number: '10K+', label: 'Audio Books' },
    { number: '500+', label: 'Courses' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Skip Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        onFocus={() => speakText('Skip to main content')}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="relative z-40 border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Garur</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors focus:text-purple-400 focus:outline-none">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors focus:text-purple-400 focus:outline-none">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors focus:text-purple-400 focus:outline-none">
                Reviews
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="px-6 py-2 text-white hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg"
                onClick={() => handleNavigation('/login', 'Navigating to login')}
              >
                Login
              </button>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
                onClick={() => handleNavigation('/register', 'Navigating to registration')}
              >
                Get Started Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-800/30 pt-4">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <button 
                    className="px-6 py-2 text-white hover:text-purple-300 transition-colors text-left"
                    onClick={() => handleNavigation('/login', 'Navigating to login')}
                  >
                    Login
                  </button>
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
                    onClick={() => handleNavigation('/register', 'Navigating to registration')}
                  >
                    Get Started Free
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-6 text-center">
            {/* Announcement Bar */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 px-6 py-3 rounded-full mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-purple-300">New: AI-Powered Voice Recognition</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Education for
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Everyone
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Experience the future of accessible learning with voice-first navigation, 
              immersive audio content, and AI-powered personalization designed specifically 
              for visually impaired learners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 text-lg font-semibold shadow-lg shadow-purple-500/25 flex items-center space-x-3"
                onClick={() => handleNavigation('/register', 'Starting free trial')}
                onFocus={() => speakText('Start your free trial button')}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                className="group px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/20 text-lg font-semibold flex items-center space-x-3"
                onClick={() => speakText('Playing demo')}
                onFocus={() => speakText('Watch demo button')}
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Revolutionary Features
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Cutting-edge technology meets accessibility to create an unparalleled learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 focus-within:ring-2 focus-within:ring-purple-400"
                    tabIndex="0"
                    onFocus={() => speakText(`${feature.title}. ${feature.description}`)}
                  >
                    {/* Highlight Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full">
                      {feature.highlight}
                    </div>

                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                        <IconComponent className="w-8 h-8 text-purple-300" />
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Simple Steps to Success
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get started in minutes with our intuitive onboarding process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center group"
                    tabIndex="0"
                    onFocus={() => speakText(`Step ${step.number}: ${step.title}. ${step.description}`)}
                  >
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent z-0"></div>
                    )}

                    {/* Step Circle */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/25">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 transition-colors">
                      <IconComponent className="w-6 h-6 text-purple-300" />
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Loved by Learners
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of students who've transformed their learning experience
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                
                <div className="text-center">
                  <div className="font-semibold text-white">{testimonials[activeTestimonial].name}</div>
                  <div className="text-purple-300">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      index === activeTestimonial ? 'bg-purple-500' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-3xl p-12">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Learning?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of learners who've discovered the power of accessible education
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 text-lg font-semibold shadow-lg shadow-purple-500/25"
                  onClick={() => handleNavigation('/register', 'Starting free trial')}
                >
                  Start Your Free Trial
                </button>
                
                <div className="text-gray-400 text-sm">
                  No credit card required • 30-day free trial
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Blind Edu</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering visually impaired students through accessible learning technology.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Voice Navigation</li>
                <li>Audio Books</li>
                <li>Voice Tests</li>
                <li>Accessibility Tools</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Blind Edu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;