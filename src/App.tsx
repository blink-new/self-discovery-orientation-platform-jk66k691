import React, { useState } from 'react'
import { ChevronRight, Users, Star, CheckCircle, ArrowRight, Leaf, Sprout, TreePine } from 'lucide-react'
import PaymentModal from './components/PaymentModal'

interface UserData {
  name: string
  birthDate: string
  energy: string
  stress: string
  workStyle: string
}

interface TestResult {
  personalityType: string
  scores: {
    personality: number
    emotions: number
    work: number
    potential: number
    strategy: number
  }
  recommendations: string[]
  insights: string[]
}

const questions = [
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
]

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing')
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    energy: '',
    stress: '',
    workStyle: ''
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasPaidAccess, setHasPaidAccess] = useState(false)

  const handleStartTest = () => {
    setCurrentStep('form')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userData.name && userData.birthDate && userData.energy && userData.stress && userData.workStyle) {
      setCurrentStep('test')
    }
  }

  const generateResult = (finalAnswers: number[]) => {
    // Группируем вопросы по категориям для анализа
    const creativity = finalAnswers.slice(0, 8).reduce((a, b) => a + b, 0) / 8
    const emotions = finalAnswers.slice(8, 16).reduce((a, b) => a + b, 0) / 8
    const structure = finalAnswers.slice(16, 24).reduce((a, b) => a + b, 0) / 8
    const intuition = finalAnswers.slice(24, 30).reduce((a, b) => a + b, 0) / 6

    // Определяем тип личности
    let personalityType = "Исследователь"
    if (creativity > 3.5 && intuition > 3.5) personalityType = "Визионер"
    else if (emotions > 3.5 && structure < 3) personalityType = "Эмпат"
    else if (structure > 3.5 && emotions < 3) personalityType = "Аналитик"
    else if (creativity > 3.5 && structure > 3.5) personalityType = "Новатор"

    const result: TestResult = {
      personalityType,
      scores: {
        personality: Math.round(creativity * 20),
        emotions: Math.round(emotions * 20),
        work: Math.round(structure * 20),
        potential: Math.round(intuition * 20),
        strategy: Math.round((creativity + structure) * 10)
      },
      recommendations: [
        `Как ${personalityType}, вы лучше всего проявляете себя в творческой среде`,
        "Развивайте навыки эмоционального интеллекта для лучшего взаимодействия",
        "Структурируйте свои идеи для более эффективной реализации"
      ],
      insights: [
        "Ваша интуиция - ваша сильная сторона",
        "Обратите внимание на баланс между спонтанностью и планированием",
        "Используйте свою креативность для решения сложных задач"
      ]
    }

    setTestResult(result)
    setCurrentStep('result')
  }

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateResult(newAnswers)
    }
  }

  const handlePaymentSuccess = () => {
    setHasPaidAccess(true)
    setShowPaymentModal(false)
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-700" />
            <span className="font-bold text-xl text-green-900">Самопознание</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">Главная</a>
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">О тесте</a>
            <a href="#" className="text-green-700 hover:text-green-900 font-medium">Контакты</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="nature-hero min-h-[80vh] flex items-center justify-center relative">
          <div className="leaf-decoration top-20 left-20"></div>
          <div className="leaf-decoration top-40 right-32"></div>
          <div className="leaf-decoration bottom-32 left-1/4"></div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="nature-badge inline-block mb-6">
              🌱 Научный подход к самопознанию
            </div>
            
            <h1 className="nature-title mb-6">
              Ты не потерян(а).<br />
              Просто карта пока<br />
              не в твоих руках
            </h1>
            
            <p className="nature-subtitle mb-8 max-w-2xl mx-auto">
              30 уникальных вопросов, которые помогут найти своё настоящее "Я" 
              и определить стратегию жизни без тревожности
            </p>
            
            <button 
              onClick={handleStartTest}
              className="nature-button text-lg px-8 py-4 inline-flex items-center gap-3"
            >
              Пройти тест бесплатно
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>12,847 прошли тест</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span>4.9 из 5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnets */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="nature-heading text-4xl text-center mb-4">
              Что вы узнаете о себе
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Каждый блок раскрывает новую грань вашей личности
            </p>
            
            <div className="nature-grid">
              {[
                {
                  icon: "🧠",
                  title: "30 вопросов, которые знают тебя лучше, чем ты сам",
                  description: "Уникальные психологические вопросы, основанные на научных методиках"
                },
                {
                  icon: "🎯",
                  title: "Найди, где ты настоящая — по дате, по выборам, по ощущениям",
                  description: "Комплексный анализ личности через призму разных подходов"
                },
                {
                  icon: "⚡",
                  title: "Ты не ленивый(ая). Ты не в той роли. Проверь",
                  description: "Определите свои истинные таланты и предназначение"
                },
                {
                  icon: "💼",
                  title: "Почему я выгораю на каждой работе?",
                  description: "Найдите профессию, которая будет приносить энергию, а не забирать её"
                },
                {
                  icon: "🌟",
                  title: "Твой скрытый потенциал ждёт активации",
                  description: "Раскройте способности, о которых вы даже не подозревали"
                },
                {
                  icon: "🧭",
                  title: "Стратегия жизни, написанная специально для тебя",
                  description: "Персональный план развития на основе вашего типа личности"
                },
                {
                  icon: "💚",
                  title: "Как перестать тревожиться и начать жить",
                  description: "Практические техники работы с тревожностью для вашего типа"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  onClick={handleStartTest}
                  className="nature-card p-8 cursor-pointer group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="nature-heading text-xl mb-3 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center text-green-600 font-medium">
                    Узнать больше <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analysis Areas */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="nature-heading text-4xl mb-4">
                5 сфер глубокого анализа
              </h2>
              <p className="text-gray-600 text-lg">
                Комплексное исследование вашей личности по научным методикам
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { icon: <Sprout className="w-8 h-8" />, title: "Личность", desc: "Тип мышления и поведения" },
                { icon: "💭", title: "Эмоции", desc: "Эмоциональный интеллект" },
                { icon: "💼", title: "Работа", desc: "Профессиональные склонности" },
                { icon: "⭐", title: "Потенциал", desc: "Скрытые способности" },
                { icon: "🎯", title: "Стратегия", desc: "План развития" }
              ].map((area, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center text-green-700">
                    {typeof area.icon === 'string' ? (
                      <span className="text-2xl">{area.icon}</span>
                    ) : (
                      area.icon
                    )}
                  </div>
                  <h3 className="nature-heading text-lg mb-2">{area.title}</h3>
                  <p className="text-gray-600 text-sm">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 px-6 bg-green-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="nature-heading text-4xl text-center mb-16">
              Что говорят те, кто уже прошёл тест
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Анна, 28 лет",
                  text: "Я поняла, почему выгорала на каждой работе. Оказывается, я творческий тип, а работала в строгой корпорации.",
                  rating: 5
                },
                {
                  name: "Михаил, 35 лет", 
                  text: "Тест помог разобраться с тревожностью. Теперь знаю свои триггеры и как с ними работать.",
                  rating: 5
                },
                {
                  name: "Елена, 24 года",
                  text: "Наконец-то понимаю, в какую сторону развиваться. Рекомендации очень точные и практичные.",
                  rating: 5
                }
              ].map((review, index) => (
                <div key={index} className="nature-card p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <p className="font-medium text-green-700">{review.name}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-8 text-green-700">
                <div className="text-center">
                  <div className="nature-stat">12,847</div>
                  <div className="nature-stat-label">Прошли тест</div>
                </div>
                <div className="text-center">
                  <div className="nature-stat">94%</div>
                  <div className="nature-stat-label">Довольны результатом</div>
                </div>
                <div className="text-center">
                  <div className="nature-stat">4.9</div>
                  <div className="nature-stat-label">Средняя оценка</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="nature-heading text-4xl text-center mb-16">
              Частые вопросы
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Это не эзотерика?",
                  a: "Нет, наш тест основан на научных психологических методиках: Big Five, MBTI, теории архетипов Юнга. Никакой мистики — только проверенные подходы."
                },
                {
                  q: "Можно ли доверять результатам?",
                  a: "Тест создан на основе валидированных психологических инструментов. Точность результатов зависит от честности ваших ответов."
                },
                {
                  q: "Как это поможет мне в жизни?",
                  a: "Понимание своего типа личности поможет выбрать подходящую профессию, улучшить отношения, снизить тревожность и найти свой путь развития."
                },
                {
                  q: "Сколько времени займёт тест?",
                  a: "Прохождение теста занимает 10-15 минут. Результат вы получите сразу после завершения."
                }
              ].map((faq, index) => (
                <div key={index} className="nature-card p-6">
                  <h3 className="nature-heading text-lg mb-3">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-green-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-6 h-6" />
                  <span className="font-bold text-lg">Самопознание</span>
                </div>
                <p className="text-green-200">
                  Научный подход к пониманию себя и своего предназначения
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Тест</h4>
                <ul className="space-y-2 text-green-200">
                  <li><a href="#" className="hover:text-white">Пройти тест</a></li>
                  <li><a href="#" className="hover:text-white">О методике</a></li>
                  <li><a href="#" className="hover:text-white">Примеры результатов</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Поддержка</h4>
                <ul className="space-y-2 text-green-200">
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Контакты</a></li>
                  <li><a href="#" className="hover:text-white">Telegram-бот</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Правовая информация</h4>
                <ul className="space-y-2 text-green-200">
                  <li><a href="#" className="hover:text-white">Политика конфиденциальности</a></li>
                  <li><a href="#" className="hover:text-white">Пользовательское соглашение</a></li>
                  <li><a href="#" className="hover:text-white">Оферта</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
              <p>&copy; 2024 Платформа самопознания. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="nature-card max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
              <Sprout className="w-8 h-8 text-green-700" />
            </div>
            <h1 className="nature-heading text-3xl mb-4">
              Расскажите немного о себе
            </h1>
            <p className="text-gray-600">
              Эти данные помогут сделать анализ более точным и персональным
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Как вас зовут?
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="nature-input w-full"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата рождения
              </label>
              <input
                type="date"
                value={userData.birthDate}
                onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                className="nature-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Когда у вас больше энергии?
              </label>
              <select
                value={userData.energy}
                onChange={(e) => setUserData({...userData, energy: e.target.value})}
                className="nature-input w-full"
                required
              >
                <option value="">Выберите вариант</option>
                <option value="morning">Утром</option>
                <option value="day">Днём</option>
                <option value="evening">Вечером</option>
                <option value="night">Ночью</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Как вы реагируете на стресс?
              </label>
              <select
                value={userData.stress}
                onChange={(e) => setUserData({...userData, stress: e.target.value})}
                className="nature-input w-full"
                required
              >
                <option value="">Выберите вариант</option>
                <option value="action">Сразу начинаю действовать</option>
                <option value="analyze">Анализирую ситуацию</option>
                <option value="withdraw">Отстраняюсь и обдумываю</option>
                <option value="seek_support">Ищу поддержку у других</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш стиль работы
              </label>
              <select
                value={userData.workStyle}
                onChange={(e) => setUserData({...userData, workStyle: e.target.value})}
                className="nature-input w-full"
                required
              >
                <option value="">Выберите вариант</option>
                <option value="structured">Люблю структуру и планы</option>
                <option value="flexible">Предпочитаю гибкость</option>
                <option value="creative">Работаю по вдохновению</option>
                <option value="collaborative">Лучше работаю в команде</option>
              </select>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-700">
                  <p className="font-medium mb-1">Обещание конфиденциальности</p>
                  <p>Мы не запрашиваем email до показа результата. Ваши данные используются только для анализа.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="nature-button-primary w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              Начать тест
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (currentStep === 'test') {
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="nature-card max-w-4xl w-full p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm font-medium text-green-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="nature-progress">
              <div 
                className="nature-progress-bar h-2"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <h2 className="nature-heading text-2xl mb-6 leading-relaxed">
              {questions[currentQuestion]}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {[
              { score: 5, text: "Да, это максимально на меня похоже", color: "bg-green-600" },
              { score: 4, text: "Да, частично согласен", color: "bg-green-500" },
              { score: 3, text: "Не знаю", color: "bg-gray-400" },
              { score: 2, text: "Частично не согласен", color: "bg-orange-500" },
              { score: 1, text: "Полностью не согласен", color: "bg-red-500" }
            ].map((option) => (
              <button
                key={option.score}
                onClick={() => handleAnswer(option.score)}
                className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${option.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium text-gray-700 group-hover:text-green-700">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Назад
            </button>
            <div className="text-sm text-gray-500">
              Осталось примерно {Math.ceil((questions.length - currentQuestion - 1) * 0.5)} мин
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'result' && testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-3xl flex items-center justify-center">
              <TreePine className="w-10 h-10 text-green-700" />
            </div>
            <h1 className="nature-heading text-4xl mb-4">
              Ваш результат готов, {userData.name}!
            </h1>
            <p className="text-xl text-gray-600">
              Тип личности: <span className="nature-accent">{testResult.personalityType}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Free Results */}
            <div className="space-y-6">
              <div className="nature-card p-8">
                <h2 className="nature-heading text-2xl mb-6">Анализ по сферам жизни</h2>
                <div className="space-y-6">
                  {Object.entries(testResult.scores).map(([key, value]) => {
                    const labels = {
                      personality: 'Личность',
                      emotions: 'Эмоции', 
                      work: 'Работа',
                      potential: 'Потенциал',
                      strategy: 'Стратегия'
                    }
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{labels[key as keyof typeof labels]}</span>
                          <span className="nature-accent font-bold">{value}%</span>
                        </div>
                        <div className="nature-progress">
                          <div 
                            className="nature-progress-bar h-3"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="nature-card p-8">
                <h3 className="nature-heading text-xl mb-4">Ключевые рекомендации</h3>
                <ul className="space-y-3">
                  {testResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Preview */}
            <div className="relative">
              <div className={`space-y-6 ${!hasPaidAccess ? 'blur-sm' : ''}`}>
                <div className="nature-card p-8">
                  <h3 className="nature-heading text-xl mb-4">Глубокие инсайты</h3>
                  <ul className="space-y-3">
                    {testResult.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="nature-card p-8">
                  <h3 className="nature-heading text-xl mb-4">Детальный анализ MBTI</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">Ваш тип: ENFP-A</h4>
                      <p className="text-green-700">Энтузиаст - творческий, общительный, с богатым воображением</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-800">Экстраверсия</div>
                        <div className="text-2xl font-bold text-blue-600">73%</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-800">Интуиция</div>
                        <div className="text-2xl font-bold text-purple-600">81%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="nature-card p-8">
                  <h3 className="nature-heading text-xl mb-4">Карьерные рекомендации</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <h4 className="font-semibold text-emerald-800 mb-2">Идеальные профессии</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Креативный директор', 'Психолог', 'Журналист', 'Предприниматель'].map(job => (
                          <span key={job} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                            {job}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!hasPaidAccess && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="nature-card p-8 text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-2xl flex items-center justify-center">
                      <Star className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="nature-heading text-2xl mb-4">Полный отчёт</h3>
                    <p className="text-gray-600 mb-6">
                      Получите детальный анализ с диаграммами, персональными рекомендациями и планом развития
                    </p>
                    <div className="space-y-3 mb-6 text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Подробный MBTI анализ</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Карьерные рекомендации</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">План личностного роста</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">PDF-отчёт на 15+ страниц</span>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-green-600">300₽</span>
                      <span className="text-gray-500 ml-2">разовый платёж</span>
                    </div>
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="nature-button-primary w-full text-lg py-4"
                    >
                      Получить полный отчёт
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    )
  }

  return null
}