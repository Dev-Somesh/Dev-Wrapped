
import { GitHubStats, AIInsights } from "../types";

/**
 * Calls the Netlify serverless function to generate AI insights.
 * The API key is stored server-side and never exposed to the client.
 */
export const generateAIWrapped = async (stats: GitHubStats, modelName: string = "gemini-3-flash-preview"): Promise<AIInsights> => {
  try {
    // Call the serverless function that proxies Gemini API calls
    // The function uses GEMINI_API_KEY from Netlify environment variables
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stats,
        modelName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      const errorMessage = errorData.error || `HTTP ${response.status}`;
      
      // Map HTTP status codes to appropriate error messages
      if (response.status === 401 || errorMessage.includes('AUTH_INVALID')) {
        throw new Error('GEMINI_AUTH_INVALID: The API Key is unauthorized. Please check Netlify environment variables.');
      }
      if (response.status === 429 || errorMessage.includes('RATE_LIMIT')) {
        throw new Error('GEMINI_RATE_LIMIT: Model quota exceeded. Please wait a few seconds before retrying.');
      }
      if (response.status === 400 && errorMessage.includes('SAFETY')) {
        throw new Error('GEMINI_SAFETY_BLOCK: The intelligence core filtered this user\'s profile content for safety.');
      }
      if (response.status === 500 && errorMessage.includes('not configured')) {
        throw new Error('GEMINI_CONFIG_ERROR: GEMINI_API_KEY is not configured in Netlify environment variables.');
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.archetype || !data.narrative) {
      throw new Error('GEMINI_NULL_TRACE: The intelligence core returned an invalid response.');
    }
    
    return data as AIInsights;
  } catch (error: any) {
    // Re-throw if it's already a properly formatted error
    if (error.message && error.message.startsWith('GEMINI_')) {
      throw error;
    }
    
    // Handle network errors
    if (error.message && (error.message.includes('fetch') || error.message.includes('network'))) {
      throw new Error('NETWORK_ERROR: Failed to connect to the AI service. Please check your connection.');
    }
    
    throw new Error(`GEMINI_INTERNAL_ERROR: ${error.message || 'Session failed to initialize.'}`);
  }
};
