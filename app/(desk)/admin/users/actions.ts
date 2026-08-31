"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { roleValues, statusValues, toPortalUser } from "./mappers";
import type { PortalUser, UserRole, UserStatus } from "./types";

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  lastActiveAt: true,
} as const;

function prismaErrorCode(error: unknown): string {
  return error && typeof error === "object" && "code" in error
    ? String(error.code)
    : "";
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<ActionResult<PortalUser>> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!name || !email || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }

  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  if (!(input.role in roleValues)) {
    return { ok: false, error: "Invalid role selected." };
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
        role: roleValues[input.role],
      },
      select: userSelect,
    });

    revalidatePath("/admin/users");

    return { ok: true, data: toPortalUser(user) };
  } catch (error) {
    if (prismaErrorCode(error) === "P2002") {
      return { ok: false, error: "A user with this email already exists." };
    }

    console.error("Failed to create user", error);
    return { ok: false, error: "Could not create user. Please try again." };
  }
}

export async function updateUser(input: {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
}): Promise<ActionResult<PortalUser>> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password?.trim() ?? "";

  if (!input.id || !name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  if (!(input.role in roleValues)) {
    return { ok: false, error: "Invalid role selected." };
  }

  if (!(input.status in statusValues)) {
    return { ok: false, error: "Invalid status selected." };
  }

  if (password && password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  try {
    const user = await prisma.user.update({
      where: { id: input.id },
      data: {
        name,
        email,
        role: roleValues[input.role],
        status: statusValues[input.status],
        ...(password ? { passwordHash: hashPassword(password) } : {}),
      },
      select: userSelect,
    });

    revalidatePath("/admin/users");

    return { ok: true, data: toPortalUser(user) };
  } catch (error) {
    const code = prismaErrorCode(error);

    if (code === "P2002") {
      return { ok: false, error: "A user with this email already exists." };
    }

    if (code === "P2025") {
      return { ok: false, error: "User not found." };
    }

    console.error("Failed to update user", error);
    return { ok: false, error: "Could not update user. Please try again." };
  }
}

export async function deleteUser(id: string): Promise<ActionResult> {
  if (!id) {
    return { ok: false, error: "User not found." };
  }

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { ok: true, data: undefined };
  } catch (error) {
    if (prismaErrorCode(error) === "P2025") {
      return { ok: false, error: "User not found." };
    }

    console.error("Failed to delete user", error);
    return { ok: false, error: "Could not delete user. Please try again." };
  }
}
