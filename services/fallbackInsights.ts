
import { GitHubStats, AIInsights } from '../types';

/**
 * Rule-based stand-in for Gemini insights, used when the AI service is
 * unavailable. Mirrors the archetype selection logic described in
 * netlify/functions/gemini-proxy.ts so the result still feels earned, and
 * fills every AIInsights field from real GitHub numbers so ShareCard and
 * DevelopmentDossier render unchanged.
 */

interface ArchetypeRule {
  name: string;
  description: string;
  matches: (s: GitHubStats, languageCount: number) => boolean;
  reason: (s: GitHubStats, languageCount: number) => string;
}

const ARCHETYPE_RULES: ArchetypeRule[] = [
  {
    name: 'The Architect',
    description: 'Builds across a wide surface area with steady, deliberate momentum.',
    matches: (s) => s.reposContributed >= 15 && s.activityPattern === 'consistent',
    reason: (s) => `Contributed to ${s.reposContributed} repositories with a consistent activity pattern`,
  },
  {
    name: 'The Explorer',
    description: 'Moves between languages and projects, driven by curiosity.',
    matches: (_s, languageCount) => languageCount >= 4,
    reason: (s, languageCount) => `Worked in ${languageCount} languages across ${s.reposContributed} repositories`,
  },
  {
    name: 'The Maintainer',
    description: 'Shows up day after day, keeping projects healthy and moving.',
    matches: (s) => s.streak >= 30 || (s.longestStreak ?? 0) >= 30,
    reason: (s) => `Sustained a ${Math.max(s.streak, s.longestStreak ?? 0)}-day contribution streak`,
  },
  {
    name: 'The Innovator',
    description: 'Starts new things in focused bursts of creative energy.',
    matches: (s) => s.reposCreatedThisYear >= 5 && s.activityPattern === 'burst',
    reason: (s) => `Created ${s.reposCreatedThisYear} new repositories in burst-style sessions`,
  },
  {
    name: 'The Builder',
    description: 'High-volume shipping across multiple active projects.',
    matches: (s) => s.totalCommits >= 500 && s.reposContributed >= 5,
    reason: (s) => `Shipped ${s.totalCommits} commits across ${s.reposContributed} repositories`,
  },
  {
    name: 'The Specialist',
    description: 'Deep, focused expertise in a deliberately narrow stack.',
    matches: (s, languageCount) => languageCount <= 2 && s.totalCommits > 0,
    reason: (s) => `Concentrated work in ${s.topLanguages[0]?.name || 'a focused stack'}`,
  },
];

const DEFAULT_ARCHETYPE: ArchetypeRule = {
  name: 'The Craftsperson',
  description: 'Values quality and rhythm over raw volume.',
  matches: () => true,
  reason: (s) => `${s.activeDays} active days with a ${s.activityPattern} working rhythm`,
};

export const generateFallbackInsights = (stats: GitHubStats): AIInsights => {
  const year = stats.analysisYear ?? new Date().getFullYear();
  const topLanguage = stats.topLanguages[0]?.name || 'code';
  const languageCount = Math.max(stats.allLanguages?.length ?? 0, stats.topLanguages.length);
  const bestStreak = Math.max(stats.streak, stats.longestStreak ?? 0);

  const archetype =
    ARCHETYPE_RULES.find((rule) => rule.matches(stats, languageCount)) ?? DEFAULT_ARCHETYPE;

  const patternLabel =
    stats.activityPattern === 'consistent'
      ? 'a steady, consistent rhythm'
      : stats.activityPattern === 'burst'
        ? 'focused bursts of activity'
        : 'flexible, sporadic sessions';

  return {
    source: 'local',
    archetype: archetype.name,
    archetypeDescription: archetype.description,
    archetypeExplanation: {
      reasoning: [
        archetype.reason(stats, languageCount),
        `${stats.totalCommits} commits across ${stats.activeDays} active days in ${year}`,
        `${topLanguage} led the stack, with ${stats.mostActiveMonth} as the most active month`,
      ],
      keyFactors: [
        { factor: 'Commit volume', evidence: `${stats.totalCommits} commits in ${year}` },
        { factor: 'Consistency', evidence: `${stats.activeDays} active days, best streak of ${bestStreak} days` },
        { factor: 'Project breadth', evidence: `${stats.reposContributed} repositories, ${languageCount} languages` },
      ],
      confidence: 0.6,
    },
    narrative: `In ${year}, @${stats.username} shipped ${stats.totalCommits} commits across ${stats.reposContributed} repositories, showing up on ${stats.activeDays} days with ${patternLabel}. ${topLanguage} anchored the work, and ${stats.mostActiveMonth} stood out as the busiest month of the year.\n\nThe numbers point to ${archetype.name.toLowerCase().replace('the ', 'the profile of a ')}: ${archetype.description.toLowerCase()} A best streak of ${bestStreak} days and ${stats.reposCreatedThisYear} new repositories round out a year of real, measurable momentum.`,
    cardInsight: `${stats.totalCommits} commits, ${stats.activeDays} active days — the data tells the story.`,
    insights: [
      `Most active in ${stats.mostActiveMonth}, with activity following ${patternLabel}.`,
      `${topLanguage} was the primary language${languageCount > 1 ? ` among ${languageCount} used this year` : ''}.`,
      `Maintained a best streak of ${bestStreak} consecutive days of contributions.`,
    ],
    patterns: [
      `Activity pattern classified as "${stats.activityPattern}" across ${stats.activeDays} active days.`,
      `Contributions spread over ${stats.reposContributed} repositories, ${stats.reposCreatedThisYear} of them created in ${year}.`,
      `Community footprint: ${stats.followers} followers and ${stats.totalStarsReceived} stars received.`,
    ],
    forwardLooking: {
      recommendations: [
        bestStreak >= 14
          ? `Protect the streak habit — ${bestStreak} days shows the routine works.`
          : 'Try a short daily-contribution streak to build a steadier rhythm.',
        languageCount >= 4
          ? `Consider going deeper in ${topLanguage} to convert breadth into expertise.`
          : `Experiment with a language outside ${topLanguage} to stretch the toolkit.`,
        'Document or showcase the most-starred work — visibility compounds.',
      ],
      risks: [
        stats.activityPattern === 'burst'
          ? 'Burst-heavy work can stall between sprints; watch for long gaps.'
          : 'Routine without variety can plateau skills over time.',
        `Activity concentrated in ${stats.mostActiveMonth} suggests uneven pacing across the year.`,
      ],
      opportunities: [
        `${stats.reposCreatedThisYear > 0 ? `The ${stats.reposCreatedThisYear} new ${year} repositories` : 'Existing projects'} could attract contributors with better READMEs and issues.`,
        'Open source contributions to high-traffic projects would grow the community footprint.',
      ],
    },
    executiveSummary: `${year} in review for @${stats.username}: ${stats.totalCommits} commits over ${stats.activeDays} active days across ${stats.reposContributed} repositories, led by ${topLanguage}. The data profiles ${archetype.name} — ${archetype.description.toLowerCase()}`,
  };
};
