import React from 'react';
import { LeadForm } from './LeadForm';

interface HeroSectionProps {
  formData: { name: string; phone: string };
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({
  formData,
  onPhoneChange,
  onNameChange,
  onSubmit,
  isLoading
}) => {
  return (
    <section className="relative overflow-hidden flex items-end md:items-center min-h-[100vh] md:min-h-[95vh] antialiased">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/fundo-bg-mobile.webp" />
          <img
            src="/images/Fundo BG.webp"
            alt="Especialista em direitos da gestante e indenização trabalhista"
            className="w-full h-full object-cover object-top md:object-center"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 pt-64 pb-12 md:py-32 lg:py-40 px-4 w-full">
        {/* Glassmorphism Container */}
        <div id="contact-form" className="scroll-mt-24 md:scroll-mt-32 space-y-5 md:space-y-6 text-white text-center md:text-left bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-2xl">
          <h1 className="font-serif text-[clamp(1.65rem,7.6vw,1.9rem)] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Foi demitida grávida?
          </h1>
          <p className="text-[1.05rem] md:text-xl text-gray-300 font-light leading-relaxed text-pretty font-sans">
            Em muitos casos, a lei garante indenização. <span className="font-semibold text-white">O valor pode superar <span className="whitespace-nowrap">R$ 20 mil</span> em salários e verbas</span>, sem a obrigação de retornar à empresa.
          </p>
          
          <div className="max-w-md mx-auto md:mx-0 w-full mt-8 md:mt-10 text-left">
            <LeadForm 
              formData={formData}
              onNameChange={onNameChange}
              onPhoneChange={onPhoneChange}
              onSubmit={onSubmit}
              isLoading={isLoading}
              showTitle={false}
            />
          </div>
        </div>

        {/* Empty Column for Layout Balance */}
        <div className="hidden lg:block h-full w-full" />
      </div>

    </section>
  );
});
