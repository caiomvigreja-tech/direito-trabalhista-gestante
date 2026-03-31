import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RulesSection } from './components/RulesSection';
import { CalculatorSection } from './components/CalculatorSection';
import { MediaSection } from './components/MediaSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { SurveyModal } from './components/SurveyModal';
import { ThankYouModal } from './components/ThankYouModal';
import { LegalModal } from './components/LegalModal';

export default function App() {
  // Refs
  const calcRef = useRef<HTMLDivElement>(null);
  
  // Modal / Survey states
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [currentSurveyStep, setCurrentSurveyStep] = useState(1);
  const [surveyDeadlineAlert, setSurveyDeadlineAlert] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean, title: string, content: React.ReactNode } | null>(null);

  // Data states
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Initialize
  useEffect(() => {
    // Basic setup if needed
  }, []);

  // Handlers
  const maskPhone = (value: string) => {
    // Keep only numbers
    let numbers = value.replace(/\D/g, '');
    
    // Brazilian format (XX) XXXXX-XXXX
    if (numbers.length > 11) numbers = numbers.slice(0, 11);
    
    if (numbers.length > 10) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numbers.length > 6) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (numbers.length > 2) {
      return numbers.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return numbers;
    }
  };

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: maskPhone(e.target.value) }));
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setFormData(prev => ({ ...prev, name }));
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleLeadCapture = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{ name: formData.name, phone: formData.phone }])
        .select()
        .single();

      if (error) {
        console.warn('Silent failure on lead capture:', error);
      } else if (data) {
        setCurrentLeadId(data.id);
      }
      
      // We always open the survey to not block the user, even if Supabase failed
      setIsSurveyOpen(true);
      setCurrentSurveyStep(1);
      setSurveyDeadlineAlert(false);
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
      // Fallback: even if supabase fails, we still want to show the survey to not block the user
      setIsSurveyOpen(true);
      setCurrentSurveyStep(1);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleSurveyOption = useCallback(async (step: number, optionValue: string) => {
    if (currentLeadId) {
      try {
        const updateData: any = {};
        updateData[`survey_step_${step}`] = optionValue;
        
        if (step === 1 && optionValue === "Mais de 2 anos") {
          updateData.deadline_alert = true;
        }

        const { error } = await supabase
          .from('leads')
          .update(updateData)
          .eq('id', currentLeadId);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao atualizar pesquisa:', error);
      }
    }

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
  }, [currentLeadId, currentSurveyStep]);

  const openLegalModal = useCallback((type: 'privacy' | 'terms' | 'ethics') => {
    const contentMap = {
      privacy: {
        title: "Política de Privacidade",
        content: (
          <div className="space-y-4 text-gray-600 leading-relaxed text-base font-sans">
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
          <div className="space-y-4 text-gray-600 leading-relaxed text-base font-sans">
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
          <div className="space-y-4 text-gray-600 leading-relaxed text-base font-sans">
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
    setLegalModal({ isOpen: true, ...contentMap[type] });
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-[#C9A44C] selection:text-[#050C3B] antialiased">
      <Header 
        scrollToContact={scrollToContact} 
        calcRef={calcRef} 
      />

      <main>
        <HeroSection 
          formData={formData}
          onNameChange={handleNameChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleLeadCapture}
          isLoading={isSubmitting}
        />

        <RulesSection scrollToContact={scrollToContact} />

        <CalculatorSection 
          calcRef={calcRef}
          scrollToContact={scrollToContact}
        />

        <MediaSection 
          showVideo={showVideo}
          setShowVideo={setShowVideo}
          scrollToContact={scrollToContact}
        />

        <AboutSection scrollToContact={scrollToContact} />

        <FaqSection scrollToContact={scrollToContact} />

        <FinalCtaSection 
          formData={formData}
          onNameChange={handleNameChange}
          onPhoneChange={handlePhoneChange}
          onSubmit={handleLeadCapture}
          isLoading={isSubmitting}
        />
      </main>

      <Footer openLegalModal={openLegalModal} />

      <SurveyModal 
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        currentStep={currentSurveyStep}
        onOptionSelect={handleSurveyOption}
        deadlineAlert={surveyDeadlineAlert}
        onFinishAlert={() => { setIsSurveyOpen(false); setIsThankYouOpen(true); }}
      />

      <ThankYouModal 
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />

      <LegalModal 
        isOpen={!!legalModal?.isOpen}
        onClose={() => setLegalModal(null)}
        title={legalModal?.title || ''}
        content={legalModal?.content || null}
      />
    </div>
  );
}
