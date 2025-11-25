import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Plus, Users } from 'lucide-react';

const Departments: React.FC = () => {
  const { departments, addDepartment } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', headOfDepartment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDept.name) {
      addDepartment(newDept);
      setNewDept({ name: '', headOfDepartment: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" /> Add Department
        </button>
      </div>

      {showForm && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 animate-fade-in">
          <h3 className="font-semibold text-blue-900 mb-3">Create New Department</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input 
              placeholder="Department Name" 
              className="flex-1 p-2 border rounded"
              value={newDept.name}
              onChange={e => setNewDept({...newDept, name: e.target.value})}
              required
            />
            <input 
              placeholder="Head of Department" 
              className="flex-1 p-2 border rounded"
              value={newDept.headOfDepartment}
              onChange={e => setNewDept({...newDept, headOfDepartment: e.target.value})}
            />
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">ID: {dept.id}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{dept.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Head: {dept.headOfDepartment || 'Vacant'}</p>
            
            <div className="flex items-center text-gray-600 text-sm border-t pt-4">
              <Users size={16} className="mr-2" />
              <span>{dept.employeeCount} Employees</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
