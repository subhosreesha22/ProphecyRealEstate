export interface HouseInput {
  location: string;
  sqFt: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  condition: number; // 1 (Poor) to 5 (Excellent)
  propertyType: 'Apartment' | 'Independent House' | 'Villa';
}

export interface DataPoint {
  sqFt: number;
  price: number;
}

export interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  predictedPrice: number;
  formula: string;
}

export interface AIAnalysis {
  estimatedPrice: number;
  priceRangeLow: number;
  priceRangeHigh: number;
  reasoning: string;
  marketTrend: 'Up' | 'Down' | 'Stable';
  locationQuality: string;
}

export interface FullPrediction {
  input: HouseInput;
  comparables: DataPoint[];
  regression: RegressionResult;
  aiAnalysis: AIAnalysis;
}