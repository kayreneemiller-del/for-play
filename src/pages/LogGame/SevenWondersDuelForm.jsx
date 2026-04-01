import { useState } from 'react'
import PillButton from '../../components/PillButton'
import ScoreInput from '../../components/ScoreInput'
import { SEVEN_WONDERS_WIN_METHODS } from '../../constants/games'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'

const today = () => new Date().toISOString().slice(0, 10)

export default function SevenWondersDuelForm({ onSave }) {
  const playerLabels = usePlayerLabels()
  const [winner, setWinner] = useState(null)
  const [winMethod, setWinMethod] = useState('')
  const [winnerPoints, setWinnerPoints] = useState(null)
  const [loserPoints, setLoserPoints] = useState(null)
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const canSave = winner && winMethod

  const handleSubmit = () => {
    onSave({
      gameId: '7wonders',
      date,
      notes,
      winner,
      winMethod,
      winnerPoints,
      loserPoints,
    })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Who Won?</label>
        <div className="flex gap-3">
          {[KAYRA, MAT].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setWinner(p)}
              className={`
                flex-1 py-4 rounded-2xl text-lg font-display transition-all duration-200
                ${winner === p
                  ? p === KAYRA
                    ? 'bg-teal text-surface font-bold scale-105'
                    : 'bg-magenta text-white font-bold scale-105'
                  : 'bg-surface-2 text-white/40 border border-white/10'}
              `}
            >
              {playerLabels[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Win Condition</label>
        <select
          value={winMethod}
          onChange={(e) => setWinMethod(e.target.value)}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold appearance-none"
        >
          <option value="">Select how they won…</option>
          {SEVEN_WONDERS_WIN_METHODS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ScoreInput
          label={`${playerLabels[winner ?? KAYRA]} points`}
          value={winnerPoints}
          onChange={setWinnerPoints}
        />
        <ScoreInput
          label={`${playerLabels[winner === KAYRA ? MAT : KAYRA]} points`}
          value={loserPoints}
          onChange={setLoserPoints}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Date Played</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any memorable moments?"
          rows={2}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <PillButton variant="gold" onClick={handleSubmit} disabled={!canSave} className="w-full justify-center">
        Save Round
      </PillButton>
    </div>
  )
}
