import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { LeadForm } from './LeadForm';

interface FinalCtaSectionProps {
  formData: { name: string; phone: string };
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = React.memo(({
  formData,
  onPhoneChange,
  onNameChange,
  onSubmit,
  isLoading
}) => {
  return (
    <>
      {/* Alerta de Prazo finalizado (Bloco Todo Vermelho Elegante) */}
      <section className="py-20 px-4 bg-[#b25553] text-white relative overflow-hidden antialiased">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          {/* Alert-style Title container */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-8">
            <AlertTriangle className="w-5 h-5 text-[#EBCB8D]" />
            <h2 className="font-sans text-sm md:text-base font-black tracking-[0.2em] uppercase whitespace-nowrap">
              Atenção: seu prazo está diminuindo.
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-white font-medium text-base md:text-lg leading-relaxed font-sans">
              A lei trabalhista estabelece um prazo; que começou a correr na data da demissão - quanto antes você agir, mais chances (Art. 11 da CLT).
            </p>
          </div>
        </div>

        {/* Subtle Textured Background for elegance */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </section>

      {/* BLOCO FINAL: CONVERSÃO E GALERIA */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden antialiased">
        {/* Background Image at full opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/Edificio Lisboa2.webp" 
            alt="Edifício Lisboa" 
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight max-w-4xl mx-auto leading-tight text-pretty">
              Consulte um advogado de confiança e descubra agora se você pode ter direito.
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light font-sans">
              Nossa equipe de especialistas está à disposição para analisar o seu caso.
            </p>
          </div>

          <div className="mt-2 p-0 relative">
            <div className="relative w-full max-w-2xl mx-auto px-4 z-20">
              <div className="bg-white border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] rounded-[3rem] p-8 md:p-10 text-left">
                <div className="pt-2" />
                <div className="max-w-md mx-auto">
                  <LeadForm 
                    formData={formData}
                    onNameChange={onNameChange}
                    onPhoneChange={onPhoneChange}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
