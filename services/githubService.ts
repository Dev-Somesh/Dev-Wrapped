import { GitHubStats, GitHubRepo } from '../types';

/**
 * Client-side timeout: 25s total (allows for 4 parallel calls + processing)
 * Netlify function timeout: 10s per call
 */
const CLIENT_TIMEOUT_MS = 25000;

/**
 * Calls the Netlify serverless function to proxy GitHub API calls.
 * This avoids CORS issues and keeps tokens server-side.
 * Includes timeout handling for production reliability.
 */
const fetchViaProxy = async (endpoint: string, username: string, token?: string, timeoutMs: number = 8000): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      throw new Error('GITHUB_API_TIMEOUT: Request timed out. GitHub API may be slow. Please retry.');
    }
    
    throw error;
  }
};

export const fetchGitHubData = async (username: string, token?: string): Promise<GitHubStats> => {
  const startTime = Date.now();

  try {
    // OPTIMIZATION: Parallelize independent calls
    // These 3 calls don't depend on each other and can run simultaneously
    const [userData, reposData, eventsData] = await Promise.allSettled([
      fetchViaProxy(`/users/${username}`, username, token, 5000),
      // Include private repos when token is provided using type=all parameter
      fetchViaProxy(`/users/${username}/repos?sort=updated&per_page=100${token ? '&type=all' : ''}`, username, token, 8000),
      // Reduced from 100 to 30 events - sufficient for activity pattern analysis
      fetchViaProxy(`/users/${username}/events?per_page=30`, username, token, 8000),
    ]);

    // Check if we're running out of time
    if (Date.now() - startTime > CLIENT_TIMEOUT_MS - 2000) {
      throw new Error('GITHUB_FETCH_TIMEOUT: Data fetching exceeded time limit. Please retry.');
    }

    // Handle user data
    if (userData.status === 'rejected') {
      throw new Error(userData.reason?.message || 'Failed to fetch user data');
    }
    const user = userData.value;

    // Handle repos data
    if (reposData.status === 'rejected') {
      throw new Error(reposData.reason?.message || 'Failed to fetch repositories');
    }
    const repos = reposData.value;

    // Handle events data (optional - can continue with empty array)
    const events = eventsData.status === 'fulfilled' ? eventsData.value : [];

    // Process repos data (can happen while commit search runs)
    const langMap: Record<string, number> = {};
    const recentRepos: GitHubRepo[] = repos.slice(0, 5).map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || 'No description provided.',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count
    }));

    // Count repos created in 2024/2025
    const currentYear = new Date().getFullYear();
    const reposCreatedThisYear = repos.filter((repo: any) => {
      if (!repo.created_at) return false;
      const createdYear = new Date(repo.created_at).getFullYear();
      return createdYear === currentYear || createdYear === 2024; // Include both 2024 and current year
    }).length;

    // Calculate total stars received across all repos
    const totalStarsReceived = repos.reduce((total: number, repo: any) => {
      return total + (repo.stargazers_count || 0);
    }, 0);

    // Calculate account age in years
    const accountCreatedDate = new Date(user.created_at);
    const currentDate = new Date();
    const accountAge = Math.max(1, Math.floor((currentDate.getTime() - accountCreatedDate.getTime()) / (1000 * 60 * 60 * 24 * 365)));

    repos.forEach((repo: any) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(langMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Keep all languages for tech stack cloud
    const allLanguages = Object.entries(langMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Process events data
    const activeDaysSet = new Set<string>();
    const dates: string[] = [];
    
    events.forEach((e: any) => {
      const date = e.created_at.split('T')[0];
      activeDaysSet.add(date);
      dates.push(date);
    });

    // Calculate streak
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

    const activityPattern = activeDaysSet.size > 15 ? 'consistent' : activeDaysSet.size > 5 ? 'burst' : 'sporadic';
    const monthCounts: Record<string, number> = {};
    events.forEach((e: any) => {
      const m = new Date(e.created_at).toLocaleString('en-US', { month: 'long' });
      monthCounts[m] = (monthCounts[m] || 0) + 1;
    });
    const mostActiveMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'October';

    // OPTIMIZATION: Commit search is slow - run it last and make it optional
    // Use a shorter timeout since we already have most data
    let totalCommits = 0;
    try {
      // When token is provided, GitHub search API automatically includes private repos
      // that the token has access to in the search results
      const commitSearchResult = await Promise.race([
        fetchViaProxy(
          `/search/commits?q=author:${username}+committer-date:>=2024-01-01&per_page=1`,
          username,
          token,
          5000 // Shorter timeout - this is the slowest endpoint
        ),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Commit search timeout')), 5000)
        ),
      ]) as any;
      
      totalCommits = commitSearchResult?.total_count || 0;
    } catch (commitError) {
      // Commit search failed - estimate from repos and events
      // This is acceptable degradation - we can still show stats
      console.warn('Commit search timed out, using estimate:', commitError);
      totalCommits = Math.max(events.length * 2, repos.length * 5);
    }

    const estimatedActiveDays = Math.max(
      activeDaysSet.size, 
      Math.min(totalCommits, Math.floor(totalCommits / 2.5))
    );

    return {
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      totalCommits,
      activeDays: estimatedActiveDays,
      topLanguages: topLanguages.length > 0 ? topLanguages : [{ name: 'Unknown', count: 0 }],
      allLanguages: allLanguages.length > 0 ? allLanguages : [{ name: 'Unknown', count: 0 }],
      reposContributed: user.public_repos + (user.total_private_repos || 0),
      reposCreatedThisYear,
      recentRepos,
      streak: currentStreak,
      mostActiveMonth,
      firstActivity: '2024-01-01',
      lastActivity: dates[0] || new Date().toISOString().split('T')[0],
      activityPattern,
      // New fields
      followers: user.followers || 0,
      following: user.following || 0,
      totalStarsReceived,
      accountAge,
      bio: user.bio || undefined,
      company: user.company || undefined,
      location: user.location || undefined,
    };
  } catch (error: any) {
    console.error("GitHub Telemetry Fault:", error);
    throw error;
  }
};
