"use server";

import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

export type ChangePasswordResult =
  | { ok: true }
  | { ok: false; error: string };

export async function changePassword(input: {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ChangePasswordResult> {
  const email = input.email.trim().toLowerCase();
  const { currentPassword, newPassword, confirmPassword } = input;

  if (!email || !currentPassword || !newPassword || !confirmPassword) {
    return { ok: false, error: "All fields are required." };
  }

  if (newPassword.length < 8) {
    return { ok: false, error: "New password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { ok: false, error: "New password and confirmation do not match." };
  }

  if (newPassword === currentPassword) {
    return {
      ok: false,
      error: "New password must be different from the current password.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    if (!user || !verifyPassword(currentPassword, user.passwordHash)) {
      return { ok: false, error: "Email or current password is incorrect." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashPassword(newPassword) },
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to change password", error);
    return { ok: false, error: "Could not update password. Please try again." };
  }
}
