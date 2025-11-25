import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Employee } from '../types';
import { Plus, Trash2, Edit2, Search, FileDown } from 'lucide-react';

const Employees: React.FC = () => {
  const { employees, departments, addEmployee, deleteEmployee } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '', lastName: '', email: '', phone: '', 
    departmentId: '', position: '', salary: 0, 
    hireDate: '', gender: 'Male', status: 'Active'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.email) {
      addEmployee(formData as Omit<Employee, 'id'>);
      setIsModalOpen(false);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', 
        departmentId: '', position: '', salary: 0, 
        hireDate: '', gender: 'Male', status: 'Active'
      });
    }
  };

  const filteredEmployees = employees.filter(e => 
    e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
        <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                <FileDown size={18} className="mr-2" /> Export
            </button>
            <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
            <Plus size={18} className="mr-2" /> Add Employee
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {/* Toolbar */}
        <div className="p-4 border-b flex items-center">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search employees..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 text-sm font-semibold uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Position</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                            {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</div>
                            <div className="text-xs text-gray-500">{emp.email}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {departments.find(d => d.id === emp.departmentId)?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.position}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                        emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Edit2 size={16} />
                        </button>
                        <button 
                            onClick={() => deleteEmployee(emp.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded">
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                  <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No employees found.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">Add New Employee</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-gray-300">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input name="firstName" required className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input name="lastName" required className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" type="email" required className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input name="phone" className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select name="departmentId" className="w-full border rounded p-2" onChange={handleInputChange}>
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input name="position" className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                    <input name="salary" type="number" className="w-full border rounded p-2" onChange={handleInputChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" className="w-full border rounded p-2" onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Employee</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
