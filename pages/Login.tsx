import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (password === 'admin' || password === 'emp') {
        login(email, role);
      } else {
        setError('Invalid credentials (try password: "admin" or "emp")');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-800 p-8 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-lg border-4 border-blue-200">
                <img 
                    src="https://addisbiz.com/wp-content/uploads/2019/02/Assosa-University.jpg" 
                    alt="Assosa University Logo" 
                    className="w-full h-full object-contain p-1"
                />
            </div>
            <h1 className="text-2xl font-bold text-white">Assosa University</h1>
            <p className="text-blue-200 mt-2">Human Resource Management System</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                    type="button"
                    onClick={() => setRole(UserRole.ADMIN)}
                    className={`py-2 text-sm font-medium rounded-md transition ${role === UserRole.ADMIN ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}
                >
                    HR Admin
                </button>
                <button
                    type="button"
                    onClick={() => setRole(UserRole.EMPLOYEE)}
                    className={`py-2 text-sm font-medium rounded-md transition ${role === UserRole.EMPLOYEE ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}
                >
                    Employee
                </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="user@assosa.edu.et"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="•••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition transform active:scale-95"
          >
            Sign In
          </button>
          
          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;