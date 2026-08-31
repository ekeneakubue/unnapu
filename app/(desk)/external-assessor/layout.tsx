import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminShell } from "../super-admin/admin-shell";

export const metadata: Metadata = {
  title: {
    default: "External Assessor",
    template: "%s · Academic Planning",
  },
  description:
    "External assessor desk of the Academic Planning Unit, University of Nigeria.",
};

export default async function ExternalAssessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "Super Admin") redirect("/super-admin");
  if (session.role === "Director") redirect("/director");
  if (session.role !== "External Assessor") redirect("/login?error=forbidden");

  return (
    <div className="admin-desk h-full min-h-0">
      <AdminShell session={session} basePath="/external-assessor">
        {children}
      </AdminShell>
    </div>
  );
}
