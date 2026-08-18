import { useState } from 'react';
import { countersData } from '../data/counters';
import { ChevronLeft, ChevronRight, Check, X, Volume2 } from 'lucide-react';
import { playAudio } from '../utils/tts';

const PracticeMode = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const counter = countersData[currentIndex];
  
  const [inputs, setInputs] = useState<Record<number, string>>({});

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? countersData.length - 1 : prev - 1));
    setInputs({});
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === countersData.length - 1 ? 0 : prev + 1));
    setInputs({});
  };

  const handleChange = (number: number, value: string) => {
    setInputs(prev => ({ ...prev, [number]: value }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <button onClick={handlePrev} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <div className="text-4xl mb-2">{counter.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">Luyện tập: 〜{counter.kanji}</h2>
          <p className="text-gray-500">Hãy nhập cách đọc bằng Hiragana</p>
        </div>
        <button onClick={handleNext} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
        {counter.conjugations.map((item) => {
          const isCorrect = inputs[item.number] === item.reading;
          const hasInput = (inputs[item.number] || '').length > 0;
          
          return (
            <div key={item.number} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="font-bold text-xl w-12">{item.number}{counter.kanji}</span>
              <input
                type="text"
                value={inputs[item.number] || ''}
                onChange={(e) => handleChange(item.number, e.target.value)}
                placeholder="cách đọc"
                className={`flex-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 ${hasInput ? (isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300') : ''}`}
              />
              <div className="w-8 flex justify-center">
                {hasInput && isCorrect && <Check className="text-green-500" size={24} />}
                {hasInput && !isCorrect && <X className="text-red-500" size={24} />}
              </div>
              <button 
                onClick={() => playAudio(item.reading)}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 active:scale-90 rounded-full transition-all"
                title="Phát âm thanh"
              >
                <Volume2 size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeMode;
