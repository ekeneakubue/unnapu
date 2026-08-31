import type { Metadata } from "next";
import { assignableRolesFor } from "@/lib/desk-access";
import { getSession } from "@/lib/session";
import { PageIntro } from "../ui";
import { getPortalUsers } from "./queries";
import { UsersPanel } from "./users-panel";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const session = await getSession();
  const users = await getPortalUsers();
  const assignableRoles = session
    ? assignableRolesFor(session.role)
    : assignableRolesFor("Super Admin");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker="Access control"
        title="Users"
        description="Staff accounts for the Academic Planning portal — roles and access status."
      />
      <UsersPanel initialUsers={users} assignableRoles={assignableRoles} />
    </div>
  );
}
