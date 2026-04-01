import { useState } from 'react'
import { CoupleProvider, useCouple } from './context/CoupleContext'
import BottomNav from './components/BottomNav'
import LogGame from './pages/LogGame'
import OurStory from './pages/OurStory'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import { useRounds } from './hooks/useRounds'
import { useCustomGames } from './hooks/useCustomGames'

function AppInner() {
  const { profile, loading: coupleLoading } = useCouple()
  const { rounds, loading: roundsLoading, addRound } = useRounds()
  const { customGames, addCustomGame, loading: gamesLoading } = useCustomGames()
  const [activeTab, setActiveTab] = useState('log')

  if (coupleLoading || roundsLoading || gamesLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-gold font-display text-2xl animate-pulse">For-Play</div>
      </div>
    )
  }

  if (!profile) {
    return <Onboarding />
  }

  return (
    <div className="min-h-dvh">
      {activeTab === 'log' && (
        <LogGame onSave={addRound} customGames={customGames} onAddCustomGame={addCustomGame} />
      )}
      {activeTab === 'story' && (
        <OurStory rounds={rounds} customGames={customGames} />
      )}
      {activeTab === 'settings' && <Settings />}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}

export default function App() {
  return (
    <CoupleProvider>
      <AppInner />
    </CoupleProvider>
  )
}
