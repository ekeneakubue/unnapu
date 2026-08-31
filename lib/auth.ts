import { roleLabels } from "@/app/(desk)/super-admin/users/mappers";
import type { UserRole } from "@/app/(desk)/super-admin/users/types";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import type { SessionUser } from "@/lib/session";

const DESK_ROLES: UserRole[] = [
  "Super Admin",
  "Director",
  "External Assessor",
];

export type AuthFailure = "invalid" | "suspended" | "forbidden";

export type AuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; reason: AuthFailure };

export function canAccessAdminDesk(role: UserRole): boolean {
  return DESK_ROLES.includes(role);
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        passwordHash: true,
      },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return { ok: false, reason: "invalid" };
    }

    if (user.status === "SUSPENDED") {
      return { ok: false, reason: "suspended" };
    }

    const role = roleLabels[user.role];
    if (!canAccessAdminDesk(role)) {
      return { ok: false, reason: "forbidden" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastActiveAt: new Date(),
        ...(user.status === "INVITED" ? { status: "ACTIVE" } : {}),
      },
    });

    return {
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    };
  } catch (error) {
    console.error("Authentication failed", error);
    return { ok: false, reason: "invalid" };
  }
}
