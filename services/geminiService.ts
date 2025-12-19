
import { GoogleGenAI, Type } from "@google/genai";
import { EmailAnalysis, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeEmail = async (emailText: string): Promise<EmailAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following email for security risks, tone, intent, and key details: \n\n${emailText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: {
            type: Type.STRING,
            description: "The calculated security risk level (LOW, MEDIUM, HIGH, CRITICAL)",
          },
          isSpam: {
            type: Type.BOOLEAN,
            description: "Whether the email is likely spam or a phishing attempt",
          },
          confidenceScore: {
            type: Type.NUMBER,
            description: "AI confidence score from 0 to 100",
          },
          summary: {
            type: Type.STRING,
            description: "A concise 2-sentence summary of the email",
          },
          senderIntent: {
            type: Type.STRING,
            description: "What the sender is trying to achieve",
          },
          tone: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of emotions or tones detected (e.g., Professional, Urgent, Aggressive)",
          },
          actionItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific tasks or requests mentioned in the email",
          },
          phishingIndicators: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Red flags that suggest phishing (e.g., mismatched links, weird sender domain)",
          },
          keyInformation: {
            type: Type.OBJECT,
            properties: {
              sender: { type: Type.STRING },
              organization: { type: Type.STRING },
              urgency: { type: Type.STRING },
            },
            required: ["sender", "organization", "urgency"]
          }
        },
        required: [
          "riskLevel", 
          "isSpam", 
          "confidenceScore", 
          "summary", 
          "senderIntent", 
          "tone", 
          "actionItems", 
          "phishingIndicators",
          "keyInformation"
        ],
      },
    },
  });

  try {
    const analysis = JSON.parse(response.text);
    return analysis as EmailAnalysis;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to interpret the analysis results.");
  }
};
