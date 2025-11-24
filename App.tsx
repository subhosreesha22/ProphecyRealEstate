import React, { useState, useEffect, useRef } from 'react';
import { HouseInput, FullPrediction } from './types';
import { DEFAULT_INPUT } from './constants';
import { fetchMarketDataAndAnalysis } from './services/geminiService';
import { calculateLinearRegression } from './utils/math';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import RegressionChart from './components/RegressionChart';
import AboutSection from './components/AboutSection';
import { LayoutDashboard, AlertCircle, ExternalLink, CheckCircle2, Terminal, Play } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState<HouseInput>(DEFAULT_INPUT);
  const [prediction, setPrediction] = useState<FullPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for the manual key input to focus it automatically
  const manualKeyInputRef = useRef<HTMLInputElement>(null);

  // Initialize manual key from LocalStorage so it persists across refreshes
  const [manualKey, setManualKey] = useState<string>(() => {
    try {
      return localStorage.getItem('gemini_api_key') || '';
    } catch (e) {
      return '';
    }
  });

  // Focus the input when error appears
  useEffect(() => {
    if (error && manualKeyInputRef.current) {
      manualKeyInputRef.current.focus();
    }
  }, [error]);

  const handleInputChange = (key: keyof HouseInput, value: string | number) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const saveKeyAndRetry = () => {
    if (manualKey.length > 10) {
        try {
          localStorage.setItem('gemini_api_key', manualKey.trim());
        } catch (e) {
          console.warn("Could not save to localStorage");
        }
        // Pass the key specifically to the handler to avoid state race conditions
        handlePredict(manualKey.trim());
    } else {
        alert("Please enter a valid API Key (starting with AIza...)");
    }
  };

  // Optional overrideKey allows us to pass the key directly from the input box
  const handlePredict = async (overrideKey?: string) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    // Determine which key to use: Override -> Manual State -> Default logic in service
    const keyToUse = overrideKey || manualKey;

    try {
      // 1. Get Data from Gemini
      const data = await fetchMarketDataAndAnalysis(input, keyToUse);
      
      const { comparables, aiAnalysis } = data;
      
      // 2. Perform Linear Regression locally
      const regression = calculateLinearRegression(comparables, input.sqFt);

      // 3. Set State
      setPrediction({
        input,
        comparables,
        regression,
        aiAnalysis
      });

    } catch (err: any) {
      console.error(err);
      // Display the specific error message
      setError(err.message || "Failed to generate prediction. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isKeyError = error && (error.toLowerCase().includes("key") || error.toLowerCase().includes("permission") || error.toLowerCase().includes("vite"));

  // Helper to show debug info if user is stuck
  const getDebugEnvKeys = () => {
    try {
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        return Object.keys(import.meta.env).filter(k => k.includes('API') || k.includes('VITE') || k.includes('KEY'));
      }
    } catch (e) { return []; }
    return [];
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="bg-slate-900 text-white p-1.5 rounded-lg">
               <LayoutDashboard size={20} />
             </div>
             <div>
               <h1 className="font-serif font-bold text-xl tracking-tight">Prophecy</h1>
               <span className="text-[10px] text-slate-500 uppercase tracking-widest block -mt-1">Real Estate AI</span>
             </div>
           </div>
           <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
             <span className="text-slate-900 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Prediction Engine</span>
             <button onClick={scrollToAbout} className="hover:text-slate-800 cursor-pointer transition-colors">Methodology</button>
             <button onClick={scrollToAbout} className="hover:text-slate-800 cursor-pointer transition-colors">About</button>
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        
        {/* Intro Text */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            How much is your property worth?
          </h2>
          <p className="text-slate-500 text-lg">
            We combine statistical Linear Regression with advanced Generative AI to provide a dual-layer valuation of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4">
             <InputForm 
               input={input} 
               onChange={handleInputChange} 
               onSubmit={() => handlePredict()} 
               isLoading={isLoading}
             />
             {error && (
               <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm shadow-sm animate-fade-in">
                 <div className="flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5 text-red-600" size={18} />
                    <div className="w-full">
                      <p className="font-bold mb-1 text-red-800">Connection Error</p>
                      
                      {isKeyError ? (
                        <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm mt-2">
                          
                          {/* OPTION 1: MANUAL PASTE (Promoted to Top) */}
                          <div className="mb-4">
                             <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-xs uppercase tracking-wide">
                                <Play size={14} className="text-brand-600" />
                                Quick Fix: Paste API Key
                             </div>
                             <p className="text-xs text-slate-500 mb-2">
                               Skip the configuration files. Paste your key below to start immediately.
                             </p>
                             <div className="flex gap-2">
                               <input 
                                 ref={manualKeyInputRef}
                                 type="text" 
                                 placeholder="Paste AIza..." 
                                 className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-mono"
                                 value={manualKey}
                                 onChange={(e) => setManualKey(e.target.value)}
                               />
                               <button 
                                 onClick={saveKeyAndRetry}
                                 className="bg-brand-600 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-brand-700 transition-colors shadow-sm whitespace-nowrap"
                               >
                                 Start App
                               </button>
                             </div>
                             <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                               <CheckCircle2 size={10} />
                               Key will be saved automatically for next time.
                             </p>
                          </div>

                          {/* OPTION 2: .ENV DEBUG */}
                          <details className="border-t border-slate-100 pt-3">
                             <summary className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-2">
                               <Terminal size={12} />
                               Advanced: Why is my .env failing?
                             </summary>
                             <div className="mt-3 pl-2 border-l-2 border-slate-200">
                                <p className="text-xs text-slate-600 mb-2">The app cannot find <code>VITE_API_KEY</code> in your environment.</p>
                                <ul className="space-y-1 text-[10px] text-slate-500 font-mono">
                                  <li>1. Ensure file is named exactly <code>.env</code></li>
                                  <li>2. Ensure it contains <code>VITE_API_KEY=AIza...</code></li>
                                  <li>3. <strong>Restart the server</strong> (Required)</li>
                                </ul>
                                <div className="mt-2 text-[10px] bg-slate-100 p-2 rounded">
                                   <strong>Visible Env Vars:</strong><br/>
                                   {getDebugEnvKeys().length > 0 ? getDebugEnvKeys().join(', ') : "None (Check file location)"}
                                </div>
                             </div>
                          </details>

                        </div>
                      ) : (
                        <p className="leading-relaxed text-red-700 mb-3 whitespace-pre-wrap">{error}</p>
                      )}

                      {isKeyError && (
                          <a 
                          href="https://aistudio.google.com/app/apikey" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center justify-center gap-2 text-brand-600 hover:text-brand-800 transition-colors text-xs font-medium"
                          >
                          Need a key? Get one from Google
                          <ExternalLink size={10} />
                          </a>
                      )}
                    </div>
                 </div>
               </div>
             )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            {prediction ? (
              <div className="space-y-8">
                <ResultCard prediction={prediction} />
                <RegressionChart 
                  data={prediction.comparables} 
                  regression={prediction.regression} 
                  userSqFt={prediction.input.sqFt}
                />
              </div>
            ) : (
              /* Empty State */
              <div className="h-full min-h-[400px] bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                 {!isLoading && (
                   <>
                    <LayoutDashboard size={48} className="mb-4 opacity-20" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">Ready to Predict</h3>
                    <p className="max-w-sm">Enter your property details on the left and hit predict to generate a market simulation and regression analysis.</p>
                   </>
                 )}
                 {isLoading && (
                   <div className="flex flex-col items-center animate-pulse">
                     <div className="h-4 w-48 bg-slate-200 rounded mb-2"></div>
                     <div className="h-4 w-32 bg-slate-200 rounded"></div>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>

      </main>

      <AboutSection />
    </div>
  );
};

export default App;