import React from 'react';
import { ArrowUpRight, Globe, User, Phone } from 'lucide-react';

interface LeadFormProps {
  formData: { name: string; phone: string };
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  showTitle?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  formData, 
  onPhoneChange, 
  onNameChange, 
  onSubmit,
  isLoading,
  showTitle = true 
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {showTitle && (
        <h3 className="text-[#050C3B] font-bold text-center text-[1.1rem] md:text-[1.375rem] mb-6 font-sans leading-tight whitespace-nowrap">Inicie sua análise agora</h3>
      )}
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A44C]" />
        <input 
          type="text" 
          className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#EBCB8D]/20 focus:border-[#EBCB8D] outline-none transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-400 shadow-sm font-sans hover:border-[#EBCB8D]/50" 
          placeholder="Seu Nome" 
          value={formData.name}
          onChange={(e) => onNameChange(e.target.value)}
          required 
          disabled={isLoading}
        />
      </div>
      <div className="relative group">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A44C]" />
        <input 
          type="tel" 
          className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#EBCB8D]/20 focus:border-[#EBCB8D] outline-none transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-400 shadow-sm font-sans hover:border-[#EBCB8D]/50" 
          placeholder="Seu WhatsApp" 
          value={formData.phone}
          onChange={onPhoneChange}
          required 
          disabled={isLoading}
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-4 sm:px-6 rounded-full shadow-lg flex items-center justify-between group mt-2 disabled:opacity-50 transition-all duration-300 hover:shadow-xl active:scale-95"
        disabled={isLoading}
      >
        <div className="w-9 h-9 hidden sm:block" /> 
        <span className="flex-grow text-center uppercase font-bold tracking-wider sm:tracking-widest text-sm sm:text-base font-sans whitespace-nowrap px-2">
          {isLoading ? 'ENVIANDO...' : 'INICIAR MINHA ANÁLISE'}
        </span>
        <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-[#5D4017] group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </button>
      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest sm:tracking-[0.2em] uppercase text-gray-400 font-sans opacity-70">
        <Globe className="w-3.5 h-3.5 text-[#C9A44C]" />
        <span className="whitespace-nowrap">Atendimento rápido para todo o Brasil</span>
      </div>
    </form>
  );
};
