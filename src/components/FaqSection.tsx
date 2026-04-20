import React, { useState } from 'react';
import { ChevronDown, Globe, ArrowUpRight } from 'lucide-react';

interface FaqSectionProps {
  scrollToContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ scrollToContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    { 
      q: 'Eu pedi demissão porque não sabia da gravidez. Perdi meus direitos?', 
      a: "Não. O pedido de demissão da gestante pode ser anulado se não tiver acompanhamento do sindicato. Você ainda pode ter direito à sua indenização total."
    },
    { 
      q: 'A empresa não sabia que eu estava grávida na demissão. Isso muda algo?', 
      a: "Nada. O que importa para a lei é se você já estava grávida no dia da saída, independentemente de você ou o patrão saberem. O direito à indenização permanece."
    },
    { 
      q: 'Eu trabalhava sem carteira assinada. Também tenho direito?', 
      a: "Sim. A falta de registro é um erro da empresa e não retira sua proteção. Comprovando que você trabalhava lá, todos os seus direitos de gestante são garantidos."
    },
    { 
      q: 'Estava em contrato de experiência ou era Jovem Aprendiz. Estou protegida?', 
      a: "Sim. A justiça garante estabilidade e indenização para gestantes mesmo em contratos por tempo determinado, como experiência ou aprendizagem."
    },
    { 
      q: 'Já assinei a rescisão e recebi meus valores. Ainda posso entrar com a ação?', 
      a: "Com certeza. A assinatura da rescisão não impede que você busque a indenização pela estabilidade que foi desrespeitada."
    },
    { 
      q: 'Vocês atendem grávidas de outros estados?', 
      a: "Sim, atendemos em todo o Brasil. Como os processos hoje são 100% digitais, resolvemos tudo com total segurança e comodidade para você."
    },
    { 
      q: 'Se eu ganhar a ação, serei obrigada a voltar para a empresa?', 
      a: "Não. Você não será obrigada a voltar. O objetivo da ação é converter seu direito em indenização em dinheiro, garantindo sua paz e o sustento do seu bebê."
    },
    { 
      q: 'E se a empresa fechou ou o dono sumiu?', 
      a: "A lei protege você. Se a empresa não tiver bens, o processo pode atingir o patrimônio pessoal dos sócios para garantir que você receba seu dinheiro."
    },
    { 
      q: 'É muito difícil provar que eu estava grávida na época?', 
      a: "É muito simples. Usamos documentos básicos que você já possui ou consegue facilmente para comprovar o período da gestação e garantir seu direito."
    },
    { 
      q: 'Como faço para saber se o meu caso tem direito à indenização?', 
      a: "Basta clicar no botão \"INICIAR MINHA ANÁLISE\". Nossa equipe faz uma verificação rápida e segura dos seus dados para confirmar o valor que você pode receber."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-white overflow-hidden relative border-y border-gray-50 antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 px-4">
          <span className="text-[#A6822E] font-bold tracking-[0.2em] uppercase text-base mb-3 block font-sans">Dúvidas Frequentes</span>
          <h2 className="font-serif text-[clamp(1.625rem,8vw,1.875rem)] md:text-5xl font-bold text-[#050C3B]">
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
            className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-6 md:px-10 rounded-full shadow-xl inline-flex items-center justify-center gap-4 group font-sans active:scale-95"
          >
            <span className="uppercase font-bold tracking-widest text-base whitespace-nowrap">INICIAR MINHA ANÁLISE</span>
            <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
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
};
