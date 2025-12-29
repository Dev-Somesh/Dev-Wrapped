
import { GitHubStats, GitHubRepo } from '../types';

/**
 * Calls the Netlify serverless function to proxy GitHub API calls.
 * This avoids CORS issues and keeps tokens server-side.
 */
const fetchViaProxy = async (endpoint: string, username: string, token?: string) => {
  const response = await fetch('/.netlify/functions/github-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      token,
      endpoint,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
};

export const fetchGitHubData = async (username: string, token?: string): Promise<GitHubStats> => {
  const fetchWithAuth = async (endpoint: string) => {
    try {
      return await fetchViaProxy(endpoint, username, token);
    } catch (error: any) {
      // Re-throw with proper error message
      throw error;
    }
  };

  try {
    const userData = await fetchWithAuth(`/users/${username}`);
    
    const commitSearch = await fetchWithAuth(
      `/search/commits?q=author:${username}+committer-date:>=2024-01-01&per_page=1`
    );
    const totalCommits = commitSearch.total_count || 0;

    const reposData = await fetchWithAuth(`/users/${username}/repos?sort=updated&per_page=100`);
    
    const langMap: Record<string, number> = {};
    const recentRepos: GitHubRepo[] = reposData.slice(0, 5).map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || 'No description provided.',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count
    }));

    reposData.forEach((repo: any) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const events = await fetchWithAuth(`/users/${username}/events?per_page=100`);

    const activeDaysSet = new Set<string>();
    const dates: string[] = [];
    
    events.forEach((e: any) => {
      const date = e.created_at.split('T')[0];
      activeDaysSet.add(date);
      dates.push(date);
    });

    let currentStreak = 0;
    if (dates.length > 0) {
      const sortedDates = Array.from(activeDaysSet).sort().reverse();
      let lastDate = new Date(sortedDates[0]);
      currentStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i]);
        const diff = (lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
        if (diff <= 1.1) {
          currentStreak++;
          lastDate = currentDate;
        } else { break; }
      }
    }

    const activityPattern = activeDaysSet.size > 15 ? 'consistent' : 'burst';
    const monthCounts: Record<string, number> = {};
    events.forEach((e: any) => {
      const m = new Date(e.created_at).toLocaleString('en-US', { month: 'long' });
      monthCounts[m] = (monthCounts[m] || 0) + 1;
    });
    const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'October';

    const estimatedActiveDays = Math.max(activeDaysSet.size, Math.min(totalCommits, Math.floor(totalCommits / 2.5)));

    return {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
      totalCommits,
      activeDays: estimatedActiveDays,
      topLanguages: topLanguages.length > 0 ? topLanguages : [{ name: 'Unknown', count: 0 }],
      reposContributed: userData.public_repos + (userData.total_private_repos || 0),
      recentRepos,
      streak: currentStreak,
      mostActiveMonth,
      firstActivity: '2024-01-01',
      lastActivity: dates[0] || new Date().toISOString().split('T')[0],
      activityPattern
    };
  } catch (error: any) {
    console.error("GitHub Telemetry Fault:", error);
    throw error;
  }
};
