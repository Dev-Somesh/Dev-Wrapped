import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { username, token, endpoint } = JSON.parse(event.body || '{}');

    if (!username || !endpoint) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing username or endpoint' }),
      };
    }

    // Build the GitHub API URL
    const baseUrl = 'https://api.github.com';
    let url = `${baseUrl}${endpoint}`;
    
    // Replace username placeholder if present
    url = url.replace('{username}', username);

    // Prepare headers
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DevWrapped-2025',
    };

    // Add authorization if token is provided
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Make the request to GitHub API
    const response = await fetch(url, { headers });

    if (!response.ok) {
      let errorMessage = `GitHub API error: ${response.status}`;
      
      if (response.status === 401) {
        errorMessage = 'GITHUB_AUTH_INVALID: The provided Personal Access Token is unauthorized or has expired.';
      } else if (response.status === 403) {
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        if (rateLimitRemaining === '0') {
          errorMessage = 'GITHUB_RATE_LIMIT: API quota exceeded. Please use a Personal Access Token to increase your limits.';
        } else {
          errorMessage = 'GITHUB_FORBIDDEN: Access denied. This may be due to repository privacy restrictions.';
        }
      } else if (response.status === 404) {
        errorMessage = `GITHUB_USER_NOT_FOUND: The user profile "${username}" does not exist.`;
      } else if (response.status >= 500) {
        errorMessage = 'GITHUB_SERVER_OFFLINE: GitHub services are currently experiencing high latency or downtime.';
      }

      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: errorMessage }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: `GITHUB_CORE_ERROR: ${error.message || 'Unknown error'}` }),
    };
  }
};

