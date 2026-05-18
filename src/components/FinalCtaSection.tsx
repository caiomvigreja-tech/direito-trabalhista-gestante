import React from 'react';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

interface FinalCtaSectionProps {
  scrollToContact: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = React.memo(({
  scrollToContact
}) => {
  return (
    <>
      {/* BLOCO FINAL: CONVERSÃO E GALERIA */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden antialiased">
        {/* Background Image at full opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Edificio Lisboa2.webp" 
            alt="Edifício Lisboa" 
            className="w-full h-full object-cover opacity-100"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-10">
            <h2 className="font-serif text-[clamp(1.625rem,8vw,1.875rem)] md:text-5xl font-bold text-white mb-3 tracking-tight max-w-4xl mx-auto leading-tight text-pretty">
              Consulte um advogado de confiança e descubra agora se você pode ter direito.
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light font-sans">
              O Dr. Filipe Cunha e sua equipe estão à disposição para analisar o seu caso.
            </p>
          </div>

          <div className="mt-8 flex justify-center relative z-20">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] text-base md:text-lg px-8 md:px-12 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <span>INICIAR MINHA ANÁLISE</span>
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-[#5D4017] group-hover:text-white transition-all duration-300 text-[#5D4017]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Alerta de Prazo finalizado (Bloco Todo Vermelho Elegante) - Movido para o final */}
      <section className="py-20 px-4 bg-[#b25553] text-white relative overflow-hidden antialiased">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          {/* Alert-style Title container */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 md:px-7 py-2.5 md:py-3.5 rounded-full mb-8 max-w-full">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-[#EBCB8D] shrink-0" />
            <h2 className="font-sans text-[11px] md:text-[1.1rem] font-black tracking-widest md:tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden text-ellipsis">
              Atenção: seu prazo está diminuindo.
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-white font-medium text-base md:text-lg leading-relaxed font-sans">
              A lei trabalhista estabelece um prazo que começou a correr na data da demissão - quanto antes você agir, mais chances.
            </p>
            <p className="mt-4 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-sans">
              (Art. 11 da CLT)
            </p>
          </div>
        </div>

        {/* Subtle Textured Background for elegance */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </section>
    </>
  );
});
