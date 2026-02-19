import { Role } from "@/types/user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@erp.com",
    password: "123456",
    role: "ADMIN",
  },
  {
    id: "2",
    name: "HR Manager",
    email: "hr@erp.com",
    password: "123456",
    role: "HR_MANAGER",
  },
  {
    id: "3",
    name: "Marketing Manager",
    email: "marketing@erp.com",
    password: "123456",
    role: "MARKETING_MANAGER",
  },
  {
    id: "4",
    name: "Sales Manager",
    email: "sales@erp.com",
    password: "123456",
    role: "ONLINE_SALES",
  },
  {
    id: "5",
    name: "Employee User",
    email: "employee@erp.com",
    password: "123456",
    role: "EMPLOYEE",
  },
];
