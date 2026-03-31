import React from 'react';
import { Mail, Phone, MapPin, FileText } from 'lucide-react';

interface FooterProps {
  openLegalModal: (type: 'privacy' | 'terms' | 'ethics') => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ openLegalModal }) => {
  return (
    <footer className="bg-[#020822] text-white/60 py-16 px-4 border-t border-white/5 relative overflow-hidden antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Escritório */}
          <div className="space-y-6">
            <img 
              src="/images/logo-branco-fundo-transparente.png" 
              alt="Logo Cunha Advocacia" 
              className="h-20 opacity-100 object-contain ml-[-10px]" 
            />
            <div className="space-y-2">
              <p className="text-white font-bold text-lg font-sans">Filipe Cunha Advocacia</p>
              <p className="text-sm leading-relaxed text-gray-400 font-sans">
                Especialista em Direito do Trabalho para Gestantes. Defendendo seu futuro e o do seu bebê.
              </p>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm font-sans">Contato</h4>
            <ul className="space-y-4 font-sans">
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
              <li className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-[#C9A44C]" />
                <span className="text-sm">CNPJ: 46.494.521/0001-43</span>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm font-sans">Legal</h4>
            <ul className="space-y-3 font-sans">
              <li>
                <button 
                  onClick={() => openLegalModal('privacy')} 
                  className="hover:text-[#C9A44C] transition-colors text-sm text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('terms')} 
                  className="hover:text-[#C9A44C] transition-colors text-sm text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openLegalModal('ethics')} 
                  className="hover:text-[#C9A44C] transition-colors text-sm text-left"
                >
                  Ética e Compliance
                </button>
              </li>
              <li className="text-sm pt-2">Dr. Filipe Cunha · OAB/RJ Nº 221.727</li>
            </ul>
          </div>

          {/* Segurança */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm font-sans">Segurança</h4>
            <img 
              src="/images/selos-seguranca.png" 
              alt="Selo de Segurança" 
              className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center space-y-4 font-sans">
          <p className="text-sm opacity-50 max-w-2xl mx-auto leading-relaxed">
            © {new Date().getFullYear()} Filipe Cunha Advocacia. Todos os direitos reservados. 
            Este site tem caráter meramente informativo e não constitui consulta ou promessa de resultado.
          </p>
        </div>
      </div>
    </footer>
  );
});
