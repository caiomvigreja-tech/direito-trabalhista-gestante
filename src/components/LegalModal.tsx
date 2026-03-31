import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-2xl relative flex flex-col border border-gray-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#050C3B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6">
          <h4 className="text-[#050C3B] text-xl font-bold">{title}</h4>
          <div className="h-1 w-12 bg-[#C9A44C] mt-2 rounded-full" />
        </div>
        
        <div className="py-2 text-gray-600 text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
          {content}
        </div>
        
        <button 
          onClick={onClose}
          className="mt-8 w-full bg-gray-50 text-[#050C3B] font-bold py-4 rounded-md hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
