import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdPopupProps {
  onClose: () => void;
}

export function AdPopup({ onClose }: AdPopupProps) {
  const [countdown, setCountdown] = useState(30);
  const [canClose, setCanClose] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(true);
    }
  }, [countdown]);

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {canClose && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Close ad"
          >
            <X className="h-8 w-8 text-white" />
          </button>
        )}
        
        {!canClose && (
          <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-white/20 rounded-full">
            <span className="text-white font-bold text-lg">
              {language === 'pt' ? `Fechar em ${countdown}s` : `Skip in ${countdown}s`}
            </span>
          </div>
        )}

        <div className="max-w-4xl w-full text-center px-4">
          <div className="mb-4 sm:mb-8 animate-pulse">
            <div className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
              <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                {language === 'pt' ? 'Espaço Publicitário' : 'Advertisement'}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border border-gray-700">
            <div className="mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
                <span className="text-4xl sm:text-6xl">🏋️</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                {language === 'pt' ? 'Seu Anúncio Aqui!' : 'Your Ad Here!'}
              </h2>
              <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-6">
                {language === 'pt' 
                  ? 'Alcance milhares de entusiastas de fitness e saúde'
                  : 'Reach thousands of fitness and health enthusiasts'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {language === 'pt' ? 'Visualizações Mensais' : 'Monthly Views'}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1">85%</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {language === 'pt' ? 'Taxa de Engajamento' : 'Engagement Rate'}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {language === 'pt' ? 'Visibilidade' : 'Visibility'}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm sm:text-base rounded-full hover:opacity-90 transition-opacity">
                {language === 'pt' ? 'Anuncie Conosco' : 'Advertise With Us'}
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-bold text-sm sm:text-base rounded-full hover:bg-white/20 transition-colors border border-white/20">
                {language === 'pt' ? 'Saiba Mais' : 'Learn More'}
              </button>
            </div>
          </div>

          <p className="mt-4 sm:mt-8 text-gray-500 text-xs sm:text-sm px-4">
            {language === 'pt' 
              ? 'Este é um espaço reservado para anúncios. Contate-nos para oportunidades de publicidade.'
              : 'This is a placeholder for advertisements. Contact us for advertising opportunities.'}
          </p>
        </div>
      </div>
    </div>
  );
}
