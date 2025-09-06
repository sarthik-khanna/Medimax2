import React, { useState } from 'react';
import { Search, Heart, Brain, Settings as Lungs, Eye, Thermometer } from 'lucide-react';

const Diseases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Heart className="h-5 w-5" /> },
    { id: 'cardiovascular', name: 'Cardiovascular', icon: <Heart className="h-5 w-5" /> },
    { id: 'neurological', name: 'Neurological', icon: <Brain className="h-5 w-5" /> },
    { id: 'respiratory', name: 'Respiratory', icon: <Lungs className="h-5 w-5" /> },
    { id: 'infectious', name: 'Infectious', icon: <Thermometer className="h-5 w-5" /> },
  ];

  const diseases = [
    {
      id: 1,
      name: 'Hypertension',
      category: 'cardiovascular',
      description: 'High blood pressure that can lead to serious health complications.',
      symptoms: ['Headaches', 'Shortness of breath', 'Chest pain', 'Dizziness'],
      causes: ['Poor diet', 'Lack of exercise', 'Stress', 'Genetics'],
      treatment: 'Lifestyle changes, medications, regular monitoring',
      prevention: 'Regular exercise, healthy diet, stress management',
      image: 'https://tse1.mm.bing.net/th/id/OIP.KgyVmV9fFfy5NUK7MlDguQHaE8?pid=Api&P=0&h=180'
    },
    {
      id: 2,
      name: 'Diabetes Type 2',
      category: 'metabolic',
      description: 'A chronic condition affecting blood sugar regulation.',
      symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      causes: ['Insulin resistance', 'Genetics', 'Obesity', 'Sedentary lifestyle'],
      treatment: 'Diet management, exercise, medication, blood sugar monitoring',
      prevention: 'Maintain healthy weight, regular exercise, balanced diet',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Asthma',
      category: 'respiratory',
      description: 'A respiratory condition causing breathing difficulties.',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
      causes: ['Allergies', 'Environmental factors', 'Genetics', 'Respiratory infections'],
      treatment: 'Inhalers, medications, trigger avoidance',
      prevention: 'Identify and avoid triggers, maintain clean environment',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Qlu1G8hVNyK8tU3SSNacPgHaEJ?pid=Api&P=0&h=180'
    },
    {
      id: 4,
      name: 'Migraine',
      category: 'neurological',
      description: 'Severe headaches often accompanied by other symptoms.',
      symptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Visual disturbances'],
      causes: ['Stress', 'Hormonal changes', 'Food triggers', 'Sleep patterns'],
      treatment: 'Pain medication, preventive medication, lifestyle changes',
      prevention: 'Identify triggers, regular sleep, stress management',
      image: 'https://tse4.mm.bing.net/th/id/OIP.RtDWzPCJGf4Fod-JH4UyXAHaEO?pid=Api&P=0&h=180'
    },
    {
      id: 5,
      name: 'Influenza',
      category: 'infectious',
      description: 'A viral infection affecting the respiratory system.',
      symptoms: ['Fever', 'Body aches', 'Fatigue', 'Cough', 'Sore throat'],
      causes: ['Influenza virus', 'Person-to-person transmission', 'Seasonal outbreaks'],
      treatment: 'Rest, fluids, antiviral medications, symptom management',
      prevention: 'Annual vaccination, hand hygiene, avoid close contact with sick people',
      image: 'https://tse1.mm.bing.net/th/id/OIP.Y_WYgnrsV9fb7_198kNHKQHaEJ?pid=Api&P=0&h=180'
    },
    {
      id: 6,
      name: 'Arthritis',
      category: 'musculoskeletal',
      description: 'Joint inflammation causing pain and stiffness.',
      symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion'],
      causes: ['Age', 'Genetics', 'Joint injuries', 'Autoimmune factors'],
      treatment: 'Medications, physical therapy, lifestyle modifications',
      prevention: 'Regular exercise, maintain healthy weight, protect joints',
      image: 'https://tse2.mm.bing.net/th/id/OIP.QbKJM8I5o4wnkL5C6nfeOQHaE8?pid=Api&P=0&h=180'
    }
  ];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
            Disease Information Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Comprehensive information about diseases, symptoms, causes, and treatments to help you stay informed about your health.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-fade-in-up hover:shadow-xl transition-all duration-500" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className={`flex-1 relative transform transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className={`absolute left-3 top-3 h-5 w-5 transition-all duration-300 ${isSearchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search diseases, symptoms, or conditions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 animate-slide-in-right">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md animate-fade-in-up ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <span className="transition-transform duration-300 hover:rotate-12">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diseases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDiseases.map((disease, index) => (
            <div 
              key={disease.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up group cursor-pointer"
              style={{ animationDelay: `${1 + index * 0.1}s` }}
            >
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{disease.name}</h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{disease.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      Common Symptoms:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {disease.symptoms.slice(0, 3).map((symptom, index) => (
                        <span 
                          key={index} 
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full transition-all duration-300 hover:bg-red-200 hover:scale-110 animate-fade-in-up"
                          style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                      Prevention:
                    </h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{disease.prevention}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1s' }}></span>
                      Treatment:
                    </h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{disease.treatment}</p>
                  </div>
                </div>
                
                {/* Hover overlay with additional info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto animate-bounce" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>No diseases found</h3>
            <p className="text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;