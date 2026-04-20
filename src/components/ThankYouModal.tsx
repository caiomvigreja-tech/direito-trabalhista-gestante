import React from 'react';
import { Check, MessageCircle } from 'lucide-react';

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
        <a 
          href="https://wa.me/5521997035823?text=Olá!%20Acabei%20de%20preencher%20o%20formulário%20no%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20meus%20direitos%20como%20gestante."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 mb-3 rounded-md bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp agora
        </a>
        <button 
          onClick={onClose}
          className="w-full py-4 rounded-md bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs"
        >
          Ok, fechar
        </button>
      </div>
    </div>
  );
};
