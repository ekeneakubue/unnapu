import type { Metadata } from "next";
import { PageIntro } from "../ui";
import { getPortalUsers } from "./queries";
import { UsersPanel } from "./users-panel";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const users = await getPortalUsers();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Access control"
        title="Users"
        description="Staff accounts for the Academic Planning portal — roles and access status."
      />
      <UsersPanel initialUsers={users} />
    </div>
  );
}
