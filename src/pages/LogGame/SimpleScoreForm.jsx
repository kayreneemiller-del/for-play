import { useState } from 'react'
import ScoreInput from '../../components/ScoreInput'
import PillButton from '../../components/PillButton'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'

const today = () => new Date().toISOString().slice(0, 10)

export default function SimpleScoreForm({ gameId, onSave, allowNegative = false, winCondition = 'highest' }) {
  const playerLabels = usePlayerLabels()
  const [p1Score, setP1Score] = useState(null)
  const [p2Score, setP2Score] = useState(null)
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const canSave = p1Score !== null && p2Score !== null

  const getOutcome = () => {
    if (p1Score === null || p2Score === null) return null
    if (p1Score === p2Score) return 'tie'
    if (winCondition === 'lowest') return p1Score < p2Score ? KAYRA : MAT
    return p1Score > p2Score ? KAYRA : MAT
  }

  const outcome = getOutcome()

  const outcomeLabel = !outcome
    ? null
    : outcome === 'tie'
    ? "It's a tie!"
    : `${playerLabels[outcome]} wins!`

  const outcomeColor = outcome === KAYRA ? 'text-teal' : outcome === MAT ? 'text-magenta' : 'text-cream/60'

  const handleSubmit = () => {
    onSave({
      gameId,
      date,
      notes,
      scores: { [KAYRA]: p1Score, [MAT]: p2Score },
      outcome,
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-teal font-bold uppercase tracking-wider text-center">
            {playerLabels[KAYRA]}
          </label>
          <ScoreInput value={p1Score} onChange={setP1Score} allowNegative={allowNegative} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-magenta font-bold uppercase tracking-wider text-center">
            {playerLabels[MAT]}
          </label>
          <ScoreInput value={p2Score} onChange={setP2Score} allowNegative={allowNegative} />
        </div>
      </div>

      {outcomeLabel && (
        <div className={`text-center text-lg font-display ${outcomeColor}`}>
          {outcomeLabel}
        </div>
      )}

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
