import { useState, useEffect } from 'react';
import { countersData } from '../data/counters';
import { playAudio } from '../utils/tts';

const TimeAttack = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState<{
    number: number;
    itemWord: string;
    itemReading: string;
    emoji: string;
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
    const counter = countersData[Math.floor(Math.random() * countersData.length)];
    const itemObj = counter.items[Math.floor(Math.random() * counter.items.length)];
    const conjugation = counter.conjugations[Math.floor(Math.random() * counter.conjugations.length)];

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
      itemWord: itemObj.word,
      itemReading: itemObj.reading,
      emoji: counter.emoji,
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
      generateQuestion();
    }
  };

  if (!isPlaying && timeLeft === 30) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Chế độ Thử thách Thời gian</h2>
        <p className="text-slate-600 mb-8 text-center max-w-md">
          Trong vòng 30 giây, hãy chọn cách đọc đúng của trợ từ chỉ số lượng cho các vật thể hiển thị từ 3 lựa chọn.
        </p>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Bắt đầu!
        </button>
      </div>
    );
  }

  if (!isPlaying && timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Hết giờ!</h2>
        <p className="text-2xl mb-8">Điểm: <span className="font-bold text-red-500">{score}</span> câu đúng</p>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full text-xl shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Chơi lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-8 px-4">
        <div className="text-xl font-bold text-slate-600">Thời gian: <span className="text-red-500 text-2xl">{timeLeft}</span>s</div>
        <div className="text-xl font-bold text-slate-600">Điểm: <span className="text-purple-500 text-2xl">{score}</span></div>
      </div>

      {currentQuestion && (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-6xl mb-6 flex items-center justify-center gap-4">
            <span className="font-bold text-slate-800">{currentQuestion.number}</span>
            <span className="text-4xl text-slate-600">
              <ruby>
                {currentQuestion.itemWord}
                <rt className="text-xl">{currentQuestion.itemReading}</rt>
              </ruby>
            </span>
            <span className="text-5xl">{currentQuestion.emoji}</span>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full py-4 text-2xl font-bold text-slate-800 bg-slate-100 hover:bg-purple-100 hover:text-purple-600 border-2 border-slate-200 hover:border-purple-300 rounded-xl active:scale-95 transition-all"
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
