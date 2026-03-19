import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  Calculator, 
  ArrowRight, 
  PlayCircle,
  LogOut,
  Info,
  AlertTriangle,
  Calendar,
  Pencil,
  Briefcase,
  Check,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  MapPin,
  Globe,
  Scale,
  X
} from 'lucide-react';

export default function App() {
  const calcRef = useRef<HTMLDivElement>(null);
  const [isCalcVisible, setIsCalcVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Estados para o Fluxo Inteligente de Lead
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [currentSurveyStep, setCurrentSurveyStep] = useState(1);
  const [surveyDeadlineAlert, setSurveyDeadlineAlert] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  // Estados para Modal Legal
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean, title: string, content: React.ReactNode } | null>(null);

  const openLegalModal = (type: 'privacy' | 'terms' | 'ethics') => {
    const content = {
      privacy: {
        title: "Política de Privacidade",
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p className="font-bold text-[#050C3B]">1. Coleta de Dados</p>
            <p>Coletamos seu nome e WhatsApp exclusivamente para realizar o atendimento solicitado sobre direitos trabalhistas de gestantes.</p>
            <p className="font-bold text-[#050C3B]">2. Uso e Finalidade</p>
            <p>Seus dados serão utilizados apenas para que o Dr. Filipe Cunha ou sua equipe técnica entre em contato via WhatsApp para fornecer orientações jurídicas iniciais.</p>
            <p className="font-bold text-[#050C3B]">3. Proteção e Sigilo</p>
            <p>As informações compartilhadas em nosso formulário são protegidas pelo sigilo profissional advogado-cliente. Não compartilhamos, vendemos ou cedemos suas informações a terceiros sob nenhuma hipótese.</p>
            <p className="font-bold text-[#050C3B]">4. Seus Direitos (LGPD)</p>
            <p>Em conformidade com a Lei 13.709/2018 (LGPD), você pode solicitar a exclusão definitiva dos seus dados de nossa base de contatos a qualquer momento através do nosso WhatsApp oficial.</p>
          </div>
        )
      },
      terms: {
        title: "Termos de Uso",
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p className="font-bold text-[#050C3B]">1. Natureza Informativa</p>
            <p>O conteúdo deste site tem caráter meramente informativo e educacional. As informações aqui contidas não substituem um parecer jurídico individualizado.</p>
            <p className="font-bold text-[#050C3B]">2. Inexistência de Vínculo Contratual</p>
            <p>O preenchimento de formulários ou o envio de mensagens não estabelece, por si só, uma relação de prestação de serviços advocatícios. Tal relação só é formalizada mediante assinatura de contrato de honorários.</p>
            <p className="font-bold text-[#050C3B]">3. Propriedade Intelectual</p>
            <p>Todo o design, textos e vídeos deste site são de propriedade exclusiva do escritório Filipe Cunha Advocacia, sendo proibida a reprodução sem autorização.</p>
          </div>
        )
      },
      ethics: {
        title: "Ética e Compliance",
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p className="font-bold text-[#050C3B]">1. Compromisso Ético</p>
            <p>Atuamos em total conformidade com o Estatuto da Advocacia e o Código de Ética e Disciplina da OAB.</p>
            <p className="font-bold text-[#050C3B]">2. Transparência</p>
            <p>Prezamos pela clareza absoluta nas informações prestadas, garantindo que a cliente compreenda todos os seus direitos e as etapas de um possível processo.</p>
            <p className="font-bold text-[#050C3B]">3. Sigilo Profissional</p>
            <p>O dever de sigilo é pilar fundamental de nossa atuação, abrangendo todas as informações recebidas durante o atendimento preliminar ou no curso da ação judicial.</p>
          </div>
        )
      }
    };
    setLegalModal({ isOpen: true, ...content[type] });
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    // Primeiro salva o lead (simulado), depois abre a qualificação
    setIsSurveyOpen(true);
    setCurrentSurveyStep(1);
    setSurveyDeadlineAlert(false);
  };

  const handleSurveyOption = (step: number, optionValue: string) => {
    if (step === 1 && optionValue === "Mais de 2 anos") {
      setSurveyDeadlineAlert(true);
      return;
    }
    
    if (currentSurveyStep < 3) {
      setCurrentSurveyStep(prev => prev + 1);
    } else {
      setIsSurveyOpen(false);
      setIsThankYouOpen(true);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCalcVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (calcRef.current) {
      observer.observe(calcRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getRowStyle = (delay: number) => {
    if (prefersReducedMotion) return {};
    return {
      transition: `opacity 400ms ease ${delay}ms, transform 400ms ease ${delay}ms`,
      opacity: isCalcVisible ? 1 : 0,
      transform: isCalcVisible ? 'translateX(0)' : 'translateX(8px)',
    };
  };

  const getTotalStyle = () => {
    if (prefersReducedMotion) return {};
    return {
      transition: `opacity 500ms ease 900ms, transform 500ms ease 900ms`,
      opacity: isCalcVisible ? 1 : 0,
      transform: isCalcVisible ? 'translateY(0)' : 'translateY(8px)',
    };
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#C9A44C] selection:text-[#050C3B]">
      {/* BLOCO 1: HERO + FORMULÁRIO */}
      <section className="relative overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Fundo Gestante"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 py-24 md:py-40 px-4 w-full">
          <div className="space-y-6 text-white text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[#C9A44C] font-semibold tracking-wider text-sm uppercase">
              <Scale className="w-4 h-4" />
              <span>Advogado da Gestante · Todo o Brasil</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Foi demitida grávida? Você pode ter direito a uma boa indenização.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light">
              A lei garante salários do período de estabilidade, FGTS, férias e 13º. Em muitos casos, o valor ultrapassa R$ 20.000,00. Independente de como foi a demissão.
            </p>
          </div>

          <div id="contact-form" className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-gray-800 max-w-md mx-auto w-full border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-[#050C3B] mb-6 text-center">Fale com um especialista</h3>
            <form className="space-y-4" onSubmit={handleLeadCapture}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome completo</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50 placeholder:text-gray-400" placeholder="Digite seu nome" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu WhatsApp</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50 placeholder:text-gray-400" placeholder="(00) 00000-0000" required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold text-lg py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center space-x-2 mt-2">
                <span>Quero saber se tenho direito</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-center text-gray-500 mt-4 font-medium">
                Advocacia Trabalhista Especializada<br />Dr. Filipe Cunha · OAB Nº 221.727
              </p>
            </form>
          </div>
        </div>
        {/* Background Logo Watermark */}
        <div className="absolute opacity-5 -right-20 -bottom-20 pointer-events-none">
          <img src="/images/logo-fundo-transparente.png" alt="" className="w-96 h-96 object-contain" />
        </div>
      </section>

      {/* BLOCO 2: QUEM TEM DIREITO */}
      <section className="pt-24 pb-0 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4">Quem tem direito à indenização por estabilidade?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              A lei protege a gestante desde a confirmação da gravidez.<br />
              Isso vale para a maioria das situações.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {[
              { 
                title: "Foi demitida durante a gravidez", 
                desc: "Mesmo que a empresa não soubesse. O STF já pacificou: o desconhecimento do empregador não afasta a estabilidade."
              },
              { 
                title: "Pediu demissão sem saber que estava grávida", 
                desc: "O que vale é a data da concepção, não da descoberta. A rescisão pode ser questionada na Justiça do Trabalho."
              },
              { 
                title: "Pediu demissão por pressão da empresa", 
                desc: "Mudança de função, turno ou isolamento durante a gravidez podem caracterizar dispensa indireta."
              },
              { 
                title: "Estava em contrato de experiência", 
                desc: "Contrato temporário não é exceção. A estabilidade gestante vale para qualquer vínculo empregatício."
              },
              { 
                title: "Assinou a rescisão sem saber dos seus direitos", 
                desc: "Nenhuma assinatura apaga um direito constitucional. O que foi assinado pode ser revisado judicialmente."
              },
              { 
                title: "Trabalhava sem carteira assinada", 
                desc: "Mensagens, depósitos ou testemunhas podem comprovar o vínculo e abrir caminho para a indenização."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full transition hover:shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl lg:text-5xl font-black text-gray-100 leading-none select-none">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="bg-[#EBF7F2] text-[#3E9B77] text-[10px] font-bold uppercase tracking-tight px-3 py-1.5 rounded-full flex items-center space-x-1 border border-[#D5EFE3]">
                    <Check className="w-3 h-3" />
                    <span>Direito Garantido</span>
                  </div>
                </div>
                <h4 className="font-bold text-[#050C3B] text-lg mb-3 leading-tight">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm lg:text-[15px] flex-grow font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold py-5 px-10 rounded-2xl shadow-xl transform transition hover:-translate-y-1 inline-flex items-center space-x-3"
            >
              <span>Quero saber se tenho direito</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 3: EXEMPLO DE CÁLCULO */}
      <section className="pt-12 pb-24 px-4 bg-[#F8F9FA]" ref={calcRef}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#050C3B] text-[#C9A44C] mb-8 shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4 uppercase tracking-tight">Exemplo de Cálculo</h2>
              <h3 className="text-xl text-gray-600 mb-8 font-medium">Entenda o que compõe a indenização</h3>
              <p className="text-gray-600 mb-8 bg-[#F2F2F2] p-4 rounded-xl border-l-4 border-[#050C3B]">Para uma trabalhadora com salário de <strong>R$ 1.800</strong>, o cálculo pode chegar a:</p>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(0)}>
                  <span className="text-gray-700">Salários do período de estabilidade (12 meses)</span>
                  <span className="font-bold text-[#050C3B]">R$ 21.600</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(200)}>
                  <span className="text-gray-700">FGTS + multa de 40%</span>
                  <span className="font-bold text-[#050C3B]">R$ 3.628</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(400)}>
                  <span className="text-gray-700">Férias proporcionais + 1/3</span>
                  <span className="font-bold text-[#050C3B]">R$ 2.400</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(600)}>
                  <span className="text-gray-700">13º salário proporcional</span>
                  <span className="font-bold text-[#050C3B]">R$ 1.800</span>
                </div>
                <div className="flex justify-between items-center pt-6 bg-[#050C3B] text-white p-6 rounded-2xl shadow-lg mt-4" style={getTotalStyle()}>
                  <span className="text-xl font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-[#C9A44C]">R$ 29.428</span>
                </div>
                <p className="text-gray-600 text-sm italic font-light mt-6 text-center">
                  Exemplo hipotético com fins informativos. O valor real depende do salário, tempo de gestação e circunstâncias do caso.
                </p>
              </div>
            </div>
            {/* Watermark for the card */}
            <div className="absolute top-0 right-0 opacity-[0.02] transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Calculator className="w-96 h-96 text-[#050C3B]" />
            </div>
          </div>
        </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold py-5 px-10 rounded-2xl shadow-xl transform transition hover:-translate-y-1 inline-flex items-center space-x-3 w-full md:w-auto justify-center"
            >
              <span>Quero saber se tenho direito</span>
              <Calculator className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 4: MATÉRIA JORNALÍSTICA */}
      <section className="py-24 px-4 bg-[#050C3B] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A44C] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Mídia Nacional</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">A justiça está do seu lado.</h2>
          </div>
          
          <div className="bg-white text-[#050C3B] rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10">
            <div className="md:w-1/2 relative aspect-video md:aspect-auto min-h-[400px]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/PiXdoNtGgOI?si=1XPAE5rBvGel4BxZ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <PlayCircle className="w-24 h-24" />
              </div>
              <span className="text-sm font-bold text-[#C9A44C] uppercase tracking-widest mb-6 block">Matéria SBT</span>
              <h3 className="font-serif text-2xl md:text-4xl font-bold mb-8 leading-tight">
                "Grávidas têm direito à indenização se forem demitidas", reafirma STF.
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed font-light mb-4">
                A Justiça garante que, se a demissão ocorrer, a funcionária deve ser indenizada mesmo que a empresa ainda não saiba da gestação.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold py-5 px-10 rounded-2xl shadow-xl transform transition hover:-translate-y-1 inline-flex items-center space-x-3 w-full md:w-auto justify-center"
            >
              <span>Quero saber se tenho direito</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>



      {/* BLOCO 5: FAQ */}
      <section className="py-24 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A44C] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Antes de agir</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B]">
              Veja as dúvidas mais comuns <span className="text-gray-200">—</span> <span className="text-[#C9A44C]">e as respostas.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                q: '"Assinei a rescisão. Ainda tenho direito?"', 
                bold: "Sim.", 
                a: "Nenhuma assinatura apaga um direito garantido pela Constituição.",
                base: "Base: art. 10, II, \"b\" do ADCT"
              },
              { 
                q: '"Eu que pedi demissão. Perdi tudo?"', 
                bold: "Não.", 
                a: "Se você não sabia que estava grávida — ou foi pressionada — o pedido pode ser questionado na Justiça.",
                base: "Jurisprudência consolidada no TST"
              },
              { 
                q: '"Era contrato de experiência. Tenho algum direito?"', 
                bold: "Sim.", 
                a: "A proteção vale para qualquer tipo de contrato, sem exceção.",
                base: "Base: art. 10, II, \"b\" do ADCT"
              },
              { 
                q: '"A empresa não sabia que eu estava grávida. Isso muda alguma coisa?"', 
                bold: "Não.", 
                a: "O que importa é que você estava grávida na data da demissão — independente de qualquer comunicação à empresa.",
                base: "STF — Tese 497"
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border-t-4 border-[#050C3B] flex flex-col h-full hover:shadow-md transition duration-300">
                <div className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#050C3B] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm mt-1">
                    ?
                  </div>
                  <h4 className="font-bold text-[#050C3B] text-xl leading-tight font-serif">{faq.q}</h4>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    <span className="font-bold text-[#050C3B]">{faq.bold}</span> {faq.a}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[#C9A44C] text-sm font-bold">{faq.base}</span>
                  <button onClick={scrollToContact} className="text-[#050C3B] hover:text-[#C9A44C] transition font-bold text-xs uppercase underline underline-offset-4">Tirar dúvida</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold py-5 px-12 rounded-2xl shadow-xl transform transition hover:-translate-y-1 inline-flex items-center space-x-3"
            >
              <span>Quero saber se tenho direito</span>
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 6: APRESENTAÇÃO DO FILIPE */}
      <section className="py-24 px-4 bg-[#F2F2F2]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-2/5 relative h-[500px] md:h-auto">
              <img src="/images/dr-filipe-cunha.png" alt="Dr. Filipe Cunha" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
              <h4 className="text-[#C9A44C] font-bold tracking-widest uppercase text-sm mb-3">Quem vai cuidar do seu caso</h4>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#050C3B] mb-2">Dr. Filipe Cunha</h2>
              <p className="text-gray-500 mb-8 font-medium text-lg">Advogado Trabalhista · OAB Nº 221.727</p>

              <div className="flex flex-wrap gap-3 mb-10">
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">+ 10 anos de experiência</span>
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">Foi Delegado OAB/RJ</span>
                <span className="bg-[#C9A44C]/10 text-[#C9A44C] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#C9A44C]/20">Advogado da Gestante</span>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>Sou advogado há mais de 10 anos, com atuação especializada em Direito do Trabalho, com clientes em todo o Brasil.</p>
                <p>Escolhi dedicar meu trabalho à defesa de gestantes porque acredito que nenhuma mulher deveria chegar ao parto sem a segurança que a lei garante.</p>
                <p>Além disso, sou casado com Dra. Jussara, também advogada, e pai do Paulo Miguel. Sei o que significa querer proteger quem você ama, e é com esse mesmo cuidado que atendemos cada cliente.</p>
                <div className="pt-8 border-t border-gray-100 mt-8">
                  <p className="font-sans font-light text-[#050C3B] text-xl italic leading-relaxed flex-grow">"Muitas mulheres que atendo acham que já perderam o direito. Na maioria dos casos, ainda não perderam. É importante agir rápido."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold py-5 px-10 rounded-2xl shadow-xl transform transition hover:-translate-y-1 inline-flex items-center space-x-3"
            >
              <span>Quero saber se tenho direito</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 7: COMO FUNCIONA */}
      <section className="py-24 px-4 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100">
            <div className="text-center mb-20">
              <span className="text-gray-400 font-medium mb-2 block">Como funciona?</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B]">
                São <span className="text-[#C9A44C]">3 passos</span> simples.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-16 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-gray-200 -z-0"></div>

              {[
                { 
                  step: "1", 
                  title: "Preencha o formulário", 
                  desc: <>Deixe seu nome, WhatsApp e responda <span className="font-bold text-[#050C3B]">3 perguntas rápidas</span> sobre sua situação.</> 
                },
                { 
                  step: "2", 
                  title: "Receba o contato", 
                  desc: <>Nossa equipe entra em contato pelo WhatsApp para explicar seu direito e <span className="font-bold text-[#050C3B]">estimar o valor da sua indenização.</span></> 
                },
                { 
                  step: "3", 
                  title: "Análise completa", 
                  desc: <>Você descobre <span className="font-bold text-[#050C3B]">se tem direito</span>, <span className="font-bold text-[#050C3B]">quanto pode receber</span> — e o que fazer a seguir.</> 
                }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-[#050C3B] text-white flex items-center justify-center text-2xl font-bold mb-8 shadow-xl border-8 border-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#050C3B] mb-4 font-serif">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOVO BLOCO: FORMULÁRIO DE CONVERSÃO */}
      <section className="py-24 px-4 bg-[#050C3B] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Descubra agora quanto você pode receber de indenização.
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Preencha os dados abaixo para uma análise técnica da sua situação.
          </p>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-gray-800 max-w-xl mx-auto text-left border border-gray-100">
            <form className="space-y-6" onSubmit={handleLeadCapture}>
              <div>
                <label className="block text-sm font-bold text-[#050C3B] mb-2 uppercase tracking-wide">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50 placeholder:text-gray-400" 
                  placeholder="Seu nome aqui" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#050C3B] mb-2 uppercase tracking-wide">WhatsApp</label>
                <input 
                  type="tel" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50 placeholder:text-gray-400" 
                  placeholder="(00) 00000-0000" 
                  required 
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-black text-lg py-5 rounded-2xl shadow-xl transform transition hover:-translate-y-1 flex items-center justify-center space-x-3 mt-6">
                <span>QUERO SABER SE TENHO DIREITO</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-6 text-center uppercase tracking-widest flex items-center justify-center space-x-2">
              <ShieldCheck className="w-3 h-3 text-[#3E9B77]" />
              <span>Seus dados estão protegidos por sigilo profissional</span>
            </p>
          </div>
        </div>

        {/* Background Logo Watermark */}
        <div className="absolute opacity-[0.03] -right-40 -bottom-20 pointer-events-none transform rotate-12">
          <img src="/images/logo-fundo-transparente.png" alt="" className="w-[600px] h-[600px] object-contain" />
        </div>
      </section>
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50/50 rounded-[2.5rem] p-10 md:p-16 border border-red-100 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            <div className="flex-shrink-0 w-20 h-20 bg-[#D32F2F] rounded-full flex items-center justify-center shadow-2xl shadow-red-200">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 text-[#A11F1F]">Atenção: seu prazo está diminuindo.</h2>
              <p className="text-lg md:text-xl text-[#A11F1F]/80 font-medium leading-relaxed mb-4">
                A lei trabalhista estabelece um prazo para buscar seus direitos — e ele já está correndo desde a data da rescisão. Quanto antes você agir, mais opções você tem.
              </p>
              <span className="text-xs font-bold text-[#A11F1F]/60 uppercase tracking-widest italic">Art. 7º, XXIX da Constituição Federal</span>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-[#030722] text-gray-400 py-20 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Escritório */}
            <div className="space-y-6">
              <img src="/images/logo-branco-fundo-transparente.png" alt="Logo Cunha Advocacia" className="h-20 opacity-100 object-contain ml-[-10px]" />
              <div className="space-y-2">
                <p className="text-white font-bold text-lg">Filipe Cunha Advocacia</p>
                <p className="text-sm leading-relaxed text-gray-400">Especialista em Direito do Trabalho para Gestantes. Defendendo seu futuro e o do seu bebê.</p>
                <p className="text-xs opacity-60">CNPJ: 46.494.521/0001-43</p>
              </div>
            </div>

            {/* Contato */}
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#C9A44C]" />
                  <span className="text-sm">contato@advocaciafilipecunha.com.br</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#C9A44C]" />
                  <span className="text-sm">(21) 97350-8920</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#C9A44C] flex-shrink-0" />
                  <span className="text-sm">Rua Frei Caneca, 441, Estácio, Rio de Janeiro - RJ, CEP 20211-020</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-[#D5EFE3]" />
                  <span className="text-sm font-medium text-[#D5EFE3]">Atendimento em todo o Brasil (100% Digital)</span>
                </li>
              </ul>
            </div>

            {/* Links Úteis */}
            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Legal</h4>
              <ul className="space-y-3">
                <li><button onClick={() => openLegalModal('privacy')} className="hover:text-[#C9A44C] transition-colors text-sm text-left">Política de Privacidade</button></li>
                <li><button onClick={() => openLegalModal('terms')} className="hover:text-[#C9A44C] transition-colors text-sm text-left">Termos de Uso</button></li>
                <li><button onClick={() => openLegalModal('ethics')} className="hover:text-[#C9A44C] transition-colors text-sm text-left">Ética e Compliance</button></li>
                <li className="text-xs pt-2">Dr. Filipe Cunha · OAB Nº 221.727</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">Segurança</h4>
              <img src="/images/selos-seguranca.png" alt="Selo de Segurança" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center space-y-4">
            <p className="text-xs opacity-50 max-w-2xl mx-auto leading-relaxed">
              © {new Date().getFullYear()} Filipe Cunha Advocacia. Todos os direitos reservados. 
              Este site tem caráter meramente informativo e não constitui consulta ou promessa de resultado.
            </p>
          </div>
        </div>
      </footer>

      {isSurveyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="fixed inset-0 bg-[#050C3B]/70 backdrop-blur-md transition-opacity duration-500" onClick={() => setIsSurveyOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 md:p-14 shadow-2xl relative z-10 overflow-hidden min-h-[580px] flex flex-col transition-all duration-500 animate-in zoom-in-95 fade-in">
            {!surveyDeadlineAlert ? (
              <div className="flex-grow flex flex-col">
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-12 h-12 bg-[#F8F9FA] rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                    {currentSurveyStep === 1 && <Calendar className="w-6 h-6 text-[#C9A44C]" />}
                    {currentSurveyStep === 2 && <Pencil className="w-6 h-6 text-[#C9A44C]" />}
                    {currentSurveyStep === 3 && <Calculator className="w-6 h-6 text-[#C9A44C]" />}
                  </div>
                  <h4 className="text-[#050C3B] font-serif text-2xl font-bold mb-1">Falta muito pouco</h4>
                  <p className="text-gray-400 text-sm font-medium">Sua análise técnica está sendo preparada.</p>
                </div>

                {/* Barra de Progresso Estilizada */}
                <div className="flex items-center gap-3 mb-12">
                  <span className="text-[10px] font-black text-[#050C3B]/30 uppercase tracking-[0.2em]">{currentSurveyStep}/3</span>
                  <div className="flex-grow flex gap-1.5">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={`h-1.5 flex-1 rounded-full transition-all duration-700 ease-out ${step <= currentSurveyStep ? 'bg-gradient-to-r from-[#050C3B] to-[#0a1564]' : 'bg-gray-100'}`}
                        style={{ 
                          boxShadow: step === currentSurveyStep ? '0 0 10px rgba(5,12,59,0.1)' : 'none',
                          transform: step === currentSurveyStep ? 'scaleY(1.2)' : 'scaleY(1)'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Perguntas com Layout Amigável */}
                <div className="flex-grow flex flex-col">
                  {currentSurveyStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                      <p className="text-[#050C3B] font-serif text-2xl font-bold mb-8 leading-tight text-center">Há quanto tempo ocorreu o seu desligamento?</p>
                      <div className="grid gap-3">
                        {["Menos de 6 meses", "Entre 6 meses e 1 ano", "Entre 1 ano e 2 anos", "Mais de 2 anos"].map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => handleSurveyOption(1, opt)}
                            className="w-full p-6 rounded-[1.5rem] bg-[#FDFDFD] border border-gray-100 text-[#050C3B] font-bold hover:bg-white hover:border-[#C9A44C] hover:shadow-xl hover:shadow-[#C9A44C]/5 transition-all duration-300 text-left flex items-center justify-between group transform hover:-translate-y-1"
                          >
                            <span className="text-lg">{opt}</span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#C9A44C]/10 transition-colors">
                              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A44C] transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentSurveyStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-6 duration-700">
                      <p className="text-[#050C3B] font-serif text-2xl font-bold mb-8 leading-tight text-center">Como aconteceu o seu desligamento?</p>
                      <div className="grid gap-3">
                        {[
                          { label: "Fui demitida pela empresa", icon: "🏢" },
                          { label: "Pedi demissão sem saber que estava grávida", icon: "🤰" },
                          { label: "Pedi demissão por pressão ou mudança", icon: "⚖️" },
                          { label: "Ainda não fui demitida, mas sofro pressão", icon: "⚠️" }
                        ].map((opt) => (
                          <button 
                            key={opt.label}
                            onClick={() => handleSurveyOption(2, opt.label)}
                            className="w-full p-6 rounded-[1.5rem] bg-[#FDFDFD] border border-gray-100 text-[#050C3B] font-bold hover:bg-white hover:border-[#C9A44C] hover:shadow-xl hover:shadow-[#C9A44C]/5 transition-all duration-300 text-left flex items-center justify-between group transform hover:-translate-y-1"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                              <span className="text-lg leading-tight">{opt.label}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#C9A44C]/10 transition-colors">
                              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A44C] transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentSurveyStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-6 duration-700">
                      <p className="text-[#050C3B] font-serif text-2xl font-bold mb-8 leading-tight text-center">Qual era o seu salário aproximado na época?</p>
                      <div className="grid gap-3">
                        {["Até R$ 2.000", "Entre R$ 2.000 e R$ 5.000", "Acima de R$ 5.000", "Trabalhava sem registro"].map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => handleSurveyOption(3, opt)}
                            className="w-full p-6 rounded-[1.5rem] bg-[#FDFDFD] border border-gray-100 text-[#050C3B] font-bold hover:bg-white hover:border-[#C9A44C] hover:shadow-xl hover:shadow-[#C9A44C]/5 transition-all duration-300 text-left flex items-center justify-between group transform hover:-translate-y-1"
                          >
                            <span className="text-lg">{opt}</span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#C9A44C]/10 transition-colors">
                              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A44C] transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 animate-in zoom-in-95 duration-700 flex flex-col items-center flex-grow justify-center">
                 <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mb-10 border-4 border-red-100 shadow-inner">
                   <AlertCircle className="w-14 h-14 text-[#D32F2F] animate-pulse" />
                 </div>
                 <h4 className="text-[#050C3B] font-serif text-3xl font-bold mb-6 leading-tight">Atenção ao seu prazo</h4>
                 <p className="text-gray-500 mb-12 text-lg leading-relaxed font-medium px-4">Pela sua resposta, o prazo legal para esse caso pode ter encerrado. Mas nossa equipe pode analisar se há <span className="text-[#050C3B] font-bold underline decoration-[#C9A44C]">exceções para você</span>.</p>
                 <button 
                    onClick={() => { setIsSurveyOpen(false); setIsThankYouOpen(true); }}
                    className="w-full bg-[#050C3B] text-white font-bold py-7 rounded-[1.5rem] shadow-2xl hover:bg-[#0a1564] transition-all transform hover:-translate-y-1 text-lg"
                 >
                   QUERO ORIENTAÇÃO MESMO ASSIM
                 </button>
              </div>
            )}

            {/* Decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50/50 rounded-full -ml-12 -mb-12 -z-10"></div>
          </div>
        </div>
      )}

      {/* POP-UP DE OBRIGADO */}
      {isThankYouOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#050C3B]/90 backdrop-blur-md" onClick={() => setIsThankYouOpen(false)}></div>
          <div className="bg-[#050C3B] w-full max-w-lg rounded-[3rem] p-10 md:p-16 shadow-2xl relative z-10 text-center border border-white/10 overflow-hidden">
            <div className="w-24 h-24 bg-[#3E9B77] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#3E9B77]/20 border-8 border-[#3E9B77]/20">
              <Check className="w-12 h-12 text-white stroke-[3]" />
            </div>
            <h3 className="text-white font-serif text-3xl md:text-4xl font-bold mb-6">Recebemos as suas informações.</h3>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
              Em breve nossa equipe entra em contato pelo WhatsApp para explicar seus direitos e <span className="text-[#C9A44C] font-bold">estimar o valor da sua indenização.</span>
            </p>
            <button 
              onClick={() => setIsThankYouOpen(false)}
              className="mt-12 w-full py-5 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-sm"
            >
              Ok, entendi
            </button>
            
            {/* Watermark sutil no background do modal */}
            <div className="absolute -bottom-20 -right-20 opacity-[0.05] pointer-events-none transform -rotate-12">
              <CheckCircle2 className="w-64 h-64 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* MODAL LEGAL (GENÉRICO) */}
      {legalModal?.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="absolute inset-0 bg-[#050C3B]/80 backdrop-blur-sm" onClick={() => setLegalModal(null)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setLegalModal(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#050C3B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h4 className="text-[#050C3B] font-serif text-2xl font-bold">{legalModal.title}</h4>
              <div className="h-1 w-12 bg-[#C9A44C] mt-2 rounded-full"></div>
            </div>
            
            <div className="py-2">
              {legalModal.content}
            </div>
            
            <button 
              onClick={() => setLegalModal(null)}
              className="mt-8 w-full bg-gray-50 text-[#050C3B] font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
