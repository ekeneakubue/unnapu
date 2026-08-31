import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminShell } from "../super-admin/admin-shell";

export const metadata: Metadata = {
  title: {
    default: "Director",
    template: "%s · Academic Planning",
  },
  description:
    "Directorate desk of the Academic Planning Unit, University of Nigeria.",
};

export default async function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "Super Admin") redirect("/super-admin");
  if (session.role === "External Assessor") redirect("/external-assessor");
  if (session.role !== "Director") redirect("/login?error=forbidden");

  return (
    <div className="admin-desk h-full min-h-0">
      <AdminShell session={session} basePath="/director">
        {children}
      </AdminShell>
    </div>
  );
}
