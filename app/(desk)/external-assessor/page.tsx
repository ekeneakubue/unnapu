import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ExternalAssessorOverview } from "./external-assessor-overview";
import {
  getAssessorOverviewStats,
  getAssessorPublications,
} from "./queries";

export default async function ExternalAssessorOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [stats, publications] = await Promise.all([
    getAssessorOverviewStats(session.id),
    getAssessorPublications(session.id),
  ]);

  return (
    <ExternalAssessorOverview stats={stats} publications={publications} />
  );
}
