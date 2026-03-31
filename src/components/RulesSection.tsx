import React from 'react';
import { 
  AlertTriangle, 
  X, 
  Briefcase, 
  ShieldCheck, 
  ArrowUpRight, 
  Globe 
} from 'lucide-react';

interface RulesSectionProps {
  scrollToContact: () => void;
}

export const RulesSection: React.FC<RulesSectionProps> = React.memo(({ scrollToContact }) => {
  const rules = [
    { 
      icon: <AlertTriangle className="w-8 h-8 text-[#C9A44C]" />,
      title: "Foi demitida grávida", 
      desc: "Mesmo que a empresa não soubesse da gravidez, você ainda pode ter direito à estabilidade.",
      note: "Tema 497 do STF"
    },
    { 
      icon: <X className="w-8 h-8 text-[#C9A44C]" />,
      title: "Pediu demissão grávida", 
      desc: "O pedido de demissão somente é válido quando assistida pelo Sindicato ou por autoridade.",
      note: "Tema Vinculante 55 do TST"
    },
    { 
      icon: <Briefcase className="w-8 h-8 text-[#C9A44C]" />,
      title: "Trabalhava sem carteira assinada", 
      desc: "Mensagens e extratos bancários podem comprovar seu vínculo. A falta de registro não retira seus direitos.",
      note: "Arts. 2º e 3º da CLT"
    },
    { 
      icon: <ShieldCheck className="w-8 h-8 text-[#C9A44C]" />,
      title: "Em experiência ou jovem aprendiz", 
      desc: "A lei também garante a estabilidade também para contratos de experiência e Jovem Aprendiz.",
      note: "Tema Vinculante 163 do TST"
    }
  ];

  return (
    <section id="direitos" className="pt-24 pb-0 px-4 bg-[#F8F9FA] antialiased">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B] mb-4">Quem tem direito à estabilidade?</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto font-light leading-relaxed font-sans">
            A lei protege a gestante do <span className="highlight font-medium text-gray-800">início da gravidez</span> até <span className="highlight font-medium text-gray-800">5 meses após o nascimento</span> do bebê.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch font-sans">
          {rules.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-start h-full relative overflow-hidden group">
              <div className="bg-[#050C3B]/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                {item.icon}
              </div>
              <h4 className="font-sans font-bold text-[#050C3B] text-xl mb-4 leading-tight">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed text-base font-light">{item.desc}</p>
              {item.note && (
                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A44C]" />
                  <span className="text-[13px] text-gray-400 uppercase font-bold">{item.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
      </div>
    </section>
  );
});
