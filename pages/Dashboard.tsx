import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Building, DollarSign, UserCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { employees, departments } = useApp();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;
  const totalPayroll = employees.reduce((acc, curr) => acc + curr.salary, 0);

  // Data for Gender Chart
  const genderData = [
    { name: 'Male', value: employees.filter(e => e.gender === 'Male').length },
    { name: 'Female', value: employees.filter(e => e.gender === 'Female').length },
  ];

  // Data for Department Distribution
  const deptData = departments.map(d => ({
    name: d.name,
    value: d.employeeCount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-opacity-10" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Employees" value={totalEmployees} icon={Users} color="#3B82F6" />
        <StatCard title="Departments" value={departments.length} icon={Building} color="#10B981" />
        <StatCard title="On Leave" value={onLeave} icon={UserCheck} color="#F59E0B" />
        <StatCard title="Monthly Payroll" value={`$${totalPayroll.toLocaleString()}`} icon={DollarSign} color="#EF4444" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Employees per Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Gender Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Mock */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent HR Activities</h3>
        <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-sm border-b pb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">New employee <strong>Alemu Tefera</strong> onboarded.</span>
                <span className="text-gray-400 ml-auto">2 hours ago</span>
            </li>
            <li className="flex items-center space-x-3 text-sm border-b pb-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-gray-600">Leave request approved for <strong>Chala Bekele</strong>.</span>
                <span className="text-gray-400 ml-auto">5 hours ago</span>
            </li>
            <li className="flex items-center space-x-3 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-600">Department audit completed for <strong>Engineering</strong>.</span>
                <span className="text-gray-400 ml-auto">1 day ago</span>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
