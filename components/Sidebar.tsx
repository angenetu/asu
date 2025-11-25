import React from 'react';
import { LayoutDashboard, Users, Building2, CalendarCheck, FileText, Settings, Sparkles, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const { logout, user } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div className="w-20 hover:w-64 bg-blue-900 text-white h-screen flex flex-col shadow-xl fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out group overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-blue-800 flex flex-col items-center text-center whitespace-nowrap">
        <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] bg-white rounded-full flex items-center justify-center mb-0 group-hover:mb-3 overflow-hidden shadow-lg border-2 border-blue-300 transition-all duration-300">
           {/* Assosa University Logo */}
           <img 
             src="https://addisbiz.com/wp-content/uploads/2019/02/Assosa-University.jpg" 
             alt="Assosa University" 
             className="w-full h-full object-contain p-0.5"
           />
        </div>
        
        {/* Title - Fades in on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden delay-75">
            <h1 className="text-xl font-bold tracking-wider">AU-HRMS</h1>
            <p className="text-xs text-blue-300 mt-1">Assosa University</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center px-6 py-4 transition-colors duration-200 relative ${
                    currentView === item.id
                      ? 'bg-blue-800'
                      : 'hover:bg-blue-800'
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {currentView === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                  )}

                  {/* Icon */}
                  <Icon size={24} className={`min-w-[24px] ${currentView === item.id ? 'text-yellow-400' : 'text-blue-200'}`} />
                  
                  {/* Label - Fades in on hover */}
                  <span className={`ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      currentView === item.id ? 'font-semibold text-white' : 'text-blue-100'
                  }`}>
                      {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-blue-800 whitespace-nowrap">
        <div className="flex items-center mb-0 group-hover:mb-4 transition-all duration-300 justify-center group-hover:justify-start">
            <img src={user?.avatar} alt="User" className="w-10 h-10 min-w-[2.5rem] rounded-full ring-2 ring-blue-500" />
            
            <div className="ml-3 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-blue-300 truncate">{user?.email}</p>
            </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-0 group-hover:px-4 py-2 bg-transparent group-hover:bg-red-600 hover:bg-red-700 rounded-md transition-all text-sm text-red-300 group-hover:text-white"
          title="Logout"
        >
          <LogOut size={20} className="min-w-[20px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden">
              Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;