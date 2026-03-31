import React from 'react';
import { ArrowUpRight, Globe } from 'lucide-react';

interface LeadFormProps {
  formData: { name: string; phone: string };
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  formData, 
  onPhoneChange, 
  onNameChange, 
  onSubmit,
  isLoading 
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <input 
          type="text" 
          className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#EBCB8D] outline-none transition bg-white text-gray-800 placeholder:text-gray-400 shadow-md font-sans border border-gray-100" 
          placeholder="Seu Nome" 
          value={formData.name}
          onChange={(e) => onNameChange(e.target.value)}
          required 
          disabled={isLoading}
        />
      </div>
      <div>
        <input 
          type="tel" 
          className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#EBCB8D] outline-none transition bg-white text-gray-800 placeholder:text-gray-400 shadow-md font-sans border border-gray-100" 
          placeholder="Seu WhatsApp" 
          value={formData.phone}
          onChange={onPhoneChange}
          required 
          disabled={isLoading}
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-between group mt-2 disabled:opacity-50"
        disabled={isLoading}
      >
        <span className="flex-grow text-center ml-8 uppercase font-bold tracking-widest text-base font-sans">
          {isLoading ? 'ENVIANDO...' : 'INICIAR MINHA ANÁLISE'}
        </span>
        <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </button>
      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 font-sans">
        <Globe className="w-3.5 h-3.5 text-[#C9A44C]" />
        <span>Atendimento rápido para todo o Brasil</span>
      </div>
    </form>
  );
};
