import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { OverviewDashboard } from "./overview-dashboard";

export default async function SuperAdminOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <OverviewDashboard role={session.role} basePath="/super-admin" />;
}
