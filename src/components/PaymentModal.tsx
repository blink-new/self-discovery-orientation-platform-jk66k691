import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle,
  Lock,
  Shield,
  Download
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  userName: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess,
  userName 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'sbp' | 'yandex'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Имитация процесса оплаты
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Банковская карта',
      description: 'Visa, MasterCard, МИР',
      icon: CreditCard,
      popular: true
    },
    {
      id: 'sbp' as const,
      name: 'Система быстрых платежей',
      description: 'Через приложение банка',
      icon: Smartphone,
      popular: false
    },
    {
      id: 'yandex' as const,
      name: 'ЮMoney',
      description: 'Яндекс.Деньги',
      icon: Building,
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-strong max-w-md w-full p-6 relative">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Полный отчёт для <span className="gradient-text">{userName}</span>
          </h2>
          <p className="text-gray-600">
            Получите детальный анализ личности с рекомендациями
          </p>
        </div>

        {/* Что включено */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-green-700 mb-3">Что вы получите:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>15+ страниц детального анализа</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Визуальные диаграммы и графики</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>План развития на 12 месяцев</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Рекомендации по карьере</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Анализ совместимости</span>
            </div>
          </div>
        </div>

        {/* Цена */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-bold gradient-text">300 ₽</span>
            <Badge className="bg-red-100 text-red-600 border-red-200">
              -50%
            </Badge>
          </div>
          <p className="text-sm text-gray-500 line-through">599 ₽</p>
          <p className="text-xs text-gray-500 mt-1">Акция действует ограниченное время</p>
        </div>

        {/* Способы оплаты */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Способ оплаты:</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 flex items-center ${
                  selectedMethod === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <method.icon className="w-5 h-5 mr-3 text-gray-600" />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{method.name}</span>
                    {method.popular && (
                      <Badge className="bg-green-100 text-green-600 text-xs">
                        Популярно
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Кнопка оплаты */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white py-3 text-lg font-semibold"
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Обработка платежа...
            </div>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Оплатить 300 ₽
            </>
          )}
        </Button>

        {/* Безопасность */}
        <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
          <Shield className="w-4 h-4 mr-1" />
          <span>Защищённый платёж через ЮKassa</span>
        </div>
      </Card>
    </div>
  );
};