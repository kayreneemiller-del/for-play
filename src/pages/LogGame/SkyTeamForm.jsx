import { useState } from 'react'
import OutcomeToggle from '../../components/OutcomeToggle'
import TagInput from '../../components/TagInput'
import PillButton from '../../components/PillButton'
import { SKYTEAM_DIFFICULTIES } from '../../constants/games'

const today = () => new Date().toISOString().slice(0, 10)

const DIFF_STYLES = {
  green: 'border-neon-green text-neon-green bg-neon-green/10',
  yellow: 'border-gold text-gold bg-gold/10',
  red: 'border-neon-red text-neon-red bg-neon-red/10',
  black: 'border-white text-white bg-white/10',
}

export default function SkyTeamForm({ onSave }) {
  const [outcome, setOutcome] = useState(null)
  const [map, setMap] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [modules, setModules] = useState([])
  const [date, setDate] = useState(today())
  const [notes, setNotes] = useState('')

  const canSave = outcome && map.trim()

  const handleSubmit = () => {
    onSave({
      gameId: 'skyteam',
      date,
      notes,
      outcome,
      map: map.trim(),
      difficulty,
      modules,
    })
  }

  return (
    <div className="space-y-5">
      {/* Outcome */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Outcome</label>
        <OutcomeToggle value={outcome} onChange={setOutcome} />
      </div>

      {/* Map */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Map / Airport</label>
        <input
          type="text"
          value={map}
          onChange={(e) => setMap(e.target.value)}
          placeholder="e.g. Tokyo Haneda"
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold"
        />
      </div>

      {/* Difficulty */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Difficulty</label>
        <div className="flex gap-2">
          {SKYTEAM_DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDifficulty(d.value)}
              className={`
                flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200
                ${difficulty === d.value
                  ? `${DIFF_STYLES[d.value]} scale-105`
                  : 'border-white/10 text-white/30 bg-surface-2'}
              `}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules */}
      <TagInput label="Active Modules (optional)" tags={modules} onChange={setModules} />

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
          placeholder="What went wrong? Or right?"
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
