import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="relative w-full max-w-md text-center">
        {canClose && (
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-10 p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            aria-label="Close ad"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        )}
        
        {!canClose && (
          <div className="absolute top-2 right-2 z-10 px-3 py-1 bg-gray-700 rounded-full">
            <span className="text-white font-semibold text-xs">
              {language === 'pt' ? `Pular em ${countdown}s` : `Skip in ${countdown}s`}
            </span>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
          <div className="mb-3 animate-pulse">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full">
              <span className="text-white font-bold text-[10px] uppercase tracking-wider">
                {language === 'pt' ? 'Publicidade' : 'Advertisement'}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏋️</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {language === 'pt' ? 'Seu Anúncio Aqui!' : 'Your Ad Here!'}
            </h2>
            <p className="text-sm text-gray-300">
              {language === 'pt' 
                ? 'Alcance milhares de entusiastas da saúde'
                : 'Reach thousands of health enthusiasts'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-lg font-bold text-primary">50K+</div>
              <div className="text-[10px] text-gray-400 uppercase">
                {language === 'pt' ? 'Vistas' : 'Views'}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-lg font-bold text-secondary">85%</div>
              <div className="text-[10px] text-gray-400 uppercase">
                {language === 'pt' ? 'Engajamento' : 'Engagement'}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-lg font-bold text-green-400">24/7</div>
              <div className="text-[10px] text-gray-400 uppercase">
                {language === 'pt' ? 'Visibilidade' : 'Visibility'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider">
              {language === 'pt' ? 'Anuncie Conosco' : 'Advertise With Us'}
            </button>
            <button className="px-5 py-2.5 bg-white/10 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-colors border border-white/20 uppercase tracking-wider">
              {language === 'pt' ? 'Saiba Mais' : 'Learn More'}
            </button>
          </div>
        </div>

        <p className="mt-3 text-gray-500 text-[11px] px-4">
          {language === 'pt' 
            ? 'Este é um espaço reservado para anúncios. Fale conosco para oportunidades.'
            : 'This is a placeholder for ads. Contact us for opportunities.'}
        </p>
      </div>
    </div>
  );
}
