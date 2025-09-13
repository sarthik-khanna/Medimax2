import React, { useState, useEffect } from 'react';
import { Plus, FileText, Shield, Syringe, AlertCircle, Download, Eye } from 'lucide-react';

const prescriptions = [
  {
    id: 1,
    medication: 'Atorvastatin',
    dosage: '10mg',
    frequency: 'Once daily',
    doctor: 'Dr. Smith',
    date: '2023-09-01',
    status: 'Active',
  },
  {
    id: 2,
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    doctor: 'Dr. Lee',
    date: '2023-08-15',
    status: 'Inactive',
  },
];

const reports = [
  {
    id: 1,
    name: 'Blood Test',
    type: 'CBC',
    doctor: 'Dr. Brown',
    date: '2023-07-20',
    status: 'Normal',
  },
  {
    id: 2,
    name: 'X-Ray',
    type: 'Chest',
    doctor: 'Dr. Green',
    date: '2023-06-10',
    status: 'Reviewed',
  },
];

const allergies = [
  {
    id: 1,
    allergen: 'Peanuts',
    reaction: 'Anaphylaxis',
    severity: 'Severe',
    dateIdentified: '2020-05-01',
  },
  {
    id: 2,
    allergen: 'Penicillin',
    reaction: 'Rash',
    severity: 'Moderate',
    dateIdentified: '2019-11-12',
  },
];

const vaccinations = [
  {
    id: 1,
    vaccine: 'Influenza',
    dose: 'Annual',
    date: '2023-10-01',
    location: 'Family Clinic',
    nextDue: '2024-10-01',
  },
  {
    id: 2,
    vaccine: 'COVID-19',
    dose: 'Booster',
    date: '2023-03-15',
    location: 'City Hospital',
    nextDue: '2024-03-15',
  },
];

const tabs = [
  { id: 'prescriptions', name: 'Prescriptions', icon: <FileText className="h-5 w-5" /> },
  { id: 'reports', name: 'Medical Reports', icon: <FileText className="h-5 w-5" /> },
  { id: 'allergies', name: 'Allergies', icon: <AlertCircle className="h-5 w-5" /> },
  { id: 'vaccinations', name: 'Vaccinations', icon: <Syringe className="h-5 w-5" /> },
];

const Vault = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');

  useEffect(() => {
    const handler = (e: any) => {
      const { object, section } = e.detail || {};
      if (section && tabs.some(t => t.id === section)) {
        setActiveTab(section);
        setTimeout(() => {
          if (object) {
            const el = document.querySelector(`[data-voice-section="${object.toLowerCase()}"]`);
            if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    };
    window.addEventListener('voice-open-object', handler);
    return () => window.removeEventListener('voice-open-object', handler);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'prescriptions':
        return (
          <div className="space-y-4" data-voice-section="prescriptions">
            {prescriptions.map(prescription => (
              <div key={prescription.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500" data-voice-section={prescription.medication.toLowerCase()}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{prescription.medication}</h3>
                    <p className="text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                    <p className="text-sm text-gray-500">Prescribed by {prescription.doctor}</p>
                    <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      prescription.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {prescription.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-4" data-voice-section="reports">
            {reports.map(report => (
              <div key={report.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500" data-voice-section={report.name.toLowerCase()}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-gray-600">{report.type}</p>
                    <p className="text-sm text-gray-500">By {report.doctor}</p>
                    <p className="text-sm text-gray-500">Date: {report.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'allergies':
        return (
          <div className="space-y-4" data-voice-section="allergies">
            {allergies.map(allergy => (
              <div key={allergy.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500" data-voice-section={allergy.allergen.toLowerCase()}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{allergy.allergen}</h3>
                    <p className="text-gray-600">Reaction: {allergy.reaction}</p>
                    <p className="text-sm text-gray-500">Identified: {allergy.dateIdentified}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    allergy.severity === 'Severe'
                      ? 'bg-red-100 text-red-800'
                      : allergy.severity === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {allergy.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'vaccinations':
        return (
          <div className="space-y-4" data-voice-section="vaccinations">
            {vaccinations.map(vaccination => (
              <div key={vaccination.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500" data-voice-section={vaccination.vaccine.toLowerCase()}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{vaccination.vaccine}</h3>
                    <p className="text-gray-600">{vaccination.dose}</p>
                    <p className="text-sm text-gray-500">Date: {vaccination.date}</p>
                    <p className="text-sm text-gray-500">Location: {vaccination.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Next Due:</p>
                    <p className="text-sm font-semibold text-blue-600">{vaccination.nextDue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
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
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Secure Health Vault
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your secure digital repository for all health records, prescriptions, and medical information.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900">Your Data is Secure</h3>
              <p className="text-sm text-blue-700 mt-1">
                All medical records are encrypted and stored securely. Only you have access to your health information.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  data-voice-section={tab.id}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;

