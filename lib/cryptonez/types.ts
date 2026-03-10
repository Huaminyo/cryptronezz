export type LeaderboardEntry = {
  userId: number;
  name: string;
  points: number;
};

export type LeaderboardResponse = {
  topUsers: LeaderboardEntry[];
  topReferrers: Array<{ userId: number; name: string; referrals: number }>;
};

export const supportedTaskTypes = [
  "follow_twitter",
  "join_discord",
  "visit_link",
  "daily_login",
  "connect_wallet"
] as const;
