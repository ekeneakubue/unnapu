import type { Metadata } from "next";
import { PageIntro } from "../../super-admin/ui";
import { SettingsPanel } from "../../super-admin/settings/settings-panel";

export const metadata: Metadata = {
  title: "Settings",
};

export default function DirectorSettingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Account"
        title="Settings"
        description="Manage your portal password and account security."
      />
      <SettingsPanel />
    </div>
  );
}
