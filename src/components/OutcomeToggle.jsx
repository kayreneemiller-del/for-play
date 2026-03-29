export default function OutcomeToggle({ value, onChange }) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange('landed')}
        className={`
          flex-1 py-5 rounded-2xl text-xl font-display tracking-wide transition-all duration-200
          ${value === 'landed'
            ? 'bg-neon-green text-surface font-bold green-glow scale-105'
            : 'bg-surface-2 text-white/40 border border-white/10'}
        `}
      >
        ✈️ LANDED
      </button>
      <button
        type="button"
        onClick={() => onChange('crashed')}
        className={`
          flex-1 py-5 rounded-2xl text-xl font-display tracking-wide transition-all duration-200
          ${value === 'crashed'
            ? 'bg-neon-red text-white font-bold red-glow scale-105'
            : 'bg-surface-2 text-white/40 border border-white/10'}
        `}
      >
        💥 CRASHED
      </button>
    </div>
  )
}
