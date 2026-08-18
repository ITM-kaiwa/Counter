import { useState } from 'react';
import { countersData } from '../data/counters';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { playAudio } from '../utils/tts';

const BasicLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const counter = countersData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? countersData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === countersData.length - 1 ? 0 : prev + 1));
  };

  const half = Math.ceil(counter.conjugations.length / 2);
  const col1 = counter.conjugations.slice(0, half);
  const col2 = counter.conjugations.slice(half);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <button onClick={handlePrev} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">〜{counter.kanji}</h2>
          <p className="text-gray-600 font-medium">{counter.meaning}</p>
        </div>
        <button onClick={handleNext} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="bg-blue-50 w-full p-4 rounded-lg mb-6 shadow-sm border border-blue-100">
        <p className="text-gray-700">{counter.description}</p>
        <p className="mt-2 text-sm text-gray-500 font-bold">例: {counter.items.join('、')}</p>
      </div>

      <div className="flex w-full gap-4">
        <div className="w-1/2 flex flex-col gap-2">
          {col1.map((item) => (
            <div 
              key={item.number} 
              onClick={() => playAudio(item.reading)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:border-blue-400 transition-colors ${item.isSpecial ? 'bg-pink-100 border-pink-200' : 'bg-white border-gray-200'}`}
            >
              <span className="font-bold text-lg">{item.kanji}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{item.reading}</span>
                <Volume2 size={16} className="text-blue-500" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          {col2.map((item) => (
            <div 
              key={item.number} 
              onClick={() => playAudio(item.reading)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:border-blue-400 transition-colors ${item.isSpecial ? 'bg-pink-100 border-pink-200' : 'bg-white border-gray-200'}`}
            >
              <span className="font-bold text-lg">{item.kanji}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{item.reading}</span>
                <Volume2 size={16} className="text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicLearning;
