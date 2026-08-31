import prisma from "@/lib/prisma";
import { toPortalUser } from "./mappers";
import type { PortalUser } from "./types";

export async function getPortalUsers(options?: {
  excludeSuperAdmin?: boolean;
}): Promise<PortalUser[]> {
  try {
    const users = await prisma.user.findMany({
      where: options?.excludeSuperAdmin
        ? { role: { not: "SUPER_ADMIN" } }
        : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastActiveAt: true,
      },
    });

    return users.map(toPortalUser);
  } catch (error) {
    console.error("Failed to fetch users", error);
    return [];
  }
}

export async function getExternalAssessors(): Promise<
  { id: string; name: string; email: string }[]
> {
  try {
    const users = await prisma.user.findMany({
      where: { role: "REVIEWER", status: { not: "SUSPENDED" } },
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch external assessors", error);
    return [];
  }
}
