import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PageIntro } from "../../super-admin/ui";
import { SettingsPanel } from "../../super-admin/settings/settings-panel";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function ExternalAssessorSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Account"
        title="Settings"
        description="Manage your portal password and account security."
      />
      <SettingsPanel accountEmail={session.email} lockEmail />
    </div>
  );
}
