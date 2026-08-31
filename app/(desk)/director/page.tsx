import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { OverviewDashboard } from "../super-admin/overview-dashboard";

export default async function DirectorOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <OverviewDashboard role={session.role} basePath="/director" />;
}
