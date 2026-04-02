import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getAI = () => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
};

export async function moderateResearch(query: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: `You are a helpful AI Research Moderator for 10-11 year old students (PYP5). 
      Your goal is to help them conduct educational research safely and ethically.
      1. If the student's query is inappropriate, explain why gently and suggest a safer way to ask.
      2. If the query is good, provide a structured summary of the topic.
      3. Always include a "Research Tip" about how to verify information or use AI responsibly.
      4. Use simple, encouraging language.`,
    },
  });
  return response.text;
}

export async function filterGamingWords(text: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Filter this gaming chat text: "${text}"`,
    config: {
      systemInstruction: `You are a Gaming Chat Filter. 
      Your job is to identify inappropriate words, insults, or toxic language in gaming chat.
      Replace any bad words with fun, positive, or silly alternatives (e.g., replace a swear word with "marshmallow" or "glitter").
      Return ONLY the filtered text. If the text is already clean, return it as is.`,
    },
  });
  return response.text;
}

export async function analyzeScam(content: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this for scams: "${content}"`,
    config: {
      systemInstruction: `You are a Scam Detection Expert for kids.
      Analyze the provided text (which could be a message, an ad, or a deal description) for signs of scams, phishing, or dangerous links.
      Provide a response in JSON format with the following structure:
      {
        "isScam": boolean,
        "riskLevel": "Low" | "Medium" | "High",
        "reason": "Explanation of why it might be a scam",
        "advice": "What the student should do next"
      }`,
      responseMimeType: "application/json",
    },
  });
  
  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      isScam: false,
      riskLevel: "Low",
      reason: "Could not analyze clearly.",
      advice: "Always be careful with unknown links!"
    };
  }
}
