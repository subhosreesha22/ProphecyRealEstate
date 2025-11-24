
import React from 'react';
import { Calculator, Sparkles, BrainCircuit } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            Math vs. Machine
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Prophecy isn't just a calculator. It's a hybrid engine that merges rigid statistical analysis with modern generative artificial intelligence to give you the most accurate valuation possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Col: Math */}
            <div className="space-y-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 mb-6">
                    <Calculator size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">The Math: Linear Regression</h3>
                <p className="text-slate-600 leading-relaxed">
                    Linear regression attempts to model the relationship between two variables by fitting a linear equation to observed data. In our case, we look at the correlation between <strong>Square Footage</strong> (independent variable) and <strong>Sold Price</strong> (dependent variable).
                </p>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <p className="font-mono text-sm text-slate-500 mb-2">Equation</p>
                    <p className="font-serif text-xl italic text-slate-800">Y = mX + b</p>
                    <p className="text-xs text-slate-400 mt-2">Where <strong>m</strong> is the price per sqft trend.</p>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                    <strong>Why we use it:</strong> It provides a grounded, mathematical baseline that ignores subjective factors but excels at identifying raw market trends.
                </p>
            </div>

            {/* Right Col: AI */}
            <div className="space-y-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 mb-6">
                    <BrainCircuit size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">The Intelligence: Generative AI</h3>
                <p className="text-slate-600 leading-relaxed">
                    While math draws the line, AI reads between them. We use <strong>Google's Gemini 2.5 Flash</strong> model to act as an expert real estate appraiser. It analyzes the "vibe" of the data, considering location quality, market heat, and property condition.
                </p>
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                    <Sparkles className="absolute top-2 right-2 text-yellow-400 opacity-20" size={40} />
                    <p className="font-mono text-xs text-indigo-300 mb-2">AI Analysis Layer</p>
                    <p className="font-medium text-lg text-white mb-2">"This property commands a premium due to recent renovations..."</p>
                    <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                    <strong>Why we use it:</strong> To account for non-linear factors like "luxury appeal" or "fixer-upper status" that a simple math formula misses.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
