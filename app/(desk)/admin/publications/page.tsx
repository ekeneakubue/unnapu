import type { Metadata } from "next";
import { PageIntro } from "../ui";
import { getPublications } from "./queries";
import { PublicationsPanel } from "./publications-panel";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Knowledge base"
        title="Publications"
        description="Institutional reports, digests, and academic planning publications for the University community."
      />
      <PublicationsPanel initialPublications={publications} />
    </div>
  );
}
