import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PageIntro } from "../../super-admin/ui";
import { AssessorPublicationsPanel } from "../assessor-publications-panel";
import { getAssessorPublications } from "../queries";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function ExternalAssessorPublicationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const publications = await getAssessorPublications(session.id);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Knowledge base"
        title="Publications"
        description="Publications shared with you for external assessment and review."
      />
      <AssessorPublicationsPanel initialPublications={publications} />
    </div>
  );
}
