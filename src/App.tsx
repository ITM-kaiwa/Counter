import { useState } from 'react'
import { Link, Download } from 'lucide-react'
import BasicLearning from './components/BasicLearning'
import PracticeMode from './components/PracticeMode'
import TimeAttack from './components/TimeAttack'
import FallingGame from './components/FallingGame'

function App() {
  const [mode, setMode] = useState<'basic' | 'practice' | 'timeAttack' | 'fallingGame'>('basic')

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 relative text-center">
        <a
          href="https://itm-kaiwa.github.io/Random/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-purple-500 hover:bg-purple-50 active:scale-95 rounded-full transition-all flex items-center justify-center"
          title="数字練習アプリへ"
        >
          <Link size={24} />
        </a>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">助数詞学習アプリ</h1>
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'basic' ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setMode('basic')}
          >
            Học cơ bản
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'practice' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setMode('practice')}
          >
            Luyện tập
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'timeAttack' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setMode('timeAttack')}
          >
            Thử thách thời gian
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'fallingGame' ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            onClick={() => setMode('fallingGame')}
          >
            Game rơi
          </button>
          <a
            href="/josuushi-hayamihyou.pdf"
            download="josuushi-hayamihyou.pdf"
            className="px-4 py-2 rounded-lg font-bold transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-1.5"
            title="Tải bảng tra cứu cách đếm số lượng (PDF)"
          >
            <Download size={18} />
            Tài liệu
          </a>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {mode === 'basic' && <BasicLearning />}
        {mode === 'practice' && <PracticeMode />}
        {mode === 'timeAttack' && <TimeAttack />}
        {mode === 'fallingGame' && <FallingGame />}
      </main>
    </div>
  )
}

export default App
