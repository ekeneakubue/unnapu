export type OverviewStats = {
  users: number;
  publications: number;
  assessedPublications: number;
};

export type RecentActivity = {
  id: string;
  action: string;
  detail: string;
  when: string;
};
