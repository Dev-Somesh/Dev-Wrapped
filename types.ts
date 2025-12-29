
export interface GitHubRepo {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
}

export interface GitHubStats {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  totalCommits: number;
  activeDays: number;
  topLanguages: { name: string; count: number }[];
  allLanguages: { name: string; count: number }[]; // New: All languages used
  reposContributed: number;
  reposCreatedThisYear: number; // New field for repos created in 2024/2025
  recentRepos: GitHubRepo[];
  streak: number;
  mostActiveMonth: string;
  firstActivity: string;
  lastActivity: string;
  activityPattern: 'burst' | 'consistent' | 'sporadic';
  // New fields
  followers: number;
  following: number;
  totalStarsReceived: number;
  accountAge: number; // Years since account creation
  bio?: string;
  company?: string;
  location?: string;
}

export interface AIInsights {
  archetype: string;
  archetypeDescription: string;
  narrative: string;
  cardInsight: string; // One-line human-centric insight for the share card
  insights: string[];
  patterns: string[];
}

export enum Step {
  Entry = 0,
  Analysis = 1,
  Stats = 2,
  Patterns = 3,
  AIInsights = 4,
  Narrative = 5,
  Archetype = 6,
  Share = 7
}
