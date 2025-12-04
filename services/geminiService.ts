import { GoogleGenAI } from "@google/genai";
import { LanguageCode } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateHeightComparisonFact = async (
  diffCm: number, 
  nameA: string, 
  heightA: number, 
  nameB: string, 
  heightB: number,
  language: LanguageCode
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI service unavailable (Check API Key).";

  const prompt = `
    Two people are being compared by height.
    ${nameA}: ${heightA}cm.
    ${nameB}: ${heightB}cm.
    The height difference is ${Math.abs(diffCm).toFixed(1)} cm.
    
    Provide a SINGLE, short, fun, and witty sentence comparing this specific height difference to a real-world object or scenario. 
    Examples:
    - "That's roughly the height of a standard bowling pin!"
    - "The difference is about the same as a stack of 5 donuts."
    
    IMPORTANT:
    Output language: ${language}.
    If the language is Arabic (ar), Persian (fa), or Kurdish (ku), ensure the text flows naturally in that language and uses appropriate cultural references if possible.
    
    Keep it lighthearted and under 25 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim() || "That's a noticeable difference!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate a comparison fact at the moment.";
  }
};