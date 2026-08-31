import { redirect } from "next/navigation";
import {
  getOverviewStats,
  getRecentActivities,
} from "@/app/(desk)/desk/overview-queries";
import { getSession } from "@/lib/session";
import { OverviewDashboard } from "./overview-dashboard";

export default async function SuperAdminOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [stats, activities] = await Promise.all([
    getOverviewStats(),
    getRecentActivities(),
  ]);

  return (
    <OverviewDashboard
      role={session.role}
      basePath="/super-admin"
      stats={stats}
      activities={activities}
      session={session}
    />
  );
}
