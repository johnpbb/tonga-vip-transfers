import { GoogleGenAI } from "@google/genai";

// Safely access process.env.API_KEY without crashing if process is undefined
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

const apiKey = getApiKey() || '';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey });

export const getConciergeResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm sorry, my connection to the AI service is currently unavailable. Please contact our support team directly.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI Concierge for Tonga VIP Transfers. 
        Your goal is to assist potential customers visiting Tonga.
        
        Key Information:
        - Service: Premium airport transfers, private chauffeurs, island tours.
        - Location: Tonga (primarily Tongatapu).
        - Key Destinations: Fua'amotu International Airport (TBU), Nuku'alofa (Capital), Ha'atafu Beach, Ancient Tonga.
        - Tone: Professional, warm, welcoming, polynesion hospitality ("Malo e lelei" is the greeting).
        - Pricing: Do not give specific prices, ask them to use the booking form for a quote.
        - Travel Times: Give estimates (e.g., Airport to Town is approx 30-40 mins).
        
        Keep answers concise (under 100 words) and encourage booking via the form.`,
      },
    });

    return response.text || "I apologize, I couldn't process that request. How else can I help you?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting. Please try again later or call our support line.";
  }
};