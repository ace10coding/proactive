import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.workouts': 'Workouts',
    'nav.calculator': 'Calculator',
    
    // Home page
    'home.hero.title': 'Your Journey to Better Health Starts Here',
    'home.hero.subtitle': 'Join our community dedicated to promoting good health and wellbeing',
    'home.hero.viewWorkouts': 'View Workouts',
    'home.hero.checkBMI': 'Check Your BMI',
    'home.features.title': 'Why Choose PROACTIVE?',
    'home.features.events.title': 'Find Events',
    'home.features.events.desc': 'Join health and fitness events',
    'home.features.workouts.title': 'Workouts',
    'home.features.workouts.desc': 'Transform your fitness with our designed workouts',
    'home.features.advocacy.title': 'Health & Wellbeing',
    'home.features.advocacy.desc': 'Empowering you with knowledge for a healthier lifestyle',
    'home.blog.title': 'Health & Wellbeing',
    'home.blog.readMore': 'Read more',
    'home.newsletter.title': 'Stay Updated',
    'home.newsletter.desc': 'Subscribe to receive health tips and updates',
    'home.newsletter.placeholder': 'Enter your email',
    'home.newsletter.button': 'Subscribe',
    'home.newsletter.success': 'Successfully subscribed to newsletter!',
    
    // Events page
    'events.hero.title': 'Health & Fitness Events',
    'events.hero.subtitle': 'Join our community events and take your wellness journey to the next level',
    'events.register': 'Register for Bicycle Rental',
    'events.viewGallery': 'View Gallery',
    
    // Workouts page
    'workouts.hero.title': 'Workouts',
    'workouts.hero.subtitle': 'Transform your fitness with our designed workouts',
    'workouts.tabs.library': 'Exercise Library',
    'workouts.tabs.generator': 'Create Workout Plan',
    'workouts.tabs.plan': 'My Plan',
    'workouts.filters.type': 'Type',
    'workouts.filters.equipment': 'Equipment',
    'workouts.filters.muscle': 'Muscle',
    'workouts.filters.allTypes': 'All Types',
    'workouts.filters.allEquipment': 'All Equipment',
    'workouts.filters.allMuscles': 'All Muscles',
    'workouts.types.strength': 'Strength',
    'workouts.types.cardio': 'Cardio',
    'workouts.types.stretching': 'Stretching',
    'workouts.equipment.bodyweight': 'Body Weight',
    'workouts.muscles.chest': 'Chest',
    'workouts.muscles.triceps': 'Triceps',
    'workouts.muscles.shoulders': 'Shoulders',
    'workouts.muscles.core': 'Core',
    'workouts.muscles.abs': 'Abs',
    'workouts.muscles.back': 'Back',
    'workouts.targetMuscles': 'Target Muscles:',
    'workouts.howTo': 'How to do it:',
    'workouts.noResults': 'No exercises found matching your filters.',
    'workouts.viewFullscreen': 'Click to view fullscreen',
    
    // Calculator page
    'calculator.hero.title': 'BMI Calculator',
    'calculator.hero.subtitle': 'Calculate your Body Mass Index and understand your health metrics',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.events': 'Eventos',
    'nav.workouts': 'Exercícios',
    'nav.calculator': 'Calculadora',
    
    // Home page
    'home.hero.title': 'Sua Jornada para uma Melhor Saúde Começa Aqui',
    'home.hero.subtitle': 'Junte-se à nossa comunidade dedicada a promover boa saúde e bem-estar',
    'home.hero.viewWorkouts': 'Ver Exercícios',
    'home.hero.checkBMI': 'Verificar IMC',
    'home.features.title': 'Por que Escolher PROACTIVE?',
    'home.features.events.title': 'Encontrar Eventos',
    'home.features.events.desc': 'Participe de eventos de saúde e fitness',
    'home.features.workouts.title': 'Exercícios',
    'home.features.workouts.desc': 'Transforme sua forma física com nossos exercícios projetados',
    'home.features.advocacy.title': 'Saúde & Bem-estar',
    'home.features.advocacy.desc': 'Capacitando você com conhecimento para um estilo de vida mais saudável',
    'home.blog.title': 'Saúde & Bem-estar',
    'home.blog.readMore': 'Leia mais',
    'home.newsletter.title': 'Mantenha-se Atualizado',
    'home.newsletter.desc': 'Inscreva-se para receber dicas de saúde e atualizações',
    'home.newsletter.placeholder': 'Digite seu e-mail',
    'home.newsletter.button': 'Inscrever-se',
    'home.newsletter.success': 'Inscrito com sucesso na newsletter!',
    
    // Events page
    'events.hero.title': 'Eventos de Saúde & Fitness',
    'events.hero.subtitle': 'Junte-se aos nossos eventos comunitários e leve sua jornada de bem-estar ao próximo nível',
    'events.register': 'Registrar para Aluguel de Bicicleta',
    'events.viewGallery': 'Ver Galeria',
    
    // Workouts page
    'workouts.hero.title': 'Exercícios',
    'workouts.hero.subtitle': 'Transforme sua forma física com nossos exercícios projetados',
    'workouts.tabs.library': 'Biblioteca de Exercícios',
    'workouts.tabs.generator': 'Criar Plano de Treino',
    'workouts.tabs.plan': 'Meu Plano',
    'workouts.filters.type': 'Tipo',
    'workouts.filters.equipment': 'Equipamento',
    'workouts.filters.muscle': 'Músculo',
    'workouts.filters.allTypes': 'Todos os Tipos',
    'workouts.filters.allEquipment': 'Todos os Equipamentos',
    'workouts.filters.allMuscles': 'Todos os Músculos',
    'workouts.types.strength': 'Força',
    'workouts.types.cardio': 'Cardio',
    'workouts.types.stretching': 'Alongamento',
    'workouts.equipment.bodyweight': 'Peso Corporal',
    'workouts.muscles.chest': 'Peito',
    'workouts.muscles.triceps': 'Tríceps',
    'workouts.muscles.shoulders': 'Ombros',
    'workouts.muscles.core': 'Core',
    'workouts.muscles.abs': 'Abdominais',
    'workouts.muscles.back': 'Costas',
    'workouts.targetMuscles': 'Músculos Alvo:',
    'workouts.howTo': 'Como fazer:',
    'workouts.noResults': 'Nenhum exercício encontrado com seus filtros.',
    'workouts.viewFullscreen': 'Clique para visualizar em tela cheia',
    
    // Calculator page
    'calculator.hero.title': 'Calculadora de IMC',
    'calculator.hero.subtitle': 'Calcule seu Índice de Massa Corporal e entenda suas métricas de saúde',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
