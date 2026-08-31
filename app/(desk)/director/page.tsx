import { redirect } from "next/navigation";
import {
  getOverviewStats,
  getRecentActivities,
} from "@/app/(desk)/desk/overview-queries";
import { getSession } from "@/lib/session";
import { OverviewDashboard } from "../super-admin/overview-dashboard";

export default async function DirectorOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [stats, activities] = await Promise.all([
    getOverviewStats({ excludeSuperAdmin: true }),
    getRecentActivities({ excludeSuperAdmin: true }),
  ]);

  return (
    <OverviewDashboard
      role={session.role}
      basePath="/director"
      stats={stats}
      activities={activities}
      session={session}
    />
  );
}
