import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, Department, User, UserRole, AttendanceRecord } from '../types';

interface AppContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  employees: Employee[];
  departments: Department[];
  attendance: AttendanceRecord[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (dept: Omit<Department, 'id' | 'employeeCount'>) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Computer Science', headOfDepartment: 'Dr. Abebe Kebede', employeeCount: 12 },
  { id: '2', name: 'Engineering', headOfDepartment: 'Eng. Sarah Ahmed', employeeCount: 24 },
  { id: '3', name: 'Business & Economics', headOfDepartment: 'Mr. Dawit Tadesse', employeeCount: 15 },
  { id: '4', name: 'Human Resources', headOfDepartment: 'Ms. Genet Yilma', employeeCount: 5 },
];

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', firstName: 'Alemu', lastName: 'Tefera', email: 'alemu@assosa.edu.et', phone: '0911234567', departmentId: '1', position: 'Senior Lecturer', salary: 15000, hireDate: '2019-09-01', gender: 'Male', status: 'Active' },
  { id: '2', firstName: 'Bethel', lastName: 'Haile', email: 'bethel@assosa.edu.et', phone: '0922345678', departmentId: '2', position: 'Lab Assistant', salary: 8000, hireDate: '2021-02-14', gender: 'Female', status: 'Active' },
  { id: '3', firstName: 'Chala', lastName: 'Bekele', email: 'chala@assosa.edu.et', phone: '0933456789', departmentId: '3', position: 'Dean', salary: 25000, hireDate: '2015-05-20', gender: 'Male', status: 'On Leave' },
  { id: '4', firstName: 'Hana', lastName: 'Girma', email: 'hana@assosa.edu.et', phone: '0944567890', departmentId: '4', position: 'HR Manager', salary: 20000, hireDate: '2018-11-10', gender: 'Female', status: 'Active' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    setTimeout(() => setLoading(false), 800);
  }, []);

  const login = (email: string, role: UserRole) => {
    setUser({
      id: '99',
      name: role === UserRole.ADMIN ? 'Administrator' : 'Employee User',
      email,
      role,
      avatar: 'https://picsum.photos/200'
    });
  };

  const logout = () => setUser(null);

  const addEmployee = (empData: Omit<Employee, 'id'>) => {
    const newEmp = { ...empData, id: Math.random().toString(36).substr(2, 9) };
    setEmployees([...employees, newEmp]);
    
    // Update department count
    setDepartments(prev => prev.map(d => 
      d.id === empData.departmentId ? { ...d, employeeCount: d.employeeCount + 1 } : d
    ));
  };

  const deleteEmployee = (id: string) => {
    const emp = employees.find(e => e.id === id);
    setEmployees(employees.filter(e => e.id !== id));
    if (emp) {
        setDepartments(prev => prev.map(d => 
            d.id === emp.departmentId ? { ...d, employeeCount: Math.max(0, d.employeeCount - 1) } : d
        ));
    }
  };

  const addDepartment = (deptData: Omit<Department, 'id' | 'employeeCount'>) => {
    const newDept = { ...deptData, id: Math.random().toString(36).substr(2, 9), employeeCount: 0 };
    setDepartments([...departments, newDept]);
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, employees, departments, attendance, addEmployee, deleteEmployee, addDepartment, loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};