
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// API key is retrieved directly from process.env.API_KEY in the constructor

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initializing the AI client using the mandated process.env.API_KEY directly
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async askAssistant(query: string): Promise<string> {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are MDRO LTC Assistant, an expert medical infection control specialist. 
        Provide clear, concise, and evidence-based answers regarding MDRO (Multi-Drug Resistant Organisms), 
        hand hygiene (WHO standards), PPE protocols, and hospital cleaning procedures. 
        Always prioritize patient safety and standard clinical protocols. If unsure, suggest consulting hospital policy.`,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  }

  async generateQuiz(topic: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 multiple choice questions for a quiz about ${topic} in a healthcare setting.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              correctAnswer: { type: Type.INTEGER, description: 'index of correct option (0-3)' },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    
    return JSON.parse(response.text || "[]");
  }
}

export const gemini = new GeminiService();
