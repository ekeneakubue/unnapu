import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: {
    default: "Super Admin",
    template: "%s · Academic Planning",
  },
  description:
    "Administration desk of the Academic Planning Unit, University of Nigeria.",
};

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "Director") redirect("/director");
  if (session.role === "External Assessor") redirect("/external-assessor");
  if (session.role !== "Super Admin") redirect("/login?error=forbidden");

  return (
    <div className="admin-desk h-full min-h-0">
      <AdminShell session={session} basePath="/super-admin">
        {children}
      </AdminShell>
    </div>
  );
}
