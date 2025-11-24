import React from 'react';
import { HouseInput } from '../types';
import { MapPin, Home, Layers, Calendar, Hash } from 'lucide-react';

interface InputFormProps {
  input: HouseInput;
  onChange: (key: keyof HouseInput, value: string | number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Property Details</h2>
        <p className="text-slate-500 text-sm">Enter the specifications to generate a market model.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Location</label>
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              value={input.location}
              onChange={(e) => onChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Seattle, WA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Square Ft</label>
            <div className="relative group">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
              <input 
                type="number" 
                value={input.sqFt}
                onChange={(e) => onChange('sqFt', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Year Built</label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
              <input 
                type="number" 
                value={input.yearBuilt}
                onChange={(e) => onChange('yearBuilt', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
            <div className="relative group">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
              <input 
                type="number" 
                value={input.bedrooms}
                onChange={(e) => onChange('bedrooms', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bathrooms</label>
            <div className="relative group">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
              <input 
                type="number" 
                value={input.bathrooms}
                onChange={(e) => onChange('bathrooms', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-8 bg-slate-900 hover:bg-brand-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-slate-300/50 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Running Regression Model...
             </>
          ) : (
            'Predict Price'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
