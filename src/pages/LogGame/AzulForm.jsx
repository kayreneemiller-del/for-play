import { useState } from 'react'
import ScoreInput from '../../components/ScoreInput'
import PillButton from '../../components/PillButton'
import { AZUL, AZUL_CATEGORIES } from '../../constants/games'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'

const today = () => new Date().toISOString().slice(0, 10)

const emptyScores = () => ({
  track: null, rows: null, columns: null, colors: null,
})

function calcTotal(scores) {
  return AZUL_CATEGORIES.reduce(
    (sum, cat) => sum + (scores[cat.key] ?? 0) * cat.multiplier,
    0
  )
}

export default function AzulForm({ onSave }) {
  const playerLabels = usePlayerLabels()
  const [scores, setScores] = useState({ [KAYRA]: emptyScores(), [MAT]: emptyScores() })
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const setScore = (player, key, val) =>
    setScores((prev) => ({ ...prev, [player]: { ...prev[player], [key]: val } }))

  const kayraTotal = calcTotal(scores[KAYRA])
  const matTotal = calcTotal(scores[MAT])

  // Azul tiebreaker: most complete horizontal rows, then a shared victory.
  const kayraRows = scores[KAYRA].rows ?? 0
  const matRows = scores[MAT].rows ?? 0
  const tiedOnPoints = kayraTotal === matTotal
  const outcome = !tiedOnPoints
    ? (kayraTotal > matTotal ? KAYRA : MAT)
    : kayraRows > matRows
      ? KAYRA
      : matRows > kayraRows
        ? MAT
        : 'tie'

  const outcomeLabel =
    outcome === 'tie'
      ? "It's a tie!"
      : tiedOnPoints
        ? `${playerLabels[outcome]} wins on full rows!`
        : `${playerLabels[outcome]} wins!`

  const outcomeColor =
    outcome === KAYRA ? 'text-teal' : outcome === MAT ? 'text-magenta' : 'text-cream/60'

  const handleSubmit = () => {
    onSave({
      gameId: AZUL,
      date,
      notes,
      scores: {
        [KAYRA]: { ...scores[KAYRA], total: kayraTotal },
        [MAT]: { ...scores[MAT], total: matTotal },
      },
      outcome,
    })
  }

  return (
    <div className="space-y-4">
      {/* Score table */}
      <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 bg-surface-2 border-b border-white/10">
          <div className="text-xs text-cream/50 uppercase tracking-wider">Category</div>
          <div className="text-xs text-teal font-bold uppercase tracking-wider w-20 text-center">{playerLabels[KAYRA]}</div>
          <div className="text-xs text-magenta font-bold uppercase tracking-wider w-20 text-center">{playerLabels[MAT]}</div>
        </div>

        {/* Rows */}
        {AZUL_CATEGORIES.map((cat) => (
          <div key={cat.key} className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 border-b border-white/5 items-center">
            <div>
              <div className="text-sm text-cream/80">{cat.label}</div>
              <div className="text-xs text-cream/40">{cat.hint}</div>
            </div>
            <div className="w-20">
              <ScoreInput
                value={scores[KAYRA][cat.key]}
                onChange={(v) => setScore(KAYRA, cat.key, v)}
              />
            </div>
            <div className="w-20">
              <ScoreInput
                value={scores[MAT][cat.key]}
                onChange={(v) => setScore(MAT, cat.key, v)}
              />
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 bg-surface-2">
          <div className="text-sm font-bold text-gold uppercase tracking-wider">Total</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-teal tabular">{kayraTotal}</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-magenta tabular">{matTotal}</div>
        </div>
      </div>

      {/* Winner callout */}
      <div className={`text-center text-lg font-display ${outcomeColor}`}>
        {outcomeLabel}
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Date Played</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold w-full"
        />
      </div>

      {/* Notes */}
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

      <PillButton variant="gold" onClick={handleSubmit} className="w-full justify-center">
        Save Round
      </PillButton>
    </div>
  )
}
