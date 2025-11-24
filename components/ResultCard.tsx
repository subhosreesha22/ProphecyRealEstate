import React from 'react';
import { FullPrediction } from '../types';
import { formatCurrency } from '../utils/math';
import { TrendingUp, TrendingDown, Minus, Info, BrainCircuit, Calculator } from 'lucide-react';

interface ResultCardProps {
  prediction: FullPrediction;
}

const ResultCard: React.FC<ResultCardProps> = ({ prediction }) => {
  const { regression, aiAnalysis } = prediction;
  
  const diff = aiAnalysis.estimatedPrice - regression.predictedPrice;
  const percentDiff = (diff / regression.predictedPrice) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Linear Regression Result */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Calculator size={80} />
          </div>
          <div className="flex items-center gap-2 mb-2 text-slate-500">
             <Calculator size={16} />
             <span className="text-xs font-bold uppercase tracking-wider">Linear Regression Model</span>
          </div>
          <div className="text-4xl font-serif font-bold text-slate-900 mb-1">
            {formatCurrency(regression.predictedPrice)}
          </div>
          <p className="text-xs text-slate-400 font-mono">{regression.formula}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
              R² = {regression.rSquared.toFixed(3)}
            </span>
            <span className="text-xs text-slate-400">Fit Confidence</span>
          </div>
        </div>

        {/* AI Expert Result */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit size={80} />
          </div>
           <div className="flex items-center gap-2 mb-2 text-sky-300">
             <BrainCircuit size={16} />
             <span className="text-xs font-bold uppercase tracking-wider">AI Expert Valuation</span>
          </div>
          <div className="text-4xl font-serif font-bold text-white mb-1">
            {formatCurrency(aiAnalysis.estimatedPrice)}
          </div>
          <p className="text-xs text-slate-400">
             Adjusted for condition, market heat & location
          </p>
           <div className="mt-4 flex items-center gap-2">
             <span className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1
                ${aiAnalysis.marketTrend === 'Up' ? 'bg-green-500/20 text-green-300' : 
                  aiAnalysis.marketTrend === 'Down' ? 'bg-red-500/20 text-red-300' : 'bg-slate-600 text-slate-300'}`}>
                {aiAnalysis.marketTrend === 'Up' && <TrendingUp size={12} />}
                {aiAnalysis.marketTrend === 'Down' && <TrendingDown size={12} />}
                {aiAnalysis.marketTrend === 'Stable' && <Minus size={12} />}
                Market {aiAnalysis.marketTrend}
             </span>
          </div>
        </div>
      </div>

      {/* Comparison Insight */}
      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-sky-600 mt-1 shrink-0" size={20} />
        <div>
          <h4 className="text-sm font-semibold text-sky-900 mb-1">Model Divergence Analysis</h4>
          <p className="text-sm text-sky-800 leading-relaxed">
            The AI model is predicting a price <strong>{Math.abs(percentDiff).toFixed(1)}% {diff > 0 ? 'higher' : 'lower'}</strong> than the strict linear regression line. 
            {diff > 0 
              ? " This suggests the property has premium features (location quality, condition) that simple square footage analysis misses." 
              : " This suggests the raw square footage might be overvalued by a simple linear model, likely due to market cooling or specific location drawbacks."}
          </p>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Valuation Reasoning</h3>
        <p className="text-slate-700 leading-relaxed text-sm">
          {aiAnalysis.reasoning}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
           <div>
             <span className="block text-xs text-slate-400 mb-1">Likely Range Low</span>
             <span className="font-mono text-slate-700">{formatCurrency(aiAnalysis.priceRangeLow)}</span>
           </div>
           <div>
             <span className="block text-xs text-slate-400 mb-1">Likely Range High</span>
             <span className="font-mono text-slate-700">{formatCurrency(aiAnalysis.priceRangeHigh)}</span>
           </div>
        </div>
      </div>

    </div>
  );
};

export default ResultCard;
