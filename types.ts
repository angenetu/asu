export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  salary: number;
  hireDate: string;
  gender: 'Male' | 'Female';
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface Department {
  id: string;
  name: string;
  headOfDepartment: string;
  employeeCount: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface DashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  onLeave: number;
  totalPayroll: number;
}
