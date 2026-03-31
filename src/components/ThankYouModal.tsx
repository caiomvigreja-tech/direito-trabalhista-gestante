import React from 'react';
import { Check } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70">
      <div className="bg-white w-full max-w-sm rounded-lg p-10 shadow-2xl relative text-center border border-gray-100">
        <div className="w-16 h-16 bg-[#3E9B77] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-[#050C3B] font-bold text-xl mb-4">Recebemos suas informações.</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Nossa equipe entrará em contato via WhatsApp para explicar seus direitos e orientá-la.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-4 rounded-md bg-[#050C3B] text-white font-bold hover:bg-black transition-colors uppercase tracking-widest text-sm"
        >
          Ok, entendi
        </button>
      </div>
    </div>
  );
};
