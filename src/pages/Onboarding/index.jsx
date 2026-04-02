import { useState } from 'react'
import { useCouple } from '../../context/CoupleContext'

const EMOJI_OPTIONS = ['🦋', '🌟', '💎', '🎯', '👑', '🃏']

export default function Onboarding() {
  const { saveProfile } = useCouple()
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [emoji1, setEmoji1] = useState('🦋')
  const [emoji2, setEmoji2] = useState('👑')
  const [saving, setSaving] = useState(false)

  const canSubmit = name1.trim().length > 0 && name2.trim().length > 0

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSaving(true)
    await saveProfile({
      player1: name1.trim(),
      player2: name2.trim(),
      emoji1,
      emoji2,
      createdAt: Date.now(),
    })
    setSaving(false)
  }

  return (
    <div className="min-h-dvh bg-felt flex flex-col items-center justify-center px-6 py-12">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-gold to-magenta" />

      <div className="w-full max-w-sm space-y-8">
        {/* Title */}
        <div className="text-center">
          <div className="text-gold text-6xl mb-3">🎲</div>
          <h1 className="font-display text-5xl text-gold leading-tight">For-Play</h1>
          <p className="text-cream/60 text-base mt-2 font-body">
            Track your rivalry. Settle the score.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Player 1 */}
          <div className="space-y-3">
            <label className="text-xs text-gold/70 uppercase tracking-widest font-bold">Your name</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value.slice(0, 20))}
              placeholder="e.g. Kayra"
              maxLength={20}
              className="w-full bg-surface-2 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-gold placeholder:text-white/30"
            />
            <div className="flex gap-2">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji1(em)}
                  className={`flex-1 py-2 rounded-xl text-xl transition-all duration-150 ${
                    emoji1 === em
                      ? 'bg-gold/20 border-2 border-gold scale-110'
                      : 'bg-surface-2 border-2 border-white/10 hover:border-white/30'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Player 2 */}
          <div className="space-y-3">
            <label className="text-xs text-gold/70 uppercase tracking-widest font-bold">Partner's name</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value.slice(0, 20))}
              placeholder="e.g. Matt"
              maxLength={20}
              className="w-full bg-surface-2 border-2 border-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-gold placeholder:text-white/30"
            />
            <div className="flex gap-2">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji2(em)}
                  className={`flex-1 py-2 rounded-xl text-xl transition-all duration-150 ${
                    emoji2 === em
                      ? 'bg-magenta/20 border-2 border-magenta scale-110'
                      : 'bg-surface-2 border-2 border-white/10 hover:border-white/30'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || saving}
            className={`
              w-full py-4 rounded-full font-display text-xl transition-all duration-200
              ${canSubmit && !saving
                ? 'bg-gold text-surface gold-glow hover:brightness-110 active:scale-95 cursor-pointer'
                : 'bg-gold/30 text-surface/50 cursor-not-allowed'}
            `}
          >
            {saving ? 'Setting up…' : "Let's Play"}
          </button>
        </div>

        <p className="text-center text-cream/30 text-xs">
          Names are stored locally on your device only.
        </p>
      </div>
    </div>
  )
}
