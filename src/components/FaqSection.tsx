import React, { useState } from 'react';
import { ChevronDown, Globe, ArrowUpRight } from 'lucide-react';

interface FaqSectionProps {
  scrollToContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ scrollToContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: 'Assinei a rescisão. Ainda tenho direito?', 
      a: "Sim. Nenhuma assinatura apaga um direito garantido pela Constituição Federal (art. 10, II, 'b' do ADCT), que protege a gestante contra demissões arbitrárias."
    },
    { 
      q: 'Eu que pedi demissão. Perdi tudo?', 
      a: "Não necessariamente. Conforme a jurisprudência consolidada do TST, se o pedido foi feito sob pressão, por desconhecimento da gravidez ou sem a devida assistência sindical, ele pode ser revertido judicialmente."
    },
    { 
      q: 'Era contrato de experiência ou aprendizagem. Tenho direito?', 
      a: "Sim. A proteção à maternidade é um direito social que prevalece sobre a modalidade do contrato, abrangendo inclusive contratos temporários e de experiência (Tema 163 do TST)."
    },
    { 
      q: 'A empresa não sabia que eu estava grávida. Isso muda algo?', 
      a: "Não. O Supremo Tribunal Federal (STF) decidiu no Tema 497 que o direito à estabilidade independe do conhecimento prévio do empregador ou da própria gestante."
    },
    { 
      q: 'Sou obrigada a voltar para a empresa se eu ganhar a ação?', 
      a: "Não. O entendimento do TST no Tema 134 permite que a gestante opte pela indenização financeira em vez do retorno, especialmente quando a relação de confiança com a empresa foi rompida."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-white overflow-hidden relative border-y border-gray-50 antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 px-4">
          <span className="text-[#A6822E] font-bold tracking-[0.2em] uppercase text-base mb-3 block font-sans">Dúvidas Frequentes</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B]">
            Perguntas e Respostas
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-gray-100">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
              >
                <span className={`font-sans font-bold text-lg md:text-xl ${openFaqIndex === i ? "text-[#C9A44C]" : "text-[#050C3B]"}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === i ? "bg-[#C9A44C] text-[#050C3B] rotate-180" : "bg-gray-50 text-[#050C3B]"}`}>
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </div>
              </button>
              <div 
                className={`overflow-hidden ${openFaqIndex === i ? "block" : "hidden"}`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0">
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light border-t border-gray-50 pt-6 font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={scrollToContact}
            className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-10 rounded-full shadow-xl inline-flex items-center justify-between group font-sans"
          >
            <span className="mr-8 uppercase font-bold tracking-widest text-base">INICIAR MINHA ANÁLISE</span>
            <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 font-sans">
            <Globe className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Atendimento rápido para todo o Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
};
