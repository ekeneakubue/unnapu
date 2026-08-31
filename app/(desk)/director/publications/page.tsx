import type { Metadata } from "next";
import { PageIntro } from "../../super-admin/ui";
import { getPublications } from "../../super-admin/publications/queries";
import { PublicationsPanel } from "../../super-admin/publications/publications-panel";
import { getExternalAssessors } from "../../super-admin/users/queries";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function DirectorPublicationsPage() {
  const [publications, externalAssessors] = await Promise.all([
    getPublications(),
    getExternalAssessors(),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Knowledge base"
        title="Publications"
        description="Institutional reports, digests, and academic planning publications for the University community."
      />
      <PublicationsPanel
        initialPublications={publications}
        externalAssessors={externalAssessors}
        useViewModal
      />
    </div>
  );
}
