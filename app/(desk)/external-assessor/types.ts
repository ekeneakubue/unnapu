import type { PortalPublication } from "../super-admin/publications/types";

export type AssessmentStatus = "Pending" | "Completed";

export type AssessorPublication = PortalPublication & {
  assignmentId: string;
  status: AssessmentStatus;
  comment: string | null;
  sharedAt: string;
  completedAt: string | null;
};

export type AssessorOverviewStats = {
  shared: number;
  pending: number;
  completed: number;
};
