import React, { useEffect } from 'react';
import { Play, ArrowUpRight, Globe } from 'lucide-react';
// @ts-ignore
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface MediaSectionProps {
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
  scrollToContact: () => void;
}

export const MediaSection: React.FC<MediaSectionProps> = React.memo(({ 
  showVideo, 
  setShowVideo,
  scrollToContact
}) => {
  useEffect(() => {
    if (showVideo) {
      const player = new Plyr('.js-plyr', {
        autoplay: true,
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, autoplay: 1 }
      });
      
      player.on('ready', () => {
        player.play();
      });

      return () => {
        if (player) player.destroy();
      };
    }
  }, [showVideo]);

  return (
    <section id="midia" className="py-24 px-4 bg-white overflow-hidden relative antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 px-4 max-w-4xl mx-auto">
          <span className="text-[#A6822E] font-bold tracking-[0.2em] uppercase text-base mb-3 block font-sans">Repercussão na Mídia Nacional</span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#050C3B] leading-tight text-pretty">
            "Grávidas têm direito à indenização se forem demitidas", reafirma STF
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 items-start bg-[#F8F9FA] rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100 p-4 md:p-10">
          <div 
            className="lg:col-span-3 relative aspect-video rounded-[2.5rem] overflow-hidden shadow-inner bg-black group cursor-pointer" 
            onClick={() => setShowVideo(true)}
          >
            {!showVideo ? (
              <>
                <img 
                  src="https://img.youtube.com/vi/PiXdoNtGgOI/maxresdefault.jpg" 
                  alt="Preview Matéria SBT" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-[#C9A44C] rounded-full flex items-center justify-center shadow-2xl">
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
                />
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
            <p className="text-gray-600 text-sm md:text-lg leading-[1.6] font-light mb-4 italic font-sans text-pretty">
              A Justiça garante que, em caso de demissão injusta, a funcionária tem direito à estabilidade (ou indenização), mesmo que a empresa ainda não soubesse da gestação.
            </p>

            <ul className="space-y-3 font-sans">
              {[
                "Fim da obrigação de retorno à empresa",
                "Indenização substitutiva de todo o período",
                "Proteção para o período de amamentação"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#C9A44C] shrink-0" />
                  <span className="text-[#050C3B] text-base font-semibold leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
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
