import React, { useState } from 'react';
import { Plus, Clock, Bell, Calendar, Pill, Syringe } from 'lucide-react';

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('medicine');
  const [isAddingReminder, setIsAddingReminder] = useState(false);

  const tabs = [
    { id: 'medicine', name: 'Medicine', icon: <Pill className="h-5 w-5" /> },
    { id: 'vaccination', name: 'Vaccinations', icon: <Syringe className="h-5 w-5" /> },
    { id: 'appointment', name: 'Appointments', icon: <Calendar className="h-5 w-5" /> },
  ];

  const medicineReminders = [
    {
      id: 1,
      medication: 'Lisinopril',
      dosage: '10mg',
      times: ['08:00', '20:00'],
      frequency: 'Twice daily',
      status: 'Active',
      nextDose: '2024-01-25 08:00'
    },
    {
      id: 2,
      medication: 'Metformin',
      dosage: '500mg',
      times: ['08:00', '14:00', '20:00'],
      frequency: 'Three times daily',
      status: 'Active',
      nextDose: '2024-01-25 14:00'
    }
  ];

  const vaccinationReminders = [
    {
      id: 1,
      vaccine: 'Annual Flu Shot',
      dueDate: '2024-10-15',
      location: 'Family Clinic',
      status: 'Upcoming'
    },
    {
      id: 2,
      vaccine: 'COVID-19 Booster',
      dueDate: '2024-12-20',
      location: 'City Health Center',
      status: 'Scheduled'
    }
  ];

  const appointmentReminders = [
    {
      id: 1,
      type: 'Annual Checkup',
      doctor: 'Dr. Smith',
      date: '2024-02-15',
      time: '10:30',
      location: 'Medical Center'
    },
    {
      id: 2,
      type: 'Dental Cleaning',
      doctor: 'Dr. Johnson',
      date: '2024-03-01',
      time: '14:00',
      location: 'Dental Clinic'
    }
  ];

  const AddReminderModal = () => {
    if (!isAddingReminder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">Add New Reminder</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Medicine</option>
                <option>Vaccination</option>
                <option>Appointment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter reminder name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsAddingReminder(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Add Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'medicine':
        return (
          <div className="space-y-4">
            {medicineReminders.map(reminder => (
              <div key={reminder.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reminder.medication}</h3>
                    <p className="text-gray-600">{reminder.dosage} - {reminder.frequency}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Times: {reminder.times.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Bell className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-600">Next dose: {reminder.nextDose}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {reminder.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'vaccination':
        return (
          <div className="space-y-4">
            {vaccinationReminders.map(reminder => (
              <div key={reminder.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reminder.vaccine}</h3>
                    <p className="text-gray-600">Location: {reminder.location}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Due: {reminder.dueDate}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    reminder.status === 'Upcoming'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {reminder.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'appointment':
        return (
          <div className="space-y-4">
            {appointmentReminders.map(reminder => (
              <div key={reminder.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reminder.type}</h3>
                    <p className="text-gray-600">With {reminder.doctor}</p>
                    <p className="text-sm text-gray-500">{reminder.location}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{reminder.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
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
            <Bell className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Health Reminders
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Never miss your medications, vaccinations, or appointments with smart, timely reminders.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Active Reminders</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2</div>
            <div className="text-gray-600">Due Today</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
            <div className="text-gray-600">Upcoming</div>
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
                {tabs.find(tab => tab.id === activeTab)?.name} Reminders
              </h2>
              <button 
                onClick={() => setIsAddingReminder(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Reminder</span>
              </button>
            </div>

            {renderContent()}
          </div>
        </div>

        <AddReminderModal />
      </div>
    </div>
  );
};

export default Reminders;