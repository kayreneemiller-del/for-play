import { useState } from 'react'
import WingspanForm from './WingspanForm'
import SplendorForm from './SplendorForm'
import SkyTeamForm from './SkyTeamForm'
import WinnerBurst from '../../components/WinnerBurst'
import { GAME_CONFIG, WINGSPAN, SPLENDOR, SKYTEAM } from '../../constants/games'
import { PLAYER_LABELS } from '../../constants/players'

const GAME_ORDER = [WINGSPAN, SPLENDOR, SKYTEAM]

const CARD_STYLES = {
  [WINGSPAN]: 'border-teal/40 hover:border-teal',
  [SPLENDOR]: 'border-magenta/40 hover:border-magenta',
  [SKYTEAM]: 'border-gold/40 hover:border-gold',
}

export default function LogGame({ onSave }) {
  const [selectedGame, setSelectedGame] = useState(null)
  const [burst, setBurst] = useState(null)

  const handleSave = async (data) => {
    await onSave(data)
    const winner = data.winner
      ? PLAYER_LABELS[data.winner]
      : data.outcome && data.outcome !== 'landed' && data.outcome !== 'crashed'
      ? PLAYER_LABELS[data.outcome]
      : null
    setBurst({ winner, outcome: data.outcome })
  }

  const handleBurstDone = () => {
    setBurst(null)
    setSelectedGame(null)
  }

  const game = selectedGame ? GAME_CONFIG[selectedGame] : null

  return (
    <div className="px-4 pt-6 pb-4 mb-nav">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl text-gold">For-Play</h1>
        <p className="text-cream/60 text-sm mt-1">
          {selectedGame ? `Logging: ${game.label}` : 'Pick a game to log'}
        </p>
      </div>

      {!selectedGame ? (
        <div className="space-y-3">
          {GAME_ORDER.map((id) => {
            const g = GAME_CONFIG[id]
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedGame(id)}
                className={`
                  w-full bg-surface border-2 rounded-2xl p-5 text-left
                  transition-all duration-200 active:scale-98
                  ${CARD_STYLES[id]}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{g.emoji}</span>
                  <div>
                    <div className="font-bold text-white text-lg">{g.label}</div>
                    <div className="text-xs text-cream/50 mt-0.5">
                      {g.type === 'competitive' ? '⚔️ Competitive' : '🤝 Co-op'}
                    </div>
                  </div>
                  <span className="ml-auto text-white/30 text-lg">›</span>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 text-cream/60 text-sm mb-5 hover:text-cream"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{game.emoji}</span>
            <h2 className="font-display text-2xl text-white">{game.label}</h2>
          </div>

          {selectedGame === WINGSPAN && <WingspanForm onSave={handleSave} />}
          {selectedGame === SPLENDOR && <SplendorForm onSave={handleSave} />}
          {selectedGame === SKYTEAM && <SkyTeamForm onSave={handleSave} />}
        </div>
      )}

      {burst && (
        <WinnerBurst
          winner={burst.winner}
          outcome={burst.outcome}
          onDone={handleBurstDone}
        />
      )}
    </div>
  )
}
