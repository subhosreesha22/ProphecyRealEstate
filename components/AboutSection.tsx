import React from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            The Science Behind the Prediction
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Prophecy uses advanced statistical Linear Regression to provide a grounded, data-driven valuation of your home based on comparable market data.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Col: Math */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <Calculator size={24} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">The Math: Linear Regression</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                    Linear regression attempts to model the relationship between two variables by fitting a linear equation to observed data. In our case, we look at the correlation between <strong>Square Footage</strong> and <strong>Sold Price</strong>.
                </p>
                
                <div className="mt-auto bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">The Formula</span>
                    </div>
                    <p className="font-serif text-2xl italic text-slate-800 mb-2">Y = mX + b</p>
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
                        <div>
                            <span className="text-xs font-bold text-slate-500 block">m (Slope)</span>
                            <span className="text-xs text-slate-400">Price per SqFt Trend</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-500 block">b (Intercept)</span>
                            <span className="text-xs text-slate-400">Base Value</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Col: Why Prophecy? */}
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <TrendingUp size={120} />
                </div>

                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-sky-400 mb-6 border border-slate-700 relative z-10">
                    <TrendingUp size={24} />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">Why Prophecy?</h3>
                <p className="text-slate-400 italic mb-6 relative z-10">"All models are wrong, but some are useful."</p>
                
                <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
                    By providing you with a strict statistical prediction derived from comparable sales, we allow you to see the <strong>objective value</strong> of the property based purely on its size and location data.
                </p>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mt-auto relative z-10 backdrop-blur-sm">
                    <span className="text-sky-400 font-bold text-xs uppercase tracking-wider mb-2 block">Our Philosophy</span>
                    <p className="text-sm text-slate-300">
                         We believe in filtering out emotional bias. We focus strictly on the numbers that matter most to lenders, appraisers, and savvy investors.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;