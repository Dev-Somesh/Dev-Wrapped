
import { GoogleGenAI, Type } from "@google/genai";
import { GitHubStats, AIInsights } from "../types";

export const generateAIWrapped = async (stats: GitHubStats): Promise<AIInsights> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this developer's GitHub activity for their "Year Wrapped" story.
    
    DATA:
    Username: ${stats.username}
    Total Commits: ${stats.totalCommits}
    Active Days: ${stats.activeDays}
    Top Languages: ${stats.topLanguages.map(l => l.name).join(', ')}
    Repos Contributed: ${stats.reposContributed}
    Longest Streak: ${stats.streak} days
    Most Active Month: ${stats.mostActiveMonth}
    Activity Pattern: ${stats.activityPattern}
    
    CRITICAL RULES:
    1. Archetype selection MUST be one of these exactly:
       - The Consistent Builder (Regular commits, low variance, reliable)
       - The Adventurous Sprinter (Intense bursts, many repos touched)
       - The Focused Specialist (Deep work in few repos, top language >70%)
       - The Polyglot Explorer (≥5 languages with meaningful commits)
       - The Quiet Optimizer (Few commits, high impact, maintains systems)
       - The Night Owl Coder (>50% commits between 9pm–3am)
       - The Early Bird Creator (>50% commits between 6am–11am)
       - The Momentum Chaser (Stronger finish in last 3 months)
       - The Experimental Tinkerer (Many small repos, short activity spans)
       - The Comeback Coder (Long 60-day gap followed by a strong streak)
       - The Framework Crafter (React/Vue/Next/Django dominance)
       - The Silent Maintainer (Oldest repo still active, steady ownership)

    2. Insights MUST feel inferred and observant. Never say "because the data shows".
    3. Use behavioral verbs: "tends to", "seems to", "thrives when", "often".
    4. Archetype Description: 1 sentence, human-centric, positive.
    5. Card Insight: Exactly ONE reflective sentence for the final share card.
    6. Insights array: 3 behavior-based observations.
    
    Tone: Editorial, cinematic, minimal.
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

    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("AI Error:", error);
    return {
      archetype: "The Consistent Builder",
      archetypeDescription: "You turn ideas into reality through steady, reliable effort across every season.",
      cardInsight: "Success is the sum of small efforts, repeated day in and day out.",
      insights: [
        "You seem to thrive on the quiet momentum of a daily routine.",
        "Your focus often settles on deepening mastery over chasing trends.",
        "You tend to be the anchor that keeps projects moving forward through consistency."
      ],
      patterns: [
        "Unwavering commitment to daily progress.",
        "High reliability across complex systems."
      ],
      narrative: "2025 was a masterclass in discipline. You didn't just write code; you built a practice, proving that the most meaningful progress often happens in the quiet moments between milestones. Your journey reflects the heart of a builder."
    };
  }
};
