import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TestFormProps {
  onStartTest: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  birthDate: string;
  energyTime: string;
  stressReaction: string;
  workStyle: string;
}

export const TestForm: React.FC<TestFormProps> = ({ onStartTest }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    energyTime: '',
    stressReaction: '',
    workStyle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.birthDate && userData.energyTime && userData.stressReaction && userData.workStyle) {
      onStartTest(userData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-card border-0 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Расскажите о себе
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Несколько вопросов, чтобы создать персональный анализ
          </p>
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium">
              ✨ Без email до показа результата • Данные не передаются третьим лицам
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium">Как к вам обращаться?</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ваше имя"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="h-12 text-lg glass-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-lg font-medium">Дата рождения</Label>
              <Input
                id="birthDate"
                type="date"
                value={userData.birthDate}
                onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                className="h-12 text-lg glass-input"
                required
              />
              <p className="text-sm text-gray-500">Для анализа по числу жизненного пути и Human Design</p>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Когда у вас больше энергии?</Label>
              <RadioGroup
                value={userData.energyTime}
                onValueChange={(value) => setUserData({...userData, energyTime: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning" className="cursor-pointer">🌅 Утром (жаворонок)</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening" className="cursor-pointer">🌙 Вечером (сова)</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="varies" id="varies" />
                  <Label htmlFor="varies" className="cursor-pointer">⚡ По-разному, зависит от дня</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Как вы реагируете на стресс?</Label>
              <RadioGroup
                value={userData.stressReaction}
                onValueChange={(value) => setUserData({...userData, stressReaction: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="action" id="action" />
                  <Label htmlFor="action" className="cursor-pointer">🏃‍♀️ Сразу начинаю действовать</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="analyze" id="analyze" />
                  <Label htmlFor="analyze" className="cursor-pointer">🤔 Анализирую ситуацию</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="support" id="support" />
                  <Label htmlFor="support" className="cursor-pointer">🤝 Ищу поддержку у других</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="withdraw" id="withdraw" />
                  <Label htmlFor="withdraw" className="cursor-pointer">🏠 Ухожу в себя</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Ваш стиль работы?</Label>
              <RadioGroup
                value={userData.workStyle}
                onValueChange={(value) => setUserData({...userData, workStyle: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="structured" id="structured" />
                  <Label htmlFor="structured" className="cursor-pointer">📋 Люблю четкий план и структуру</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="cursor-pointer">🌊 Предпочитаю гибкость и спонтанность</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="cursor-pointer">⚖️ Комбинирую оба подхода</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Начать тест ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};