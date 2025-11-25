import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import { UserRole } from './types';

const AppContent: React.FC = () => {
  const { user, loading } = useApp();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'departments': return <Departments />;
      case 'assistant': return <AiAssistant />;
      case 'attendance': 
        return <div className="p-10 text-center text-gray-500">Attendance Module (Under Construction)</div>;
      case 'profile':
        return <div className="p-10 text-center text-gray-500">User Profile Module (Under Construction)</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      {/* 
          Main Content Area 
          ml-20 ensures it respects the collapsed sidebar width.
          When sidebar expands (w-64) on hover, it will float over the content edge,
          which is standard for hover-expand sidebars.
      */}
      <main className="flex-1 ml-20 p-8 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 capitalize">{currentView}</h1>
                <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
                    {user.role === UserRole.ADMIN ? 'ADMINISTRATOR' : 'STAFF'}
                </span>
                <span className="text-sm text-gray-400">{new Date().toDateString()}</span>
            </div>
        </div>

        {/* Dynamic Content */}
        <div className="animate-fade-in-up">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;