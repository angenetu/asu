import { GoogleGenAI } from "@google/genai";

// Initialize the client
// API Key must be provided in the environment environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHRAssistance = async (prompt: string, context: string = ''): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const systemInstruction = `You are an expert HR Assistant for Assosa University. 
    You help with drafting job descriptions, analyzing employee performance trends, explaining standard HR policies, and generating professional emails.
    Keep responses professional, concise, and helpful.
    
    Current System Context:
    ${context}`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the HR Assistant. Please check your API key.";
  }
};
