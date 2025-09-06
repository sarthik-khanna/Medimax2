import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, AlertTriangle, FileText, Heart, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Secure Vault',
      description: 'Store prescriptions, reports, allergies, and vaccination history securely.',
      link: '/vault'
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: 'Smart Reminders',
      description: 'Never miss your medicines or vaccination appointments with timed alerts.',
      link: '/reminders'
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
      title: 'Outbreak Alerts',
      description: 'Real-time health alerts and outbreak information in your local language.',
      link: '/alerts'
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: 'Disease Information',
      description: 'Comprehensive database of diseases, symptoms, and treatment information.',
      link: '/diseases'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Registered Users' },
    { number: '100+', label: 'Disease Profiles' },
    { number: '24/7', label: 'Health Monitoring' },
    { number: '99.9%', label: 'Data Security' }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 relative">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Digital
                <span className="text-blue-600"> Healthcare</span>
                <br />
                Companion
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Manage your health records, get timely reminders, stay informed about outbreaks, 
                and access comprehensive disease information all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-center transform hover:shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/diseases"
                  className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-center transform hover:shadow-lg"
                >
                  Explore Diseases
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <img
                src="https://aione.health/wp-content/uploads/2023/12/Ethical-AI-for-PACS-with-QA.jpg"
                alt="Healthcare professionals"
                className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg animate-slide-in-left hover:scale-110 transition-transform duration-300" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500 animate-pulse" />
                  <div>
                    <p className="font-semibold text-gray-900">24/7 Monitoring</p>
                    <p className="text-sm text-gray-600">Always here for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay healthy and informed, powered by cutting-edge technology 
              and backed by medical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group animate-fade-in-up hover:scale-105 transform"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100">
              Join our growing community of health-conscious individuals
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 animate-counter">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-teal-50 opacity-50"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-teal-100 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of users who trust Medimax Health for their healthcare needs.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:scale-110 transition-all duration-300 text-lg transform hover:shadow-xl animate-fade-in-up inline-block"
            style={{ animationDelay: '0.4s' }}
          >
            Start Your Health Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;