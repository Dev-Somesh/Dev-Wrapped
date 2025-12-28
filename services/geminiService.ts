
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
    
    TASKS:
    1. Assign ONE "Developer Archetype" from this behavior-based taxonomy:
       - The Consistent Builder (Reliable, regular commits)
       - The Adventurous Sprinter (Intense bursts, many repos)
       - The Focused Specialist (Deep work in few repos, high language concentration)
       - The Polyglot Explorer (Experimental, many languages)
       - The Quiet Optimizer (Low volume, high impact, maintains systems)
       - The Night Owl Coder (Late-hour peak activity)
       - The Early Bird Creator (Morning peak activity)
       - The Momentum Chaser (Finishes year stronger than it started)
       - The Experimental Tinkerer (Many small, short-lived repos)
       - The Comeback Coder (Strong return after a gap)
       - The Framework Crafter (Framework dominance like React/Next)
       - The Silent Maintainer (Long-term ownership, fewer but critical updates)

    2. Write a 1-sentence description for the archetype (human-centric, encouraging).
    3. Generate 3 short "Growth Insights" (e.g. "You seem to do your best work when momentum takes over.").
    4. Detect 2 "Activity Patterns" (behavioral observations).
    5. Write a personal 3-sentence narrative summary of their year.
    6. Write a "Card Insight": Exactly ONE reflective sentence for the share card.
    
    Tone: Reflective, editorial, cinematic, minimal. Avoid technical jargon.
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
      archetypeDescription: "You turn ideas into reality through steady, reliable effort.",
      cardInsight: "This year was about the quiet power of showing up.",
      insights: [
        "Your consistency is your greatest superpower.",
        "Focusing on " + stats.topLanguages[0]?.name + " shows real mastery.",
        "The momentum you built in " + stats.mostActiveMonth + " set a new standard."
      ],
      patterns: [
        "You thrive in steady, daily progression.",
        "Your work reflects deep ownership over breadth."
      ],
      narrative: "2025 was a masterclass in discipline. You didn't just write code; you built a practice, proving that the most meaningful progress often happens in the quiet moments between milestones."
    };
  }
};
