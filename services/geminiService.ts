import { GoogleGenAI, Type } from "@google/genai";
import { GitHubStats, AIInsights } from "../types";

export const generateAIWrapped = async (stats: GitHubStats): Promise<AIInsights> => {
  // Always create a new instance inside the call to ensure we use the latest key
  // provided via environment or window.aistudio dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this developer's 2024-2025 GitHub activity. Create a compelling "Year Wrapped" narrative.
    
    TELEMETRY DATA:
    - Username: ${stats.username}
    - Total Commits: ${stats.totalCommits}
    - Active Days: ${stats.activeDays}
    - Primary Languages: ${stats.topLanguages.map(l => l.name).join(', ')}
    - Repo Impact: ${stats.reposContributed}
    - Max Streak: ${stats.streak} days
    - Peak Activity: ${stats.mostActiveMonth}
    
    STORYTELLING REQUIREMENTS:
    1. Select a unique Archetype that feels cinematic (e.g., The Midnight Architect, The Silent Optimizer, The Polyglot Voyager).
    2. Write a 1-sentence poetic "classification" for the archetype.
    3. Generate a cinematic 3-paragraph story of their year. Focus on the 'vibe' of their work.
    4. Provide 3 specific behavioral "observations" (e.g., "Thrives when focusing on deep logic in C++").
    5. Provide 2 coding patterns noticed.
    6. Provide 1 short "card insight" (max 10 words) for their social media share card.
    
    TONE: Sophisticated, reflective, high-end editorial.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.STRING },
            archetypeDescription: { type: Type.STRING },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            patterns: { type: Type.ARRAY, items: { type: Type.STRING } },
            narrative: { type: Type.STRING },
            cardInsight: { type: Type.STRING }
          },
          required: ["archetype", "archetypeDescription", "insights", "patterns", "narrative", "cardInsight"]
        }
      }
    });

    if (!response.text) throw new Error("AI returned empty response");
    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("AI Generation Failed:", error);
    throw new Error(error.message || "Failed to generate AI insights. Check your API key.");
  }
};