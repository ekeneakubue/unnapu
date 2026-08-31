import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Academic Planning",
  },
  description:
    "Administration desk of the Academic Planning Unit, University of Nigeria.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-desk h-full min-h-0">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
