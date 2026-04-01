import { useState } from 'react'
import PillButton from '../../components/PillButton'

const EMOJI_OPTIONS = ['🎯', '🃏', '🎮', '🧩', '♟️', '🎴', '🎲', '🏅']

export default function CreateCustomGameForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [winCondition, setWinCondition] = useState('highest')
  const [emoji, setEmoji] = useState('🎯')

  const canSave = name.trim().length > 0

  const handleSubmit = () => {
    onSave({ name: name.trim(), winCondition, emoji })
  }

  return (
    <div className="bg-surface border border-gold/30 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-gold">New Custom Game</h3>
        <button type="button" onClick={onCancel} className="text-cream/40 hover:text-cream text-sm">
          Cancel
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Game Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 30))}
          placeholder="e.g. Azul, Ticket to Ride…"
          maxLength={30}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Win Condition</label>
        <div className="flex gap-3">
          {[
            { value: 'highest', label: 'Highest wins' },
            { value: 'lowest', label: 'Lowest wins' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setWinCondition(opt.value)}
              className={`
                flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-150
                ${winCondition === opt.value
                  ? 'border-gold bg-gold/10 text-gold scale-105'
                  : 'border-white/10 text-white/40 bg-surface-2'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-cream/70 uppercase tracking-wider">Emoji</label>
        <div className="flex gap-2 flex-wrap">
          {EMOJI_OPTIONS.map((em) => (
            <button
              key={em}
              type="button"
              onClick={() => setEmoji(em)}
              className={`w-11 h-11 rounded-xl text-xl transition-all duration-150 ${
                emoji === em
                  ? 'bg-gold/20 border-2 border-gold scale-110'
                  : 'bg-surface-2 border-2 border-white/10 hover:border-white/30'
              }`}
            >
              {em}
            </button>
          ))}
        </div>
      </div>

      <PillButton variant="gold" onClick={handleSubmit} disabled={!canSave} className="w-full justify-center">
        Create Game
      </PillButton>
    </div>
  )
}
