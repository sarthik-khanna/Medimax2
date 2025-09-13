import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Pill, FileText, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const quickStats = [
    { 
      label: 'Active Reminders', 
      value: '5', 
      icon: <Pill className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
      change: '+2 this week'
    },
    { 
      label: 'Health Records', 
      value: '12', 
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      change: '+3 this month'
    },
    { 
      label: 'Upcoming Appointments', 
      value: '2', 
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
      change: 'Next: Feb 15'
    },
    { 
      label: 'Active Alerts', 
      value: '1', 
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      change: 'Moderate severity'
    },
      { 
        label: 'Blood Donated', 
        value: '0', // Replace with actual value if available
        icon: <svg className="h-6 w-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-3.582-8-8 0-3.866 3.134-7 7-7s7 3.134 7 7c0 4.418-3.582 8-8 8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" /></svg>,
        color: 'bg-pink-100',
      },
  ];

  const recentActivity = [
    {
      type: 'reminder',
      message: 'Took Lisinopril (10mg)',
      time: '2 hours ago',
      icon: <Pill className="h-4 w-4 text-blue-500" />
    },
    {
      type: 'record',
      message: 'Added blood test results',
      time: '1 day ago',
      icon: <FileText className="h-4 w-4 text-green-500" />
    },
    {
      type: 'alert',
      message: 'New flu outbreak alert in your area',
      time: '2 days ago',
      icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />
    },
    {
      type: 'appointment',
      message: 'Scheduled checkup with Dr. Smith',
      time: '3 days ago',
      icon: <Calendar className="h-4 w-4 text-purple-500" />
    },
  ];

  const upcomingTasks = [
    {
      task: 'Take evening medication',
      time: 'Today, 8:00 PM',
      priority: 'high'
    },
    {
      task: 'Annual checkup appointment',
      time: 'Feb 15, 10:30 AM',
      priority: 'medium'
    },
    {
      task: 'Flu vaccination due',
      time: 'March 2024',
      priority: 'medium'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {currentUser?.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-blue-100 text-lg">
                Here's your health overview for today, {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="hidden lg:block">
              <Activity className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/vault" 
                className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-left transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-700">Add Health Record</p>
                    <p className="text-sm text-gray-500">Upload or add new medical documents</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/reminders" 
                className="w-full bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-left transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Pill className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-green-700">Set Medication Reminder</p>
                    <p className="text-sm text-gray-500">Never miss your medications</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/diseases" 
                className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-left transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-purple-700">Check Symptoms</p>
                    <p className="text-sm text-gray-500">Learn about diseases and symptoms</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="p-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/dashboard" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
            >
              View all activity →
            </Link>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Health Insights</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">Medication Adherence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Records Organized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">5</div>
              <div className="text-sm text-gray-600">Days Until Next Appointment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;