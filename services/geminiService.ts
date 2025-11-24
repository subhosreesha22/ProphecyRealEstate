
import { GoogleGenAI, Type } from "@google/genai";
import { HouseInput, DataPoint, AIAnalysis } from '../types';
import { HARDCODED_API_KEY } from '../constants';

// Helper to safely get API Key
const getApiKey = (manualOverride?: string): string => {
  // 1. Manual override (from UI input) - If user explicitly typed one in error box
  if (manualOverride && manualOverride.length > 10) {
    return manualOverride;
  }

  // 2. Hardcoded Key (ABSOLUTE PRIORITY)
  // This bypasses all environment variable complexity
  if (HARDCODED_API_KEY && HARDCODED_API_KEY.length > 10) {
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

  return "";
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
    throw new Error("API Key is missing. Please check constants.ts");
  }

  // Initialize Gemini Client
  const ai = new GoogleGenAI({ apiKey });
  
  // Create readable labels for the prompt
  const conditionLabels: {[key: number]: string} = {
    1: "Poor (Fixer Upper)",
    2: "Fair (Needs work)",
    3: "Average (Standard)",
    4: "Good (Well maintained)",
    5: "Excellent (Renovated/Luxury)"
  };
  const conditionText = conditionLabels[input.condition] || "Average";

  const prompt = `
    You are a real estate data scientist. 
    1. Generate a realistic dataset of 25 "comparable sales" (SqFt vs Price) for a ${input.propertyType} in ${input.location}.
       The target property is a ${input.yearBuilt} built ${input.propertyType} with ${input.bedrooms} beds and ${input.bathrooms} baths.
       The target property condition is rated: ${input.condition}/5 (${conditionText}).
       The target size is ${input.sqFt} sqft. 
       
       IMPORTANT: The generated comparables should reflect the property type ("${input.propertyType}") and condition. 
       For example, a "Villa" is generally more expensive per sqft than an "Apartment", and a condition rating of 5/5 should command a premium price compared to the average.
       The dataset should be scattered reasonably to form a linear trend suitable for linear regression analysis.

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
      // Show masked key for debugging, but prevent crash if key is too short
      const safeKey = apiKey || "";
      const maskedKey = safeKey.length > 4 ? safeKey.substring(0, 4) + "..." : "invalid-key";
      throw new Error(`Google rejected the API Key (Key used starts with: '${maskedKey}'). Please verify the key is correct.`);
    }
    
    throw error;
  }
};