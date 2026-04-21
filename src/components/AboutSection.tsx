import React from 'react';
import { Quote, ArrowUpRight, Globe } from 'lucide-react';

interface AboutSectionProps {
  scrollToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = React.memo(({ scrollToContact }) => {
  return (
    <section className="py-24 px-4 bg-[#F8F9FA] antialiased">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">
          <div className="md:w-2/5 relative h-[500px] md:h-auto overflow-hidden group">
            <img 
              src="/images/dr-filipe-cunha.jpg" 
              alt="Dr. Filipe Cunha - Advogado Especialista em Direitos da Gestante" 
              className="absolute inset-0 w-full h-full object-cover object-top scale-110" 
              loading="lazy"
              decoding="async"
              width={400}
              height={500}
            />
            
            {/* Circular Rotating Badge with Glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050C3B]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 group/badge">
              <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                {/* Frosted Glass Circle */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl overflow-hidden" />
                
                {/* Rotating Text */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="fill-white font-medium text-[5.5px] uppercase tracking-[0.3em] font-sans">
                    <textPath xlinkHref="#circlePath" startOffset="0%">
                      Advogado da Gestante • Advogado da Gestante • 
                    </textPath>
                  </text>
                </svg>
                
                {/* Central Logo */}
                <div className="relative z-10 w-16 md:w-20 transition-transform duration-500 group-hover/badge:scale-110">
                  <img 
                    src="/images/logo-branco-fundo-transparente.png" 
                    alt="Logo Cunhas & Cunha" 
                    className="w-full h-auto object-contain drop-shadow-lg"
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
            <h4 className="text-[#C9A44C] font-bold tracking-widest md:tracking-[0.2em] uppercase text-[13px] md:text-base mb-3 font-sans">Quem vai cuidar do seu caso</h4>
            <h2 className="font-serif text-[clamp(1.95rem,9.6vw,2.25rem)] md:text-[3.6rem] font-bold text-[#050C3B] mb-2">Dr. Filipe Cunha</h2>
            <p className="text-gray-600 mb-8 font-medium text-sm md:text-lg leading-relaxed font-sans whitespace-nowrap">Advogado Trabalhista · OAB/RJ Nº 221.727</p>

            <div className="flex flex-wrap gap-3 mb-10 font-sans">
              <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-base font-semibold border border-[#050C3B]/10">+ 12 anos de experiência</span>
              <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-base font-semibold border border-[#050C3B]/10">Delegado de Prerrogativas</span>
              <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-base font-semibold border border-[#050C3B]/10">Comissão da OAB/RJ</span>
              <span className="bg-[#C9A44C]/10 text-[#C9A44C] px-4 py-1.5 rounded-full text-base font-semibold border border-[#C9A44C]/20">Advogado da Gestante</span>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg font-light font-sans">
              <p>Atuo no Direito do Trabalho há 12 anos, com experiência consolidada na defesa dos direitos de gestantes.</p>
              <p>Escolhi dedicar meu trabalho à defesa de gestantes porque acredito que nenhuma mulher deveria chegar ao parto sem a segurança que a lei garante.</p>
              <p>Além disso, sou casado com Dra. Jussara, também advogada, e pai do Paulo Miguel. Sei o que significa querer proteger quem você ama, e é com esse mesmo cuidado que atendemos cada cliente.</p>
              <div className="pt-8 border-t border-gray-100 mt-10 relative">
                <Quote className="absolute -top-4 -left-2 w-10 h-10 text-[#C9A44C]/20" />
                <p className="font-serif font-semibold text-[#050C3B] text-xl md:text-2xl leading-relaxed pl-6 border-l-4 border-[#C9A44C]">
                  "Muitas mulheres que atendo acham que perderam o direito. Na maioria dos casos, não perderam. É importante agir rápido."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={scrollToContact}
            className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-center gap-4 group font-sans active:scale-95"
          >
            <span className="uppercase font-bold tracking-widest text-base">INICIAR MINHA ANÁLISE</span>
            <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 font-sans">
            <Globe className="w-3.5 h-3.5 text-[#C9A44C]" />
            <span>Atendimento rápido para todo o Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
});
