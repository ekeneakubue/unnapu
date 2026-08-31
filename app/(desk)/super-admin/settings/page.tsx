import type { Metadata } from "next";
import { PageIntro } from "../ui";
import { SettingsPanel } from "./settings-panel";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
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
