import React from 'react';
import { Calculator as CalcIcon, ArrowUpRight, Globe } from 'lucide-react';

interface CalculatorSectionProps {
  calcRef: React.RefObject<HTMLDivElement | null>;
  scrollToContact: () => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = React.memo(({ 
  calcRef, 
  scrollToContact
}) => {
  return (
    <section className="relative pt-24 pb-32 px-4 bg-[#F8F9FA] overflow-hidden antialiased" ref={calcRef}>
      {/* Faixa decorativa azul */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[450px] bg-[#050C3B] z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#050C3B] text-[#C9A44C] mb-8 shadow-lg">
                <CalcIcon className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B] mb-4 uppercase tracking-tight">Exemplo de Cálculo</h2>
              <h3 className="font-sans text-xl text-gray-600 mb-8 font-medium">Entenda o que compõe uma indenização</h3>
              <p className="text-gray-600 mb-8 bg-[#F2F2F2] p-4 rounded-xl border-l-4 border-[#050C3B] font-sans">
                Para uma trabalhadora com salário de 
                <span className="relative inline-block px-1 ml-1 cursor-default group/price">
                  <span className="relative z-10 font-bold text-[#050C3B]">R$ 1.621,00</span>
                </span>
              </p>

              <div className="space-y-5 font-sans text-[#050C3B]">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">Salários do período (Exemplo: 11 meses)</span>
                  <span className="font-bold">R$ 17.831,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">FGTS + multa de 40%</span>
                  <span className="font-bold">R$ 1.997,07</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">Férias proporcionais + 1/3</span>
                  <span className="font-bold">R$ 1.981,17</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">13º salário proporcional</span>
                  <span className="font-bold">R$ 1.485,92</span>
                </div>
                <div className="flex justify-between items-center pt-6 bg-[#050C3B] text-white p-6 rounded-2xl shadow-lg mt-4">
                  <span className="text-xl font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-[#C9A44C]">R$ 23.295,16</span>
                </div>
                <div className="mt-6 text-center space-y-2 max-w-lg mx-auto border-t border-gray-50 pt-5">
                  <p className="text-[#050C3B]/60 text-[11px] font-bold uppercase tracking-[0.2em]">
                    Exemplo hipotético (11 meses de estabilidade).
                  </p>
                  <p className="text-gray-400 text-sm italic font-light leading-relaxed">
                    O valor real depende de uma análise criteriosa do salário, do tempo de gestação e de circunstâncias específicas do caso.
                  </p>
                </div>
              </div>
            </div>
            {/* Watermark for the card */}
            <div className="absolute top-0 right-0 opacity-[0.02] transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <CalcIcon className="w-96 h-96 text-[#050C3B]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={scrollToContact}
          className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl inline-flex items-center justify-between group font-sans"
        >
          <span className="mr-6 uppercase font-bold tracking-widest text-base">INICIAR MINHA ANÁLISE</span>
          <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </button>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 font-sans">
          <Globe className="w-3.5 h-3.5 text-[#C9A44C]" />
          <span>Atendimento rápido para todo o Brasil</span>
        </div>
      </div>
    </section>
  );
});
