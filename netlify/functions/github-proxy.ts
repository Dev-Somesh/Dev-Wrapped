import { Handler } from '@netlify/functions';

/**
 * Netlify Free Tier: 10s function timeout
 * We set 7s timeout per GitHub API call to leave buffer for:
 * - Cold start (0-2s)
 * - Network overhead
 * - Response processing
 */
const GITHUB_API_TIMEOUT_MS = 7000;

/**
 * Creates an AbortController with timeout for fetch requests
 * Note: Timeout is automatically cleared when fetch completes or errors
 */
function createTimeoutController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller;
}

export const handler: Handler = async (event, context) => {
  // Set function timeout warning (Netlify Free: 10s max)
  // We return early if we're close to timeout
  const startTime = Date.now();
  const FUNCTION_TIMEOUT_BUFFER_MS = 500; // Return 500ms before Netlify timeout

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

    // Check if we're running out of function time
    const elapsed = Date.now() - startTime;
    if (elapsed > 9500) {
      return {
        statusCode: 504,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          error: 'GITHUB_FUNCTION_TIMEOUT: Function execution time exceeded. Please retry.' 
        }),
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
      console.log('GitHub proxy: Using token authentication for', endpoint);
    } else {
      console.log('GitHub proxy: Using unauthenticated request for', endpoint);
    }

    // Create timeout controller
    const controller = createTimeoutController(GITHUB_API_TIMEOUT_MS);

    // Make the request to GitHub API with timeout
    let response: Response;
    try {
      response = await fetch(url, { 
        headers,
        signal: controller.signal,
      });
    } catch (fetchError: any) {
      // Handle timeout specifically
      if (fetchError.name === 'AbortError' || fetchError.message?.includes('aborted')) {
        return {
          statusCode: 504,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            error: 'GITHUB_API_TIMEOUT: GitHub API request timed out after 7s. The API may be slow or rate-limited.' 
          }),
        };
      }
      // Re-throw other network errors
      throw fetchError;
    }

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
        errorMessage = 'GITHUB_SERVER_ERROR: GitHub API returned a server error. Please try again in a moment.';
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
    // Distinguish timeout from other errors
    if (error.name === 'AbortError' || error.message?.includes('timeout') || error.message?.includes('aborted')) {
      return {
        statusCode: 504,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          error: 'GITHUB_API_TIMEOUT: Request to GitHub API timed out. Please retry.' 
        }),
      };
    }

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
