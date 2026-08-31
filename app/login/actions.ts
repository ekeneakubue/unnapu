"use server";

import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/auth";
import { deskPathForRole } from "@/lib/desk-access";
import { setSession } from "@/lib/session";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  try {
    const result = await authenticateUser(email, password);

    if (!result.ok) {
      redirect(`/login?error=${result.reason}`);
    }

    await setSession(result.user);
    redirect(deskPathForRole(result.user.role));
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("Sign in failed", error);
    redirect("/login?error=server");
  }
}

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
  );
}
