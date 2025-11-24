import React from 'react';
import { Calculator, BrainCircuit, TrendingUp } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-t border-slate-200 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            The Science Behind the Prediction
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Prophecy isn't just a calculator. It's a hybrid engine that merges rigid statistical analysis with modern generative artificial intelligence to give you the most accurate valuation possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
                <div className="flex gap-5">
                    <div className="shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                        <Calculator size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">The Math: Linear Regression</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Linear regression attempts to model the relationship between two variables by fitting a linear equation to observed data. In our case, we look at the correlation between <strong>Square Footage</strong> (independent variable) and <strong>Sold Price</strong> (dependent variable). 
                            <br/><br/>
                            This provides a grounded, mathematical baseline that ignores subjective factors but excels at identifying raw market trends.
                        </p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="shrink-0 w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-100">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">The Intelligence: Gemini AI</h3>
                        <p className="text-slate-600 leading-relaxed">
                            While math handles the numbers, <strong>Google's Gemini 2.5 Flash</strong> model handles the nuance. It acts as an expert appraiser, analyzing the year built, specific location characteristics, and current market heat.
                            <br/><br/>
                            It can identify if a home commands a premium due to being newer, or a discount due to location factors that a simple line graph would miss.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <TrendingUp size={200} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Why Prophecy?</h3>
                <p className="text-slate-300 leading-relaxed mb-8 relative z-10">
                    "All models are wrong, but some are useful." <br/><br/>
                    By providing you with both a strict statistical prediction and an AI-augmented valuation, we allow you to see the <strong>divergence</strong>. 
                </p>
                <div className="relative z-10 p-5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                    <p className="text-sm font-medium text-sky-100 leading-relaxed">
                        <span className="text-sky-400 font-bold mr-2">Insight:</span>
                        If the AI price is higher than the Regression price, your home likely has premium intangible qualities that raw square footage cannot capture.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;