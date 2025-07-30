import React, { useState } from 'react'
import { X, CreditCard, Smartphone, Wallet, Shield, CheckCircle } from 'lucide-react'

interface PaymentModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!selectedMethod) return
    
    setIsProcessing(true)
    
    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess()
    }, 2000)
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Банковская карта',
      description: 'Visa, MasterCard, МИР',
      icon: <CreditCard className="w-6 h-6" />,
      popular: true
    },
    {
      id: 'sbp',
      name: 'Система быстрых платежей',
      description: 'Оплата через СБП',
      icon: <Smartphone className="w-6 h-6" />,
      popular: false
    },
    {
      id: 'yumoney',
      name: 'ЮMoney',
      description: 'Яндекс.Деньги',
      icon: <Wallet className="w-6 h-6" />,
      popular: false
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="nature-card max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="nature-heading text-2xl mb-2">Получить полный отчёт</h2>
          <p className="text-gray-600">Детальный анализ личности с рекомендациями</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl mb-6">
            <span className="font-medium text-green-800">Полный отчёт PDF</span>
            <span className="text-2xl font-bold text-green-700">300₽</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-3">Выберите способ оплаты:</h3>
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.name}</span>
                      {method.popular && (
                        <span className="nature-badge text-xs">Популярный</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.id && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className="nature-button-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Обработка платежа...
              </div>
            ) : (
              `Оплатить 300₽`
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Защищённый платёж через ЮKassa</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-2">Что входит в полный отчёт:</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Детальный MBTI анализ с объяснениями</li>
            <li>• Карьерные рекомендации и профессии</li>
            <li>• План личностного развития</li>
            <li>• Советы по работе с тревожностью</li>
            <li>• PDF-файл на 15+ страниц</li>
          </ul>
        </div>
      </div>
    </div>
  )
}