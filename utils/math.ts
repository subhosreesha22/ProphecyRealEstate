import { DataPoint, RegressionResult } from '../types';

export const calculateLinearRegression = (data: DataPoint[], targetSqFt: number): RegressionResult => {
  const n = data.length;
  if (n === 0) {
    return { slope: 0, intercept: 0, rSquared: 0, predictedPrice: 0, formula: 'N/A' };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;

  for (let i = 0; i < n; i++) {
    const x = data[i].sqFt;
    const y = data[i].price;
    sumX += x;
    sumY += y;
    sumXY += (x * y);
    sumXX += (x * x);
    sumYY += (y * y);
  }

  // Calculate slope (m) and intercept (b)
  // Formula: m = (n*sumXY - sumX*sumY) / (n*sumXX - sumX*sumX)
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  
  // Formula: b = (sumY - m*sumX) / n
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R-Squared
  // SS_tot = sum((y - y_mean)^2)
  // SS_res = sum((y - (mx + b))^2)
  // R^2 = 1 - (SS_res / SS_tot)
  const meanY = sumY / n;
  let ssTot = 0;
  let ssRes = 0;

  for (let i = 0; i < n; i++) {
    const x = data[i].sqFt;
    const y = data[i].price;
    const yPred = slope * x + intercept;
    ssTot += Math.pow(y - meanY, 2);
    ssRes += Math.pow(y - yPred, 2);
  }

  const rSquared = ssTot === 0 ? 0 : 1 - (ssRes / ssTot);
  const predictedPrice = slope * targetSqFt + intercept;

  const formula = `Price = ${slope.toFixed(2)} * SqFt ${intercept >= 0 ? '+' : '-'} ${Math.abs(intercept).toFixed(2)}`;

  return {
    slope,
    intercept,
    rSquared,
    predictedPrice,
    formula
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};