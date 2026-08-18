import { useState } from 'react'
import BasicLearning from './components/BasicLearning'
import PracticeMode from './components/PracticeMode'
import TimeAttack from './components/TimeAttack'

function App() {
  const [mode, setMode] = useState<'basic' | 'practice' | 'timeAttack'>('basic')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl bg-white rounded-xl shadow-md p-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">助数詞学習アプリ</h1>
        <div className="flex justify-center gap-4">
          <button 
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setMode('basic')}
          >
            Học cơ bản
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'practice' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setMode('practice')}
          >
            Luyện tập
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${mode === 'timeAttack' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setMode('timeAttack')}
          >
            Thử thách thời gian
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6">
        {mode === 'basic' && <BasicLearning />}
        {mode === 'practice' && <PracticeMode />}
        {mode === 'timeAttack' && <TimeAttack />}
      </main>
    </div>
  )
}

export default App
