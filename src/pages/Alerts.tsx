import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Users, TrendingUp } from 'lucide-react';

const Alerts = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
  ];

  const outbreakAlerts = [
    {
      id: 1,
      disease: 'Seasonal Influenza',
      severity: 'moderate',
      location: 'New York City',
      cases: 1250,
      trend: 'increasing',
      lastUpdated: '2024-01-24 14:30',
      description: 'Seasonal flu activity is elevated in NYC area. Health officials recommend getting vaccinated.',
      recommendations: [
        'Get annual flu vaccination',
        'Practice good hand hygiene',
        'Avoid close contact with sick people',
        'Stay home when feeling unwell'
      ]
    },
    {
      id: 2,
      disease: 'Norovirus',
      severity: 'high',
      location: 'Los Angeles County',
      cases: 890,
      trend: 'stable',
      lastUpdated: '2024-01-24 12:15',
      description: 'Norovirus outbreak reported in several schools and care facilities.',
      recommendations: [
        'Wash hands frequently with soap',
        'Disinfect contaminated surfaces',
        'Avoid preparing food when sick',
        'Stay hydrated if experiencing symptoms'
      ]
    },
    {
      id: 3,
      disease: 'COVID-19',
      severity: 'low',
      location: 'Chicago',
      cases: 45,
      trend: 'decreasing',
      lastUpdated: '2024-01-24 10:00',
      description: 'COVID-19 activity remains low with continued declining trends.',
      recommendations: [
        'Stay up to date with vaccines',
        'Consider masking in crowded indoor settings',
        'Test if experiencing symptoms',
        'Stay home when sick'
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case 'stable':
        return <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mr-3" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Health Outbreak Alerts
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time health alerts and outbreak information in your local area to help you stay safe and informed.
          </p>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">1</div>
            <div className="text-gray-600">High Severity</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">1</div>
            <div className="text-gray-600">Moderate</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1</div>
            <div className="text-gray-600">Low Severity</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,185</div>
            <div className="text-gray-600">Total Cases</div>
          </div>
        </div>

        {/* Outbreak Alerts */}
        <div className="space-y-6">
          {outbreakAlerts.map(alert => (
            <div key={alert.id} className={`bg-white rounded-lg shadow-lg border-l-4 ${
              alert.severity === 'high' ? 'border-red-500' :
              alert.severity === 'moderate' ? 'border-yellow-500' : 'border-green-500'
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{alert.disease}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{alert.cases.toLocaleString()} cases</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(alert.trend)}
                        <span className="capitalize">{alert.trend}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{alert.description}</p>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {alert.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-blue-800 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {alert.lastUpdated}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Health Alert</h3>
              <p className="text-red-800 mb-3">
                If you are experiencing a health emergency or severe symptoms, seek immediate medical attention.
              </p>
              <div className="flex space-x-4">
                <a href="tel:911" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Call 911
                </a>
                <a href="tel:311" className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                  Health Hotline: 311
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;