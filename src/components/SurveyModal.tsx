import React from 'react';
import { 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onOptionSelect: (step: number, option: string) => void;
  deadlineAlert: boolean;
  onFinishAlert: () => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  onOptionSelect,
  deadlineAlert,
  onFinishAlert
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl relative flex flex-col border border-gray-200">
        {!deadlineAlert ? (
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Passo {currentStep} de 3</div>
              <h4 className="text-[#050C3B] text-xl font-bold">Falta muito pouco</h4>
              <p className="text-gray-500 text-sm">Responda para prepararmos sua análise.</p>
            </div>

            {/* Questions list */}
            <div>
              {currentStep === 1 && (
                <div>
                  <p className="text-[#050C3B] font-bold text-lg mb-4">Há quanto tempo ocorreu a sua demissão?</p>
                  <div className="space-y-2">
                    {["Menos de 6 meses", "Entre 6 meses e 1 ano", "Entre 1 ano e 2 anos", "Mais de 2 anos"].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => onOptionSelect(1, opt)}
                        className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 text-[#050C3B] font-semibold text-left hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <p className="text-[#050C3B] font-bold text-lg mb-4">Como aconteceu a sua demissão?</p>
                  <div className="space-y-2">
                    {[
                      "Fui demitida pela empresa",
                      "Pedi demissão sem sindicato",
                      "Pedi demissão por pressão",
                      "Ainda não fui demitida"
                    ].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => onOptionSelect(2, opt)}
                        className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 text-[#050C3B] font-semibold text-left hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <p className="text-[#050C3B] font-bold text-lg mb-4">Qual era o seu salário aproximado?</p>
                  <div className="space-y-2">
                    {["Até R$ 2.000", "Entre R$ 2.000 e R$ 5.000", "Acima de R$ 5.000", "Trabalhava sem registro"].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => onOptionSelect(3, opt)}
                        className="w-full p-4 rounded-md bg-gray-50 border border-gray-200 text-[#050C3B] font-semibold text-left hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 flex flex-col items-center">
             <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
             <h4 className="text-[#050C3B] text-xl font-bold mb-2">Atenção ao prazo</h4>
             <p className="text-gray-600 mb-8 text-sm">Seu prazo legal comum pode ter encerrado, mas podemos analisar exceções para o seu caso.</p>
             <button 
                onClick={onFinishAlert}
                className="w-full bg-[#050C3B] text-white font-bold py-4 px-6 rounded-md shadow-md hover:bg-black transition-colors"
             >
               RECEBER ORIENTAÇÃO MESMO ASSIM
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
