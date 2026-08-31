import type { UserRole } from "@/app/(desk)/super-admin/users/types";

export type DeskBasePath = "/super-admin" | "/director" | "/external-assessor";

export function deskPathForRole(role: UserRole): DeskBasePath {
  if (role === "Director") return "/director";
  if (role === "External Assessor") return "/external-assessor";
  return "/super-admin";
}

export function assignableRolesFor(actor: UserRole): UserRole[] {
  if (actor === "Super Admin") {
    return ["Super Admin", "Director", "Admin Staff", "External Assessor"];
  }
  if (actor === "Director") {
    return ["Director", "Admin Staff", "External Assessor"];
  }
  return [];
}

export function canAssignRole(actor: UserRole, role: UserRole): boolean {
  return assignableRolesFor(actor).includes(role);
}
