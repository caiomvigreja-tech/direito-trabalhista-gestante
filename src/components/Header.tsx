import React, { useState, useEffect } from 'react';

interface HeaderProps {
  scrollToContact: () => void;
  calcRef: React.RefObject<HTMLDivElement | null>;
}

export const Header: React.FC<HeaderProps> = ({ scrollToContact, calcRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`hidden md:block fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#050C3B]/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/5' : 'bg-[#050C3B]/90 backdrop-blur-md py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/images/logo-branco-fundo-transparente.png" 
            alt="Filipe Cunha Advocacia Logo" 
            className={`h-9 md:h-12 w-auto object-contain transition-all duration-500 ${isScrolled ? 'scale-95' : 'scale-100'}`} 
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-xs md:text-base">Dr. Filipe Cunha</span>
              <span className="text-white/70 text-[8px] md:text-xs whitespace-nowrap">• OAB/RJ 221.727</span>
            </div>
            <span className="text-white/40 text-[8px] md:text-xs font-medium uppercase tracking-wider">Advogado da Gestante</span>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-10">
            <button onClick={() => document.getElementById('direitos')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/80 hover:text-[#C9A44C] font-bold text-[10px] uppercase tracking-[0.25em] font-sans">TENHO DIREITO?</button>
            <button onClick={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })} className="text-white/80 hover:text-[#C9A44C] font-bold text-[10px] uppercase tracking-[0.25em] font-sans">CÁLCULO</button>
            <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/80 hover:text-[#C9A44C] font-bold text-[10px] uppercase tracking-[0.25em] font-sans">DÚVIDAS</button>
          </nav>
          
          <button 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] px-6 py-3 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-lg hidden sm:block active:scale-95"
          >
            INICIAR MINHA ANÁLISE
          </button>
        </div>
      </div>
    </header>
  );
};
