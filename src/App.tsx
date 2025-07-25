import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { PaymentModal } from './components/PaymentModal';
import { 
  Brain, 
  Heart, 
  Briefcase, 
  Zap, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Sparkles,
  Eye,
  Clock,
  Shield,
  Calendar,
  User,
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp,
  Lock,
  Download
} from 'lucide-react';

// Типы данных
interface UserData {
  name: string;
  birthDate: string;
  energyTime: string;
  stressReaction: string;
  workStyle: string;
}

interface TestAnswer {
  questionIndex: number;
  answer: number; // 1-5 scale
}

// Вопросы теста
const testQuestions = [
  "Меня вдохновляет мысль о том, что я могу придумать необычный способ решить повседневную задачу.",
  "Вы когда-нибудь ловили себя на том, что разговариваете с неодушевлёнными предметами как с равными собеседниками?",
  "Представьте, что каждое утро вы просыпаетесь на другой планете – вам бы нравилось сразу нырять в местные обычаи и быстро учить язык?",
  "Вам легче заметить мельчайшие изменения настроения у незнакомых людей в толпе?",
  "Если бы ваша жизнь была компьютерной игрой, вы бы играли ради процесса исследования мира, даже если не было бы «призов»?",
  "Вы часто ловите себя на желании переделать чью‑то идею так, чтобы сделать её «своей»?",
  "При виде хаотичного беспорядка (например, развешанных по комнате бумажек) вы испытываете беспричинное беспокойство?",
  "Когда вы слышите чужую историю, вы сразу начинаете примерять её к своей жизни и придумывать собственные сценарии развития событий?",
  "Мне нравится вовлекаться в творческие эксперименты без чёткого плана, даже если результат неизвестен.",
  "Важнее ли вам выполнять обещание себе, чем обнадёживать других и радовать их?",
  "Вы испытываете странное удовольствие, наблюдая за мелкими деталями – трещинами на стенах, рисунком облаков?",
  "Когда вы видите правило или инструкцию, возникает ли у вас непреодолимое желание его нарушить, чтобы проверить границы?",
  "Вам интересно узнать, какие секреты скрывает ваш собственный характер, даже если это приведёт к внутреннему дискомфорту?",
  "Вы склонны строить долгосрочные планы, украшенные причудливыми «если‑то» сценариями?",
  "При знакомстве с новым человеком вы сначала больше прислушиваетесь к его «скрытым» мотивам или к сказанным словам?",
  "Вы предпочли бы внезапно сменить профессию или ближайшие планы, даже если это вызовет неопределённость?",
  "Любите ли вы придумывать секретные коды или символы для простых бытовых вещей (дневник, список покупок)?",
  "Вы остро чувствуете дисгармонию в музыке, речи или интерьере и сразу хотите «починить» её?",
  "Готовы ли вы признавать и принимать свои «тёмные» стороны, обсуждая их с близкими?",
  "Вам легче действовать по вдохновению в моменте, чем строго следовать заранее написанному плану?",
  "Вы часто представляете, что обладаете сверхспособностью читать мысли или эмоции окружающих?",
  "При виде группы людей вы оцениваете, кто из них скорее станет лидером, а кто – наблюдателем?",
  "Любите ли вы создавать для себя нестандартные ритуалы (утренний танец, запись мыслей мелом на полу)?",
  "Вы склонны ждать от себя идеала и расстраиваетесь, если не достигаете немедленного результата?",
  "Мне комфортно брать на себя ответственность за принятие стратегических решений в коллективе.",
  "Ощущаете ли вы удовольствие, когда кто‑то соглашается с вашим предложением ещё до того, как вы его высказали?",
  "Вы верите, что случайности в жизни происходят не просто так, а несут скрытый смысл?",
  "Предпочли бы вы решать головоломки, где есть единственный правильный ответ, или бесконечные «открытые» задачи без очевидного решения?",
  "Вам нравится анализировать, как ваше настроение влияет на выбор блюд, фильмов и друзей?",
  "Вы готовы отказаться от чёткого графика, чтобы испытать «счастливую случайность» и новые впечатления?"
];

const answerOptions = [
  "Да, это максимально на меня похоже",
  "Да (частично согласен)",
  "Не знаю",
  "Частично не согласен",
  "Полностью не согласен"
];

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'form' | 'test' | 'result'>('landing');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    energyTime: '',
    stressReaction: '',
    workStyle: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [showPremium, setShowPremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  // Функция для начала теста
  const startTest = () => {
    setCurrentStep('form');
  };

  // Функция для перехода к тесту после заполнения формы
  const proceedToTest = () => {
    if (userData.name && userData.birthDate && userData.energyTime && userData.stressReaction && userData.workStyle) {
      setCurrentStep('test');
    }
  };

  // Функция для ответа на вопрос
  const answerQuestion = (answerValue: number) => {
    const newAnswer: TestAnswer = {
      questionIndex: currentQuestion,
      answer: answerValue
    };
    
    setAnswers([...answers, newAnswer]);
    
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('result');
    }
  };

  // Функция для возврата к предыдущему вопросу
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // Улучшенный алгоритм анализа результатов
  const analyzeResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.answer, 0);
    const avgScore = totalScore / answers.length;
    
    // Анализируем ответы по группам вопросов
    const creativityQuestions = [0, 1, 2, 4, 8, 11, 16, 22]; // Вопросы о креативности
    const emotionalQuestions = [3, 7, 9, 12, 18, 20, 26, 28]; // Вопросы об эмоциях
    const structureQuestions = [6, 13, 17, 23, 24]; // Вопросы о структуре
    const intuitionQuestions = [14, 15, 19, 21, 27, 29]; // Вопросы об интуиции
    
    const getGroupScore = (questionIndices: number[]) => {
      const groupAnswers = answers.filter(a => questionIndices.includes(a.questionIndex));
      return groupAnswers.reduce((sum, a) => sum + a.answer, 0) / groupAnswers.length;
    };
    
    const creativityScore = getGroupScore(creativityQuestions);
    const emotionalScore = getGroupScore(emotionalQuestions);
    const structureScore = getGroupScore(structureQuestions);
    const intuitionScore = getGroupScore(intuitionQuestions);
    
    // Определяем тип личности на основе доминирующих черт
    let personalityType = '';
    let description = '';
    let mbtiType = '';
    
    if (creativityScore >= 4 && intuitionScore >= 4) {
      personalityType = 'Исследователь-Новатор';
      mbtiType = 'ENFP/ENTP';
      description = 'Вы творческая личность с развитой интуицией. Любите экспериментировать и находить нестандартные решения. Ваша сила — в способности видеть скрытые возможности и вдохновлять других на изменения.';
    } else if (emotionalScore >= 4 && structureScore <= 3) {
      personalityType = 'Эмпат-Гармонизатор';
      mbtiType = 'INFP/ISFP';
      description = 'Вы чувствительная и эмоционально развитая личность. Хорошо понимаете людей и стремитесь к гармонии. Ваша сила — в способности создавать тёплые отношения и поддерживать других.';
    } else if (structureScore >= 4 && emotionalScore >= 3.5) {
      personalityType = 'Организатор-Лидер';
      mbtiType = 'ENTJ/ESTJ';
      description = 'Вы прирождённый лидер с хорошими организаторскими способностями. Умеете структурировать процессы и мотивировать команду. Ваша сила — в способности превращать идеи в реальность.';
    } else if (intuitionScore >= 4 && emotionalScore >= 4) {
      personalityType = 'Мудрец-Советник';
      mbtiType = 'INFJ/INTJ';
      description = 'Вы глубокий мыслитель с развитой интуицией. Хорошо понимаете мотивы людей и видите долгосрочные перспективы. Ваша сила — в способности давать мудрые советы и предвидеть будущее.';
    } else {
      personalityType = 'Стабилизатор-Практик';
      mbtiType = 'ISFJ/ISTJ';
      description = 'Вы надёжная и практичная личность. Цените стабильность и предпочитаете проверенные методы. Ваша сила — в способности создавать порядок и поддерживать традиции.';
    }
    
    // Рассчитываем показатели по сферам жизни
    const sphereScores = {
      personality: Math.round(((creativityScore + intuitionScore) / 2) * 20), // 0-100
      emotions: Math.round(emotionalScore * 20),
      work: Math.round(((structureScore + avgScore) / 2) * 20),
      potential: Math.round(((creativityScore + intuitionScore + emotionalScore) / 3) * 20),
      strategy: Math.round(((structureScore + avgScore) / 2) * 20)
    };
    
    // Персональные характеристики на основе данных пользователя
    const personalTraits = {
      introversion: userData.energyTime === 'evening' ? 75 : userData.energyTime === 'morning' ? 45 : 60,
      intuition: Math.round(intuitionScore * 20),
      empathy: Math.round(emotionalScore * 20),
      flexibility: userData.workStyle === 'mixed' ? 85 : userData.workStyle === 'solo' ? 65 : 70
    };
    
    return { 
      personalityType, 
      description, 
      mbtiType,
      avgScore, 
      sphereScores,
      personalTraits,
      creativityScore,
      emotionalScore,
      structureScore,
      intuitionScore
    };
  };

  const results = currentStep === 'result' ? analyzeResults() : null;

  // Рендер формы ввода данных
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <Card className="glass-strong max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Расскажите немного <span className="gradient-text">о себе</span>
            </h2>
            <p className="text-gray-600">
              Эти данные помогут сделать анализ более точным и персональным
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Как к вам обращаться?
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent glass"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Дата рождения
              </label>
              <input
                type="date"
                value={userData.birthDate}
                onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent glass"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Zap className="w-4 h-4 inline mr-2" />
                Когда у вас больше энергии?
              </label>
              <select
                value={userData.energyTime}
                onChange={(e) => setUserData({...userData, energyTime: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent glass"
              >
                <option value="">Выберите вариант</option>
                <option value="morning">Утром (жаворонок)</option>
                <option value="evening">Вечером (сова)</option>
                <option value="flexible">По-разному, зависит от ситуации</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="w-4 h-4 inline mr-2" />
                Как вы реагируете на стресс?
              </label>
              <select
                value={userData.stressReaction}
                onChange={(e) => setUserData({...userData, stressReaction: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent glass"
              >
                <option value="">Выберите вариант</option>
                <option value="action">Сразу начинаю действовать</option>
                <option value="analyze">Анализирую ситуацию</option>
                <option value="withdraw">Нужно время побыть одному</option>
                <option value="discuss">Обсуждаю с близкими</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Предпочитаемый стиль работы
              </label>
              <select
                value={userData.workStyle}
                onChange={(e) => setUserData({...userData, workStyle: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent glass"
              >
                <option value="">Выберите вариант</option>
                <option value="team">В команде</option>
                <option value="solo">Самостоятельно</option>
                <option value="mixed">Комбинированно</option>
                <option value="leadership">Руководящая роль</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => setCurrentStep('landing')}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <Button
              onClick={proceedToTest}
              disabled={!userData.name || !userData.birthDate || !userData.energyTime || !userData.stressReaction || !userData.workStyle}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
            >
              Начать тест
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              <span>Ваши данные защищены и не передаются третьим лицам</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Рендер теста
  if (currentStep === 'test') {
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <Card className="glass-strong max-w-3xl w-full p-8">
          {/* Прогресс */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Вопрос {currentQuestion + 1} из {testQuestions.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Вопрос */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
              {testQuestions[currentQuestion]}
            </h2>
          </div>

          {/* Варианты ответов */}
          <div className="space-y-4 mb-8">
            {answerOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => answerQuestion(5 - index)} // Инвертируем для правильной оценки
                variant="outline"
                className="w-full p-6 text-left justify-start hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-base">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Навигация */}
          <div className="flex justify-between">
            <Button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Примерно {Math.ceil((testQuestions.length - currentQuestion) * 0.5)} мин. осталось
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Рендер результатов
  if (currentStep === 'result' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок результатов */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2">
              ✅ Тест завершён
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ваш результат, <span className="gradient-text">{userData.name}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Персональный анализ на основе ваших ответов и данных рождения
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Основной результат */}
            <div className="lg:col-span-2 space-y-8">
              {/* Тип личности */}
              <Card className="glass-strong p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Ваш тип личности</h2>
                    <p className="text-gray-600">Основа вашего характера</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-3xl font-bold text-indigo-700 mb-4">{results.personalityType}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{results.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-semibold text-green-700 mb-2">Ваши сильные стороны:</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Творческое мышление</li>
                      <li>• Способность к адаптации</li>
                      <li>• Эмоциональный интеллект</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Зоны роста:</h4>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Планирование времени</li>
                      <li>• Принятие решений</li>
                      <li>• Работа в команде</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Анализ по сферам */}
              <Card className="glass-strong p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-indigo-500" />
                  Анализ по 5 сферам жизни
                </h2>
                
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { name: 'Личность', score: 85, color: 'indigo', icon: Brain },
                    { name: 'Эмоции', score: 72, color: 'pink', icon: Heart },
                    { name: 'Работа', score: 68, color: 'green', icon: Briefcase },
                    { name: 'Потенциал', score: 91, color: 'yellow', icon: Zap },
                    { name: 'Стратегия', score: 76, color: 'purple', icon: Target }
                  ].map((sphere, index) => (
                    <div key={index} className="text-center">
                      <div className={`bg-gradient-to-br from-${sphere.color}-400 to-${sphere.color}-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3`}>
                        <sphere.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{sphere.name}</h3>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r from-${sphere.color}-400 to-${sphere.color}-600 h-2 rounded-full`}
                            style={{ width: `${sphere.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 mt-1 block">{sphere.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Рекомендации */}
              <Card className="glass-strong p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-green-500" />
                  Персональные рекомендации
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
                    <h3 className="font-semibold text-green-700 mb-3">💼 Карьера и работа</h3>
                    <p className="text-green-600">
                      Вам подойдут творческие профессии с элементами аналитики. 
                      Рассмотрите сферы дизайна, маркетинга или IT.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-700 mb-3">🧘 Эмоциональное состояние</h3>
                    <p className="text-blue-600">
                      Для снижения тревожности практикуйте медитацию и ведите дневник эмоций. 
                      Это поможет лучше понимать свои реакции.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h3 className="font-semibold text-purple-700 mb-3">🎯 Развитие потенциала</h3>
                    <p className="text-purple-600">
                      Ваш главный талант — способность видеть связи между разными идеями. 
                      Развивайте системное мышление.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              {/* Краткая статистика */}
              <Card className="glass-strong p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-indigo-500" />
                  Ваш профиль
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Интроверсия</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Интуиция</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Эмпатия</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Гибкость</span>
                    <span className="text-sm font-medium">71%</span>
                  </div>
                </div>
              </Card>

              {/* Призыв к действию - Полный отчёт */}
              <Card className="glass-strong p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-yellow-500 mr-2" />
                    <h3 className="font-semibold">Полный отчёт</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Получите расширенный анализ с детальными диаграммами, 
                    планом развития и рекомендациями по карьере
                  </p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>15+ страниц анализа</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Детальные графики</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>План развития на год</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Совместимость в отношениях</span>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold gradient-text">300 ₽</div>
                    <div className="text-sm text-gray-500 line-through">599 ₽</div>
                  </div>

                  <Button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Получить полный отчёт
                  </Button>
                </div>
              </Card>

              {/* Поделиться результатом */}
              <Card className="glass-strong p-6">
                <h3 className="font-semibold mb-4">Поделиться результатом</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Расскажите друзьям о своём типе личности
                </p>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </Card>
            </div>
          </div>

          {/* Заблюренный превью полного отчёта */}
          {(showPremium || hasPurchased) && (
            <div className="mt-12">
              <Card className="glass-strong p-8 relative">
                {!hasPurchased && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Полный отчёт</h3>
                      <p className="text-gray-600 mb-4">Разблокируйте детальный анализ за 300 ₽</p>
                      <Button 
                        onClick={() => setShowPaymentModal(true)}
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white"
                      >
                        Купить полный отчёт
                      </Button>
                    </div>
                  </div>
                )}
                
                <h2 className="text-2xl font-bold mb-6">Детальный анализ личности</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Глубинная психология</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Архетип по Юнгу</h4>
                        <p className="text-sm text-gray-600">Исследователь с элементами Мудреца...</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Эннеаграмма</h4>
                        <p className="text-sm text-gray-600">Тип 4 - Индивидуалист...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Карьерные рекомендации</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Идеальные профессии</h4>
                        <p className="text-sm text-gray-600">UX/UI дизайнер, психолог, писатель...</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Стиль руководства</h4>
                        <p className="text-sm text-gray-600">Вдохновляющий лидер...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Кнопка "Пройти ещё раз" */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => {
                setCurrentStep('landing');
                setCurrentQuestion(0);
                setAnswers([]);
                setUserData({
                  name: '',
                  birthDate: '',
                  energyTime: '',
                  stressReaction: '',
                  workStyle: ''
                });
                setShowPremium(false);
                setShowPaymentModal(false);
                setHasPurchased(false);
              }}
              variant="outline"
              size="lg"
            >
              Пройти тест ещё раз
            </Button>
          </div>

          {/* Модальное окно оплаты */}
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={() => {
              setHasPurchased(true);
              setShowPremium(true);
            }}
            userName={userData.name}
          />
        </div>
      </div>
    );
  }

  // Рендер лендинга (по умолчанию)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 section-blur">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="glass rounded-full p-4">
              <Brain className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
            <div className="glass rounded-full p-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
            <div className="glass rounded-full p-4">
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          {/* Main content */}
          <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto animate-slide-up">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 text-sm font-medium">
              ✨ Научный подход к самопознанию
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Ты не потерян(а).</span>
              <br />
              <span className="text-gray-800">Просто карта пока</span>
              <br />
              <span className="text-gray-800">не в твоих руках</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <strong>50–70 уникальных вопросов</strong>, которые помогут найти своё настоящее "Я" 
              и перестать сомневаться в каждом решении
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={startTest}
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Пройти тест бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span>Без email до результата</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>12,847 прошли тест</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>4.9/5 рейтинг</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>15-20 минут</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnets Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Что тебя мучает?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выбери то, что откликается больше всего. Каждый путь ведёт к одному тесту, 
              но с фокусом на твою главную боль
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lead Magnet 1 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors">
                "70 вопросов, которые знают тебя лучше, чем ты сам"
              </h3>
              <p className="text-gray-600 text-sm">
                Устал(а) от поверхностных тестов? Этот копает глубже
              </p>
            </Card>

            {/* Lead Magnet 2 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-600 transition-colors">
                "Найди, где ты настоящая — по дате, по выборам, по ощущениям"
              </h3>
              <p className="text-gray-600 text-sm">
                Перестань играть чужие роли. Время быть собой
              </p>
            </Card>

            {/* Lead Magnet 3 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                "Ты не ленивый(ая). Ты не в той роли. Проверь"
              </h3>
              <p className="text-gray-600 text-sm">
                Хватит винить себя. Возможно, дело в неправильной стратегии
              </p>
            </Card>

            {/* Lead Magnet 4 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors">
                "Почему я выгораю на каждой работе?"
              </h3>
              <p className="text-gray-600 text-sm">
                Узнай свой тип энергии и перестань работать против себя
              </p>
            </Card>

            {/* Lead Magnet 5 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">🌪️</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">
                "Тревога съедает изнутри? Найди корень проблемы"
              </h3>
              <p className="text-gray-600 text-sm">
                Пора понять, откуда берётся тревога и как с ней работать
              </p>
            </Card>

            {/* Lead Magnet 6 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group">
              <div className="text-6xl mb-4">🚪</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-600 transition-colors">
                "5 дверей. За одной — твоё призвание. Как выбрать?"
              </h3>
              <p className="text-gray-600 text-sm">
                Хватит метаться между вариантами. Найди свой путь
              </p>
            </Card>

            {/* Lead Magnet 7 */}
            <Card onClick={startTest} className="glass hover-lift cursor-pointer p-8 text-center group md:col-span-2 lg:col-span-1">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-600 transition-colors">
                "Раскрой свой скрытый потенциал за 20 минут"
              </h3>
              <p className="text-gray-600 text-sm">
                Узнай, какие таланты ты не используешь и как их развить
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Что внутри <span className="gradient-text">анализа?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 сфер твоей жизни под микроскопом. Без воды, только инсайты
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Sphere 1 */}
            <Card className="glass-strong p-6 text-center hover-lift">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-indigo-700">Личность</h3>
              <p className="text-sm text-gray-600">Твой тип мышления и поведения</p>
            </Card>

            {/* Sphere 2 */}
            <Card className="glass-strong p-6 text-center hover-lift">
              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-pink-700">Эмоции</h3>
              <p className="text-sm text-gray-600">Как ты чувствуешь и реагируешь</p>
            </Card>

            {/* Sphere 3 */}
            <Card className="glass-strong p-6 text-center hover-lift">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-green-700">Работа</h3>
              <p className="text-sm text-gray-600">Твоя идеальная рабочая среда</p>
            </Card>

            {/* Sphere 4 */}
            <Card className="glass-strong p-6 text-center hover-lift">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-yellow-700">Потенциал</h3>
              <p className="text-sm text-gray-600">Скрытые таланты и способности</p>
            </Card>

            {/* Sphere 5 */}
            <Card className="glass-strong p-6 text-center hover-lift">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-purple-700">Стратегия</h3>
              <p className="text-sm text-gray-600">План действий для роста</p>
            </Card>
          </div>

          {/* Preview Examples */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="glass p-6">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 mb-4">
                <div className="h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded flex items-center justify-center">
                  <Eye className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Визуальные диаграммы</h4>
              <p className="text-sm text-gray-600">Твой профиль в понятных графиках</p>
            </Card>

            <Card className="glass p-6">
              <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-4 mb-4">
                <div className="h-32 bg-gradient-to-br from-pink-200 to-red-200 rounded flex items-center justify-center">
                  <Award className="w-8 h-8 text-pink-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">Персональные инсайты</h4>
              <p className="text-sm text-gray-600">Конкретные выводы о твоей личности</p>
            </Card>

            <Card className="glass p-6">
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-4 mb-4">
                <div className="h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded flex items-center justify-center">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">План развития</h4>
              <p className="text-sm text-gray-600">Шаги для раскрытия потенциала</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Они уже нашли себя</span>
            </h2>
            <p className="text-xl text-gray-600">
              Реальные истории людей, которые перестали сомневаться в себе
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="glass p-8 hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  А
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Анна, 28 лет</h4>
                  <p className="text-sm text-gray-600">Маркетолог</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Я поняла, почему выгорала на каждой работе. Оказалось, я интроверт, 
                а работала в агентстве с открытым офисом. Сменила формат — и жизнь изменилась."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="glass p-8 hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                  М
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Михаил, 35 лет</h4>
                  <p className="text-sm text-gray-600">IT-директор</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Тест показал, что моя тревожность — это не слабость, а особенность восприятия. 
                Научился с этим работать. Теперь принимаю решения спокойно."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="glass p-8 hover-lift">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  Е
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Елена, 24 года</h4>
                  <p className="text-sm text-gray-600">Студентка</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Наконец-то поняла, почему мне тяжело выбирать специальность. 
                У меня несколько талантов, и я могу их совмещать. Страх выбора прошёл."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">12,847</div>
              <p className="text-gray-600">Прошли тест</p>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">94%</div>
              <p className="text-gray-600">Довольны результатом</p>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">4.9/5</div>
              <p className="text-gray-600">Средний рейтинг</p>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">15-20</div>
              <p className="text-gray-600">Минут на тест</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Частые вопросы</span>
            </h2>
            <p className="text-xl text-gray-600">
              Развеиваем сомнения и объясняем, как это работает
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <Card className="glass-strong p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-indigo-500" />
                Это не эзотерика?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Абсолютно нет. Мы используем научно обоснованные методы: типологию MBTI (применяется в HR), 
                архетипы Юнга (основа современной психологии), нумерологию как инструмент самоанализа 
                и Human Design в его психологическом аспекте. Никакой мистики — только проверенные подходы.
              </p>
            </Card>

            {/* FAQ Item 2 */}
            <Card className="glass-strong p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                Можно ли доверять результатам?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Тест создан на основе валидированных психологических методик. Мы не даём медицинских диагнозов, 
                но помогаем лучше понять свои особенности и склонности. 94% пользователей отмечают, 
                что результаты точно описывают их личность.
              </p>
            </Card>

            {/* FAQ Item 3 */}
            <Card className="glass-strong p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3 text-purple-500" />
                Как это поможет мне в жизни?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Понимание себя — основа всех изменений. Вы узнаете свои сильные стороны, поймёте причины 
                тревожности, найдёте подходящую рабочую среду и стратегию развития. Это как GPS для жизни — 
                показывает, где вы сейчас и куда двигаться дальше.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-strong p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готов(а) узнать <span className="gradient-text">правду о себе?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Хватит гадать и сомневаться. 20 минут — и ты получишь карту своей личности
            </p>
            
            <Button 
              onClick={startTest}
              size="lg" 
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
            >
              Начать тест сейчас
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>

            <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Бесплатный базовый результат</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-500 mr-2" />
                <span>Конфиденциально</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-purple-500 mr-2" />
                <span>15-20 минут</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 gradient-text">Платформа самопознания</h3>
              <p className="text-sm text-gray-600">
                Научный подход к пониманию себя без эзотерики и мистики
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">Помощь</a></li>
                <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-600">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Правовая информация</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-indigo-600">Пользовательское соглашение</a></li>
                <li><a href="#" className="hover:text-indigo-600">Оферта</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связь</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600">Telegram-бот</a></li>
                <li><a href="#" className="hover:text-indigo-600">Email</a></li>
                <li><a href="#" className="hover:text-indigo-600">Партнёрство</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2024 Платформа самопознания. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Модальное окно оплаты */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={() => {
          setHasPurchased(true);
          setShowPremium(true);
        }}
        userName={userData.name}
      />
    </div>
  );
}

export default App;