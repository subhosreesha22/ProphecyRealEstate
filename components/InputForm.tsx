
import React from 'react';
import { HouseInput } from '../types';
import { MapPin, Home, Layers, Calendar, Hash, Building2, Sparkles } from 'lucide-react';

interface InputFormProps {
  input: HouseInput;
  onChange: (key: keyof HouseInput, value: string | number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  const getConditionLabel = (val: number) => {
    switch(val) {
      case 1: return 'Fixer Upper';
      case 2: return 'Fair';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Renovated';
      default: return 'Average';
    }
  };

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

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
          <div className="relative group">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors w-5 h-5" />
            <select
              value={input.propertyType}
              onChange={(e) => onChange('propertyType', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="Apartment">Apartment</option>
              <option value="Independent House">Independent House</option>
              <option value="Villa">Villa</option>
            </select>
            {/* Custom Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
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
                step="1"
                min="1"
                value={input.bathrooms}
                onChange={(e) => onChange('bathrooms', Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Condition Slider */}
        <div className="pt-2">
           <div className="flex justify-between items-center mb-2">
             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition</label>
             <span className={`text-xs font-bold px-2 py-0.5 rounded ${input.condition >= 4 ? 'bg-green-100 text-green-700' : input.condition <= 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
               {getConditionLabel(input.condition)} ({input.condition}/5)
             </span>
           </div>
           <div className="relative group py-2">
             <Sparkles className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 -ml-1 w-4 h-4" />
             <input 
               type="range" 
               min="1" 
               max="5" 
               step="1"
               value={input.condition}
               onChange={(e) => onChange('condition', Number(e.target.value))}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 ml-5"
               style={{ width: 'calc(100% - 20px)' }}
             />
             <div className="flex justify-between text-[10px] text-slate-400 ml-5 mt-1 font-medium">
               <span>Needs Work</span>
               <span>Standard</span>
               <span>Luxury</span>
             </div>
           </div>
        </div>

        <button 
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-slate-900 hover:bg-brand-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-slate-300/50 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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