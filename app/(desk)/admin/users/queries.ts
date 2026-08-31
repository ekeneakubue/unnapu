import prisma from "@/lib/prisma";
import { toPortalUser } from "./mappers";
import type { PortalUser } from "./types";

export async function getPortalUsers(): Promise<PortalUser[]> {
  try {
    const users = await prisma.user.findMany({
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
