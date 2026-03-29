import { useState } from 'react'

export default function BadgeChip({ accolade, unlocked }) {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="flex flex-col items-center gap-1.5 relative">
      <button
        type="button"
        onClick={() => setShowHint((s) => !s)}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center text-2xl
          border-2 transition-all duration-200
          ${unlocked
            ? 'border-gold bg-gold/20 gold-glow scale-100'
            : 'border-white/20 bg-surface-2 opacity-40 grayscale'}
        `}
      >
        {accolade.emoji}
      </button>
      <span className={`text-xs text-center font-medium leading-tight max-w-[4.5rem] ${unlocked ? 'text-gold' : 'text-white/40'}`}>
        {accolade.name}
      </span>
      {showHint && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface border border-gold/40 rounded-xl px-3 py-2 text-xs text-cream text-center w-36 z-10 shadow-lg">
          {unlocked ? '✅ Unlocked!' : accolade.hint}
        </div>
      )}
    </div>
  )
}
