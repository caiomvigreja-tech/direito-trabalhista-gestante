import React from 'react';
import { CheckCircle2, ChevronRight, AlertCircle, Scale, Calculator, ArrowRight, PlayCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#C9A44C] selection:text-[#050C3B]">
      {/* BLOCO 1: HERO + FORMULÁRIO */}
      <section className="bg-[#050C3B] text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#C9A44C] font-semibold tracking-wider text-sm uppercase">
              <Scale className="w-4 h-4" />
              <span>Advogado da Gestante · Todo o Brasil</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Foi demitida grávida? Você pode ter direito à indenização.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light">
              Mesmo que tenha pedido demissão. Mesmo que a empresa não soubesse da gravidez. Mesmo que tenha assinado a rescisão.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-gray-800 max-w-md mx-auto w-full border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-[#050C3B] mb-6 text-center">Fale com um especialista</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome completo</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50" placeholder="Digite seu nome" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu WhatsApp</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50" placeholder="(00) 00000-0000" required />
              </div>
              <button className="w-full bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold text-lg py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center space-x-2 mt-2">
                <span>Quero saber se tenho direito</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-center text-gray-500 mt-4 font-medium">
                Advocacia Trabalhista Especializada<br/>Dr. Filipe Cunha · OAB Nº 221.727
              </p>
            </form>
          </div>
        </div>
        {/* Background Logo Watermark */}
        <div className="absolute opacity-5 -right-20 -bottom-20 pointer-events-none">
          <img src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_content/images/22378370-137b-40f4-8848-0c6791244e8a.png" alt="" className="w-96 h-96 object-contain" />
        </div>
      </section>

      {/* BLOCO 2: QUEM TEM DIREITO */}
      <section className="py-24 px-4 bg-[#F2F2F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4">Quem tem direito à indenização por estabilidade?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A lei protege a gestante desde o começo da gravidez. Isso vale para a maioria das situações:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Foi demitida durante a gravidez", desc: "Mesmo que a empresa não soubesse que você estava grávida." },
              { title: "Pediu demissão sem saber que estava grávida", desc: "A descoberta posterior à rescisão não elimina o direito." },
              { title: "Estava em contrato de experiência", desc: "O contrato temporário não retira a proteção legal da gestante." },
              { title: "Assinou a rescisão sem saber dos seus direitos", desc: "A assinatura não apaga a estabilidade garantida pela Constituição." },
              { title: "Pediu demissão por pressão da empresa", desc: "Mudança de função, turno ou isolamento durante a gravidez podem caracterizar dispensa indireta." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#C9A44C] flex items-start space-x-4 hover:shadow-md transition">
                <CheckCircle2 className="w-6 h-6 text-[#C9A44C] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#050C3B] text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 3: EXEMPLO DE CÁLCULO */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#050C3B] text-[#C9A44C] mb-8 shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-4 uppercase tracking-tight">Exemplo de Cálculo</h2>
              <h3 className="text-xl text-gray-600 mb-8 font-medium">Entenda o que compõe a indenização</h3>
              <p className="text-gray-600 mb-8 bg-[#F2F2F2] p-4 rounded-xl border-l-4 border-[#050C3B]">Para uma trabalhadora com salário de <strong>R$ 1.800</strong>, o cálculo pode chegar a:</p>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">Salários do período de estabilidade (12 meses)</span>
                  <span className="font-bold text-[#050C3B]">R$ 21.600</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">FGTS + multa de 40%</span>
                  <span className="font-bold text-[#050C3B]">R$ 3.628</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">Férias proporcionais + 1/3</span>
                  <span className="font-bold text-[#050C3B]">R$ 2.400</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-700">13º salário proporcional</span>
                  <span className="font-bold text-[#050C3B]">R$ 1.800</span>
                </div>
                <div className="flex justify-between items-center pt-6 bg-[#050C3B] text-white p-6 rounded-2xl shadow-lg mt-4">
                  <span className="text-xl font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-[#C9A44C]">R$ 29.428</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-6 italic text-center">
                Exemplo hipotético com fins informativos. O valor real depende do salário, tempo de gestação e circunstâncias do caso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 4: OBJEÇÕES PRINCIPAIS */}
      <section className="py-24 px-4 bg-[#050C3B] text-white relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">Perguntas que toda gestante faz</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { q: '"Assinei a rescisão. Ainda tenho direito?"', a: "Sim. A assinatura não elimina os direitos garantidos pela Constituição. Se você estava grávida na data da demissão, o direito à estabilidade existe independente do que foi assinado." },
              { q: '"Eu que pedi demissão. Perdi tudo?"', a: "Não necessariamente. Se você não sabia que estava grávida quando pediu demissão, ou se foi pressionada a pedir, o pedido pode ser questionado na Justiça do Trabalho." },
              { q: '"Era contrato de experiência. Tenho algum direito?"', a: "Sim. A estabilidade gestante existe desde a confirmação da gravidez, independente do tipo de contrato." },
              { q: '"A empresa não sabia que eu estava grávida. Isso muda alguma coisa?"', a: "Não. O STF já decidiu que o direito à estabilidade independe de a empresa saber ou não da gravidez. O que importa é que você estava grávida na data da demissão." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <h4 className="font-bold text-[#C9A44C] text-xl mb-4 font-serif italic">{faq.q}</h4>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* MATÉRIA JORNALÍSTICA */}
          <div className="bg-white text-[#050C3B] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform transition hover:scale-[1.01]">
            <div className="md:w-2/5 bg-gray-200 relative min-h-[250px] flex items-center justify-center group cursor-pointer" onClick={() => window.open('https://youtu.be/PiXdoNtGgOI', '_blank')}>
              <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800" alt="Justiça" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition duration-500" />
              <div className="absolute inset-0 bg-[#050C3B]/20 mix-blend-multiply"></div>
              <PlayCircle className="w-20 h-20 text-white relative z-10 opacity-90 group-hover:scale-110 transition duration-300 drop-shadow-lg" />
            </div>
            <div className="p-10 md:w-3/5 flex flex-col justify-center">
              <span className="text-sm font-bold text-[#C9A44C] uppercase tracking-wider mb-3">Na Mídia</span>
              <h3 className="font-serif text-2xl font-bold mb-4 leading-snug">STF reafirma direito à estabilidade de gestante em contrato de experiência</h3>
              <p className="text-gray-600 mb-6 text-lg">Decisão do Supremo Tribunal Federal garante proteção ao emprego contra dispensa sem justa causa.</p>
              <a href="https://youtu.be/PiXdoNtGgOI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#050C3B] font-bold hover:text-[#C9A44C] transition text-lg group">
                Assistir reportagem <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 5: APRESENTAÇÃO DO FILIPE */}
      <section className="py-24 px-4 bg-[#F2F2F2]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-2/5 relative h-[500px] md:h-auto">
              <img src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_content/images/30349c89-8b01-4475-a83d-d345f0967396.jpeg" alt="Dr. Filipe Cunha" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
              <h4 className="text-[#C9A44C] font-bold tracking-widest uppercase text-sm mb-3">Quem vai cuidar do seu caso</h4>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#050C3B] mb-2">Filipe Cunha</h2>
              <p className="text-gray-500 mb-8 font-medium text-lg">Advogado Trabalhista · OAB/RJ 221.727</p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">+ 10 anos de experiência</span>
                <span className="bg-[#050C3B]/5 text-[#050C3B] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#050C3B]/10">Ex-Delegado OAB/RJ</span>
                <span className="bg-[#C9A44C]/10 text-[#C9A44C] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#C9A44C]/20">Especialista em gestante</span>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>Sou advogado trabalhista com mais de 10 anos de atuação em Direito do Trabalho. Escolhi dedicar minha prática à defesa de gestantes dispensadas porque acredito que nenhuma mulher deveria chegar ao parto sem a segurança que a lei já lhe garante.</p>
                <p>Sou casado com Jussara, também advogada, e pai do Paulo Miguel. Sei o que significa querer proteger quem você ama — e é com esse mesmo cuidado que atendo cada cliente.</p>
                <div className="pt-6 border-t border-gray-100 mt-8">
                  <p className="font-serif font-bold text-[#050C3B] text-xl italic">"Se você foi demitida grávida, não decida que perdeu tudo antes de conversar comigo."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 6: COMO FUNCIONA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050C3B] mb-20 text-center">Siga esses 3 passos:</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>
            
            {[
              { step: "1", title: "Preencha o formulário", desc: "Deixe seu nome e WhatsApp. Leva menos de 30 segundos." },
              { step: "2", title: "Receba o contato", desc: "Nossa equipe entra em contato para entender sua situação. Sem ligação inesperada, sem pressão." },
              { step: "3", title: "Análise do caso", desc: "Avaliamos se você tem direito e orientamos sobre os próximos passos." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-[#050C3B] text-[#C9A44C] flex items-center justify-center text-3xl font-bold mb-8 shadow-xl border-4 border-white transform group-hover:-translate-y-2 transition duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#050C3B] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 7: URGÊNCIA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#B8963D] to-[#E0C878] text-[#050C3B]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <AlertCircle className="w-16 h-16 flex-shrink-0 opacity-90" />
          <div>
            <h2 className="font-serif text-3xl font-bold mb-3">Atenção: seu prazo está correndo.</h2>
            <p className="font-medium text-lg opacity-90">O direito de ingressar com a ação trabalhista prescreve em 2 anos a partir da data da rescisão. Quanto antes você buscar orientação, mais opções você tem.</p>
          </div>
        </div>
      </section>

      {/* BLOCO 8: CTA FINAL + FORMULÁRIO */}
      <section className="py-24 px-4 bg-[#050C3B] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <img src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_content/images/843e911c-2f9d-4054-9964-67d7a7183618.jpg" alt="Filipe Cunha Advocacia" className="h-24 mx-auto mb-10 rounded-xl mix-blend-screen opacity-90" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Você pode ter mais direitos do que imagina.</h2>
          <p className="text-xl text-gray-300 mb-12 font-light">Preencha o formulário e entre em contato.</p>
          
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl text-gray-800 max-w-md mx-auto text-left border border-gray-100">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Seu nome completo</label>
                <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50" placeholder="Digite seu nome" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Seu WhatsApp</label>
                <input type="tel" className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent outline-none transition bg-gray-50" placeholder="(00) 00000-0000" required />
              </div>
              <button className="w-full bg-gradient-to-r from-[#B8963D] to-[#E0C878] hover:from-[#C9A44C] hover:to-[#C9A44C] text-[#050C3B] font-bold text-lg py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center space-x-2 mt-4">
                <span>Quero saber se tenho direito</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Background Logo Watermark */}
        <div className="absolute opacity-[0.03] -left-20 top-20 pointer-events-none transform -rotate-12">
          <img src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_content/images/22378370-137b-40f4-8848-0c6791244e8a.png" alt="" className="w-[800px] h-[800px] object-contain" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030722] text-gray-400 py-10 px-4 text-center text-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <img src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_content/images/22378370-137b-40f4-8848-0c6791244e8a.png" alt="Logo" className="h-12 mx-auto mb-6 opacity-50" />
          <p className="mb-2 font-medium">Advocacia Trabalhista Especializada · Dr. Filipe Cunha · OAB Nº 221.727</p>
          <p className="opacity-60">Este site tem caráter informativo e não constitui promessa de resultado.</p>
        </div>
      </footer>
    </div>
  );
}
