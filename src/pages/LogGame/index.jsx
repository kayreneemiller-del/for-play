import { useState } from 'react'
import WingspanForm from './WingspanForm'
import SplendorForm from './SplendorForm'
import SkyTeamForm from './SkyTeamForm'
import SimpleScoreForm from './SimpleScoreForm'
import SevenWondersDuelForm from './SevenWondersDuelForm'
import OnitamaForm from './OnitamaForm'
import CreateCustomGameForm from './CreateCustomGameForm'
import WinnerBurst from '../../components/WinnerBurst'
import { GAME_CONFIG, WINGSPAN, SPLENDOR, SKYTEAM, JAIPUR, PATCHWORK, LOST_CITIES, SEVEN_WONDERS, ONITAMA } from '../../constants/games'
import { usePlayerLabels } from '../../context/CoupleContext'

const BUILTIN_MAIN = [WINGSPAN, SPLENDOR, SKYTEAM]
const BUILTIN_MORE = [JAIPUR, PATCHWORK, LOST_CITIES, SEVEN_WONDERS, ONITAMA]

const CARD_COLOR = {
  teal: 'border-teal/40 hover:border-teal',
  magenta: 'border-magenta/40 hover:border-magenta',
  gold: 'border-gold/40 hover:border-gold',
}

function GameCard({ game, onClick, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-surface border-2 rounded-2xl p-4 text-left transition-all duration-200 active:scale-98 ${style}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{game.emoji}</span>
        <div>
          <div className="font-bold text-white">{game.label}</div>
          <div className="text-xs text-cream/50 mt-0.5">
            {game.type === 'competitive' ? '⚔️ Competitive' : '🤝 Co-op'}
          </div>
        </div>
        <span className="ml-auto text-white/30 text-lg">›</span>
      </div>
    </button>
  )
}

export default function LogGame({ onSave, customGames, onAddCustomGame }) {
  const playerLabels = usePlayerLabels()
  const [selectedGame, setSelectedGame] = useState(null)
  const [selectedCustomId, setSelectedCustomId] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [burst, setBurst] = useState(null)

  const handleSave = async (data) => {
    await onSave(data)
    const winnerKey = data.winner ?? (data.outcome !== 'landed' && data.outcome !== 'crashed' ? data.outcome : null)
    const winnerName = winnerKey && winnerKey !== 'tie' ? playerLabels[winnerKey] : null
    setBurst({ winner: winnerName, outcome: data.outcome })
  }

  const handleBurstDone = () => {
    setBurst(null)
    setSelectedGame(null)
    setSelectedCustomId(null)
  }

  const handleCreateCustom = async (template) => {
    const id = await onAddCustomGame(template)
    setShowCreateForm(false)
    setSelectedCustomId(id)
  }

  const activeCustomGame = customGames.find((g) => g.id === selectedCustomId)
  const activeBuiltin = selectedGame ? GAME_CONFIG[selectedGame] : null
  const activeGame = activeBuiltin ?? (activeCustomGame ? { ...activeCustomGame, label: activeCustomGame.name } : null)
  const isFormOpen = selectedGame || selectedCustomId

  return (
    <div className="px-4 pt-6 pb-4 mb-nav">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-gold">For-Play</h1>
        <p className="text-cream/60 text-sm mt-1">
          {isFormOpen ? `Logging: ${activeGame?.label}` : 'Pick a game to log'}
        </p>
      </div>

      {!isFormOpen && !showCreateForm ? (
        <div className="space-y-5">
          {/* Main games */}
          <div className="space-y-3">
            {BUILTIN_MAIN.map((id) => (
              <GameCard
                key={id}
                game={GAME_CONFIG[id]}
                onClick={() => setSelectedGame(id)}
                style={CARD_COLOR[GAME_CONFIG[id].color] ?? 'border-white/20 hover:border-white/50'}
              />
            ))}
          </div>

          {/* More games */}
          <div>
            <div className="text-xs text-cream/40 uppercase tracking-widest mb-3">More Games</div>
            <div className="space-y-2">
              {BUILTIN_MORE.map((id) => (
                <GameCard
                  key={id}
                  game={GAME_CONFIG[id]}
                  onClick={() => setSelectedGame(id)}
                  style={CARD_COLOR[GAME_CONFIG[id].color] ?? 'border-white/20 hover:border-white/50'}
                />
              ))}
            </div>
          </div>

          {/* Custom games */}
          {customGames.length > 0 && (
            <div>
              <div className="text-xs text-cream/40 uppercase tracking-widest mb-3">Your Games</div>
              <div className="space-y-2">
                {customGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={{ ...game, label: game.name, type: 'competitive' }}
                    onClick={() => setSelectedCustomId(game.id)}
                    style="border-white/20 hover:border-white/50"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-white/20 text-cream/50 text-sm hover:border-gold/40 hover:text-gold transition-all duration-150"
          >
            + Create Custom Game
          </button>
        </div>
      ) : showCreateForm ? (
        <CreateCustomGameForm
          onSave={handleCreateCustom}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : (
        <div>
          <button
            type="button"
            onClick={() => { setSelectedGame(null); setSelectedCustomId(null) }}
            className="flex items-center gap-2 text-cream/60 text-sm mb-5 hover:text-cream"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{activeGame?.emoji ?? '🎯'}</span>
            <h2 className="font-display text-2xl text-white">{activeGame?.label}</h2>
          </div>

          {selectedGame === WINGSPAN && <WingspanForm onSave={handleSave} />}
          {selectedGame === SPLENDOR && <SplendorForm onSave={handleSave} />}
          {selectedGame === SKYTEAM && <SkyTeamForm onSave={handleSave} />}
          {selectedGame === SEVEN_WONDERS && <SevenWondersDuelForm onSave={handleSave} />}
          {selectedGame === ONITAMA && <OnitamaForm onSave={handleSave} />}
          {(selectedGame === JAIPUR || selectedGame === PATCHWORK) && (
            <SimpleScoreForm gameId={selectedGame} onSave={handleSave} />
          )}
          {selectedGame === LOST_CITIES && (
            <SimpleScoreForm gameId={selectedGame} onSave={handleSave} allowNegative />
          )}
          {selectedCustomId && activeCustomGame && (
            <SimpleScoreForm
              gameId={`custom_${activeCustomGame.id}`}
              onSave={handleSave}
              winCondition={activeCustomGame.winCondition}
            />
          )}
        </div>
      )}

      {burst && (
        <WinnerBurst winner={burst.winner} outcome={burst.outcome} onDone={handleBurstDone} />
      )}
    </div>
  )
}
