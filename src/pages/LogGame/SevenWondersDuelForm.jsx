import { useState } from 'react'
import ScoreInput from '../../components/ScoreInput'
import PillButton from '../../components/PillButton'
import { SEVEN_WONDERS, SEVEN_WONDERS_CATEGORIES } from '../../constants/games'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'

const today = () => new Date().toISOString().slice(0, 10)

const emptyScores = () => ({
  blue: null, green: null, yellow: null, purple: null,
  wonders: null, progress: null, coins: null, military: null,
})

function calcTotal(scores) {
  return Object.values(scores).reduce((sum, v) => sum + (v ?? 0), 0)
}

function Check({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`
        w-9 h-9 mx-auto rounded-lg border-2 flex items-center justify-center text-lg
        ${checked ? 'bg-gold border-gold text-surface font-bold' : 'bg-surface-2 border-white/30 text-transparent'}
      `}
    >
      ✓
    </button>
  )
}

export default function SevenWondersDuelForm({ onSave }) {
  const playerLabels = usePlayerLabels()
  const [scores, setScores] = useState({ [KAYRA]: emptyScores(), [MAT]: emptyScores() })
  // Supremacy ends the game on the spot; only one player can have one.
  const [supremacy, setSupremacy] = useState(null) // { player, type: 'military' | 'science' }
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const setScore = (player, key, val) =>
    setScores((prev) => ({ ...prev, [player]: { ...prev[player], [key]: val } }))

  const toggleSupremacy = (player, type) =>
    setSupremacy((cur) => (cur?.player === player && cur.type === type ? null : { player, type }))

  const kayraTotal = calcTotal(scores[KAYRA])
  const matTotal = calcTotal(scores[MAT])

  // Tiebreaker: most civilian (blue) points, then a shared victory.
  const kayraBlue = scores[KAYRA].blue ?? 0
  const matBlue = scores[MAT].blue ?? 0
  const tiedOnPoints = kayraTotal === matTotal

  let outcome, winMethod
  if (supremacy) {
    outcome = supremacy.player
    winMethod = supremacy.type
  } else {
    winMethod = 'civilian'
    outcome = !tiedOnPoints
      ? (kayraTotal > matTotal ? KAYRA : MAT)
      : kayraBlue > matBlue ? KAYRA : matBlue > kayraBlue ? MAT : 'tie'
  }

  const outcomeLabel =
    outcome === 'tie'
      ? "Shared victory!"
      : supremacy
        ? `${playerLabels[outcome]} wins by ${supremacy.type === 'military' ? 'Military' : 'Science'} Supremacy!`
        : tiedOnPoints
          ? `${playerLabels[outcome]} wins on civilian points!`
          : `${playerLabels[outcome]} wins!`

  const outcomeColor =
    outcome === KAYRA ? 'text-teal' : outcome === MAT ? 'text-magenta' : 'text-cream/60'

  const handleSubmit = () => {
    const loser = outcome === KAYRA ? MAT : KAYRA
    const totals = { [KAYRA]: kayraTotal, [MAT]: matTotal }
    onSave({
      gameId: SEVEN_WONDERS,
      date,
      notes,
      winner: outcome,
      winMethod,
      winnerPoints: outcome === 'tie' ? kayraTotal : totals[outcome],
      loserPoints: outcome === 'tie' ? matTotal : totals[loser],
      scores: {
        [KAYRA]: { ...scores[KAYRA], total: kayraTotal },
        [MAT]: { ...scores[MAT], total: matTotal },
      },
    })
  }

  const cols = 'grid grid-cols-[1fr_auto_auto] gap-2 px-4'

  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
        <div className={`${cols} py-3 bg-surface-2 border-b border-white/10`}>
          <div className="text-xs text-cream/50 uppercase tracking-wider">Category</div>
          <div className="text-xs text-teal font-bold uppercase tracking-wider w-20 text-center">{playerLabels[KAYRA]}</div>
          <div className="text-xs text-magenta font-bold uppercase tracking-wider w-20 text-center">{playerLabels[MAT]}</div>
        </div>

        {SEVEN_WONDERS_CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className={`${cols} py-2 border-b border-white/5 items-center`}
            style={{ backgroundColor: cat.bg }}
          >
            <div className="text-sm text-cream/80 flex items-center gap-2">
              <span>{cat.icon}</span>{cat.label}
            </div>
            <div className="w-20">
              <ScoreInput value={scores[KAYRA][cat.key]} onChange={(v) => setScore(KAYRA, cat.key, v)} />
            </div>
            <div className="w-20">
              <ScoreInput value={scores[MAT][cat.key]} onChange={(v) => setScore(MAT, cat.key, v)} />
            </div>
          </div>
        ))}

        <div className={`${cols} py-3 bg-surface-2`}>
          <div className="text-sm font-bold text-gold uppercase tracking-wider">Total (Σ)</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-teal tabular">{kayraTotal}</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-magenta tabular">{matTotal}</div>
        </div>

        {[
          { type: 'military', label: '⚔️ Military Supremacy', bg: 'rgba(185,28,28,0.35)' },
          { type: 'science', label: '🔬 Science Supremacy', bg: 'rgba(21,128,61,0.35)' },
        ].map((row) => (
          <div key={row.type} className={`${cols} py-2 items-center`} style={{ backgroundColor: row.bg }}>
            <div className="text-sm text-cream/90">{row.label}</div>
            {[KAYRA, MAT].map((p) => (
              <div key={p} className="w-20">
                <Check
                  checked={supremacy?.player === p && supremacy.type === row.type}
                  onChange={() => toggleSupremacy(p, row.type)}
                  label={`${playerLabels[p]} ${row.label}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={`text-center text-lg font-display ${outcomeColor}`}>
        {outcomeLabel}
        {supremacy && (
          <div className="text-xs text-cream/40 font-sans mt-1">Supremacy ends the game regardless of points.</div>
        )}
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

      <PillButton variant="gold" onClick={handleSubmit} className="w-full justify-center">
        Save Round
      </PillButton>
    </div>
  )
}
