import React from 'react';
import { X, Scale, User, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface CaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; phone: string };
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const CaptureModal: React.FC<CaptureModalProps> = ({
  isOpen,
  onClose,
  formData,
  onPhoneChange,
  onNameChange,
  onSubmit,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative flex flex-col border border-gray-100 animate-in fade-in zoom-in-95 duration-200 antialiased">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#050C3B] hover:bg-gray-50 rounded-full transition-all"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Icon Badge */}
        <div className="w-16 h-16 bg-[#FAF6EE] rounded-full flex items-center justify-center mx-auto mt-2 shadow-sm">
          <Scale className="w-8 h-8 text-[#C9A44C]" />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mt-5">
          <h4 className="text-[#050C3B] text-2xl sm:text-3xl font-serif font-black leading-tight tracking-tight">
            Descubra se você tem direito
          </h4>
          <p className="text-gray-500 text-sm sm:text-base mt-2 font-sans font-normal">
            Receba uma análise gratuita em poucos minutos.
          </p>
          {/* Separator Gold Line */}
          <div className="h-[3px] w-12 bg-[#C9A44C] mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Inputs */}
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[#C9A44C]" />
            <input 
              type="text" 
              className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#C9A44C]/10 focus:border-[#C9A44C] outline-none transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-400 font-sans hover:border-[#C9A44C]/50" 
              placeholder="Como podemos te chamar?" 
              value={formData.name}
              onChange={(e) => onNameChange(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>

          {/* WhatsApp Phone Input */}
          <div className="relative group">
            {/* Outline WhatsApp Icon */}
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-green-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <input 
              type="tel" 
              className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-400 font-sans hover:border-green-500/50" 
              placeholder="Seu WhatsApp com DDD" 
              value={formData.phone}
              onChange={onPhoneChange}
              required 
              disabled={isLoading}
            />
          </div>

          {/* Golden Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-between group mt-6 disabled:opacity-50 transition-all duration-300 hover:shadow-xl active:scale-95 cursor-pointer"
            disabled={isLoading}
          >
            <div className="w-9 h-9 hidden sm:block" /> 
            <span className="flex-grow text-center uppercase font-black tracking-widest text-xs sm:text-sm font-sans px-2">
              {isLoading ? 'ENVIANDO...' : 'VER SE TENHO DIREITO'}
            </span>
            <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-[#5D4017] group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </button>
        </form>

        {/* Footnote 1: Clock */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-sans font-medium">
          <Clock className="w-4 h-4 text-[#C9A44C]" />
          <span>Resposta em minutos.</span>
        </div>

        {/* Footnote 2: Shield Trust Banner */}
        <div className="mt-6 bg-[#F8F9FA] rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2.5 max-w-sm mx-auto border border-gray-100">
          <ShieldCheck className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-gray-500 font-sans font-normal leading-none">
            Seus dados estão seguros. <strong className="font-semibold text-gray-700">Não enviamos spam.</strong>
          </span>
        </div>

      </div>
    </div>
  );
};
