import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ReferenceLine,
  ReferenceDot
} from 'recharts';
import { DataPoint, RegressionResult } from '../types';
import { formatCurrency } from '../utils/math';

interface RegressionChartProps {
  data: DataPoint[];
  regression: RegressionResult;
  userSqFt: number;
}

const RegressionChart: React.FC<RegressionChartProps> = ({ data, regression, userSqFt }) => {
  // Generate two points to draw the regression line across the chart view
  const minSqFt = Math.min(...data.map(d => d.sqFt)) * 0.8;
  const maxSqFt = Math.max(...data.map(d => d.sqFt)) * 1.2;

  const lineData = [
    { sqFt: minSqFt, regressionPrice: regression.slope * minSqFt + regression.intercept },
    { sqFt: maxSqFt, regressionPrice: regression.slope * maxSqFt + regression.intercept },
  ];

  // Combine scatter data with line data isn't strictly necessary in ComposedChart if we separate them, 
  // but we need a way to render the line. 
  // Strategy: Use ComposedChart. Scatter for points. Line for regression.
  
  // We need to sort data for the x-axis domain to look good? Recharts handles domain auto.
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      const isRegressionLine = point.regressionPrice !== undefined;
      
      if (isRegressionLine) return null; // Don't tooltip the line itself usually

      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="text-xs font-semibold text-slate-500 mb-1">Comparable Sale</p>
          <p className="text-sm text-slate-800">Size: <span className="font-mono font-bold">{point.sqFt.toLocaleString()} sqft</span></p>
          <p className="text-sm text-brand-600">Sold: <span className="font-mono font-bold">{formatCurrency(point.price)}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 ml-2">Market Regression Analysis</h3>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
            <XAxis 
              dataKey="sqFt" 
              type="number" 
              domain={['auto', 'auto']} 
              name="Square Footage" 
              unit=" sqft"
              tick={{fontSize: 12, fill: '#94a3b8'}}
              tickLine={false}
              axisLine={{stroke: '#e2e8f0'}}
            />
            <YAxis 
              dataKey="price" 
              type="number" 
              domain={['auto', 'auto']} 
              name="Price" 
              tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
              tick={{fontSize: 12, fill: '#94a3b8'}}
              tickLine={false}
              axisLine={{stroke: '#e2e8f0'}}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            {/* Market Data Scatter */}
            <Scatter name="Comparables" data={data} fill="#0ea5e9" fillOpacity={0.6} radius={4} />
            
            {/* Regression Line */}
            <Line 
              data={lineData} 
              type="monotone" 
              dataKey="regressionPrice" 
              stroke="#0f172a" 
              strokeWidth={2} 
              dot={false} 
              activeDot={false}
              name="Regression Line"
            />

            {/* User's Target Dot */}
            <ReferenceDot 
                x={userSqFt} 
                y={regression.predictedPrice} 
                r={8} 
                fill="#ef4444" 
                stroke="#fff" 
                strokeWidth={3} 
            />
            
            <ReferenceLine x={userSqFt} stroke="#ef4444" strokeDasharray="3 3" />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Overlay Legend */}
        <div className="absolute top-4 right-6 flex flex-col gap-2 text-xs bg-white/90 p-2 rounded-lg border border-slate-100">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-500 opacity-60"></div>
                <span className="text-slate-600">Comparable Sales</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-slate-900"></div>
                <span className="text-slate-600">Regression Trend</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
                <span className="text-slate-600">Your Property</span>
             </div>
        </div>
    </div>
  );
};

export default RegressionChart;