import { GoogleGenAI, Type } from "@google/genai";
import { HouseInput, DataPoint, AIAnalysis } from '../types';
import { HARDCODED_API_KEY } from '../constants';

// Helper to safely get API Key
const getApiKey = (manualOverride?: string): string => {
  // 1. Manual override (from UI input)
  if (manualOverride && manualOverride.length > 10) {
    return manualOverride;
  }

  // 2. Hardcoded Key (Highest Priority for your specific case)
  // We simply check if it exists and has length.
  if (HARDCODED_API_KEY && HARDCODED_API_KEY.length > 20) {
    return HARDCODED_API_KEY;
  }

  // 3. Local Storage (Fallback)
  try {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey && storedKey.length > 10) {
        return storedKey;
    }
  } catch (e) {
    // Ignore access errors
  }

  // 4. Environment Variables (Fallback)
  let key = "";
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      if (import.meta.env.VITE_API_KEY) key = import.meta.env.VITE_API_KEY;
      // @ts-ignore
      else if (import.meta.env.API_KEY) key = import.meta.env.API_KEY;
    }
    
    if (!key && typeof process !== 'undefined' && process.env) {
      if (process.env.VITE_API_KEY) key = process.env.VITE_API_KEY;
      else if (process.env.REACT_APP_API_KEY) key = process.env.REACT_APP_API_KEY;
      else if (process.env.API_KEY) key = process.env.API_KEY;
    }
  } catch (e) {
    console.error("Error reading environment variables", e);
  }
  return key;
};

export const fetchMarketDataAndAnalysis = async (input: HouseInput, manualApiKey?: string): Promise<{ comparables: DataPoint[], aiAnalysis: AIAnalysis }> => {
  
  // Retrieve the API Key
  let apiKey = getApiKey(manualApiKey);

  // SANITIZATION
  if (apiKey) {
    apiKey = apiKey.trim();
    // Remove quotes if accidentally included
    if ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'"))) {
      apiKey = apiKey.substring(1, apiKey.length - 1);
    }
  }

  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Initialize Gemini Client
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a real estate data scientist. 
    1. Generate a realistic dataset of 25 "comparable sales" (SqFt vs Price) for a house in ${input.location} that is similar in nature to a ${input.yearBuilt} home with ${input.bedrooms} beds and ${input.bathrooms} baths. 
       The target house is ${input.sqFt} sqft. The dataset should be scattered reasonably to form a linear trend suitable for linear regression analysis.
    2. Provide an expert analysis and price estimate considering non-linear factors (location specific nuances, market heat, condition implied by year built).
    
    IMPORTANT: All prices must be in Indian Rupees (INR). Ensure the price values are realistic for the Indian market.

    Return strict JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            comparables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sqFt: { type: Type.NUMBER },
                  price: { type: Type.NUMBER }
                }
              }
            },
            aiAnalysis: {
              type: Type.OBJECT,
              properties: {
                estimatedPrice: { type: Type.NUMBER, description: "The AI's final expert price prediction in INR" },
                priceRangeLow: { type: Type.NUMBER },
                priceRangeHigh: { type: Type.NUMBER },
                reasoning: { type: Type.STRING, description: "A short paragraph explaining the valuation." },
                marketTrend: { type: Type.STRING, enum: ["Up", "Down", "Stable"] },
                locationQuality: { type: Type.STRING, description: "Short descriptor of the area (e.g. 'High Demand Urban')" }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from Gemini");

    return JSON.parse(text) as { comparables: DataPoint[], aiAnalysis: AIAnalysis };
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    if (error.message?.includes("API key not valid") || error.toString().includes("400")) {
      const maskedKey = apiKey.length > 4 ? apiKey.substring(0, 4) + "..." : "short-key";
      throw new Error(`Google rejected the API Key (Key used starts with: '${maskedKey}'). Please verify the key is correct.`);
    }
    
    throw error;
  }
};