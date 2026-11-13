import { useState } from 'react'
import ScoreInput from '../../components/ScoreInput'
import PillButton from '../../components/PillButton'
import {
  HARMONIES,
  HARMONIES_LANDSCAPES,
  HARMONIES_MIN_ANIMAL_SLOTS,
  HARMONIES_MAX_ANIMAL_SLOTS,
} from '../../constants/games'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'

const today = () => new Date().toISOString().slice(0, 10)
const sum = (arr) => arr.reduce((s, v) => s + (v ?? 0), 0)

const emptyPlayer = () => ({
  ...Object.fromEntries(HARMONIES_LANDSCAPES.map((l) => [l.key, null])),
  animals: Array(HARMONIES_MIN_ANIMAL_SLOTS).fill(null),
})

const habitatTotal = (p) => sum(HARMONIES_LANDSCAPES.map((l) => p[l.key]))
const animalTotal = (p) => sum(p.animals)

export default function HarmoniesForm({ onSave }) {
  const playerLabels = usePlayerLabels()
  const [scores, setScores] = useState({ [KAYRA]: emptyPlayer(), [MAT]: emptyPlayer() })
  const [slots, setSlots] = useState(HARMONIES_MIN_ANIMAL_SLOTS)
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const setScore = (player, key, val) =>
    setScores((prev) => ({ ...prev, [player]: { ...prev[player], [key]: val } }))

  const setAnimal = (player, i, val) =>
    setScores((prev) => {
      const animals = prev[player].animals.slice()
      animals[i] = val
      return { ...prev, [player]: { ...prev[player], animals } }
    })

  const addSlot = () => {
    if (slots >= HARMONIES_MAX_ANIMAL_SLOTS) return
    setSlots(slots + 1)
    setScores((prev) => ({
      [KAYRA]: { ...prev[KAYRA], animals: [...prev[KAYRA].animals, null] },
      [MAT]: { ...prev[MAT], animals: [...prev[MAT].animals, null] },
    }))
  }

  const totals = {}
  for (const p of [KAYRA, MAT]) {
    const habitats = habitatTotal(scores[p])
    const animals = animalTotal(scores[p])
    totals[p] = { habitats, animals, total: habitats + animals }
  }

  const outcome =
    totals[KAYRA].total > totals[MAT].total ? KAYRA
      : totals[MAT].total > totals[KAYRA].total ? MAT
        : 'tie'

  const outcomeLabel = outcome === 'tie' ? "It's a tie!" : `${playerLabels[outcome]} wins!`
  const outcomeColor =
    outcome === KAYRA ? 'text-teal' : outcome === MAT ? 'text-magenta' : 'text-cream/60'

  const handleSubmit = () => {
    const build = (p) => {
      const s = scores[p]
      return {
        ...Object.fromEntries(HARMONIES_LANDSCAPES.map((l) => [l.key, s[l.key]])),
        animals: s.animals,
        animal_cards: totals[p].animals,
        habitats: totals[p].habitats,
        total: totals[p].total,
      }
    }
    onSave({
      gameId: HARMONIES,
      date,
      notes,
      scores: { [KAYRA]: build(KAYRA), [MAT]: build(MAT) },
      outcome,
    })
  }

  const Header = ({ first }) => (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 bg-surface-2 border-b border-white/10">
      <div className="text-xs text-cream/50 uppercase tracking-wider">{first}</div>
      <div className="text-xs text-teal font-bold uppercase tracking-wider w-20 text-center">{playerLabels[KAYRA]}</div>
      <div className="text-xs text-magenta font-bold uppercase tracking-wider w-20 text-center">{playerLabels[MAT]}</div>
    </div>
  )

  const Subtotal = ({ label, k }) => (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 bg-surface-2 border-b border-white/10 items-center">
      <div className="text-xs font-bold text-gold uppercase tracking-wider">{label}</div>
      <div className="w-20 text-center text-lg font-mono font-bold text-teal tabular">{totals[KAYRA][k]}</div>
      <div className="w-20 text-center text-lg font-mono font-bold text-magenta tabular">{totals[MAT][k]}</div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Landscapes */}
      <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
        <Header first="Landscapes" />
        {HARMONIES_LANDSCAPES.map((cat) => (
          <div
            key={cat.key}
            className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 border-b border-white/5 items-center"
            style={{ background: cat.bg }}
          >
            <div>
              <div className="text-sm text-cream/90">{cat.icon} {cat.label}</div>
              <div className="text-[11px] leading-tight text-cream/50">{cat.hint}</div>
            </div>
            <div className="w-20">
              <ScoreInput value={scores[KAYRA][cat.key]} onChange={(v) => setScore(KAYRA, cat.key, v)} />
            </div>
            <div className="w-20">
              <ScoreInput value={scores[MAT][cat.key]} onChange={(v) => setScore(MAT, cat.key, v)} />
            </div>
          </div>
        ))}
        <Subtotal label="Habitats" k="habitats" />
      </div>

      {/* Animal cards */}
      <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
        <Header first="Animal Cards" />
        <div className="px-4 py-2 text-[11px] text-cream/50 border-b border-white/5">
          One score per animal card — the lowest number still showing on its track.
        </div>
        {Array.from({ length: slots }, (_, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-2 border-b border-white/5 items-center">
            <div className="text-sm text-cream/80">🐾 Card {i + 1}</div>
            <div className="w-20">
              <ScoreInput value={scores[KAYRA].animals[i]} onChange={(v) => setAnimal(KAYRA, i, v)} />
            </div>
            <div className="w-20">
              <ScoreInput value={scores[MAT].animals[i]} onChange={(v) => setAnimal(MAT, i, v)} />
            </div>
          </div>
        ))}
        {slots < HARMONIES_MAX_ANIMAL_SLOTS && (
          <button
            type="button"
            onClick={addSlot}
            className="w-full py-2 text-xs text-cream/50 hover:text-gold border-b border-white/5"
          >
            + Add animal card
          </button>
        )}
        <Subtotal label="Animals" k="animals" />

        {/* Pad bottom: habitats + animals = total */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3 bg-surface-2">
          <div className="text-sm font-bold text-gold uppercase tracking-wider">Total</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-teal tabular">{totals[KAYRA].total}</div>
          <div className="w-20 text-center text-2xl font-mono font-bold text-magenta tabular">{totals[MAT].total}</div>
        </div>
      </div>

      <div className={`text-center text-lg font-display ${outcomeColor}`}>{outcomeLabel}</div>

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
