export type UserRole =
  | "Super Admin"
  | "Director"
  | "Admin Staff"
  | "External Assessor";

export type UserStatus = "Active" | "Invited" | "Suspended";

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
};
