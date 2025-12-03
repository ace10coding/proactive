import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.workouts': 'Workouts',
    'nav.calculator': 'Calculator',
    'nav.support': 'Support Groups',
    
    // Home page
    'home.hero.title': 'Your Journey to Better Health Starts Here',
    'home.hero.subtitle': 'Join our community dedicated to promoting good health and wellbeing',
    'home.hero.viewWorkouts': 'View Workouts',
    'home.hero.checkBMI': 'Check Your BMI',
    'home.features.title': 'Why Choose PROACTIVE?',
    'home.features.events.title': 'Find Events',
    'home.features.events.desc': 'Join health and fitness events',
    'home.features.bmi.title': 'BMI Calculator',
    'home.features.bmi.desc': 'Track your health metrics and understand your body better',
    'home.features.workouts.title': 'Workouts',
    'home.features.workouts.desc': 'Transform your fitness with our designed workouts',
    'home.features.advocacy.title': 'Health & Wellbeing',
    'home.features.advocacy.desc': 'Empowering you with knowledge for a healthier lifestyle',
    'home.blog.title': 'Health & Wellbeing',
    'home.blog.subtitle': 'Discover tips and facts to improve your daily life',
    'home.blog.readMore': 'Read more',
    'home.newsletter.title': 'Stay Updated',
    'home.newsletter.desc': 'Subscribe to receive health tips and updates',
    'home.newsletter.placeholder': 'Enter your email',
    'home.newsletter.button': 'Subscribe',
    'home.newsletter.success': 'Successfully subscribed to newsletter!',
    'home.cta.title': 'Ready to Start Your Health Journey?',
    'home.cta.subtitle': 'Join thousands of people who are already improving their health with PROACTIVE',
    'home.cta.bmi': 'Calculate Your BMI',
    'home.cta.workouts': 'Start Working Out',

    // Did You Know Posts
    'didyouknow.title': 'Did You Know?',
    'didyouknow.subtitle': 'Discover interesting health facts and tips to improve your daily life',
    'didyouknow.hydration.title': 'Stay Hydrated',
    'didyouknow.hydration.content': 'Lack of hydration can lead to tiredness and reduced energy. Staying adequately hydrated can boost energy and enhance mental performance.',
    'didyouknow.sleep.title': 'Quality Sleep Matters',
    'didyouknow.sleep.content': 'Getting 7-9 hours of quality sleep each night can improve memory, boost immune function, and help maintain a healthy weight.',
    'didyouknow.share': 'Share',
    'didyouknow.imageDownloaded': 'Image downloaded!',
    'didyouknow.shareDescription': 'Share it on your favorite social media platform.',
    
    // Events page
    'events.hero.title': 'Health & Fitness Events',
    'events.hero.subtitle': 'Join our community events and take your wellness journey to the next level',
    'events.title': 'Bicycle Rental Event',
    'events.description': 'The race starts from Maputo Shopping Centre to Tchumene Circular and back. It\'s free for those who wish to participate with their own bicycles and helmet and we provide road bicycles and helmets for those without one for 200 meticals.',
    'events.date': '12 December 2026',
    'events.location': 'R. Ngungunhane, Maputo',
    'events.register': 'Register for Bicycle Rental',
    'events.viewGallery': 'View Gallery',
    'events.addImage': 'Add Image',
    'events.enterPassword': 'Enter admin password',
    'events.imageUrl': 'Image URL',
    'events.add': 'Add',
    'events.wrongPassword': 'Incorrect password',
    'events.imageAdded': 'Image added successfully',
    'events.noImages': 'No images in the gallery yet. Add some photos!',
    
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
    'workouts.equipment.barbell': 'Barbell',
    'workouts.equipment.dumbbells': 'Dumbbells',
    'workouts.muscles.chest': 'Chest',
    'workouts.muscles.triceps': 'Triceps',
    'workouts.muscles.shoulders': 'Shoulders',
    'workouts.muscles.core': 'Core',
    'workouts.muscles.abs': 'Abs',
    'workouts.muscles.back': 'Back',
    'workouts.howTo': 'How to do it:',
    'workouts.noResults': 'No exercises found matching your filters.',
    'workouts.clickFullscreen': 'Click to view fullscreen',

    // Exercise names and instructions
    'exercise.barbellFrontRaises.name': 'Barbell Front Raises',
    'exercise.barbellFrontRaises.howTo': 'Stand with your feet shoulder-width apart, holding a barbell in front of your thighs with an overhand grip. Keep your arms straight and lift the barbell up to shoulder height, pause briefly, then slowly lower it back down. Focus on controlled movements and avoid swinging.',
    'exercise.arnoldPress.name': 'Arnold Press',
    'exercise.arnoldPress.howTo': 'Start seated with dumbbells at shoulder height, palms facing you. As you press the weights overhead, rotate your palms to face forward at the top. Reverse the motion as you lower the weights back down. This works your shoulders through a fuller range of motion.',
    'exercise.barbellUprightRows.name': 'Barbell Upright Rows',
    'exercise.barbellUprightRows.howTo': 'Hold a barbell with a narrow grip in front of your thighs. Pull the bar straight up along your body until it reaches chest level, keeping your elbows pointing outward. Lower the bar slowly and repeat. Keep your core engaged throughout.',
    
    // Calculator page
    'calculator.hero.title': 'BMI Calculator',
    'calculator.hero.subtitle': 'Calculate your Body Mass Index and understand your health metrics',
    'calculator.title': 'Calculate Your BMI',
    'calculator.description': 'Enter your weight and height to calculate your Body Mass Index',
    'calculator.weight': 'Weight (kg)',
    'calculator.weightPlaceholder': 'Enter your weight in kg',
    'calculator.height': 'Height (cm)',
    'calculator.heightPlaceholder': 'Enter your height in cm',
    'calculator.calculate': 'Calculate BMI',
    'calculator.yourBmi': 'Your BMI',
    'calculator.categories': 'BMI Categories',
    'calculator.underweight': 'Underweight',
    'calculator.normal': 'Normal weight',
    'calculator.overweight': 'Overweight',
    'calculator.obese': 'Obese',
    
    // Support Groups
    'support.title': 'Support Groups',
    'support.subtitle': 'Connect with others, share experiences, and support each other on your health and wellness journey',
    'support.createTopic': 'Create New Topic',
    'support.newTopic': 'New Support Topic',
    'support.topicTitle': 'Topic Title',
    'support.description': 'Description',
    'support.category': 'Category',
    'support.create': 'Create Topic',
    'support.topics': 'Topics',
    'support.username': 'Your name (optional, leave blank for Anonymous)',
    'support.reply': 'Share your thoughts...',
    'support.post': 'Post Reply',
    'support.selectTopic': 'Select a topic to view discussions',
    'support.success': 'Success',
    'support.topicCreated': 'Topic created successfully',
    'support.deleted': 'Deleted successfully',
    'support.updated': 'Updated successfully',
    'support.save': 'Save',
    'support.cancel': 'Cancel',
    'support.categories.mental': 'Mental Health',
    'support.categories.fitness': 'Exercise & Fitness',
    'support.categories.chronic': 'Chronic Conditions',
    'support.categories.wellness': 'General Wellness',
    'support.categories.sleep': 'Sleep & Rest',

    // Workout Generator
    'generator.title': 'Create Your Workout Plan',
    'generator.duration': 'Workout Duration',
    'generator.durationDesc': 'How long do you want to work out?',
    'generator.minutes': 'minutes',
    'generator.intensity': 'Intensity Level',
    'generator.intensityDesc': 'Choose your preferred intensity',
    'generator.low': 'Low',
    'generator.medium': 'Medium',
    'generator.high': 'High',
    'generator.equipment': 'Available Equipment',
    'generator.equipmentDesc': 'Select the equipment you have access to',
    'generator.generate': 'Generate Workout Plan',
    'generator.generating': 'Creating your plan...',
    'generator.error': 'Error generating plan',
    'generator.tryAgain': 'Please try again',

    // Workout Plan View
    'plan.title': 'Your Workout Plan',
    'plan.noplan': 'No workout plan yet',
    'plan.create': 'Create one using the generator',
    'plan.exercise': 'Exercise',
    'plan.sets': 'Sets',
    'plan.reps': 'Reps',
    'plan.rest': 'Rest',
    'plan.seconds': 'seconds',
    'plan.clear': 'Clear Plan',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.events': 'Eventos',
    'nav.workouts': 'Exercícios',
    'nav.calculator': 'Calculadora',
    'nav.support': 'Grupos de Apoio',
    
    // Home page
    'home.hero.title': 'Sua Jornada para uma Melhor Saúde Começa Aqui',
    'home.hero.subtitle': 'Junte-se à nossa comunidade dedicada a promover boa saúde e bem-estar',
    'home.hero.viewWorkouts': 'Ver Exercícios',
    'home.hero.checkBMI': 'Verificar IMC',
    'home.features.title': 'Por que Escolher PROACTIVE?',
    'home.features.events.title': 'Encontrar Eventos',
    'home.features.events.desc': 'Participe de eventos de saúde e fitness',
    'home.features.bmi.title': 'Calculadora de IMC',
    'home.features.bmi.desc': 'Acompanhe suas métricas de saúde e entenda melhor seu corpo',
    'home.features.workouts.title': 'Exercícios',
    'home.features.workouts.desc': 'Transforme sua forma física com nossos exercícios projetados',
    'home.features.advocacy.title': 'Saúde & Bem-estar',
    'home.features.advocacy.desc': 'Capacitando você com conhecimento para um estilo de vida mais saudável',
    'home.blog.title': 'Saúde & Bem-estar',
    'home.blog.subtitle': 'Descubra dicas e fatos para melhorar sua vida diária',
    'home.blog.readMore': 'Leia mais',
    'home.newsletter.title': 'Mantenha-se Atualizado',
    'home.newsletter.desc': 'Inscreva-se para receber dicas de saúde e atualizações',
    'home.newsletter.placeholder': 'Digite seu e-mail',
    'home.newsletter.button': 'Inscrever-se',
    'home.newsletter.success': 'Inscrito com sucesso na newsletter!',
    'home.cta.title': 'Pronto para Iniciar Sua Jornada de Saúde?',
    'home.cta.subtitle': 'Junte-se a milhares de pessoas que já estão melhorando sua saúde com o PROACTIVE',
    'home.cta.bmi': 'Calcule Seu IMC',
    'home.cta.workouts': 'Comece a Treinar',

    // Did You Know Posts
    'didyouknow.title': 'Você Sabia?',
    'didyouknow.subtitle': 'Descubra fatos interessantes de saúde e dicas para melhorar sua vida diária',
    'didyouknow.hydration.title': 'Mantenha-se Hidratado',
    'didyouknow.hydration.content': 'A falta de hidratação pode causar cansaço e redução de energia. Manter-se adequadamente hidratado pode aumentar a energia e melhorar o desempenho mental.',
    'didyouknow.sleep.title': 'Sono de Qualidade Importa',
    'didyouknow.sleep.content': 'Dormir de 7 a 9 horas de sono de qualidade por noite pode melhorar a memória, fortalecer o sistema imunológico e ajudar a manter um peso saudável.',
    'didyouknow.share': 'Compartilhar',
    'didyouknow.imageDownloaded': 'Imagem baixada!',
    'didyouknow.shareDescription': 'Compartilhe em sua rede social favorita.',
    
    // Events page
    'events.hero.title': 'Eventos de Saúde & Fitness',
    'events.hero.subtitle': 'Junte-se aos nossos eventos comunitários e leve sua jornada de bem-estar ao próximo nível',
    'events.title': 'Evento de Aluguel de Bicicletas',
    'events.description': 'A corrida começa no Maputo Shopping Centre até Tchumene Circular e volta. É gratuito para quem deseja participar com suas próprias bicicletas e capacete e fornecemos bicicletas de estrada e capacetes para quem não tem por 200 meticais.',
    'events.date': '12 de Dezembro de 2026',
    'events.location': 'R. Ngungunhane, Maputo',
    'events.register': 'Registrar para Aluguel de Bicicleta',
    'events.viewGallery': 'Ver Galeria',
    'events.addImage': 'Adicionar Imagem',
    'events.enterPassword': 'Digite a senha de administrador',
    'events.imageUrl': 'URL da Imagem',
    'events.add': 'Adicionar',
    'events.wrongPassword': 'Senha incorreta',
    'events.imageAdded': 'Imagem adicionada com sucesso',
    'events.noImages': 'Nenhuma imagem na galeria ainda. Adicione algumas fotos!',
    
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
    'workouts.equipment.barbell': 'Barra',
    'workouts.equipment.dumbbells': 'Halteres',
    'workouts.muscles.chest': 'Peito',
    'workouts.muscles.triceps': 'Tríceps',
    'workouts.muscles.shoulders': 'Ombros',
    'workouts.muscles.core': 'Core',
    'workouts.muscles.abs': 'Abdominais',
    'workouts.muscles.back': 'Costas',
    'workouts.howTo': 'Como fazer:',
    'workouts.noResults': 'Nenhum exercício encontrado com seus filtros.',
    'workouts.clickFullscreen': 'Clique para visualizar em tela cheia',

    // Exercise names and instructions
    'exercise.barbellFrontRaises.name': 'Elevação Frontal com Barra',
    'exercise.barbellFrontRaises.howTo': 'Fique em pé com os pés na largura dos ombros, segurando uma barra na frente das coxas com pegada pronada. Mantenha os braços retos e levante a barra até a altura dos ombros, pause brevemente e abaixe lentamente. Concentre-se em movimentos controlados e evite balançar.',
    'exercise.arnoldPress.name': 'Arnold Press',
    'exercise.arnoldPress.howTo': 'Comece sentado com halteres na altura dos ombros, palmas voltadas para você. Ao pressionar os pesos para cima, gire as palmas para frente no topo. Inverta o movimento ao abaixar os pesos. Isso trabalha seus ombros em uma amplitude maior de movimento.',
    'exercise.barbellUprightRows.name': 'Remada Alta com Barra',
    'exercise.barbellUprightRows.howTo': 'Segure uma barra com pegada estreita na frente das coxas. Puxe a barra para cima ao longo do corpo até a altura do peito, mantendo os cotovelos apontando para fora. Abaixe a barra lentamente e repita. Mantenha o core ativado durante todo o movimento.',
    
    // Calculator page
    'calculator.hero.title': 'Calculadora de IMC',
    'calculator.hero.subtitle': 'Calcule seu Índice de Massa Corporal e entenda suas métricas de saúde',
    'calculator.title': 'Calcule Seu IMC',
    'calculator.description': 'Digite seu peso e altura para calcular seu Índice de Massa Corporal',
    'calculator.weight': 'Peso (kg)',
    'calculator.weightPlaceholder': 'Digite seu peso em kg',
    'calculator.height': 'Altura (cm)',
    'calculator.heightPlaceholder': 'Digite sua altura em cm',
    'calculator.calculate': 'Calcular IMC',
    'calculator.yourBmi': 'Seu IMC',
    'calculator.categories': 'Categorias de IMC',
    'calculator.underweight': 'Abaixo do peso',
    'calculator.normal': 'Peso normal',
    'calculator.overweight': 'Sobrepeso',
    'calculator.obese': 'Obeso',
    
    // Support Groups
    'support.title': 'Grupos de Apoio',
    'support.subtitle': 'Conecte-se com outras pessoas, compartilhe experiências e apoiem-se mutuamente em sua jornada de saúde e bem-estar',
    'support.createTopic': 'Criar Novo Tópico',
    'support.newTopic': 'Novo Tópico de Apoio',
    'support.topicTitle': 'Título do Tópico',
    'support.description': 'Descrição',
    'support.category': 'Categoria',
    'support.create': 'Criar Tópico',
    'support.topics': 'Tópicos',
    'support.username': 'Seu nome (opcional, deixe em branco para Anônimo)',
    'support.reply': 'Compartilhe seus pensamentos...',
    'support.post': 'Postar Resposta',
    'support.selectTopic': 'Selecione um tópico para ver discussões',
    'support.success': 'Sucesso',
    'support.topicCreated': 'Tópico criado com sucesso',
    'support.deleted': 'Excluído com sucesso',
    'support.updated': 'Atualizado com sucesso',
    'support.save': 'Salvar',
    'support.cancel': 'Cancelar',
    'support.categories.mental': 'Saúde Mental',
    'support.categories.fitness': 'Exercício & Fitness',
    'support.categories.chronic': 'Condições Crônicas',
    'support.categories.wellness': 'Bem-estar Geral',
    'support.categories.sleep': 'Sono & Descanso',

    // Workout Generator
    'generator.title': 'Crie Seu Plano de Treino',
    'generator.duration': 'Duração do Treino',
    'generator.durationDesc': 'Por quanto tempo você quer treinar?',
    'generator.minutes': 'minutos',
    'generator.intensity': 'Nível de Intensidade',
    'generator.intensityDesc': 'Escolha sua intensidade preferida',
    'generator.low': 'Baixa',
    'generator.medium': 'Média',
    'generator.high': 'Alta',
    'generator.equipment': 'Equipamento Disponível',
    'generator.equipmentDesc': 'Selecione o equipamento que você tem acesso',
    'generator.generate': 'Gerar Plano de Treino',
    'generator.generating': 'Criando seu plano...',
    'generator.error': 'Erro ao gerar plano',
    'generator.tryAgain': 'Por favor, tente novamente',

    // Workout Plan View
    'plan.title': 'Seu Plano de Treino',
    'plan.noplan': 'Nenhum plano de treino ainda',
    'plan.create': 'Crie um usando o gerador',
    'plan.exercise': 'Exercício',
    'plan.sets': 'Séries',
    'plan.reps': 'Repetições',
    'plan.rest': 'Descanso',
    'plan.seconds': 'segundos',
    'plan.clear': 'Limpar Plano',
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
