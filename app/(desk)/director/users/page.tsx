import type { Metadata } from "next";
import { assignableRolesFor } from "@/lib/desk-access";
import { getSession } from "@/lib/session";
import { PageIntro } from "../../super-admin/ui";
import { getPortalUsers } from "../../super-admin/users/queries";
import { UsersPanel } from "../../super-admin/users/users-panel";

export const metadata: Metadata = {
  title: "Users",
};

export default async function DirectorUsersPage() {
  const session = await getSession();
  const users = await getPortalUsers({ excludeSuperAdmin: true });
  const assignableRoles = session
    ? assignableRolesFor(session.role)
    : assignableRolesFor("Director");

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
