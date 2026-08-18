import { useState, useEffect } from 'react';
import { countersData } from '../data/counters';
import { playAudio } from '../utils/tts';

const TimeAttack = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  
  const [currentQuestion, setCurrentQuestion] = useState<{
    number: number;
    item: string;
    correctReading: string;
    kanji: string;
    options: string[];
  } | null>(null);

  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const generateQuestion = () => {
    // Pick a random counter category
    const counter = countersData[Math.floor(Math.random() * countersData.length)];
    // Pick a random item from that category
    const item = counter.items[Math.floor(Math.random() * counter.items.length)];
    // Pick a random number 1-10
    const conjugation = counter.conjugations[Math.floor(Math.random() * counter.conjugations.length)];
    
    // Generate 2 wrong options from other conjugations in the SAME or DIFFERENT counter
    // For simplicity, let's pick random readings from anywhere
    const allReadings = countersData.flatMap(c => c.conjugations.map(cj => cj.reading));
    const wrongOptions: string[] = [];
    while (wrongOptions.length < 2) {
      const randomReading = allReadings[Math.floor(Math.random() * allReadings.length)];
      if (randomReading !== conjugation.reading && !wrongOptions.includes(randomReading)) {
        wrongOptions.push(randomReading);
      }
    }

    const options = [conjugation.reading, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      number: conjugation.number,
      item: item,
      correctReading: conjugation.reading,
      kanji: conjugation.kanji,
      options: options
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    generateQuestion();
  };

  const handleAnswer = (option: string) => {
    if (!currentQuestion || !isPlaying) return;
    
    if (option === currentQuestion.correctReading) {
      setScore(prev => prev + 1);
      playAudio(currentQuestion.correctReading);
      generateQuestion();
    } else {
      // penalty or just new question? Let's just generate new and maybe vibrate/red flash
      generateQuestion();
    }
  };

  if (!isPlaying && timeLeft === 30) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">タイムアタックモード</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          30秒以内に、表示されたアイテムの正しい助数詞の読み方を3つの選択肢から選んでください。
        </p>
        <button 
          onClick={startGame}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          スタート！
        </button>
      </div>
    );
  }

  if (!isPlaying && timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">タイムアップ！</h2>
        <p className="text-2xl mb-8">スコア: <span className="font-bold text-red-500">{score}</span> 問正解</p>
        <button 
          onClick={startGame}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          もう一度プレイ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-8 px-4">
        <div className="text-xl font-bold text-gray-600">残り時間: <span className="text-red-500 text-2xl">{timeLeft}</span>秒</div>
        <div className="text-xl font-bold text-gray-600">スコア: <span className="text-blue-500 text-2xl">{score}</span></div>
      </div>

      {currentQuestion && (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-6xl mb-6 flex items-baseline gap-4">
            <span className="font-bold text-gray-800">{currentQuestion.number}</span>
            <span className="text-4xl text-gray-600">{currentQuestion.item}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full py-4 text-2xl font-bold text-gray-800 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeAttack;
