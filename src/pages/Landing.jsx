import React from 'react';
import { Book, FileText, Headphones, Keyboard, ArrowRight, Star, Users, Award, Zap } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Book,
      title: 'Digital Library',
      description: 'Access thousands of NCERT books and study materials',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Interactive Tests',
      description: 'Take comprehensive assessments with real-time feedback',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Headphones,
      title: 'Immersive Audio',
      description: 'Spatial audio positioning for better content navigation',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'Comprehensive keyboard shortcuts for power users',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      content: 'Blind Edu transformed my learning experience. The navigation is incredibly intuitive.',
      author: 'Sarah Johnson',
      role: 'Student',
      rating: 5
    },
    {
      content: 'The most accessible learning platform I have ever used. Everything is well-organized.',
      author: 'Michael Chen',
      role: 'Teacher',
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Learners' },
    { icon: Book, value: '5,000+', label: 'Resources' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate' },
    { icon: Zap, value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl" style={{animation: 'spin 20s linear infinite'}}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-purple-800/30 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                <Book className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Garur</h1>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="px-6 py-3 text-purple-300 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-lg backdrop-blur-sm border border-transparent hover:border-purple-500/30"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 py-3 rounded-full mb-8 border border-purple-500/30 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-purple-200 font-medium">Accessible Learning Platform</span>
            </div>

            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Learn Without
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">Limits</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Experience education through intuitive navigation designed specifically for blind and visually impaired learners. 
              <span className="text-purple-300 font-medium"> Press Tab to navigate.</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <a
                href="/register"
                className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <span className="font-semibold">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="px-10 py-4 border-2 border-purple-500/50 text-purple-300 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 transition-colors">
                      <IconComponent className="w-8 h-8 text-purple-300" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Powerful Features</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need for an exceptional learning experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 group-hover:shadow-lg transition-shadow duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">{feature.title}</h4>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">What Our Users Say</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real stories from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed group-hover:text-white transition-colors">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-purple-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-5xl font-bold text-white mb-6">Ready to Start Learning?</h3>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of learners who have transformed their educational journey with Garur.</p>
          <a
            href="/register"
            className="inline-flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25 text-lg font-semibold"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-purple-800/30 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-3"></span>
                Features
              </h4>
              <ul className="space-y-3">
                {['Digital Library', 'Interactive Tests', 'Keyboard Navigation', 'Screen Reader Support'].map((item, i) => (
                  <li key={i} className="text-gray-300 hover:text-purple-300 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></span>
                Resources
              </h4>
              <ul className="space-y-3">
                {['Help Center', 'Documentation', 'Community', 'Blog'].map((item, i) => (
                  <li key={i} className="text-gray-300 hover:text-purple-300 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
                Company
              </h4>
              <ul className="space-y-3">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
                  <li key={i} className="text-gray-300 hover:text-purple-300 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></span>
                Connect
              </h4>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((item, i) => (
                  <li key={i} className="text-gray-300 hover:text-purple-300 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-purple-800/30 text-center">
            <p className="text-gray-400">&copy; 2024 Garur. All rights reserved. Built with ❤️ for accessibility.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;