import type { Role, UserStatus as DbUserStatus } from "@/app/generated/prisma/enums";
import type { PortalUser, UserRole, UserStatus } from "./types";

export const roleLabels: Record<Role, UserRole> = {
  SUPER_ADMIN: "Super Admin",
  DIRECTOR: "Director",
  ADMIN_STAFF: "Admin Staff",
  REVIEWER: "External Assessor",
};

export const roleValues: Record<UserRole, Role> = {
  "Super Admin": "SUPER_ADMIN",
  Director: "DIRECTOR",
  "Admin Staff": "ADMIN_STAFF",
  "External Assessor": "REVIEWER",
};

export const statusLabels: Record<DbUserStatus, UserStatus> = {
  ACTIVE: "Active",
  INVITED: "Invited",
  SUSPENDED: "Suspended",
};

export const statusValues: Record<UserStatus, DbUserStatus> = {
  Active: "ACTIVE",
  Invited: "INVITED",
  Suspended: "SUSPENDED",
};

export function formatLastActive(date: Date | null): string {
  if (!date) return "—";

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) return "Today";
  if (date >= startOfYesterday) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: DbUserStatus;
  lastActiveAt: Date | null;
};

export function toPortalUser(user: UserRecord): PortalUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: roleLabels[user.role],
    status: statusLabels[user.status],
    lastActive: formatLastActive(user.lastActiveAt),
  };
}
