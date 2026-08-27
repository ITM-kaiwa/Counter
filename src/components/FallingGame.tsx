import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { countersData, type CounterInfo, type Item } from '../data/counters';
import { playAudio } from '../utils/tts';

type Mode = 'pictureToCounter' | 'counterToPicture';

const MODE_OPTIONS: Array<{ value: Mode; label: string }> = [
  { value: 'pictureToCounter', label: 'Tranh → Từ đếm' },
  { value: 'counterToPicture', label: 'Từ đếm → Tranh' },
];

const TOTAL_ROUNDS = 8;
const FALL_DURATION_MS = 6000;
const MAX_CANDIDATES = 6;

interface ItemWithCounter {
  item: Item;
  counter: CounterInfo;
}

const ALL_ITEMS: ItemWithCounter[] = countersData.flatMap((counter) =>
  counter.items.map((item) => ({ item, counter }))
);

interface RoundData {
  mode: Mode;
  counter: CounterInfo;
  anchorItem: Item;
  promptDisplay: string;
  candidates: string[];
}

interface ResultInfo {
  success: boolean;
  timedOut: boolean;
  matchedItem: Item | null;
  counter: CounterInfo | null;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(mode: Mode): RoundData | null {
  if (mode === 'pictureToCounter') {
    if (ALL_ITEMS.length === 0) return null;
    const { item, counter } = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
    const allKanji = countersData.map((c) => c.kanji);
    const decoyPool = allKanji.filter((k) => k !== counter.kanji);
    const decoys = shuffle(decoyPool).slice(0, MAX_CANDIDATES - 1);
    const candidates = shuffle([counter.kanji, ...decoys]);
    return { mode, counter, anchorItem: item, promptDisplay: item.emoji, candidates };
  }

  if (countersData.length === 0) return null;
  const counter = countersData[Math.floor(Math.random() * countersData.length)];
  const anchorItem = counter.items[Math.floor(Math.random() * counter.items.length)];
  const correctEmojis = Array.from(new Set(counter.items.map((it) => it.emoji)));
  const allEmojis = Array.from(new Set(ALL_ITEMS.map(({ item }) => item.emoji)));
  const decoyPool = allEmojis.filter((e) => !correctEmojis.includes(e));
  const shownCorrectCount = Math.min(correctEmojis.length, 2);
  const shownCorrect = shuffle(correctEmojis).slice(0, shownCorrectCount);
  const decoys = shuffle(decoyPool).slice(0, MAX_CANDIDATES - shownCorrectCount);
  const candidates = shuffle([...shownCorrect, ...decoys]);
  return { mode, counter, anchorItem, promptDisplay: counter.kanji, candidates };
}

const FallingGame = () => {
  const [mode, setMode] = useState<Mode>('pictureToCounter');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  const [phase, setPhase] = useState<'falling' | 'result' | 'summary'>('falling');
  const [result, setResult] = useState<ResultInfo | null>(null);
  const [fallTop, setFallTop] = useState(0);
  const [fallLeft, setFallLeft] = useState(0);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const settledRef = useRef(false);

  const modeLabel = useMemo(
    () => MODE_OPTIONS.find((o) => o.value === mode)?.label ?? '',
    [mode]
  );

  const startFall = useCallback(() => {
    settledRef.current = false;
    setFallTop(0);
    setFallLeft(0);
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / FALL_DURATION_MS, 1);
      setFallTop(progress * 86);
      setFallLeft(Math.sin(progress * Math.PI * 4) * 26);

      if (progress >= 1) {
        if (!settledRef.current) {
          settledRef.current = true;
          setResult({ success: false, timedOut: true, matchedItem: null, counter: null });
          setPhase('result');
        }
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startRound = useCallback(() => {
    const data = buildRound(mode);
    setRoundData(data);
    setResult(null);
    setPhase('falling');
    if (data) startFall();
  }, [mode, startFall]);

  // (Re)start the session whenever the mode changes.
  useEffect(() => {
    setRound(1);
    setScore(0);
    startRound();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function handleCatch(candidate: string) {
    if (phase !== 'falling' || !roundData || settledRef.current) return;
    settledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (roundData.mode === 'pictureToCounter') {
      const success = candidate === roundData.counter.kanji;
      if (success) {
        setScore((s) => s + 1);
        playAudio(roundData.anchorItem.reading);
      }
      setResult({
        success,
        timedOut: false,
        matchedItem: success ? roundData.anchorItem : null,
        counter: success ? roundData.counter : null,
      });
    } else {
      const matchedItem = roundData.counter.items.find((it) => it.emoji === candidate) ?? null;
      const success = matchedItem !== null;
      if (success) {
        setScore((s) => s + 1);
        playAudio(matchedItem.reading);
      }
      setResult({ success, timedOut: false, matchedItem, counter: success ? roundData.counter : null });
    }
    setPhase('result');
  }

  function handleNext() {
    if (round >= TOTAL_ROUNDS) {
      setPhase('summary');
      return;
    }
    setRound((r) => r + 1);
    startRound();
  }

  function handleRestart() {
    setRound(1);
    setScore(0);
    startRound();
  }

  const modeSelector = (
    <div className="mb-6 flex justify-center">
      <div className="flex rounded-full bg-slate-100 p-1 shadow-inner">
        {MODE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setMode(opt.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              mode === opt.value
                ? 'bg-purple-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  if (phase === 'summary') {
    return (
      <div className="mx-auto max-w-md">
        {modeSelector}
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">Kết thúc phiên chơi!</h2>
          <p className="text-slate-600">
            Bạn trả lời đúng{' '}
            <span className="font-bold text-purple-500">
              {score}/{TOTAL_ROUNDS}
            </span>{' '}
            câu.
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full bg-purple-500 px-6 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Chơi lại
          </button>
        </div>
      </div>
    );
  }

  if (!roundData) {
    return (
      <div className="mx-auto max-w-md">
        {modeSelector}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Đang chuẩn bị…
        </div>
      </div>
    );
  }

  const candidateLabel =
    roundData.mode === 'pictureToCounter'
      ? 'Chọn từ đếm (助数詞) phù hợp'
      : 'Chọn hình ảnh phù hợp';

  return (
    <div className="mx-auto w-full max-w-2xl">
      {modeSelector}

      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          Câu {round}/{TOTAL_ROUNDS}
        </span>
        <span className="font-bold text-purple-500">Điểm: {score}</span>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:flex-row">
        {/* Falling zone */}
        <div className="relative mx-auto h-72 w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/60">
          <p className="absolute left-0 right-0 top-2 px-2 text-center text-[11px] font-medium text-slate-500">
            {modeLabel}
          </p>
          <div
            className="absolute flex h-16 w-16 select-none items-center justify-center rounded-xl border border-purple-200 bg-white text-3xl shadow"
            style={{
              top: `${fallTop}%`,
              left: `calc(50% - 2rem + ${fallLeft}px)`,
              transition: phase === 'falling' ? 'none' : 'top 0.2s ease-out',
            }}
          >
            {roundData.promptDisplay}
          </div>
          {/* Catch line marker */}
          <div className="absolute bottom-6 left-2 right-2 border-t-2 border-dashed border-purple-300" />
        </div>

        {/* Candidate stock */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-center text-[11px] font-medium text-slate-500 sm:text-left">
            {candidateLabel} — nhấn thật nhanh trước khi rơi hết!
          </p>
          <div className="grid grid-cols-3 gap-2">
            {roundData.candidates.map((candidate, i) => (
              <button
                key={`${candidate}-${i}`}
                type="button"
                disabled={phase !== 'falling'}
                onClick={() => handleCatch(candidate)}
                className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl shadow-sm transition-all hover:border-purple-300 hover:bg-purple-50 active:scale-95 disabled:opacity-60"
              >
                {candidate}
              </button>
            ))}
          </div>

          {phase === 'result' && result && (
            <div
              className={`mt-2 rounded-xl border p-3 text-center text-sm ${
                result.success
                  ? 'border-green-300 bg-green-50 text-green-700'
                  : 'border-red-300 bg-red-50 text-red-700'
              }`}
            >
              {result.timedOut && <p className="font-bold">Hết giờ — đã rơi mất!</p>}
              {!result.timedOut && result.success && result.matchedItem && result.counter && (
                <p className="font-bold">
                  Chính xác! {result.matchedItem.emoji} {result.matchedItem.word}（
                  {result.matchedItem.meaning}） →{' '}
                  <span className="text-base">〜{result.counter.kanji}</span>
                </p>
              )}
              {!result.timedOut && !result.success && (
                <p className="font-bold">Chưa đúng — thử lại ở câu tiếp theo nhé!</p>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="mt-2 rounded-full bg-purple-500 px-5 py-1.5 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95"
              >
                {round < TOTAL_ROUNDS ? 'Câu tiếp theo →' : 'Xem kết quả'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FallingGame;
