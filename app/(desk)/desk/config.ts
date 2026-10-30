import type { UserRole } from "@/app/(desk)/super-admin/users/types";
import type { DeskBasePath } from "@/lib/desk-access";

export function getDeskNav(basePath: DeskBasePath) {
  if (basePath === "/external-assessor") {
    return [
      { href: basePath, segment: null, label: "Overview" },
      {
        href: `${basePath}/publications`,
        segment: "publications",
        label: "Publications",
      },
      { href: `${basePath}/settings`, segment: "settings", label: "Settings" },
    ] as const;
  }

  const items = [
    { href: basePath, segment: null, label: "Overview" },
    { href: `${basePath}/users`, segment: "users", label: "Users" },
    {
      href: `${basePath}/publications`,
      segment: "publications",
      label: "Publications",
    },
    ...(basePath === "/director"
      ? []
      : [
          {
            href: `${basePath}/accreditation`,
            segment: "accreditation",
            label: "Accreditation",
          },
        ]),
    { href: `${basePath}/settings`, segment: "settings", label: "Settings" },
  ];

  return items;
}

export function deskTitle(role: UserRole): string {
  if (role === "Director") return "Directorate desk";
  if (role === "External Assessor") return "Assessor desk";
  return "Planning desk";
}
