import prisma from "@/lib/prisma";
import { roleLabels } from "@/app/(desk)/super-admin/users/mappers";
import type { OverviewStats, RecentActivity } from "./overview-types";

function formatWhen(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getOverviewStats(options?: {
  excludeSuperAdmin?: boolean;
}): Promise<OverviewStats> {
  try {
    const userWhere = options?.excludeSuperAdmin
      ? { role: { not: "SUPER_ADMIN" as const } }
      : undefined;

    const [users, publications, assessedGroups] = await Promise.all([
      prisma.user.count({ where: userWhere }),
      prisma.publication.count(),
      prisma.publicationAssignment.groupBy({
        by: ["publicationId"],
        where: { status: "COMPLETED" },
      }),
    ]);

    return {
      users,
      publications,
      assessedPublications: assessedGroups.length,
    };
  } catch (error) {
    console.error("Failed to fetch overview stats", error);
    return { users: 0, publications: 0, assessedPublications: 0 };
  }
}

export async function getRecentActivities(options?: {
  excludeSuperAdmin?: boolean;
  limit?: number;
}): Promise<RecentActivity[]> {
  const limit = options?.limit ?? 10;

  try {
    const userWhere = options?.excludeSuperAdmin
      ? { role: { not: "SUPER_ADMIN" as const } }
      : undefined;

    const [users, publications, assignments] = await Promise.all([
      prisma.user.findMany({
        where: userWhere,
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.publication.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
      prisma.publicationAssignment.findMany({
        orderBy: { updatedAt: "desc" },
        take: limit,
        include: {
          publication: { select: { title: true } },
          assessor: { select: { name: true } },
        },
      }),
    ]);

    const activities: (RecentActivity & { sortAt: number })[] = [];

    for (const user of users) {
      activities.push({
        id: `user-${user.id}`,
        action: "User added",
        detail: `${user.name} · ${roleLabels[user.role]}`,
        when: formatWhen(user.createdAt),
        sortAt: user.createdAt.getTime(),
      });
    }

    for (const publication of publications) {
      activities.push({
        id: `publication-${publication.id}`,
        action: "Publication uploaded",
        detail: publication.title,
        when: formatWhen(publication.createdAt),
        sortAt: publication.createdAt.getTime(),
      });
    }

    for (const assignment of assignments) {
      if (assignment.status === "COMPLETED" && assignment.completedAt) {
        activities.push({
          id: `assessment-${assignment.id}`,
          action: "Assessment completed",
          detail: `${assignment.assessor.name} · ${assignment.publication.title}`,
          when: formatWhen(assignment.completedAt),
          sortAt: assignment.completedAt.getTime(),
        });
      } else {
        activities.push({
          id: `share-${assignment.id}`,
          action: "Publication shared",
          detail: `${assignment.publication.title} · ${assignment.assessor.name}`,
          when: formatWhen(assignment.createdAt),
          sortAt: assignment.createdAt.getTime(),
        });
      }
    }

    return activities
      .sort((a, b) => b.sortAt - a.sortAt)
      .slice(0, limit)
      .map(({ sortAt: _sortAt, ...activity }) => activity);
  } catch (error) {
    console.error("Failed to fetch recent activities", error);
    return [];
  }
}
