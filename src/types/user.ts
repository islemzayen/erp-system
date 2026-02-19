export type Role =
  | "ADMIN"
  | "HR_MANAGER"
  | "MARKETING_MANAGER"
  | "ONLINE_SALES"
  | "EMPLOYEE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}
