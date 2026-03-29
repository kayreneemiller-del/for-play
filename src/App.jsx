import { useState } from 'react'
import BottomNav from './components/BottomNav'
import LogGame from './pages/LogGame'
import OurStory from './pages/OurStory'
import { useRounds } from './hooks/useRounds'

export default function App() {
  const [activeTab, setActiveTab] = useState('log')
  const { rounds, loading, addRound } = useRounds()

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-gold font-display text-2xl animate-pulse">For-Play</div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh">
      {activeTab === 'log' && <LogGame onSave={addRound} />}
      {activeTab === 'story' && <OurStory rounds={rounds} />}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
