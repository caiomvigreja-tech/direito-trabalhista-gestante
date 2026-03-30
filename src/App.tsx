import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  Calculator, 
  ArrowUpRight,
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
  X,
  Play,
  Quote,
  Clock,
  Hourglass
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
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [showVideo, setShowVideo] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (showVideo) {
      const player = new Plyr('.js-plyr', {
        autoplay: true,
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, autoplay: 1 }
      });
      
      player.on('ready', (event) => {
        player.play();
      });

      return () => {
        if (player) player.destroy();
      };
    }
  }, [showVideo]);

  const maskPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return value.slice(0, 15);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: maskPhone(e.target.value) }));
  };

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
            <p>Atuamos em total conformidade com o Estatuto da Advocacia e o Código de Ética e Disciplina da OAB/RJ.</p>
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
      <section className="relative overflow-hidden flex items-center bg-[#F8F9FA] min-h-[85vh] md:min-h-[95vh]">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Fundo BG.webp"
            alt="Fundo Gestante"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050C3B]/60 via-[#050C3B]/30 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 pt-12 pb-24 md:py-32 lg:py-40 px-4 w-full">
          {/* Glassmorphism Container */}
          <div className="space-y-5 md:space-y-6 text-white text-center md:text-left bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-2xl">
            <div className="flex justify-center md:justify-start text-[#C9A44C] font-bold tracking-[0.2em] text-[0.7rem] xs:text-xs md:text-sm uppercase">
              <span>Advogado da Gestante · Todo o Brasil</span>
            </div>
            <h1 className="font-serif text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Foi demitida grávida?
            </h1>
            <p className="text-[1.05rem] md:text-xl text-gray-300 font-light leading-relaxed text-pretty">
              Em muitos casos, a lei garante indenização. O valor pode superar R$ 20 mil em salários e benefícios, sem a obrigação de retornar à empresa.
            </p>
            
            <div id="contact-form" className="max-w-md mx-auto md:mx-0 w-full mt-8 md:mt-10 text-left">
              <form className="space-y-4" onSubmit={handleLeadCapture}>
                <div>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#EBCB8D] outline-none transition bg-white text-gray-800 placeholder:text-gray-400 shadow-md" 
                    placeholder="Seu Nome" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required 
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#EBCB8D] outline-none transition bg-white text-gray-800 placeholder:text-gray-400 shadow-md" 
                    placeholder="Seu WhatsApp" 
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required 
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-6 rounded-full shadow-lg transform transition hover:-translate-y-1 flex items-center justify-between group mt-2">
                  <span className="flex-grow text-center ml-8">Quero saber se tenho direito</span>
                  <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </button>
              </form>
            </div>
          </div>
          {/* Single Floating Notification near the woman */}
          <div className="hidden lg:block relative h-full min-h-[500px] w-full">
            {/* Indenização Garantida - Superior Direita */}
            {/* Indenização Garantida - Superior Direita */}
            <div className="absolute top-[36%] left-[42%] animate-float bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] flex items-center gap-5 z-20 w-[410px]">
              <div className="bg-[#C9A44C] rounded-full p-3 shadow-lg shrink-0">
                <ShieldCheck className="w-7 h-7 text-[#050C3B]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-base tracking-tight leading-tight">Indenização por estabilidade</span>
                <span className="text-white/80 font-medium text-sm mt-0.5">Pagamento de salários e verbas, sem a obrigação de retornar à empresa.</span>
              </div>
            </div>
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4">Quem tem direito à estabilidade?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              A lei protege a gestante do <span className="highlight font-medium text-gray-800">início da gravidez</span> até <span className="highlight font-medium text-gray-800">5 meses após o nascimento</span> do bebê.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {[
              { 
                icon: <AlertTriangle className="w-8 h-8 text-[#C9A44C]" />,
                title: "Foi demitida grávida", 
                desc: "Mesmo que a empresa não soubesse da gravidez, você ainda pode ter direito à estabilidade.",
                note: "Tema 497 do STF"
              },
              { 
                icon: <X className="w-8 h-8 text-[#C9A44C]" />,
                title: "Pediu demissão grávida", 
                desc: <>O pedido de demissão somente é válido quando assistida pelo Sindicato ou por autoridade.</>,
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
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-start h-full transition hover:shadow-md relative overflow-hidden group">
                <div className="bg-[#050C3B]/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h4 className="font-sans font-bold text-[#050C3B] text-xl mb-4 leading-tight">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-[15px] font-light">{item.desc}</p>
                {item.note && (
                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A44C]"></div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold font-sans">{item.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={scrollToContact}
              className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-between group"
            >
              <span className="mr-6">Quero saber se tenho direito</span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 3: EXEMPLO DE CÁLCULO */}
      <section className="relative pt-24 pb-32 px-4 bg-[#F8F9FA] overflow-hidden" ref={calcRef}>
        {/* Faixa decorativa azul */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[450px] bg-[#050C3B] z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#050C3B] text-[#C9A44C] mb-8 shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4 uppercase tracking-tight">Exemplo de Cálculo</h2>
              <h3 className="font-sans text-xl text-gray-600 mb-8 font-medium">Entenda o que compõe a indenização</h3>
              <p className="text-gray-600 mb-8 bg-[#F2F2F2] p-4 rounded-xl border-l-4 border-[#050C3B]">
                Para uma trabalhadora com salário de 
                <span className="relative inline-block px-1 ml-1 cursor-default group/price">
                  <span className="relative z-10 font-bold text-[#050C3B]">R$ 1.621,00</span>
                  <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] text-red-500 opacity-70 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path 
                      d="M5,20 C5,5 95,5 95,20 C95,35 5,35 5,20" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      className="stroke-draw animate-draw-circle"
                    />
                  </svg>
                </span>
              </p>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(0)}>
                  <span className="text-gray-700">Salários do período de estabilidade (12 meses)</span>
                  <span className="font-bold text-[#050C3B]">R$ 19.452,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(200)}>
                  <span className="text-gray-700">FGTS + multa de 40%</span>
                  <span className="font-bold text-[#050C3B]">R$ 2.178,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(400)}>
                  <span className="text-gray-700">Férias proporcionais + 1/3</span>
                  <span className="font-bold text-[#050C3B]">R$ 2.161,00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3" style={getRowStyle(600)}>
                  <span className="text-gray-700">13º salário proporcional</span>
                  <span className="font-bold text-[#050C3B]">R$ 1.621,00</span>
                </div>
                <div className="flex justify-between items-center pt-6 bg-[#050C3B] text-white p-6 rounded-2xl shadow-lg mt-4" style={getTotalStyle()}>
                  <span className="text-xl font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-[#C9A44C]">R$ 25.412,00</span>
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
              className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-between group"
            >
              <span className="mr-6">Quero saber se tenho direito</span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 4: MATÉRIA JORNALÍSTICA */}
      <section className="py-24 px-4 bg-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 px-4 max-w-4xl mx-auto">
            <span className="text-[#A6822E] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Repercussão na Mídia Nacional</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#050C3B] leading-tight text-pretty">
              "Grávidas têm direito à indenização se forem demitidas", reafirma STF
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 items-start bg-[#F8F9FA] rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100 p-4 md:p-10">
            <div className="lg:col-span-3 relative aspect-video rounded-[2.5rem] overflow-hidden shadow-inner bg-black group cursor-pointer" onClick={() => setShowVideo(true)}>
              {!showVideo ? (
                <>
                  <img 
                    src="https://img.youtube.com/vi/PiXdoNtGgOI/maxresdefault.jpg" 
                    alt="Preview Matéria SBT" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-[#C9A44C] rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-[#050C3B] fill-current ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full">
                  <div 
                    className="js-plyr w-full h-full"
                    data-plyr-provider="youtube" 
                    data-plyr-embed-id="PiXdoNtGgOI"
                  ></div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 p-2 md:p-4 text-left">
              <div className="mb-6">
                <img 
                  src="/images/SBT_News_2025.svg.png" 
                  alt="SBT News Logo" 
                  className="h-10 w-auto object-contain rounded-lg"
                />
              </div>
              <p className="text-gray-600 text-sm md:text-lg leading-[1.6] font-light mb-4 italic">
                A Justiça garante que, em caso de demissão injusta, a funcionária tem direito à estabilidade (ou indenização), mesmo que a empresa ainda não soubesse da gestação.
              </p>

              <ul className="space-y-3">
                {[
                  "Fim da obrigação de retorno à empresa",
                  "Indenização substitutiva de todo o período",
                  "Proteção para o período de amamentação"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[#C9A44C] shrink-0"></div>
                    <span className="text-[#050C3B] text-sm md:text-base font-semibold leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToContact}
              className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-between group"
            >
              <span className="mr-6">Quero saber se tenho direito</span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 5: APRESENTAÇÃO DO FILIPE */}
      <section className="py-24 px-4 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-2/5 relative h-[500px] md:h-auto overflow-hidden group">
              <img src="/images/dr-filipe-cunha.png" alt="Dr. Filipe Cunha" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
              
              {/* Circular Rotating Badge with Glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050C3B]/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 group/badge">
                <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                  {/* Frosted Glass Circle */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl overflow-hidden"></div>
                  
                  {/* Rotating Text */}
                  <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-white font-medium text-[5.5px] uppercase tracking-[0.3em]">
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
              <h4 className="text-[#C9A44C] font-bold tracking-[0.2em] uppercase text-sm mb-3">Quem vai cuidar do seu caso</h4>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#050C3B] mb-2">Dr. Filipe Cunha</h2>
              <p className="text-gray-600 mb-8 font-medium text-lg leading-relaxed">Advogado Trabalhista · OAB/RJ Nº 221.727</p>

              <div className="flex flex-wrap gap-3 mb-10">
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">+ 12 anos de experiência</span>
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">Delegado de Prerrogativas</span>
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">Comissão da OAB/RJ</span>
                <span className="bg-[#C9A44C]/10 text-[#C9A44C] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#C9A44C]/20">Advogado da Gestante</span>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>Atuo no Direito do Trabalho há 12 anos, com experiência consolidada na defesa dos direitos de gestantes.</p>
                <p>Escolhi dedicar meu trabalho à defesa de gestantes porque acredito que nenhuma mulher deveria chegar ao parto sem a segurança que a lei garante.</p>
                <p>Além disso, sou casado com Dra. Jussara, também advogada, e pai do Paulo Miguel. Sei o que significa querer proteger quem você ama, e é com esse mesmo cuidado que atendemos cada cliente.</p>
                <div className="pt-8 border-t border-gray-100 mt-10 relative">
                  <Quote className="absolute -top-4 -left-2 w-10 h-10 text-[#C9A44C]/20" />
                  <p className="font-serif font-bold text-[#050C3B] text-2xl italic leading-tight pl-6 border-l-4 border-[#C9A44C]">
                    "Muitas mulheres que atendo acham que já perderam o direito. Na maioria dos casos, ainda não perderam. É importante agir rápido."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToContact}
              className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-8 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-between group"
            >
              <span className="mr-6">Quero saber se tenho direito</span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BLOCO 6: FAQ */}
      <section className="py-24 px-4 bg-white overflow-hidden relative border-y border-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 px-4">
            <span className="text-[#A6822E] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Dúvidas Frequentes</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B]">
              Perguntas e Respostas
            </h2>
          </div>

          <div className="space-y-4">
            {[
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
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-gray-100 transition-all duration-300">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left group"
                >
                  <span className={`font-sans font-bold text-lg md:text-xl transition-colors duration-300 ${openFaqIndex === i ? "text-[#C9A44C]" : "text-[#050C3B]"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === i ? "bg-[#C9A44C] text-[#050C3B] rotate-180" : "bg-gray-50 text-[#050C3B] group-hover:bg-[#050C3B]/5"}`}>
                    <ChevronRight className={`w-5 h-5 transition-transform ${openFaqIndex === i ? "" : ""}`} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === i ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <div className="px-6 md:px-8 pb-8 pt-0">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light border-t border-gray-50 pt-6">
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
              className="w-full md:w-auto bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-4 px-10 rounded-full shadow-xl transform transition hover:-translate-y-1 inline-flex items-center justify-between group"
            >
              <span className="mr-8">Quero saber se tenho direito</span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center shadow-sm group-hover:bg-[#5D4017] group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>





      {/* BLOCO FINAL: CONVERSÃO E GALERIA (Inspirado no screenshot - Refinado) */}
      {/* Alerta de Prazo finalizado (Bloco Todo Vermelho Elegante) */}
      <section className="py-20 px-4 bg-[#7A2D2B] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          {/* Clock Icon Block */}
          <div className="mb-8 relative">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M12 12L12 6" className="origin-[12px_12px] animate-spin-fast" />
                <path d="M12 12L16 12" className="origin-[12px_12px] animate-spin" style={{ animationDuration: '6s' }} />
              </svg>
            </div>
            <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Atenção: seu prazo está diminuindo.
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
              A lei trabalhista estabelece um prazo para buscar seus direitos — que começou a correr na data da demissão.
            </p>
            <div className="text-white font-bold text-lg md:text-xl border-t border-white/10 pt-6 inline-block w-full">
              Quanto antes você agir, mais chances você tem.
            </div>
          </div>
        </div>

        {/* Subtle Textured Background for elegance */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px]"></div>
      </section>

      {/* BLOCO FINAL: CONVERSÃO E GALERIA (Inspirado no screenshot - Refinado) */}
      <section className="py-24 md:py-32 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#050C3B] mb-3 tracking-tight max-w-4xl mx-auto leading-tight text-pretty">
              Consulte um <span className="text-[#C9A44C]">advogado de confiança</span> e descubra agora se você pode ter direito.
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Nossa equipe de especialistas está à disposição para analisar o seu caso.
            </p>
          </div>

          <div className="mt-2 p-0 relative">
            {/* Floating Contact Card - Centered and Clean */}
            <div className="relative w-full max-w-2xl mx-auto px-4 z-20 animate-breathing">
              <div className="bg-white border border-gray-100 shadow-[0_32px_64px_-16px_rgba(5,12,59,0.1)] rounded-[3rem] p-8 md:p-10 text-left">
                <div className="pt-2"></div>
                
                <form className="space-y-4" onSubmit={handleLeadCapture}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#C9A44C] outline-none transition bg-gray-50 text-gray-800 placeholder:text-gray-400" 
                        placeholder="Seu Nome" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required 
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#C9A44C] outline-none transition bg-gray-50 text-gray-800 placeholder:text-gray-400" 
                        placeholder="Seu WhatsApp" 
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-[#EBCB8D] to-[#F3E0B5] hover:from-[#F3E0B5] hover:to-[#EBCB8D] text-[#5D4017] font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-between px-8 group/btn mt-2">
                    <span className="uppercase tracking-widest text-sm font-bold">INICIAR MINHA ANÁLISE</span>
                    <div className="bg-[#5D4017] text-[#EBCB8D] rounded-full p-2 group-hover/btn:scale-110 transition-transform shadow-inner">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </button>
                </form>
                
                <p className="text-[10px] text-gray-400 mt-6 text-center uppercase tracking-widest flex items-center justify-center space-x-2">
                  <ShieldCheck className="w-3 h-3 text-[#3E9B77]" />
                  <span>Sigilo garantido pela OAB</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>





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
                  <span className="text-sm">Av. Presidente Vargas 590</span>
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
                <li className="text-xs pt-2">Dr. Filipe Cunha · OAB/RJ Nº 221.727</li>
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
                      <p className="text-[#050C3B] font-serif text-2xl font-bold mb-8 leading-tight text-center">Há quanto tempo ocorreu a sua demissão?</p>
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
                      <p className="text-[#050C3B] font-serif text-2xl font-bold mb-8 leading-tight text-center">Como aconteceu a sua demissão?</p>
                      <div className="grid gap-3">
                        {[
                          { label: "Fui demitida pela empresa", icon: "🏢" },
                          { label: "Pedi demissão sem assistência do sindicato", icon: "⚖️" },
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
                   RECEBER ORIENTAÇÃO MESMO ASSIM
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
