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
        <button onClick={handlePrev} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <div className="text-6xl mb-2">{counter.emoji}</div>
          <h2 className="text-4xl font-bold mb-2">〜{counter.kanji}</h2>
          <p className="text-slate-600 font-medium">{counter.meaning}</p>
        </div>
        <button onClick={handleNext} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 active:scale-90 transition-transform">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="bg-purple-50 w-full p-4 rounded-lg mb-6 shadow-sm border border-purple-100">
        <p className="text-slate-700">{counter.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 items-end">
          <span className="text-sm text-slate-700 font-bold mb-1">Ví dụ:</span>
          {counter.items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <ruby className="text-lg font-bold text-slate-800">
                {item.word}
                <rt className="text-xs text-slate-500 font-normal">{item.reading}</rt>
              </ruby>
              <span className="text-xs text-purple-600 font-medium mt-1">{item.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="w-1/2 flex flex-col gap-2">
          {col1.map((item) => (
            <div
              key={item.number}
              onClick={() => playAudio(item.reading)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:border-purple-400 active:scale-95 transition-all ${item.isSpecial ? 'bg-pink-100 border-pink-200' : 'bg-white border-slate-200'}`}
            >
              <span className="font-bold text-lg">{item.kanji}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-700">{item.reading}</span>
                <Volume2 size={16} className="text-purple-500" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          {col2.map((item) => (
            <div
              key={item.number}
              onClick={() => playAudio(item.reading)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:border-purple-400 active:scale-95 transition-all ${item.isSpecial ? 'bg-pink-100 border-pink-200' : 'bg-white border-slate-200'}`}
            >
              <span className="font-bold text-lg">{item.kanji}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-700">{item.reading}</span>
                <Volume2 size={16} className="text-purple-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicLearning;
